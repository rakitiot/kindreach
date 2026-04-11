# Progres, flow dan instruksi

## catatan pengembangan bismillah 15 Milyar Cash
 5 prioritas:

# 1. Laman Lapor belum sepenuhnya sekuat PDF.**
Di dokumen, laporan itu harus bisa dipakai oleh **saksi maupun korban**, mendukung **bukti**, identitas pelapor tetap aman, dan laporan masuk ke **tim penanganan sekolah**. Yang paling penting buat ditambah: pilihan **“Saya saksi / Saya korban”**, upload bukti yang jelas, badge **anonim/terenkripsi**, dan **status tindak lanjut** seperti “terkirim / diverifikasi / diproses / selesai”. Itu salah satu gap terbesar yang masih terasa. 

# 2. KindBot masih perlu terasa lebih “P3K psikologis”.**
Di PDF, KindBot bukan sekadar chat biasa, tapi **pendengar anonim, non-judgmental**, untuk validasi emosi dan bantu korban lebih nyaman cerita. Jadi selain bubble chat, perlu ada quick action yang lebih spesifik kayak: **“Tenangkan diri dulu”**, **“Ceritakan kejadian”**, **“Bantu susun laporan”**, **“Hubungi guru BK”**. Itu bikin fiturnya terasa lebih sesuai dokumen. 

# 3. Cyber-Shield sudah ada, tapi nudge-nya masih bisa dibuat lebih mirip PDF.**
Di dokumen, Cyber-Shield itu intinya memberi **jeda sebelum pesan destruktif terkirim**. Jadi idealnya bukan cuma deteksi kata kasar, tapi ada state yang lebih jelas: **pesan terdeteksi → pop-up peringatan → opsi edit / kirim ulang / batalkan**. Kalau sekarang warning-nya baru informatif, next step yang paling pas memang mempertegas alur “sebelum terkirim”. 

# 4. SOS sudah jauh lebih benar, tapi perlu 1 lapisan informasi lagi.**
PDF bilang saat ancaman mendesak, user menekan SOS dan **koordinat lokasi terkini dikirim ke pihak keamanan sekolah**. Jadi setelah animasi berjalan, bagus kalau ada status yang lebih spesifik, misalnya: **“Lokasi berhasil dibagikan”**, **“Pusat bantuan sekolah menerima sinyal”**, atau daftar pihak yang menerima alert seperti **Guru BK / wali kelas / petugas keamanan**. Ini bikin narasi SOS lebih pas sama konsep PDF, bukan cuma “bantuan sedang dipanggil”. 
# 5. Pilar admin / human-in-the-loop masih perlu lebih kelihatan.**
Di SWOT PDF, ada ancaman **laporan palsu / balas dendam**, dan solusinya adalah **pengawasan manual oleh pihak sekolah**. Jadi kalau panel admin lo belum memperlihatkan **verifikasi laporan**, **prioritas kasus**, atau **review manual**, itu masih kurang satu bagian penting dari konsep aslinya. Buat prototipe, minimal ada halaman admin dengan status: **laporan baru, diverifikasi, escalated, selesai**. 

# Yang **sekunder tapi bagus kalau ditambah**:

* **Kind-Quest** perlu minimal 1 simulasi keputusan yang benar-benar playable, karena PDF bilang siswa harus memilih tindakan empatik dan dapat **Kindness Point** dari situ. 
* **Trust copy** perlu lebih tegas di area report dan KindBot: “anonim”, “aman”, “tidak menghakimi”, “hanya tim sekolah berwenang yang bisa melihat”. Itu penting karena dokumen sangat menekankan **psychological safety**. 
* **Kode akses sekolah** dan perbedaan role siswa/guru/admin sudah ada arahnya, tapi harus konsisten di semua screen, supaya flow institusi terasa utuh. 

Kalau disimpulkan jujur:
**UI/flow sekarang: 8/10**
**Kesesuaian konsep dengan PDF: 7.5–8/10**

Yang paling bikin naik ke **9/10** itu bukan ubah warna lagi, tapi beresin:
**Laman Lapor → KindBot → Admin verification**.


## Jalankan di VS Code
```bash
npm install
npm run dev
```

## Build production
```bash
npm run build
npm run preview
```

## Catatan
Login Google masih demo UI.
Tahap berikutnya bisa dihubungkan ke Firebase Auth / Google OAuth asli.
