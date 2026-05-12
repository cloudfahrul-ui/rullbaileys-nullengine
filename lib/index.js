import makeWASocket from './Socket/index.js';

const banner = process?.env?.RULL_BAILEYS_BANNER === '0' ? false : true;
if (banner) {
    console.log('════════════════════════════════════════════════════');
    console.log('🚀 Rull Baileys-Engine');
    console.log('• Base: WhiskeySockets/Baileys v7.0.0-rc10');
    console.log('• Custom: sendText, reply, sendMessageAI experimental');
    console.log('════════════════════════════════════════════════════');
}

export * from '../WAProto/index.js';
export * from './Utils/index.js';
export * from './Types/index.js';
export * from './Defaults/index.js';
export * from './WABinary/index.js';
export * from './WAM/index.js';
export * from './WAUSync/index.js';
export { makeWASocket };
export default makeWASocket;
//# sourceMappingURL=index.js.map
