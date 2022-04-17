import { shallowRef, watch, provide, inject } from "vue";
import {
  generate,
  exportPrivateKeyAsPem,
  exportPublicKeyAsPem,
  importPrivateKeyFromPem,
  importPublicKeyFromPem,
} from "@/lib/ecdsa";

export const useIdentitySymbol = Symbol("useIdentity");

export function useIdentity() {
  return inject(useIdentitySymbol);
}

export function provideIdentity() {
  const signKeyPem = shallowRef(window.localStorage.getItem("signKeyPem"));
  const verifyKeyPem = shallowRef(window.localStorage.getItem("verifyKeyPem"));

  const signKey = shallowRef(null);
  const verifyKey = shallowRef(null);

  async function createKeys() {
    const { publicKey, privateKey } = await generate();

    signKey.value = privateKey;
    verifyKey.value = publicKey;

    signKeyPem.value = await exportPrivateKeyAsPem(privateKey);
    verifyKeyPem.value = await exportPublicKeyAsPem(publicKey);
  }

  async function loadKeys() {
    signKey.value = await importPrivateKeyFromPem(signKeyPem.value);
    verifyKey.value = await importPublicKeyFromPem(verifyKeyPem.value);
  }

  if (!signKeyPem.value) {
    createKeys();
  } else if (!signKey.value) {
    loadKeys();
  }

  watch([signKeyPem, verifyKeyPem], ([_signKeyPem, _verifyKeyPem]) => {
    window.localStorage.setItem("signKeyPem", _signKeyPem);
    window.localStorage.setItem("verifyKeyPem", _verifyKeyPem);
  });

  const useIdentityInterface = {
    signKey,
    signKeyPem,
    verifyKey,
    verifyKeyPem,
  };

  provide(useIdentitySymbol, useIdentityInterface);

  return useIdentityInterface;
}
