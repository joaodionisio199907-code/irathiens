import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black text-slate-200">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/eventos" element={<Page title="Eventos" />} />
          <Route path="/miembros" element={<Page title="Miembros" />} />
          <Route path="/guias" element={<Page title="Guías" />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

function Header() {
  return (
    <header className="border-b border-orange-900 bg-black/80 backdrop-blur">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-5">
        <div className="flex items-center gap-3">
          <img src="/logo.png" className="h-9"/>
          <span className="font-orbitron text-orange-400 tracking-widest">IRATHIENS</span>
        </div>
        <nav className="space-x-6 text-slate-400">
          <Link to="/">Inicio</Link>
          <Link to="/eventos">Eventos</Link>
          <Link to="/miembros">Miembros</Link>
          <Link to="/guias">Guías</Link>
        </nav>
      </div>
    </header>
  )
}

function Home() {
  return (
    <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 p-10 py-24">
      <div>
        <h1 className="font-orbitron text-4xl text-orange-300 mb-6">
          Forjando alianzas en el verso
        </h1>
        <p className="text-slate-400 mb-8">
          Organización élite de Star Citizen centrada en disciplina y cooperación.
        </p>
      </div>
      <div className="border border-orange-900 rounded-xl p-6 bg-gradient-to-b from-[#0d0f14] to-black">
        <p>✔ Activa · ✔ Organizada · ✔ En expansión</p>
      </div>
    </section>
  )
}

function Page({ title }) {
  return (
    <section className="max-w-3xl mx-auto p-10 py-24">
      <h1 className="font-orbitron text-3xl text-orange-300 mb-6">{title}</h1>
      <div className="border border-orange-900 rounded-xl p-6 bg-gradient-to-b from-[#0d0f14] to-black">
        Contenido próximamente
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="text-center text-slate-500 py-10 border-t border-orange-900">
      © 2025 Irathiens
    </footer>
  )
}