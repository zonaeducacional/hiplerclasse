import Gun from 'gun';
import 'gun/sea';

// Arsenal de Relays P2P - Múltiplos pontos de entrada para garantir conectividade
const relays = [
  'https://gun-manhattan.herokuapp.com/gun',
  'https://relay.peer.ooo/gun',
  'https://gun-server.herokuapp.com/gun',
  'https://dletta.cloud.okteto.net/gun',
  'https://mg-gun-relay.herokuapp.com/gun'
];

// Inicialização Core
export const gun = Gun({ 
  peers: relays,
  localStorage: true, // Mantém dados offline no navegador
});

// SEA User (Segurança e Autenticação)
export const user = gun.user().recall({ sessionStorage: true });

/**
 * Utilitários do Arsenal Hyperclasse
 */
export const gunUtils = {
  // Gera uma chave aleatória segura para novos nós
  generateId: () => Gun.text.random(16),
  
  // Namespace padrão para evitar colisões globais
  getAppNode: (appName = 'hyperclasse_v4') => gun.get(appName),
  
  // Helper para persistir dados com timestamp
  putWithTimestamp: (node, data) => node.put({ ...data, updatedAt: Date.now() })
};

