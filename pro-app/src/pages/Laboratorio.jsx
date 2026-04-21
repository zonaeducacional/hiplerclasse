import { useEffect, useState } from 'react';
import { gun } from '../lib/gun';
import Gun from 'gun';
import Editor, { 
  EditorProvider, 
  BtnBold, 
  BtnItalic, 
  BtnUnderline, 
  BtnStrikeThrough,
  BtnNumberedList, 
  BtnBulletList, 
  BtnLink, 
  BtnClearFormatting, 
  Toolbar 
} from 'react-simple-wysiwyg';

export default function Laboratorio({ alias }) {
  const [content, setContent] = useState('');
  const [productions, setProductions] = useState([]);
  const [isViewing, setIsViewing] = useState(false);
  const [viewingTitle, setViewingTitle] = useState('');

  useEffect(() => {
    const prodNode = gun.get('salinas_hyperclasse_producao_v4');
    
    prodNode.map().on((data, id) => {
      if (!data || !data.content) return;
      setProductions(prev => {
        const exists = prev.find(p => p.id === id);
        if (exists) return prev;
        return [{ ...data, id }, ...prev].sort((a, b) => b.when - a.when);
      });
    });

    return () => prodNode.off();
  }, []);

  const handlePublish = () => {
    if (!content.trim()) return;
    
    // Extract a basic title from the raw text (stripping HTML)
    const rawText = content.replace(/<[^>]*>?/gm, '').trim();
    let title = rawText.substring(0, 40);
    if (rawText.length > 40) title += '...';
    if (!title) title = 'Produção sem título';

    gun.get('salinas_hyperclasse_producao_v4').get(Gun.text.random(8)).put({
      author: alias,
      content,
      title,
      when: Gun.state()
    });
    
    setContent('');
    setIsViewing(false);
    alert("Produção publicada com sucesso no Laboratório Vygotsky!");
  };

  const startNewProduction = () => {
    setContent('');
    setIsViewing(false);
    setViewingTitle('');
  };

  const viewProduction = (prod) => {
    setContent(prod.content);
    setViewingTitle(prod.title);
    setIsViewing(true);
  };

  return (
    <div className="h-full overflow-y-auto p-12 flex-col animate-slide">
      <div className="mb-10 border-b border-ink pb-6">
        <h3 className="font-serif text-4xl font-bold text-[var(--color-sepia-dark)] mb-2">Hipersala Vygotsky</h3>
        <div className="bg-white bg-opacity-40 p-4 border-l-4 border-[var(--color-sepia-dark)] text-sm opacity-80 leading-relaxed text-justify">
          <p>
            <strong>Qual a função deste espaço?</strong> A Hipersala Vygotsky é nosso ambiente de produção colaborativa.
            Segundo o psicólogo Lev Vygotsky, o aprendizado se dá na interação social. Aqui, você não é apenas um "aluno" consumindo conteúdo;
            você é um autor. Use o editor visual abaixo para registrar suas reflexões, produzir textos, ensaios e compartilhar 
            seus saberes com o restante da turma de forma permanente.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6 flex flex-col h-[70vh]">
          
          <div className="flex justify-between border-b border-ink pb-2">
            <h4 className="text-lg font-bold font-serif text-[var(--color-sepia-dark)]">
              {isViewing ? 'Lendo: ' + viewingTitle : 'Nova Produção'}
            </h4>
            {isViewing && (
              <button 
                onClick={startNewProduction}
                className="px-4 py-2 text-xs font-bold uppercase tracking-widest cursor-pointer bg-[var(--color-sepia-dark)] text-white hover:bg-black transition-colors"
              >
                + Novo Texto
              </button>
            )}
          </div>

          <div className="flex-1 flex flex-col overflow-hidden">
            {!isViewing ? (
              <div className="flex-1 bg-white border border-ink sepia-shadow flex flex-col overflow-hidden wysiwyg-container">
                <EditorProvider>
                  <Editor 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)}
                    className="flex-1 overflow-y-auto font-serif text-lg p-4"
                  >
                    <Toolbar className="bg-[var(--color-paper)] border-b border-ink p-2">
                      <BtnBold />
                      <BtnItalic />
                      <BtnUnderline />
                      <BtnStrikeThrough />
                      <div className="w-px h-4 bg-ink mx-2 opacity-20 inline-block align-middle"></div>
                      <BtnNumberedList />
                      <BtnBulletList />
                      <div className="w-px h-4 bg-ink mx-2 opacity-20 inline-block align-middle"></div>
                      <BtnLink />
                      <BtnClearFormatting />
                    </Toolbar>
                  </Editor>
                </EditorProvider>
              </div>
            ) : (
              <div 
                className="w-full flex-1 p-8 bg-white font-serif text-lg leading-relaxed overflow-y-auto prose prose-stone max-w-none border border-ink sepia-shadow"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            )}
          </div>
          
          {!isViewing && (
            <div className="flex justify-end">
              <button onClick={handlePublish} className="bg-[var(--color-sepia-dark)] text-white px-8 py-3 font-bold uppercase text-xs tracking-widest shadow-lg hover:bg-black transition-colors cursor-pointer">
                Publicar no Laboratório
              </button>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <h4 className="text-xs font-bold uppercase tracking-widest opacity-40 border-b border-ink pb-2">Produções Recentes</h4>
          <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
            {productions.length === 0 ? (
              <div className="text-xs italic opacity-40">Nenhuma produção compartilhada ainda.</div>
            ) : (
              productions.map(prod => (
                <div 
                  key={prod.id} 
                  onClick={() => viewProduction(prod)}
                  className={`p-4 bg-white border hover:border-[var(--color-accent)] transition-all cursor-pointer shadow-sm ${isViewing && viewingTitle === prod.title ? 'border-[var(--color-sepia-dark)] border-2' : 'border-ink bg-opacity-40'}`}
                >
                  <p className="text-[9px] font-bold uppercase tracking-widest opacity-40 mb-1">{prod.author}</p>
                  <h5 className="font-serif font-bold text-sm leading-snug">{prod.title}</h5>
                  <p className="text-[10px] opacity-50 mt-2">Clique para ler</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
