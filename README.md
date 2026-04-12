# KindReach Prototype

Prototipe aplikasi anti-bullying untuk sekolah dengan fokus pada rasa aman, pelaporan anonim, dan tindak lanjut oleh tim sekolah.

Versi ini mempertahankan sebagian besar fitur sebagai demo interaktif, lalu menghidupkan satu flow inti secara semi-realistic:

- User mengirim laporan dari `Laman Lapor`
- Laporan tersimpan ke server lokal
- Admin melihat laporan yang sama
- Admin mengubah status laporan dan perubahan kembali terlihat di sisi user

## Flow utama

Flow `Report -> Admin` sekarang memakai backend lokal di `server/index.js`.

Jika server lokal aktif:
- daftar laporan di user dan admin diambil dari backend
- submit laporan membuat data baru di backend
- update status admin tersinkron ke backend

Jika server lokal belum aktif:
- aplikasi tetap bisa dibuka
- frontend otomatis masuk ke mode demo lokal
- laporan dan perubahan status tetap bisa disimulasikan dalam sesi berjalan

## Menjalankan proyek

### Terminal 1 - Frontend
```bash
npm install
npm run dev
```

Frontend berjalan di `http://localhost:5173`.

### Terminal 2 - Backend lokal
```bash
cd server
npm install
npm run dev
```

Backend laporan berjalan di `http://localhost:4000`.

## Cara demo flow semi-realistic

1. Jalankan frontend dan backend.
2. Buka aplikasi lalu masuk sebagai `Siswa`.
3. Kirim laporan dari tab `Lapor`.
4. Kembali ke login dan masuk sebagai `Admin Sekolah`.
5. Buka detail laporan lalu ubah status menjadi `Terverifikasi`, `Diproses`, atau `Selesai`.
6. Kembali ke sisi user untuk melihat status yang sama.

## Struktur singkat

- `src/App.jsx`: orchestrator state utama, sinkronisasi laporan, dan fallback demo
- `src/features/AppScreen.jsx`: layar user, form laporan, dan status laporan
- `src/features/AdminScreen.jsx`: dashboard admin dan update status kasus
- `src/lib/reportApi.js`: helper fetch, normalisasi data, dan fallback report
- `server/index.js`: API lokal untuk laporan
- `server/db.json`: seed data awal laporan

## Catatan

- Upload file masih berupa nama file saja, belum upload sungguhan.
- Login, akses sekolah, KindBot, Shield, dan SOS masih fokus sebagai prototipe interaktif.
- Flow `Report -> Admin` adalah bagian utama yang sekarang dibuat lebih hidup untuk demo.
