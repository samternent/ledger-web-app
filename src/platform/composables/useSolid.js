import { ref, reactive, computed, provide, inject } from "vue";
import {
  login,
  handleIncomingRedirect,
  onSessionRestore,
  fetch,
  getDefaultSession,
  logout,
} from "@inrupt/solid-client-authn-browser";
import {
  getFile,
  getSolidDataset,
  getThing,
  overwriteFile,
  deleteFile,
  getStringNoLocale,
} from "@inrupt/solid-client";
import { FOAF } from "@inrupt/vocab-common-rdf";

const providers = [
  "https://broker.pod.inrupt.com",
  "https://inrupt.net",
  "https://solidcommunity.net",
  "https://solidweb.org",
];

const hasSolidSession = ref(false);
const webId = ref(null);
const profile = reactive({});
const oidcIssuer = ref(providers[0]);
const store = reactive({
  wallet: {},
  wallets: [],
});
const activeWorkspace = ref(0);
const workspace = computed(() => {
  return profile.workspace && profile.workspace.length
    ? profile.workspace[activeWorkspace.value]
    : null;
});

const useSolidSymbol = Symbol("useSolid");

export function provideSolid() {
  function solidLogin() {
    login({
      oidcIssuer: oidcIssuer.value,
      clientName: "ledger.concords.app",
    });
  }

  async function solidFetch(name, id) {
    try {
      const file = await getFile(`${workspace.value}concords/${name}/${id}`, {
        fetch: fetch,
      });

      return new Promise((res, rej) => {
        async function onLoadFileHandler(e) {
          store[name] = {
            ...store[name],
            [id]: e.target.result,
          };

          const arr = id.split("");
          res(e.target.result);
        }
        let fr = new FileReader();
        fr.onload = onLoadFileHandler;
        fr.readAsText(file);
      });
    } catch (e) {
      throw e;
    }
  }

  async function solidWrite(name, type = "ledger", details) {
    const file = new File([details], `${name}`, {
      type: "application/json",
    });
    await overwriteFile(`${workspace.value}concords/${type}/${name}`, file, {
      contentType: file.type,
      fetch: fetch,
    });
  }

  async function solidDelete(name, type = "ledger") {
    await deleteFile(`${workspace.value}concords/${type}/${name}`, { fetch: fetch });
  }

  async function handleSessionLogin() {
    await handleIncomingRedirect({
      url: window.location.href,
      restorePreviousSession: true,
    });
    const session = getDefaultSession();
    hasSolidSession.value = session.info.isLoggedIn;

    if (hasSolidSession.value) {
      webId.value = session.info.webId;

      const myDataset = await getSolidDataset(webId.value.split("#")[0], {
        fetch: fetch,
      });

      const myProfile = getThing(myDataset, webId.value);
      profile.name = getStringNoLocale(myProfile, FOAF.name);
      profile.url = myProfile.url;
      profile.workspace =
        myProfile.predicates[
          "http://www.w3.org/ns/pim/space#storage"
        ].namedNodes;

      // try {
      //   const walletData = await getSolidDataset(`${podUrl}/concords/wallet`, {
      //     fetch: fetch,
      //   });

      //   store["wallets"] = Object.keys(walletData.graphs.default)
      //     .filter((key) => /[^\\]*\.(\w+)$/.test(key))
      //     .map((str) =>
      //       str.split("\\").pop().split("/").pop().split(".").shift()
      //     );
      // } catch (e) {
      //   console.warn(e);
      // }

      try {
        // await solidFetch("wallet", "wallet");
      } catch (e) {
        // solidWrite(`${identity.x}_${_identity.y}`, _secret);
      }
    }
  }

  function getDataSet(name) {
    if (!workspace.value) return;
    return getSolidDataset(`${workspace.value}concords/${name}`, {
      fetch: fetch,
    });
  }

  handleSessionLogin();

  const solidInterface = {
    login: solidLogin,
    hasSolidSession,
    fetch: solidFetch,
    write: solidWrite,
    deleteLedger: solidDelete,
    getDataSet,
    webId,
    handleSessionLogin,
    profile,
    store,
    workspace,
    oidcIssuer,
    providers,
    logout: async () => {
      await logout();
      hasSolidSession.value = false;
    },
  };

  provide(useSolidSymbol, solidInterface);

  return solidInterface;
}

export function useSolid() {
  return inject(useSolidSymbol);
}
