# Uji Kecepatan Jaringan

UI purple minimalist untuk mengukur ping, kecepatan unduh, dan kecepatan unggah — jalan langsung di browser, tanpa instalasi.

## Struktur

```
index.html        -> halaman utama (UI)
api/ping.js        -> endpoint ukur ping (latency)
api/download.js    -> endpoint ukur kecepatan unduh
api/upload.js       -> endpoint ukur kecepatan unggah
```

## Cara Deploy ke Vercel

1. Buat repo baru (GitHub/GitLab/Bitbucket), lalu push semua file di folder ini ke repo tersebut.
2. Buka https://vercel.com -> **Add New Project** -> import repo tadi.
3. Vercel otomatis mendeteksi folder `api/` sebagai Serverless Functions dan `index.html` sebagai halaman statis. Tidak perlu setting build command apa pun — langsung **Deploy**.
4. Setelah selesai, buka URL yang diberikan Vercel, tekan tombol **Mulai Uji**.

## Cara Coba Lokal (opsional)

Kalau punya Vercel CLI:

```bash
npm i -g vercel
vercel dev
```

Lalu buka `http://localhost:3000`.

## Catatan

- Ukuran file uji unduh: 8MB, uji unggah: 4MB (bisa diubah di `index.html`, cari variabel `size`).
- Ping dihitung dari 8 kali request ke `/api/ping`, 2 request pertama dibuang sebagai pemanasan koneksi.
- Data unduh dibuat acak (random) di server supaya tidak dikompresi otomatis, agar hasil ukur lebih akurat.
