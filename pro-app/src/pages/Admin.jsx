import { useEffect, useState } from 'react';
import { gun } from '../lib/gun';
import Gun from 'gun';

export default function Admin() {
  const [pendingThemes, setPendingThemes] = useState([]);
  const [docForm, setDocForm] = useState({ title: '', source: '', desc: '', link: '', image: '' });

  useEffect(() => {
    const themesNode = gun.get('salinas_hyperclasse_temas_v4');
    
    themesNode.map().on((data, id) => {
      if (!data) {
        setPendingThemes(prev => prev.filter(t => t.id !== id));
        return;
      }
      
      if (!data.approved) {
        setPendingThemes(prev => {
          if (prev.find(t => t.id === id)) return prev;
          return [...prev, { ...data, id }];
        });
      } else {
        setPendingThemes(prev => prev.filter(t => t.id !== id));
      }
    });

    return () => themesNode.off();
  }, []);

  const handleApproveTheme = (id) => {
    gun.get('salinas_hyperclasse_temas_v4').get(id).put({ approved: true });
  };

  const handleRejectTheme = (id) => {
    gun.get('salinas_hyperclasse_temas_v4').get(id).put(null);
  };

  const handleAddDoc = (e) => {
    e.preventDefault();
    if (!docForm.title) return;

    gun.get('salinas_hyperclasse_biblioteca_v4').get(Gun.text.random(8)).put({
      ...docForm,
      when: Gun.state()
    });

    setDocForm({ title: '', source: '', desc: '', link: '', image: '' });
    alert("Documento inserido na Biblioteca Anísio Teixeira!");
  };

  return (
    <div className="h-full overflow-y-auto p-12 flex-col bg-white bg-opacity-40 animate-slide">
      <div className="mb-10">
        <h3 className="font-serif text-4xl font-bold text-red-900">Painel do Mediador</h3>
        <p className="text-xs uppercase tracking-widest opacity-60">Gestão Pedagógica e Curadoria de Conteúdo (P2P)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Manage Library */}
        <div className="space-y-6">
          <h4 className="text-sm font-bold uppercase tracking-widest border-b border-ink pb-2">Curadoria da Biblioteca</h4>
          <form onSubmit={handleAddDoc} className="space-y-4 bg-[var(--color-paper)] p-6 border border-ink sepia-shadow">
            <div>
              <label className="block text-[10px] font-bold uppercase mb-1">Título do Documento</label>
              <input 
                type="text" 
                value={docForm.title} onChange={e => setDocForm({...docForm, title: e.target.value})}
                className="w-full border border-ink p-2 text-sm bg-white focus:outline-none focus:border-[var(--color-sepia-dark)]" 
                required 
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-[10px] font-bold uppercase mb-1">Origem / Acervo</label>
                <input 
                  type="text" 
                  value={docForm.source} onChange={e => setDocForm({...docForm, source: e.target.value})}
                  className="w-full border border-ink p-2 text-sm bg-white focus:outline-none focus:border-[var(--color-sepia-dark)]" 
                  placeholder="Ex: Domínio Público" 
                />
              </div>
              <div className="flex-1">
                <label className="block text-[10px] font-bold uppercase mb-1">Link de Acesso</label>
                <input 
                  type="url" 
                  value={docForm.link} onChange={e => setDocForm({...docForm, link: e.target.value})}
                  className="w-full border border-ink p-2 text-sm bg-white focus:outline-none focus:border-[var(--color-sepia-dark)]" 
                  placeholder="https://..." 
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase mb-1">URL da Imagem da Capa (Opcional)</label>
              <input 
                type="url" 
                value={docForm.image} onChange={e => setDocForm({...docForm, image: e.target.value})}
                className="w-full border border-ink p-2 text-sm bg-white focus:outline-none focus:border-[var(--color-sepia-dark)]" 
                placeholder="https://link-da-imagem.jpg" 
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase mb-1">Descrição</label>
              <textarea 
                value={docForm.desc} onChange={e => setDocForm({...docForm, desc: e.target.value})}
                className="w-full border border-ink p-2 text-sm bg-white h-20 resize-none focus:outline-none focus:border-[var(--color-sepia-dark)]" 
                placeholder="Breve resumo sobre a obra..."
              />
            </div>
            <button type="submit" className="w-full bg-[var(--color-sepia-dark)] text-white py-3 text-xs font-bold uppercase tracking-widest hover:bg-black transition-colors cursor-pointer">
              Adicionar ao Acervo
            </button>
          </form>
        </div>

        {/* Moderation Queue */}
        <div className="space-y-6">
          <h4 className="text-sm font-bold uppercase tracking-widest border-b border-ink pb-2 text-red-800">Fila de Moderação (Temas)</h4>
          <div className="space-y-3">
            {pendingThemes.length === 0 ? (
              <p className="text-xs italic opacity-40">Nenhuma solicitação pendente.</p>
            ) : (
              pendingThemes.map(theme => (
                <div key={theme.id} className="p-4 bg-white border border-ink flex justify-between items-center shadow-sm">
                  <div>
                    <p className="text-sm font-bold">{theme.title}</p>
                    <p className="text-[9px] opacity-50 uppercase mt-1">Sugerido por {theme.creator}</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleApproveTheme(theme.id)}
                      className="bg-green-700 hover:bg-green-800 text-white p-2 rounded cursor-pointer transition-colors"
                      title="Aprovar Tema"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => handleRejectTheme(theme.id)}
                      className="bg-red-700 hover:bg-red-800 text-white p-2 rounded cursor-pointer transition-colors"
                      title="Rejeitar Tema"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
}
