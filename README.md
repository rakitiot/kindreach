

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

## Catatan update per revisi 11 april
- tata ulang layout di beberapa bagian agar lebih rapi, pas di frame HP, dan lebih konsisten di berbagai browser
- KindQuest diubah menjadi simulasi skenario tentang apa yang sebaiknya dilakukan saat terjadi kejadian tertentu
- profil diubah menjadi halaman KindQuest yang berisi peta misi/quest
- ringkasan profil dan poin dipindahkan ke halaman utama
- streak dihapus karena kurang sesuai dengan konteks penilaian aplikasi
- ditambahkan diagram batang untuk membandingkan perolehan poin harian agar progres lebih mudah dibaca
- SOS dibuat selalu tersedia dalam bentuk bubble, termasuk saat berada di luar aplikasi
- flow login dan registrasi institusi dibuat lebih realistis sesuai konteks sekolah
- flow laporan dibuat lebih hidup, sehingga laporan dari user bisa muncul dan diproses di sisi staf/admin
- dashboard staf dirapikan, dengan pembedaan hak aksi antara Guru BK dan Admin Sekolah
- transisi antar halaman dan antar fitur dibuat lebih smooth agar pengalaman aplikasi terasa lebih halus

1. yg hijau, space kosong disitu tu kaya kurang aja gitu, mungkin bisa ditambah apa ya garis garis atau bentuk apa gitu biar ga kosong?.. 
2. yg merah, what if ikon nya kaya pintu kebuka? (gambar 2)
3. kalo yg ungu tulisannya keep your health mental aja?
