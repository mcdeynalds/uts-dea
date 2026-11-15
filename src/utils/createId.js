// IDs for browser-local records; supports HTTP LAN previews as well as HTTPS.
let sequence = 0;
export const createId = () => {
  if (typeof globalThis.crypto?.randomUUID === 'function') {
    return globalThis.crypto.randomUUID();
  }
  sequence += 1;
  const prefix = `${Date.now().toString(36)}-${sequence.toString(36)}`;
  if (typeof globalThis.crypto?.getRandomValues === 'function') {
    const values = globalThis.crypto.getRandomValues(new Uint32Array(4));
    return `${prefix}-${Array.from(values, value => value.toString(36)).join('-')}`;
  }
  return `${prefix}-${Math.random().toString(36).slice(2)}`;
};
