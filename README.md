## Menjalankan proyek
### Terminal 1 - Frontend
```bash
npm install
npm run dev
```
### Terminal 2 - Backend lokal
```bash
cd server
npm install
npm run dev

```
## GitHub
link https://github.com/rakitiot/kindreach.git
1. git init
2. git add .
3. git commit -m "first commit"
4. git remote add origin https://github.com/rakitiot/kindreach.git
5. git remote -v
6. git branch -M main
7. git push -u origin main
UPDATE
1. git add .
2. git commit -m "update project"
3. git push


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
