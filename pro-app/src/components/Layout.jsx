import { useState } from 'react';
import { LogOut, Menu, X } from 'lucide-react';
import { user } from '../lib/gun';

export default function Layout({ children, authState, activeView, setActiveView }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    user.leave();
    window.location.reload();
  };

  const handleNavClick = (id) => {
    setActiveView(id);
    setIsMenuOpen(false);
  };

  const NavItem = ({ id, label, color = "bg-[var(--color-accent)]" }) => (
    <button 
      onClick={() => handleNavClick(id)}
      className={`w-full text-left p-3 text-sm font-semibold hover:bg-white transition-all flex items-center gap-3 cursor-pointer ${activeView === id ? 'bg-[var(--color-sepia-dark)] text-[var(--color-paper)]' : ''}`}
    >
      <span className={`w-2 h-2 rounded-full min-w-[8px] ${color}`}></span> {label}
    </button>
  );

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <header className="h-20 glass-sepia border-b border-ink flex items-center justify-between px-4 md:px-8 z-40">
        <div className="flex items-center gap-3 md:gap-6">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-[var(--color-sepia-dark)]">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="text-[var(--color-sepia-dark)]">
            <h2 className="font-serif text-2xl md:text-3xl font-bold leading-none">Hiperclasse</h2>
            <p className="text-[8px] md:text-[9px] uppercase tracking-widest opacity-60 mt-1">Territórios de aprendizagens</p>
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

      <div className="flex-1 flex overflow-hidden relative">
        {/* Overlay for mobile */}
        {isMenuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          ></div>
        )}
        
        <nav className={`w-64 border-r border-ink bg-[var(--color-paper)] flex flex-col absolute md:relative z-30 h-full transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
          <div className="p-4 md:p-6 space-y-1 overflow-y-auto">
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
          <div className="mt-auto p-4 md:p-6">
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
