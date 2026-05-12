import { proto } from '../../WAProto/index.js';
import { generateWAMessageFromContent } from '../Utils/index.js';
import { DEFAULT_CONNECTION_CONFIG } from '../Defaults/index.js';
import { makeCommunitiesSocket } from './communities.js';

const ENGINE_NAME = 'Rull Baileys-Engine';
const ENGINE_BASE = 'WhiskeySockets/Baileys v7.0.0-rc10';

const normalizeRows = (rows = []) => rows.map(row => {
    if (Array.isArray(row)) {
        return { items: row.map(value => ({ text: String(value ?? '') })) };
    }
    if (row?.items) {
        return { items: row.items.map(item => typeof item === 'object' ? item : { text: String(item ?? '') }) };
    }
    return { items: Object.values(row || {}).map(value => ({ text: String(value ?? '') })) };
});

const attachRullHelpers = (sock) => {
    sock.engineName = ENGINE_NAME;
    sock.engineBase = ENGINE_BASE;

    sock.sendText = async (jid, text, quoted = undefined, options = {}) => {
        return sock.sendMessage(jid, { text: String(text ?? ''), ...options }, { quoted, ...options });
    };

    sock.reply = async (m, text, options = {}) => {
        const jid = m?.chat || m?.key?.remoteJid || options.jid;
        if (!jid) {
            throw new Error('sock.reply: jid/chat tidak ditemukan');
        }
        return sock.sendMessage(jid, { text: String(text ?? '') }, { quoted: m, ...options });
    };

    /**
     * Experimental AI rich response/table sender.
     * Tidak semua versi WhatsApp client menampilkan richResponseMessage.
     * Karena itu helper ini otomatis fallback ke text/table biasa kalau WA client mengabaikan payload AI.
     */
    sock.sendMessageAI = async (jid, payload = {}, quoted = undefined, options = {}) => {
        const title = payload.title || payload.heading || 'AI Response';
        const body = payload.text || payload.body || payload.caption || '';
        const rows = normalizeRows(payload.rows || []);
        const footer = payload.footer || '';
        const fallback = payload.fallback || [
            title ? `*${title}*` : '',
            body,
            rows.length ? rows.map(r => r.items.map(i => i.text).join(' | ')).join('\n') : '',
            footer
        ].filter(Boolean).join('\n\n');

        const rich = proto.Message.fromObject({
            richResponseMessage: {
                messageType: 1,
                submessages: [
                    body ? { messageType: 0, messageText: body } : undefined,
                    rows.length ? {
                        messageType: 2,
                        tableMetadata: { rows }
                    } : undefined
                ].filter(Boolean)
            }
        });

        const msg = generateWAMessageFromContent(jid, rich, {
            userJid: sock.user?.id,
            quoted,
            ...options
        });

        try {
            await sock.relayMessage(jid, msg.message, {
                messageId: msg.key.id,
                ...options
            });
            return msg;
        }
        catch (error) {
            if (options.throwOnAiError) {
                throw error;
            }
            return sock.sendMessage(jid, { text: fallback || String(body || title) }, { quoted, ...options });
        }
    };

    return sock;
};

// export the last socket layer
const makeWASocket = (config) => {
    const newConfig = {
        ...DEFAULT_CONNECTION_CONFIG,
        emitOwnEvents: true,
        markOnlineOnConnect: false,
        syncFullHistory: false,
        ...config
    };
    const sock = makeCommunitiesSocket(newConfig);
    return attachRullHelpers(sock);
};

export default makeWASocket;
//# sourceMappingURL=index.js.map
