# Hiperclasse: Territórios de Aprendizagens

A **Hiperclasse** é a materialização digital do **Projeto Político Pedagógico (PPP)** da Rede de Aprendizagem Ponto a Ponto de Salinas da Margarida. Evoluímos de um protótipo estático para uma **Single Page Application (SPA)** profissional, mantendo nossa essência radicalmente descentralizada (P2P).

## 🛠️ Stack Tecnológica
- **Frontend**: React.js, Vite, Tailwind CSS v4.
- **P2P & Dados**: [Gun.js](https://gun.eco/) - Dados descentralizados e soberanos (Sem banco de dados central).
- **Autenticação**: Criptografia SEA via `gun.user()`.
- **Editor Visual**: React Simple WYSIWYG (Hipersala Vygotsky).
- **Vídeo**: Integração nativa com Jitsi Meet.

## 🚀 Como Executar Localmente
Para rodar o ambiente de desenvolvimento:
```bash
cd pro-app
npm install
npm run dev
```

Para compilar para produção:
```bash
npm run build
# A pasta /dist estará pronta para hospedagem estática.
```

## 📝 Funcionalidades (Soberania Pedagógica)
- [x] **Círculos de Diálogo Paulo Freire**: Sistema de debates segmentados por temas sugeridos pela comunidade.
- [x] **Hipersala Vygotsky**: Editor de texto colaborativo visual (WYSIWYG) para publicações definitivas.
- [x] **Biblioteca Anísio Teixeira**: Acervo comunitário com suporte a capas (imagens) e links externos.
- [x] **Encontros Síncronos**: Sala de videoconferência integrada via Jitsi.
- [x] **Avisos Globais**: Sistema de notificação em tempo real via P2P.
- [x] **Gestão Pedagógica**: Painel do Mediador para aprovar temas e inserir documentos no acervo.

## 📜 Histórico de Modificações (Changelog)
### v5.0.0 (21/04/2026)
- **Refatoração Completa**: Migração de HTML único para React/Vite.
- **Hipersala**: Implementação de editor WYSIWYG, substituindo o antigo Markdown.
- **Nomenclatura**: Adoção de termos pedagógicos (Anísio Teixeira, Paulo Freire, Vygotsky).
- **Videoconferência**: Integração com Jitsi Meet na aba "Encontros Síncronos".
- **Notificações**: Sistema de avisos P2P em tempo real.
- **UI/UX**: Painel de instruções didáticas na tela de Login e headers explicativos em todas as seções.
