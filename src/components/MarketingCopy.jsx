import { ShieldCheck, Smartphone, Sparkles, Star } from 'lucide-react'
import { desktopHighlights } from '../data/appData.jsx'

export default function MarketingCopy() {
  return (
    <section className="marketing-copy">
      <div className="pill">
        <Sparkles size={16} />
        <span>KindReach</span>
      </div>

      <h1>
        Platform perlindungan siswa yang memadukan <span>AI, pelaporan aman, dan edukasi interaktif</span> dalam satu pengalaman.
      </h1>

      <p>
        KindReach dirancang untuk membantu sekolah membangun ruang aman yang lebih responsif.
        Pengguna memulai dari tampilan luar perangkat, masuk ke aplikasi, memilih profil pengguna,
        lalu menjelajahi fitur inti seperti dukungan emosional, pelaporan, misi edukasi, dan respon cepat.
      </p>

      <div className="marketing-grid">
        <article>
          <Smartphone size={18} />
          <strong>Alur yang Familiar</strong>
          <span>
            Pengalaman dimulai dari home screen seperti perangkat nyata, sehingga interaksi terasa lebih natural dan mudah dipahami.
          </span>
        </article>

        <article>
          <ShieldCheck size={18} />
          <strong>Fokus pada Keamanan</strong>
          <span>
            Struktur aplikasi menempatkan perlindungan, pendampingan, dan tindak lanjut dalam alur yang sederhana dan terarah.
          </span>
        </article>

        <article>
          <Star size={18} />
          <strong>Siap Dikembangkan</strong>
          <span>
            Komponen, data, dan layout sudah dipisahkan agar lebih mudah dilanjutkan ke versi implementasi yang lebih lengkap.
          </span>
        </article>
      </div>

      <div className="desktop-detail-block">
        <div className="desktop-detail-head">
          <span className="small-caps mint">Desktop overview</span>
          <h3>Penjelasan lebih detail untuk mode PC</h3>
        </div>

        <div className="desktop-detail-list">
          {desktopHighlights.map((item) => (
            <article key={item.title} className="desktop-detail-card">
              <strong>{item.title}</strong>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}