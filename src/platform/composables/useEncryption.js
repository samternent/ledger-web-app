import { shallowRef } from "vue";
import { encode } from "@/lib/ledger/utils";

export default function useEncryption() {
  async function getPasswordKey(password) {
    return window.crypto.subtle.importKey(
      "raw",
      encode(password),
      "PBKDF2",
      false,
      ["deriveKey"]
    );
  }

  function deriveKey(passwordKey, salt, keyUsage) {
    return window.crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt,
        iterations: 250000,
        hash: "SHA-256",
      },
      passwordKey,
      { name: "AES-GCM", length: 256 },
      false,
      keyUsage
    );
  }

  async function encryptData(secretData, password) {
    try {
      const salt = window.crypto.getRandomValues(new Uint8Array(16));
      const iv = window.crypto.getRandomValues(new Uint8Array(12));
      const passwordKey = await getPasswordKey(password);
      const aesKey = await deriveKey(passwordKey, salt, ["encrypt"]);

      const encryptedContent = await window.crypto.subtle.encrypt(
        {
          name: "AES-GCM",
          iv: iv,
        },
        aesKey,
        new TextEncoder().encode(secretData)
      );

      const encryptedContentArr = new Uint8Array(encryptedContent);
      let buff = new Uint8Array(
        salt.byteLength + iv.byteLength + encryptedContentArr.byteLength
      );
      buff.set(salt, 0);
      buff.set(iv, salt.byteLength);
      buff.set(encryptedContentArr, salt.byteLength + iv.byteLength);
      const base64Buff = buff_to_base64(buff);
      return base64Buff;
    } catch (e) {
      console.log(`Error - ${e}`);
      return "";
    }
  }

  const buff_to_base64 = (buff) => btoa(String.fromCharCode.apply(null, buff));

  // Convert Base64 string to ArrayBuffer
  const base64_to_buf = (b64) =>
    Uint8Array.from(atob(b64), (c) => c.charCodeAt(null));

  async function decryptData(encryptedData, password) {
    try {
      const encryptedDataBuff = base64_to_buf(encryptedData);
      const salt = encryptedDataBuff.slice(0, 16);
      const iv = encryptedDataBuff.slice(16, 16 + 12);
      const data = encryptedDataBuff.slice(16 + 12);
      const passwordKey = await getPasswordKey(password);
      const aesKey = await deriveKey(passwordKey, salt, ["decrypt"]);
      const decryptedContent = await window.crypto.subtle.decrypt(
        {
          name: "AES-GCM",
          iv: iv,
        },
        aesKey,
        data
      );
      return new TextDecoder().decode(decryptedContent);
    } catch (e) {
      console.log(`Error - ${e}`);
      return "";
    }
  }

  return {
    encryptData,
    decryptData,
  };
}
