const worker = new Worker(
  new URL("@/platform/workers/rage.js", import.meta.url)
);

export default function useEncryption() {
  async function encryptDataWithPassword(key, data) {
    worker.postMessage({
      type: "password",
      encrypt: "encrypt",
      key,
      data,
    });
  }

  async function decryptDataWithPassword(key, data) {
    worker.postMessage({
      type: "password",
      encrypt: "decrypt",
      key,
      data,
    });
  }

  async function encryptDataWithAge(key, data) {
    worker.postMessage({ type: "key", encrypt: "encrypt", key, data });
  }

  async function decryptDataWithAge(key, data) {
    worker.postMessage({ type: "key", encrypt: "decrypt", key, data });
  }

  return {
    encryptDataWithPassword,
    decryptDataWithPassword,

    encryptDataWithAge,
    decryptDataWithAge,
  };
}
