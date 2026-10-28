# Video: Lahirnya Ilmu Nahwu (Remotion, 9:16, 1080x1920, 30 FPS)

## Render di GitHub
1. Buat repo baru, unggah **seluruh isi folder ini** (termasuk folder `.github`, `public`, dan `package-lock.json`).
2. Buka tab **Actions** → **Render video Nahwu** → **Run workflow**.
3. Setelah selesai, unduh `nahwu-mp4` dari bagian **Artifacts**.

## Render lokal
```
npm ci
npm run dev      # pratinjau di Remotion Studio
npm run render   # hasil: out/nahwu.mp4
```

## Berkas penting
- `public/voiceover.wav` — suara asli Anda (jangan diganti nama).
- `src/timing.ts` — waktu klausa/kata, dihasilkan `scripts/make-timing.py` dari jeda suara.
- `scripts/make-sfx.sh` — pembuat SFX dan backsound sintetis (bebas hak cipta).
- `src/scenes/` — 11 adegan + slide Sumber (3,5 detik setelah suara selesai).

## Menyetel sinkronisasi
Subtitle dan pergantian adegan dihitung dari jeda suara, bukan transkripsi per kata. Jika ada yang meleset,
ubah angka `s`/`e` pada `CLAUSES` di `src/timing.ts` (satuan detik), atau jalankan ulang `npm run timing`.

## Efek sinematik (v2)
Bingkai emas yang menggambar diri, pola geometri Islami berparalaks, bokeh dan debu emas berlapis (belakang/depan),
teks emas gradien berkilau, transisi blur + sapuan cahaya, percikan cahaya dan lens streak di momen kunci,
gerak kamera halus, gradasi warna teal-oranye, butiran film, dan vinyet.
Render v2 lebih berat dari v1; di GitHub Actions perkirakan 20–45 menit.
