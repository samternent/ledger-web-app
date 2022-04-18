import {
  encrypt_with_x25519,
  decrypt_with_x25519,
  encrypt_with_user_passphrase,
  decrypt_with_user_passphrase,
} from "@kanru/rage-wasm";

export default function useEncryption() {
  async function encryptDataWithPassword(password, secretData) {
    try {
      const encrypted = await encrypt_with_user_passphrase(
        password,
        new TextEncoder().encode(JSON.stringify(secretData)),
        true
      );
      return new TextDecoder("utf-8").decode(encrypted);
    } catch (e) {
      console.error(e);
    }
  }

  async function decryptDataWithPassword(password, encryptedData) {
    const decrypted = await decrypt_with_user_passphrase(
      password,
      new TextEncoder().encode(encryptedData)
    );

    return JSON.parse(new TextDecoder("utf-8").decode(decrypted));
  }

  async function encryptDataWithAge(publicKey, secretData) {
    const encrypted = await encrypt_with_x25519(
      publicKey,
      new TextEncoder().encode(JSON.stringify(secretData)),
      true
    );
    return encrypted;
  }

  async function decryptDataWithAge(privateKey, encryptedData) {
    const decrypted = await decrypt_with_x25519(
      privateKey,
      new TextEncoder().encode(encryptedData)
    );
    return JSON.parse(new TextDecoder("utf-8").decode(decrypted));
  }

  return {
    encryptDataWithPassword,
    decryptDataWithPassword,

    encryptDataWithAge,
    decryptDataWithAge,
  };
}
