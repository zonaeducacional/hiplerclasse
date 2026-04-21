import { useState, useEffect } from 'react';
import { gun } from '../lib/gun';
import Gun from 'gun';

export default function Meet({ alias, isMediador }) {
  const [meetingTopic, setMeetingTopic] = useState('');
  const roomName = "Hiperclasse_Salinas_Oficial"; // Fixed room name for the community

  const handleNotify = (e) => {
    e.preventDefault();
    if (!meetingTopic) return;

    // Send a global broadcast to the P2P network
    gun.get('salinas_hyperclasse_avisos').put({
      text: `📢 Encontro Síncrono Iniciado: ${meetingTopic} (Vá para Encontros Síncronos)`,
      author: alias,
      time: Gun.state()
    });

    setMeetingTopic('');
    alert("Notificação enviada para todos os usuários online!");
  };

  return (
    <div className="h-full flex flex-col p-8 animate-slide">
      <div className="mb-6 border-b border-ink pb-4">
        <h3 className="font-serif text-3xl font-bold text-[var(--color-sepia-dark)] mb-2">Encontros Síncronos</h3>
        <div className="bg-white bg-opacity-40 p-4 border-l-4 border-[var(--color-sepia-dark)] text-sm opacity-80 leading-relaxed text-justify max-w-5xl">
          <p>
            <strong>Qual a função deste espaço?</strong> Esta é a nossa praça virtual em tempo real. Quando o Círculo 
            exigir a presença simultânea (voz e vídeo), nos reunimos aqui. Baseado em tecnologia Jitsi (Open Source e livre).
          </p>
        </div>
      </div>

      {isMediador && (
        <div className="mb-6 bg-[var(--color-paper)] p-4 border border-ink sepia-shadow flex items-end gap-4">
          <div className="flex-1">
            <label className="block text-[10px] font-bold uppercase tracking-widest mb-1">Tópico do Encontro (Notificar Turma)</label>
            <input 
              type="text" 
              value={meetingTopic}
              onChange={e => setMeetingTopic(e.target.value)}
              placeholder="Ex: Debate sobre a Pesca Artesanal às 15:00"
              className="w-full bg-white border border-ink p-2 text-sm focus:outline-none"
            />
          </div>
          <button 
            onClick={handleNotify}
            className="bg-red-800 text-white px-6 py-2 text-xs font-bold uppercase tracking-widest cursor-pointer hover:bg-black transition-colors h-[38px]"
          >
            Disparar Aviso Geral
          </button>
        </div>
      )}

      <div className="flex-1 bg-black border border-ink sepia-shadow overflow-hidden">
        <iframe 
          src={`https://meet.jit.si/${roomName}`} 
          allow="camera; microphone; fullscreen; display-capture" 
          className="w-full h-full border-none"
        />
      </div>
    </div>
  );
}
