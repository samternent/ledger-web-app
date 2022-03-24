import { shallowRef, watch, provide, inject } from "vue";
import { generateKey } from "openpgp";

export const useIdentitySymbol = Symbol("useIdentity");

export function useIdentity() {
  return inject(useIdentitySymbol);
}

export function provideIdentity({
  privateKey: _privateKey,
  publicKey: _publicKey,
  revocationCertificate: _revocationCertificate,
} = {}) {
  const privateKey = shallowRef(_privateKey);
  const publicKey = shallowRef(_publicKey);
  const revocationCertificate = shallowRef(_revocationCertificate);

  async function createKeys() {
    const {
      privateKey: prk,
      publicKey: pbk,
      revocationCertificate: rcert,
    } = await generateKey({
      type: "ecc",
      curve: "curve25519",
      userIDs: [{ name: "Guest", email: "guest@concords.app" }],
      passphrase: "password1",
      format: "armored",
    });

    privateKey.value = prk;
    publicKey.value = pbk;
    revocationCertificate.value = rcert;
  }

  if (!privateKey.value) {
    createKeys();
  }

  watch([privateKey, publicKey], (_privateKey, _publicKey) => {
    window.localStorage.setItem("privateKey", _privateKey);
    window.localStorage.setItem("publicKey", _publicKey);
  });

  const useIdentityInterface = {
    publicKey,
    privateKey,
  };

  provide(useIdentitySymbol, useIdentityInterface);

  return useIdentityInterface;
}
