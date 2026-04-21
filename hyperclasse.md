Atue como Arquiteto de Software Full-Stack e Pedagogo Crítico. O objetivo é codificar o MVP da "Rede de Aprendizagem Ponto a Ponto de Salinas da Margarida".

Stack Tecnológica:

Frontend: HTML5 moderno, Tailwind CSS (via CDN para agilidade) e JavaScript Vanilla.

P2P & Dados: Gun.js com integração de Relays públicos para funcionamento trans-rede (online).

Sistema de Autenticação: Utilize o módulo gun.user() para criar um sistema de Login Convencional (Usuário e Senha). Não utilize fluxos de chaves manuais. O aluno deve apenas digitar um "Apelido" e uma "Senha" para entrar em seu Círculo de Cultura.

Funcionalidades Obrigatórias no Código:

Tela de Acesso: Formulário simples de Login/Cadastro (Alias e Password) com estética sóbria e acadêmica.

Interface "Roda de Conversa": Após o login, o aluno acessa um feed em tempo real. As mensagens enviadas devem ser assinadas pelo "Alias" do usuário e propagadas via P2P.

Persistência de Sessão: O app deve lembrar o usuário logado (usando user.recall()) para que ele não precise logar toda vez que abrir o PWA.

Acervo Digital: Uma lista lateral de documentos históricos (links ou textos Markdown) que o mediador disponibiliza.

Filosofia de Design:
O layout deve ser mobile-first, inspirado em arquivos históricos e documentos de estado (estilo "Margarida"), utilizando tons de papel, preto e sépia. A tipografia deve ser clara e legível para leitura de fontes primárias.

Tarefa:
Gere um arquivo index.html único que contenha todo o CSS (Tailwind), o HTML da estrutura (Login + Dashboard) e o JavaScript com a lógica do Gun.js para autenticação e chat P2P.