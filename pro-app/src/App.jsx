import { useEffect, useState } from 'react';
import { gun, user } from './lib/gun';
import Auth from './components/Auth';
import Layout from './components/Layout';
import Manifesto from './pages/Manifesto';
import Rodas from './pages/Rodas';
import Biblioteca from './pages/Biblioteca';
import Laboratorio from './pages/Laboratorio';
import Admin from './pages/Admin';
import Faq from './pages/Faq';
import Meet from './pages/Meet';

function App() {
  const [authState, setAuthState] = useState({
    isAuth: false,
    alias: '',
    category: '',
    isMediador: false
  });
  const [activeView, setActiveView] = useState('manifesto');
  const [globalNotification, setGlobalNotification] = useState(null);

  useEffect(() => {
    // Escutando as notificações globais (Avisos do Mediador)
    const avisosNode = gun.get('salinas_hyperclasse_avisos');
    avisosNode.on((data) => {
      if (!data || !data.text) return;
      const now = new Date().getTime();
      if (now - data.time < 300000) { // Mostra apenas se o aviso tem menos de 5 minutos
        setGlobalNotification(data);
        setTimeout(() => setGlobalNotification(null), 10000);
      }
    });
    return () => avisosNode.off();
  }, []);

  useEffect(() => {
    gun.on('auth', async () => {
      const alias = await user.get('alias').then();
      
      user.get('profile').once((profile) => {
        const category = profile ? profile.category : 'Participante';
        const isMediador = category === 'Mediador-Desenvolvedor';
        
        setAuthState({
          isAuth: true,
          alias,
          category,
          isMediador
        });
      });
    });
  }, []);

  if (!authState.isAuth) {
    return <Auth />;
  }

  const renderView = () => {
    switch (activeView) {
      case 'manifesto': return <Manifesto />;
      case 'circulos': return <Rodas alias={authState.alias} isMediador={authState.isMediador} />;
      case 'meet': return <Meet alias={authState.alias} isMediador={authState.isMediador} />;
      case 'acervo': return <Biblioteca isMediador={authState.isMediador} />;
      case 'producao': return <Laboratorio alias={authState.alias} />;
      case 'faq': return <Faq />;
      case 'admin': return authState.isMediador ? <Admin alias={authState.alias} /> : <Manifesto />;
      default: return <Manifesto />;
    }
  };

  return (
    <>
      {globalNotification && (
        <div className="fixed top-4 right-4 z-[9999] bg-red-900 text-white p-4 shadow-2xl animate-slide max-w-sm border-2 border-yellow-500 cursor-pointer" onClick={() => setActiveView('meet')}>
          <h4 className="font-bold text-xs uppercase tracking-widest mb-1 opacity-80">Aviso do Mediador</h4>
          <p className="text-sm">{globalNotification.text}</p>
        </div>
      )}
      <Layout 
        authState={authState} 
        activeView={activeView} 
        setActiveView={setActiveView}
      >
        {renderView()}
      </Layout>
    </>
  );
}

export default App;
