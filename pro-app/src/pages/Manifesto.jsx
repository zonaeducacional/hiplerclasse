export default function Manifesto() {
  return (
    <div className="h-full overflow-y-auto p-12 flex-col max-w-4xl mx-auto animate-slide">
      <h3 className="font-serif text-4xl font-bold text-[var(--color-sepia-dark)] mb-6">Projeto Político Pedagógico</h3>
      <div className="space-y-8 font-serif text-lg leading-relaxed text-justify opacity-90 pb-20">
        <div className="border-b border-ink pb-8 mb-8">
          <h4 className="text-2xl font-bold mb-4">Rede de Aprendizagem Ponto a Ponto de Salinas da Margarida</h4>
          <p className="italic opacity-70">Este documento circunscreve as diretrizes pedagógicas e técnicas para a implementação de uma plataforma digital de aprendizagem por pares, fundamentada na pedagogia crítica e na soberania tecnológica.</p>
        </div>

        <div className="space-y-6">
          <h4 className="text-xl font-bold uppercase tracking-widest border-l-4 border-[var(--color-sepia-dark)] pl-4">1. Marco Situacional</h4>
          <p>Observa-se que a estrutura educacional contemporânea, mesmo quando transposta para o ambiente digital, frequentemente replica o modelo de "depósito" de informações. Em Salinas da Margarida, a transição para o digital não pode ser apenas uma mudança de suporte, mas uma reconfiguração das relações de poder sobre o conhecimento. O cenário atual exige uma ferramenta que rompa com o isolamento do aprendiz e com a dependência de plataformas proprietárias que mercantilizam os dados e os processos cognitivos.</p>
          <p>Esta proposta emerge da necessidade de criar um território de encontro para a classe trabalhadora e estudantes da região — especificamente aqueles vinculados à Escola Municipal Januário Eleodoro de Lima e arredores — permitindo que o saber local e a pesquisa histórica tornem-se o centro do currículo.</p>
        </div>

        <div className="space-y-6">
          <h4 className="text-xl font-bold uppercase tracking-widest border-l-4 border-[var(--color-sepia-dark)] pl-4">2. Marco Referencial</h4>
          <p>A fundamentação teórica desta plataforma repousa sobre quatro pilares indissociáveis:</p>
          <ul className="list-disc pl-8 space-y-4">
            <li><strong>Pedagogia Crítica (Paulo Freire):</strong> A plataforma é concebida como um grande "Círculo de Cultura" digital. O diálogo horizontal é a ferramenta de desalienação, onde mediador e educando constroem o saber a partir de temas geradores da realidade salineira.</li>
            <li><strong>Sociedade Desescolarizada:</strong> O projeto materializa as "redes de aprendizagem" facilitando o intercâmbio de habilidades e o acesso a recursos sem a necessidade de mediação institucional burocrática.</li>
            <li><strong>Materialismo Histórico:</strong> A educação é compreendida como prática social. A plataforma não é neutra; ela serve ao propósito de instrumentalizar o sujeito para a compreensão e transformação das estruturas de opressão.</li>
            <li><strong>Construtivismo Social (Vygotsky):</strong> A arquitetura digital prioriza a Zona de Desenvolvimento Proximal, utilizando a interação entre pares como o motor principal da aprendizagem.</li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-xl font-bold uppercase tracking-widest border-l-4 border-[var(--color-sepia-dark)] pl-4">3. Marco Operacional</h4>
          <p>A operacionalização da escola online dar-se-á através de uma dinâmica não-linear:</p>
          <ol className="list-decimal pl-8 space-y-4">
            <li><strong>Rodas de Conversa:</strong> Espaços síncronos e assíncronos onde os participantes propõem problemas e compartilham recursos.</li>
            <li><strong>Mediação Estratégica:</strong> O papel do desenvolvedor-mediador não é o de professor expositor, mas de curador de redes, garantindo que o debate mantenha o rigor crítico e a segurança do ambiente.</li>
            <li><strong>Curadoria Colaborativa:</strong> Repositório de fontes e documentos (como registros do Arquivo Nacional e historiografia local) que servem de base para a produção textual e histórica dos alunos.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
