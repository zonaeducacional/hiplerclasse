import { useEffect, useState, useRef } from 'react';
import { gun } from '../lib/gun';
import { useGunCollection } from '../hooks/useGun';
import Gun from 'gun';

export default function Rodas({ alias, isMediador }) {
  const allThemes = useGunCollection('salinas_hyperclasse_temas_v4');
  const [activeTheme, setActiveTheme] = useState(null);
  
  // Filtra temas aprovados ou se for mediador vê tudo
  const themes = allThemes.filter(t => t.title && (t.approved || isMediador));
  
  const messages = useGunCollection(activeTheme ? 'salinas_chat_v4_' + activeTheme.id : null);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  // Ordena mensagens por tempo (o hook retorna sem ordem fixa)
  const sortedMessages = [...messages].sort((a, b) => a.when - b.when);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sortedMessages]);


  const handleAddTheme = () => {
    const title = prompt("Sugira um Tema para o Círculo de Diálogo:");
    if (!title) return;
    gun.get('salinas_hyperclasse_temas_v4').get(Gun.text.random(8)).put({
      title,
      creator: alias,
      approved: isMediador,
      when: Gun.state()
    });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim() || !activeTheme) return;
    
    gun.get('salinas_chat_v4_' + activeTheme.id).set({
      who: alias,
      text: inputText,
      when: Gun.state()
    });
    
    setInputText('');
  };

  const deleteTheme = (e, id) => {
    e.stopPropagation();
    gun.get('salinas_hyperclasse_temas_v4').get(id).put(null);
    if (activeTheme?.id === id) setActiveTheme(null);
  };


  const approveTheme = (e, id) => {
    e.stopPropagation();
    gun.get('salinas_hyperclasse_temas_v4').get(id).put({ approved: true });
  };

  return (
    <div className="h-full flex flex-col overflow-hidden animate-slide">
      
      {/* Cabeçalho Pedagógico */}
      <div className="p-8 pb-4 border-b border-ink bg-[var(--color-paper)]">
        <h3 className="font-serif text-3xl font-bold text-[var(--color-sepia-dark)] mb-2">Círculos de Diálogo Paulo Freire</h3>
        <div className="bg-white bg-opacity-40 p-4 border-l-4 border-[var(--color-sepia-dark)] text-sm opacity-80 leading-relaxed text-justify max-w-5xl">
          <p>
            <strong>Qual a função deste espaço?</strong> Inspirado na pedagogia de Paulo Freire, este não é um "chat" comum. 
            É um espaço de escuta ativa e debate horizontal onde nenhum saber é maior que o outro. Os participantes dialogam
            sobre temas específicos para construir juntos uma compreensão crítica da nossa realidade e do nosso território.
          </p>
        </div>
      </div>

      {/* Área Principal */}
      <div className="flex-1 flex overflow-hidden">
        <div className="w-64 border-r border-ink flex flex-col bg-white bg-opacity-30">
          <div className="p-4 border-b border-ink flex justify-between items-center">
            <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-50">Temas</h4>
          <button onClick={handleAddTheme} className="p-1 hover:bg-[var(--color-sepia-light)] rounded transition-colors cursor-pointer" title="Sugerir Tema">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {themes.length === 0 ? (
            <div className="p-4 text-[10px] italic opacity-30 text-center">Nenhum tema ativo.</div>
          ) : (
            themes.map(theme => (
              <div 
                key={theme.id}
                onClick={() => setActiveTheme(theme)}
                className={`p-4 border-b border-ink cursor-pointer hover:bg-white transition-all flex flex-col gap-1 ${activeTheme?.id === theme.id ? 'bg-white' : ''}`}
              >
                <div className="flex justify-between items-start">
                  <span className="font-bold text-xs">
                    {theme.title} {!theme.approved && <span className="text-[8px] bg-red-100 text-red-800 px-1 rounded ml-1">Pendente</span>}
                  </span>
                  {isMediador && <button onClick={(e) => deleteTheme(e, theme.id)} className="text-red-400 hover:text-red-700">×</button>}
                </div>
                <span className="text-[9px] opacity-40 uppercase tracking-tighter">Por {theme.creator}</span>
                {isMediador && !theme.approved && (
                  <button onClick={(e) => approveTheme(e, theme.id)} className="text-[9px] font-bold text-green-700 mt-2 text-left cursor-pointer">[APROVAR]</button>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col relative">
        <div className="p-4 border-b border-ink glass-sepia">
          <h4 className="font-serif font-bold text-lg">{activeTheme ? activeTheme.title : 'Selecione um Tema'}</h4>
          <p className="text-[10px] opacity-50 uppercase tracking-tighter">
            {activeTheme ? `Círculo iniciado por ${activeTheme.creator}` : 'Escolha um círculo de diálogo ao lado'}
          </p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-2 scroll-smooth bg-white bg-opacity-10">
          {!activeTheme ? (
            <div className="text-center py-10 opacity-30 italic text-sm">Aguardando seleção de tema...</div>
          ) : sortedMessages.length === 0 ? (
            <div className="text-center py-10 opacity-30 italic text-sm">Nenhuma mensagem ainda. Seja o primeiro!</div>
          ) : (
            sortedMessages.map(msg => {
              const isMine = msg.who === alias;
              const time = new Date(msg.when).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

              return (
                <div key={msg.id} className={`flex flex-col ${isMine ? 'items-end' : 'items-start'} animate-fadeIn`}>
                  <div className="flex items-center gap-2 mb-1 px-2">
                    <span className="text-[9px] font-bold uppercase tracking-widest opacity-40">{msg.who}</span>
                    <span className="text-[8px] opacity-20">{time}</span>
                  </div>
                  <div className={`message-bubble ${isMine ? 'message-mine' : 'message-others'} text-sm`}>
                    {msg.text}
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {activeTheme && (
          <div className="p-6 bg-[var(--color-paper)] border-t border-ink">
            <form onSubmit={handleSendMessage} className="flex gap-4 max-w-5xl mx-auto">
              <input 
                type="text" 
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                className="flex-1 bg-white border border-ink px-6 py-4 focus:outline-none focus:border-[var(--color-sepia-dark)] text-sm rounded-none shadow-inner" 
                placeholder="Contribua com o diálogo..." 
              />
              <button type="submit" className="bg-[var(--color-sepia-dark)] text-white px-10 py-4 font-bold uppercase text-xs tracking-widest hover:bg-black transition-all cursor-pointer">Enviar</button>
            </form>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
