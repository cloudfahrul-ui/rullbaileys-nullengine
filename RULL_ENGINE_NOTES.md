# Rull Baileys-Engine rc10

Base: @whiskeysockets/baileys 7.0.0-rc10.

Custom helper yang ditambah:
- sock.engineName
- sock.engineBase
- sock.sendText(jid, text, quoted, options)
- sock.reply(m, text, options)
- sock.sendMessageAI(jid, payload, quoted, options) experimental

Catatan penting:
- richResponseMessage / AI table belum dijamin tampil di semua WhatsApp client.
- Kalau audio/video terlihat sukses tapi tidak muncul di WhatsApp biasa, cek jid LID/PN, mimetype audio, ptt, dan directPath/media upload.
- Setelah ganti engine, hapus session hanya kalau pairing bermasalah. Backup session dulu.
