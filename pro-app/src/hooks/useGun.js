import { useState, useEffect } from 'react';
import { gun } from '../lib/gun';

/**
 * useGunSync - Hook de Arsenal para Sincronização P2P Reativa
 * @param {string} nodePath - O caminho do nó no Gun (ex: 'mensagens/sala1')
 * @param {any} initialState - Estado inicial caso o nó esteja vazio
 * @returns {[any, Function]} - Retorna o dado e uma função para atualizar
 */
export function useGunSync(nodePath, initialState = null) {
  const [data, setData] = useState(initialState);

  useEffect(() => {
    const node = gun.get(nodePath);
    
    // Escuta mudanças em tempo real
    node.on((val) => {
      // Filtra metadados do Gun (_) para retornar apenas o objeto limpo
      if (val) {
        const { _, ...cleanData } = val;
        setData(cleanData);
      } else {
        setData(null);
      }
    });

    // Cleanup: Remove o listener quando o componente desmonta
    return () => node.off();
  }, [nodePath]);

  // Função helper para atualizar o nó de forma simples
  const updateData = (newData) => {
    gun.get(nodePath).put(newData);
  };

  return [data, updateData];
}

/**
 * useGunCollection - Hook para listar coleções (map)
 * @param {string} nodePath - Caminho da coleção
 * @returns {Array} - Lista de itens convertida de objeto para Array
 */
export function useGunCollection(nodePath) {
  const [list, setList] = useState({});

  useEffect(() => {
    const node = gun.get(nodePath);
    
    node.map().on((val, id) => {
      setList(prev => {
        if (val === null) {
          const { [id]: removed, ...rest } = prev;
          return rest;
        }
        return { ...prev, [id]: { ...val, id } };
      });
    });

    return () => node.off();
  }, [nodePath]);

  return Object.values(list);
}
