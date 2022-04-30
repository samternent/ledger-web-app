import {
  encrypt_with_x25519,
  decrypt_with_x25519,
  encrypt_with_user_passphrase,
  decrypt_with_user_passphrase,
} from "@kanru/rage-wasm";

const methods = {
  password: {
    async encrypt(password, data) {
      try {
        const encrypted = await encrypt_with_user_passphrase(
          password,
          new TextEncoder().encode(JSON.stringify(data)),
          true
        );
        return new TextDecoder("utf-8").decode(encrypted);
      } catch (e) {
        console.error(e);
      }
    },
    async decrypt(password, data) {
      const decrypted = await decrypt_with_user_passphrase(
        password,
        new TextEncoder().encode(encryptedData)
      );

      return JSON.parse(new TextDecoder("utf-8").decode(decrypted));
    },
  },
  key: {
    async encrypt(key, data) {
      const encrypted = await encrypt_with_x25519(
        key,
        new TextEncoder().encode(JSON.stringify(data)),
        true
      );
      return encrypted;
    },
    async decrypt(key, data) {
      const decrypted = await decrypt_with_x25519(
        key,
        new TextEncoder().encode(data)
      );
      return JSON.parse(new TextDecoder("utf-8").decode(decrypted));
    },
  },
};

self.onmessage = async ({ data: { type, encrypt, key, data } }) => {
  const result = await methods[type][encrypt](key, data);
  self.postMessage(result);
};
