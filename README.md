# Portfólio Pessoal // Desenvolvimento Web

Este é um projeto completo de portfólio pessoal moderno, responsivo e minimalista, desenvolvido para apresentar trajetória, habilidades, estudos e projetos na área de Desenvolvimento Web. O design segue rigorosamente uma direção de arte editorial, inspirada em referências contemporâneas de design suíço e arquitetura da informação limpa.

---

## 🎨 Identidade Visual & Paleta de Cores

O projeto utiliza uma paleta exclusiva de cinco cores fundamentadas em variáveis CSS (`css/style.css`):

| Cor | HEX | Aplicação |
| :--- | :--- | :--- |
| **Bege areia** | `#F3EDE2` | Fundo principal (modo claro) e textos de destaque (modo escuro) |
| **Grafite** | `#292824` | Títulos, textos principais, navegação e fundo principal (modo escuro) |
| **Coral queimado** | `#E8755B` | Botões de ação, links em destaque, pontos de foco e acentos visuais |
| **Bege taupe** | `#D9CDBB` | Cards secundários, divisórias, superfícies e textos auxiliares no tema escuro |
| **Cinza quente** | `#756F64` | Informações técnicas, legendas, metadados editoriais e rótulos |

### Tipografia
- **DM Sans**: Títulos expressivos, parágrafos, menus e botões.
- **DM Mono**: Numerações (01, 02, 03), datas, metadados, rótulos técnicos e tags de tecnologias.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5 Semântico**: Estruturação acessível com uso rigoroso de `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<figure>` e `<footer>`.
- **CSS3 Puro**: Variáveis customizadas (design tokens), layout responsivo com CSS Grid e Flexbox, transições fluidas e respeito a `prefers-reduced-motion`.
- **JavaScript ES6+ Puro**: Lógica limpa sem frameworks desnecessários para:
  - Alternância de tema Claro / Escuro com persistência via `localStorage` e detecção de `prefers-color-scheme`.
  - Menu móvel gaveta (drawer) com foco acessível e fechamento por tecla `Escape`.
  - Destaque dinâmico do menu durante a rolagem com `IntersectionObserver`.
  - Validação de formulário de contato com mensagens acessíveis (`aria-invalid`, `aria-describedby`, `role="alert"`).
  - Modal explicativo transparente sobre ausência de backend para entrega real.
  - Tratamento de links pendentes para não exibir URLs fictícias como reais.
  - Atualização dinâmica do ano de direitos autorais.
- **Google Fonts**: Carregamento assíncrono e otimizado de DM Sans e DM Mono.

---

## 📁 Estrutura de Arquivos

```text
ia/
├── index.html                   # Estrutura semântica principal e conteúdo editorial
├── css/
│   └── style.css                # Variáveis CSS, grid responsivo, temas e tipografia
├── js/
│   └── script.js                # Lógica de interações, tema, validação e modais
├── assets/
│   └── images/
│       ├── avatar.svg           # Ilustração editorial para a seção Sobre Mim
│       ├── project-1.svg        # Prévia visual do Projeto 01 (Interface Editorial)
│       ├── project-2.svg        # Prévia visual do Projeto 02 (Aplicação Interativa)
│       └── project-3.svg        # Prévia visual do Projeto 03 (Design System)
└── README.md                    # Documentação, instruções de execução e deploy
```

---

## 🚀 Como Executar Localmente

Como o projeto é construído em HTML, CSS e JavaScript estáticos, ele não exige instalação de pacotes `npm` ou compiladores complexos. Você pode executá-lo com qualquer servidor HTTP local.

### Opção 1: Usando Python (Recomendado)

Abra o terminal na pasta do projeto e execute:

```bash
# Comando padrão:
python -m http.server 8000

# Alternativa comum no Windows:
py -m http.server 8000
```

