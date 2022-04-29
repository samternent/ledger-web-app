import { ref, unref, provide, inject } from "vue";

import createLedger from "../../lib/ledger";
import loki from "lokijs";
import useLokiPlugin from "../../plugins/lokijs";

function generateId() {
  const uint32 = window.crypto.getRandomValues(new Uint32Array(1))[0];
  return uint32.toString(16);
}

export const useLedgerSymbol = Symbol("useLedger");

export function useLedger() {
  return inject(useLedgerSymbol);
}

export function provideLedger({ signKey, verifyKey }) {
  const loading = ref(false);
  const loaded = ref(false);
  const api = ref(null);
  const ledger = ref(null);

  const {
    getCollection,
    plugin: lokiPlugin,
    db,
  } = useLokiPlugin(new loki("ledger.db"));

  async function loadLedger(rawLedger, genesisRecord) {
    return new Promise(async (resolve, reject) => {
      try {
        loading.value = true;
        api.value = await createLedger({
          ledger: rawLedger,
          plugins: [
            lokiPlugin,
            {
              onBeforeReplay() {
                clearLedger();
              },
              onAuth() {
                if (genesisRecord) {
                  const record = {
                    data: {
                      id: generateId(),
                      ...genesisRecord.data,
                    },
                    collection: genesisRecord.collection,
                  };
                  api.value.create(record);
                }
                if (rawLedger) {
                  api.value.load(rawLedger);
                }
                loading.value = false;
              },
              onReady({ ledger: _ledger }) {
                ledger.value = _ledger;
                window.localStorage.setItem("ledger", JSON.stringify(_ledger));
                loaded.value = true;
                resolve(_ledger);
              },
              async onUpdate({ ledger: _ledger }) {
                window.localStorage.setItem("ledger", JSON.stringify(_ledger));
                ledger.value = _ledger;
              },
            },
          ],
        });
        await api.value.auth(signKey.value, verifyKey.value);
      } catch (e) {
        reject(e);
      }
    });
  }

  async function addRecord(record, collection) {
    return api.value.add(
      {
        id: generateId(),
        ...record,
      },
      collection
    );
  }

  async function updateRecord(record, collection) {
    if (record.id) {
      return api.value.add(record, collection);
    } else {
      return api.value.add(
        {
          id: generateId(),
          ...record,
        },
        collection
      );
    }
  }

  function clearLedger() {
    loaded.value = false;

    if (ledger.value) {
      getCollection("branches")?.clear();
      getCollection("content")?.clear();
      getCollection("dataTypes")?.clear();
      getCollection("branchData")?.clear();

      window.localStorage.setItem(
        `ledger_${ledger.value.id.slice(0, 6)}`,
        JSON.stringify(ledger.value)
      );
    }
  }

  const ledgerInterface = {
    methods: {
      loadLedger,
      addRecord,
      updateRecord,
      clearLedger,
      getCollection,
    },
    loading,
    loaded,
    ledger,
    api,
  };

  provide(useLedgerSymbol, ledgerInterface);

  return ledgerInterface;
}
