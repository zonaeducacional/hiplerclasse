import { LogOut } from 'lucide-react';
import { user } from '../lib/gun';

export default function Layout({ children, authState, activeView, setActiveView }) {
  const handleLogout = () => {
    user.leave();
    window.location.reload();
  };

  const NavItem = ({ id, label, color = "bg-[var(--color-accent)]" }) => (
    <button 
      onClick={() => setActiveView(id)}
      className={`w-full text-left p-3 text-sm font-semibold hover:bg-white transition-all flex items-center gap-3 cursor-pointer ${activeView === id ? 'bg-[var(--color-sepia-dark)] text-[var(--color-paper)]' : ''}`}
    >
      <span className={`w-2 h-2 rounded-full ${color}`}></span> {label}
    </button>
  );

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <header className="h-20 glass-sepia border-b border-ink flex items-center justify-between px-8 z-40">
        <div className="flex items-center gap-6">
          <div className="text-[var(--color-sepia-dark)]">
            <h2 className="font-serif text-3xl font-bold leading-none">Hiperclasse</h2>
            <p className="text-[9px] uppercase tracking-widest opacity-60 mt-1">Territórios de aprendizagens</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right hidden md:block">
            <p className="text-xs font-bold text-[var(--color-sepia-dark)]">{authState.alias}</p>
            <p className="text-[9px] uppercase tracking-tighter opacity-40">{authState.category}</p>
          </div>
          <button onClick={handleLogout} className="p-2 border border-ink hover:bg-red-50 transition-colors cursor-pointer">
            <LogOut size={20} className="opacity-40" />
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <nav className="w-64 border-r border-ink bg-[var(--color-paper)] flex flex-col z-30">
          <div className="p-6 space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-30 mb-4 px-2">Navegação Crítica</p>
            <NavItem id="manifesto" label="PPP" />
            <NavItem id="circulos" label="Círculos de Diálogo Paulo Freire" />
            <NavItem id="meet" label="Encontros Síncronos (Jitsi)" color="bg-red-800" />
            <NavItem id="acervo" label="Biblioteca Anísio Teixeira" />
            <NavItem id="producao" label="Hipersala Vygotsky" />
            <NavItem id="faq" label="Guia do Círculo & Termos" color="bg-blue-800" />
            
            {authState.isMediador && (
              <div className="mt-4 pt-4 border-t border-ink">
                <NavItem id="admin" label="Painel do Mediador" color="bg-red-800" />
              </div>
            )}
          </div>
          <div className="mt-auto p-6">
            <div className="mt-4 flex items-center gap-2 opacity-30">
              <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
              <span className="text-[9px] font-bold uppercase tracking-tighter">Sincronizado P2P</span>
            </div>
          </div>
        </nav>
        <main className="flex-1 relative overflow-hidden bg-white bg-opacity-10">
          {children}
        </main>
      </div>
    </div>
  );
}
