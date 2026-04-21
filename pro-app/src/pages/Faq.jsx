export default function Faq() {
  return (
    <div className="h-full overflow-y-auto p-12 flex-col max-w-4xl mx-auto animate-slide">
      <h3 className="font-serif text-4xl font-bold text-[var(--color-sepia-dark)] mb-6">Guia do Círculo & Termos</h3>
      <p className="text-sm opacity-60 mb-10">Tudo o que você precisa saber técnica e pedagogicamente sobre o funcionamento soberano desta rede.</p>

      <div className="space-y-12 font-serif text-lg leading-relaxed text-justify opacity-90 pb-20">
        
        {/* Sessão Técnica */}
        <section className="space-y-6">
          <h4 className="text-2xl font-bold border-b border-ink pb-4 text-[var(--color-sepia-dark)]">⚙️ Entendendo a Tecnologia (P2P)</h4>
          
          <div className="space-y-4">
            <h5 className="font-bold text-xl">Por que não existe "Esqueci minha senha"?</h5>
            <p>
              O Hyperclasse é uma rede **Ponto a Ponto (P2P)**. Isso significa que não existe um "servidor central" ou um dono do banco de dados (como Google ou Facebook) guardando suas informações. 
              A sua Chave de Acesso (senha) é uma fórmula matemática que destranca sua identidade diretamente no seu aparelho. Se você esquecê-la, ninguém no mundo poderá recuperá-la. É o preço da verdadeira privacidade. **Anote sua senha com cuidado.**
            </p>

            <h5 className="font-bold text-xl">Onde os textos e documentos ficam salvos?</h5>
            <p>
              Em todos nós. Quando você envia uma mensagem ou salva uma produção, ela viaja pela rede e fica hospedada de forma fragmentada e criptografada nos navegadores de todos os participantes do Círculo. A comunidade é o próprio servidor.
            </p>

            <h5 className="font-bold text-xl">Posso acessar do celular e do computador?</h5>
            <p>
              Sim! Basta usar o exato mesmo **Nome de Usuário** e a exata mesma **Chave de Acesso**. A matemática do P2P reconhecerá que é você e sincronizará suas informações no novo aparelho.
            </p>
          </div>
        </section>

        {/* Sessão Pedagógica */}
        <section className="space-y-6">
          <h4 className="text-2xl font-bold border-b border-ink pb-4 text-[var(--color-sepia-dark)]">🌱 Princípios Pedagógicos</h4>
          
          <div className="space-y-4">
            <h5 className="font-bold text-xl">Qual é o meu papel nesta rede?</h5>
            <p>
              Diferente de redes sociais tradicionais de consumo, esta é uma rede de **produção de conhecimento**. 
              Se você é um **Estudante/Aprendiz**, seu papel é questionar a realidade, ler os documentos da *Biblioteca Anísio Teixeira* e registrar suas reflexões na *Hipersala Vygotsky*.
              Se você é o **Mediador**, seu papel não é ditar regras, mas garantir que o diálogo não se perca, aprovando *Temas* relevantes para os *Círculos de Diálogo Paulo Freire*.
            </p>

            <h5 className="font-bold text-xl">Por que "Círculos de Diálogo Paulo Freire" e não apenas um "Chat"?</h5>
            <p>
              Inspirado em Paulo Freire, um "chat" é frequentemente usado para conversas vazias ou transmissão de ordens. O "Círculo de Diálogo" exige horizontalidade. Todos estão no mesmo nível. Os temas debatidos ali devem gerar reflexão crítica sobre a nossa realidade em Salinas da Margarida.
            </p>
          </div>
        </section>

        {/* Termos de Uso */}
        <section className="space-y-6 bg-white bg-opacity-30 p-8 border border-ink sepia-shadow mt-12">
          <h4 className="text-2xl font-bold text-red-900 border-b border-ink pb-4">📜 Termos de Convivência e Uso</h4>
          <p className="italic text-sm">Ao registrar seu Nome de Usuário nesta rede descentralizada, você concorda com o seguinte compromisso ético:</p>
          
          <ol className="list-decimal pl-6 space-y-4 text-base">
            <li>
              <strong>Soberania e Responsabilidade:</strong> Você é o único guardião da sua chave de acesso. A perda da chave resulta na perda irrecuperável da conta.
            </li>
            <li>
              <strong>Rigor Acadêmico e Ético:</strong> A <em>Hipersala Vygotsky</em> não é espaço para plágio ou desinformação. Toda produção deve ser fundamentada na realidade local e no respeito aos direitos humanos.
            </li>
            <li>
              <strong>Cura Descentralizada:</strong> O Mediador tem a prerrogativa técnica de organizar e excluir temas nos <em>Círculos de Diálogo Paulo Freire</em> para manter o foco pedagógico, mas a rede pertence coletivamente a todos os usuários ativos.
            </li>
            <li>
              <strong>Privacidade por Design:</strong> Nenhum dado seu é vendido, rastreado por algoritmos de propaganda corporativa ou monetizado. Seu conhecimento não é um produto.
            </li>
            <li>
              <strong>Respeito ao Círculo:</strong> Discursos de ódio, assédio ou qualquer tentativa técnica de corromper o fluxo da rede P2P resultarão na exclusão da validação do seu Nome de Usuário por parte da mediação do projeto.
            </li>
          </ol>
        </section>

      </div>
    </div>
  );
}