Após iniciar o servidor, abra seu navegador e acesse:
👉 **[http://localhost:8000](http://localhost:8000)**

### Opção 2: Usando a extensão Live Server (VS Code / Antigravity)

1. Clique com o botão direito no arquivo `index.html`.
2. Selecione **"Open with Live Server"**.

---

## ✏️ Guia de Personalização

Substitua os seguintes marcadores de posição no arquivo `index.html`:

1. **Seu Nome e Marca**:
   - Altere as ocorrências de `SEU NOME` no `<title>`, no cabeçalho (`.brand__name`), no título da seção Início (`.hero-name`) e no rodapé.
2. **Canais de Contato**:
   - `seu-email@exemplo.com` ➔ Substitua pelo seu endereço de e-mail real.
   - `github.com/seu-usuario` ➔ Insira seu perfil no GitHub.
   - `linkedin.com/in/seu-perfil` ➔ Insira a URL do seu perfil no LinkedIn.
3. **Imagens e Projetos**:
   - As imagens ilustrativas estão em `assets/images/`. Para adicionar imagens reais dos seus projetos, basta copiar os arquivos `.png`, `.jpg` ou `.webp` para essa pasta e atualizar o atributo `src` das tags `<img>` no `index.html`.
   - Adicione os links reais dos seus projetos substituindo os botões com `data-action="pending-link"` por links `<a>` convencionais apontando para seus repositórios no GitHub e aplicações hospedadas.

---

## 📬 Como Configurar o Envio Real de Mensagens

O formulário implementa validação completa de campos via JavaScript no navegador (nome, formato de e-mail, assunto e mensagem). Por ser uma aplicação puramente estática, ele não transmite dados pela rede sem uma integração externa.

Para receber mensagens diretamente no seu e-mail pessoal, você pode integrar um serviço gratuito em poucos minutos:

### Opção A: Formspree (Mais simples)
1. Crie uma conta gratuita em [formspree.io](https://formspree.io/).
2. Crie um novo formulário e copie o endpoint gerado (ex: `https://formspree.io/f/xbjvkqwo`).
3. No arquivo `index.html`, atualize a tag `<form>`:
   ```html
   <form id="contact-form" action="https://formspree.io/f/SEU_CODIGO" method="POST">
   ```
4. No arquivo `js/script.js`, descomente o envio via `fetch(form.action, { method: 'POST', body: new FormData(contactForm) })`.

### Opção B: EmailJS
1. Crie uma conta em [emailjs.com](https://www.emailjs.com/).
2. Adicione o script do SDK no `<head>` do `index.html`.
3. No `js/script.js`, chame `emailjs.sendForm(...)` dentro do evento de validação bem-sucedida.

---

## 🌐 Publicação no GitHub e Vercel

### 1. Inicializar e Enviar para o GitHub

1. No terminal da pasta do projeto, inicialize o repositório Git:
   ```bash
   git init
   git add .
   git commit -m "feat: portfolio pessoal com estilo editorial minimalista"
   ```
2. Crie um novo repositório vazio no seu [GitHub](https://github.com/new) (ex: `meu-portfolio`).
3. Conecte o repositório local e envie o código:
   ```bash
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/meu-portfolio.git
   git push -u origin main
   ```

### 2. Publicar na Vercel

1. Acesse [vercel.com](https://vercel.com/) e faça login com sua conta do GitHub.
2. No painel principal, clique no botão **"Add New..."** ➔ **"Project"**.
3. Localize o repositório recém-criado (`meu-portfolio`) e clique em **"Import"**.
4. Como é um site estático puro, o **Framework Preset** será detectado como `Other` e a **Root Directory** será `./`.
5. Clique em **"Deploy"**.
6. Em cerca de 30 segundos, seu site estará publicado e com HTTPS gratuito ativado (ex: `https://meu-portfolio.vercel.app`).

### 3. Atualizações Futuras
Sempre que fizer alterações nos arquivos:
```bash
git add .
git commit -m "docs: atualiza informações de contato e projetos"
git push
```
A Vercel atualizará o site automaticamente a cada `git push` na branch `main`.

---

## ♿ Acessibilidade e Qualidade

- **WCAG 2.1 AA**: Relação de contraste superior a 7:1 entre Grafite (`#292824`) e Bege areia (`#F3EDE2`).
- **Navegação por Teclado**: Foco visível preservado com destaque em Coral queimado (`#E8755B`).
- **Leitores de Tela**: Marcação com atributos ARIA (`aria-expanded`, `aria-controls`, `aria-describedby`, `role="alert"`).
- **Movimento Reduzido**: Regra `@media (prefers-reduced-motion: reduce)` para respeitar configurações de acessibilidade do sistema.
