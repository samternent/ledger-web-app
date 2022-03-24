import { ref, reactive, computed } from "vue";
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

export default ({ identity: _identity, secret: _secret }) => {
  function solidLogin() {
    login({
      oidcIssuer: oidcIssuer.value,
      clientName: "concords.app",
    });
  }

  async function solidFetch(name, id) {
    try {
      console.log(workspace);
      const file = await getFile(
        `${workspace.value}concords/${name}/${id}.json`,
        {
          fetch: fetch,
        }
      );

      return new Promise((res, rej) => {
        async function onLoadFileHandler(e) {
          store[name] = {
            ...store[name],
            [id]: JSON.parse(e.target.result),
          };

          const arr = id.split("");
          const half = Math.floor(arr.length / 2);
          res({
            identity: {
              x: arr.splice(0, half).join(""),
              y: arr.splice(-half).join(""),
            },
            ...JSON.parse(e.target.result),
          });
        }
        let fr = new FileReader();
        fr.onload = onLoadFileHandler;
        fr.readAsText(file);
      });
    } catch (e) {
      throw e;
    }
  }

  async function solidWrite(name, type, details) {
    const file = new File([JSON.stringify(details)], `${name}.json`, {
      type: "application/json",
    });
    await overwriteFile(
      `${workspace.value}concords/${type}/${name}.json`,
      file,
      {
        contentType: file.type,
        fetch: fetch,
      }
    );
  }

  onSessionRestore((url) => {
    console.log(url);
  });

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

  return {
    login: solidLogin,
    hasSolidSession,
    fetch: solidFetch,
    write: solidWrite,
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
};
