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
                clear();
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

  function clear() {
    // if (ledger.value.pending_records.length) {
    //   const resp = confirm(
    //     "You have unsaved changes, are you sure you want to close without saving?"
    //   );
    //   if (!resp) {
    //     return;
    //   }
    // }
    loaded.value = false;

    getCollection("branches").clear();
    getCollection("content").clear();

    window.localStorage.removeItem("ledger");
  }

  const ledgerInterface = {
    methods: {
      loadLedger,
      addRecord,
      updateRecord,
      clear,
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
