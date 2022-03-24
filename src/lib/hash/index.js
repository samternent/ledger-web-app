// Encode JSON object to UTF-8 Buffer
export const encode = (data) => new TextEncoder().encode(JSON.stringify(data));

export const decode = (data) =>
  new TextDecoder("utf-8").decode(new Uint8Array(data));

export const getHashBuffer = (data) =>
  crypto.subtle.digest("SHA-256", encode(data));

export const getHashArray = (hash) => Array.from(new Uint8Array(hash));

export const getHashHex = (hash) =>
  hash.map((buf) => buf.toString(16)).join("");

export async function hashData(data) {
  const hash_buffer = await getHashBuffer(data);
  const hash_array = getHashArray(hash_buffer);
  return getHashHex(hash_array);
}
