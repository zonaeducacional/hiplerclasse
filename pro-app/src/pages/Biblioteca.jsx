import { useGunCollection } from '../hooks/useGun';
import { gun } from '../lib/gun';

export default function Biblioteca({ isMediador }) {
  const docs = useGunCollection('salinas_hyperclasse_biblioteca_v4');

  const handleDelete = (id) => {
    gun.get('salinas_hyperclasse_biblioteca_v4').get(id).put(null);
  };


  return (
    <div className="h-full overflow-y-auto p-12 flex-col animate-slide">
      <div className="mb-10 border-b border-ink pb-6">
        <h3 className="font-serif text-4xl font-bold text-[var(--color-sepia-dark)] mb-2">Biblioteca Anísio Teixeira</h3>
        <div className="bg-white bg-opacity-40 p-4 border-l-4 border-[var(--color-sepia-dark)] text-sm opacity-80 leading-relaxed text-justify max-w-5xl">
          <p>
            <strong>Qual a função deste espaço?</strong> Em homenagem ao grande educador Anísio Teixeira, este é nosso 
            acervo comunitário de fontes primárias, secundárias e documentos históricos. É aqui que preservamos o material 
            essencial para as nossas pesquisas. Todo o conhecimento é compartilhado de forma descentralizada. 
            Consulte os documentos para embasar suas reflexões na Hipersala.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {docs.length === 0 ? (
          <div className="col-span-full p-10 text-center opacity-40 italic">O acervo ainda está vazio. O Mediador precisa adicionar fontes.</div>
        ) : (
          docs.map(doc => (
            <div key={doc.id} className="p-6 border border-ink bg-white bg-opacity-30 group hover:border-[var(--color-sepia-dark)] transition-all sepia-shadow flex flex-col">
              
              {doc.image && (
                <div className="mb-4 w-full h-48 border border-ink overflow-hidden bg-[var(--color-sepia-light)] bg-opacity-20 flex items-center justify-center">
                  <img src={doc.image} alt={doc.title} className="w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:opacity-100 transition-opacity" />
                </div>
              )}

              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">{doc.source || 'Acervo Local'}</span>
                {isMediador && (
                  <button onClick={() => handleDelete(doc.id)} className="text-red-300 hover:text-red-700 cursor-pointer" title="Remover do Acervo">×</button>
                )}
              </div>
              <h4 className="font-serif text-xl font-bold mb-3 group-hover:text-[var(--color-sepia-dark)]">{doc.title}</h4>
              <p className="text-xs leading-relaxed opacity-70 mb-6 flex-1 whitespace-pre-wrap">{doc.desc}</p>
              
              <a 
                href={doc.link || '#'} 
                target={doc.link ? "_blank" : "_self"} 
                rel="noopener noreferrer"
                className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent)] border-t border-ink pt-3 inline-block hover:text-black transition-colors"
              >
                Consultar Documento →
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
