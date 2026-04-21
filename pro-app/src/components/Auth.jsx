import { useState } from 'react';
import { user } from '../lib/gun';

export default function Auth() {
  const [alias, setAlias] = useState('');
  const [pass, setPass] = useState('');
  const [category, setCategory] = useState('Estudante/Aprendiz');
  const [msg, setMsg] = useState({ text: '', isError: false });
  const [showHelp, setShowHelp] = useState(false);

  const showMsg = (text, isError = true) => {
    setMsg({ text, isError });
    setTimeout(() => setMsg({ text: '', isError: false }), 6000);
  };

  const handleRegister = () => {
    if (!alias.trim() || !pass) return showMsg("Defina um Nome de Usuário e uma Chave.");
    if (pass.length < 8) return showMsg("A chave de acesso deve ter pelo menos 8 caracteres.");
    
    user.create(alias, pass, (ack) => {
      if (ack.err) return showMsg("Erro: " + ack.err);
      showMsg("Cadastro realizado! Sincronizando perfil...", false);
      user.auth(alias, pass, (authAck) => {
        if (!authAck.err) {
          user.get('profile').put({ category }, (putAck) => {
            if (!putAck.err) window.location.reload();
          });
        }
      });
    });
  };

  const handleLogin = () => {
    if (!alias.trim() || !pass) return showMsg("Preencha os campos.");
    user.auth(alias, pass, (ack) => {
      if (ack.err) showMsg("Chave incorreta ou Nome de Usuário não encontrado.");
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--color-paper)] bg-opacity-98">
      <div className="max-w-md w-full glass-sepia p-10 rounded-sm sepia-shadow text-center relative max-h-[90vh] overflow-y-auto">
        <h1 className="text-5xl font-serif font-bold text-[var(--color-sepia-dark)] mb-2 tracking-tight">HIPERCLASSE</h1>
        <p className="text-[10px] text-[var(--color-sepia-dark)] opacity-60 tracking-[0.3em] uppercase mb-6">Territórios de aprendizagens • Rede P2P</p>
        
        <button 
          onClick={() => setShowHelp(!showHelp)}
          className="text-xs font-bold text-[var(--color-accent)] hover:text-[var(--color-sepia-dark)] underline mb-6 cursor-pointer"
        >
          Primeira vez aqui? Clique para entender o acesso.
        </button>

        {showHelp && (
          <div className="bg-white bg-opacity-40 border border-ink p-4 mb-8 text-left sepia-shadow animate-slide">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-red-900 mb-2 border-b border-ink pb-1">📚 Como Acessar a Rede</h2>
            <ul className="text-xs space-y-2 opacity-80 leading-relaxed">
              <li><strong>Primeira vez?</strong> Crie um Nome de Usuário, uma Chave segura (mín. 8 caracteres), <strong>escolha o seu Vínculo</strong> (qualquer um, exceto Mediador/Desenvolvedor) e clique em <span className="font-bold">CADASTRAR</span>.</li>
              <li><strong>Já tem cadastro?</strong> Digite exatamente o seu Nome de Usuário e a sua Chave e clique em <span className="font-bold">ENTRAR</span>.</li>
              <li className="text-red-900 mt-2 p-2 bg-red-50 border border-red-200">
                ⚠️ <strong>Atenção:</strong> Por ser uma rede livre e descentralizada, <strong>não existe botão de "Esqueci a Senha"</strong>. Anote sua chave com cuidado!
              </li>
            </ul>
          </div>
        )}

        <div className="h-px w-full bg-[var(--color-sepia-dark)] opacity-10 mb-8"></div>

        <div className="space-y-5 text-left">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest mb-1 opacity-50">Nome de Usuário</label>
            <input 
              type="text" 
              value={alias} onChange={e => setAlias(e.target.value)}
              className="w-full bg-white bg-opacity-40 border border-ink p-3 focus:outline-none focus:border-[var(--color-sepia-dark)] transition-all rounded-none" 
              placeholder="Ex: Sergio_Pedagogo" 
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest mb-1 opacity-50">Chave de Acesso</label>
            <input 
              type="password" 
              value={pass} onChange={e => setPass(e.target.value)}
              className="w-full bg-white bg-opacity-40 border border-ink p-3 focus:outline-none focus:border-[var(--color-sepia-dark)] transition-all rounded-none" 
              placeholder="••••••••" 
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest mb-1 opacity-50">Categoria / Vínculo</label>
            <select 
              value={category} onChange={e => setCategory(e.target.value)}
              className="w-full bg-white bg-opacity-40 border border-ink p-3 focus:outline-none focus:border-[var(--color-sepia-dark)] transition-all rounded-none text-sm"
            >
              <option value="Estudante/Aprendiz">Estudante / Aprendiz</option>
              <option value="Mediador-Desenvolvedor">Mediador / Desenvolvedor</option>
              <option value="Pesquisador Local">Pesquisador Local</option>
              <option value="Comunidade">Membro da Comunidade</option>
            </select>
          </div>
          <div className="flex gap-4 pt-4">
            <button onClick={handleLogin} className="flex-1 bg-[var(--color-sepia-dark)] text-white py-4 font-bold hover:bg-black transition-all uppercase text-xs tracking-widest cursor-pointer">Entrar</button>
            <button onClick={handleRegister} className="flex-1 border border-[var(--color-sepia-dark)] text-[var(--color-sepia-dark)] py-4 font-bold hover:bg-[var(--color-sepia-dark)] hover:text-white transition-all uppercase text-xs tracking-widest cursor-pointer">Cadastrar</button>
          </div>
        </div>
        
        {msg.text && (
          <p className={`mt-6 text-xs font-medium ${msg.isError ? 'text-red-800' : 'text-green-800'}`}>
            {msg.text}
          </p>
        )}

        <div className="mt-12 opacity-30 italic text-[11px] font-serif">
          "A educação é um ato de amor, por isso, um ato de coragem." — Paulo Freire
        </div>
      </div>
    </div>
  );
}
