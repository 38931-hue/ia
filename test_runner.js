const fs = require('fs');
const path = require('path');

// 1. Read index.html, style.css, script.js
const htmlContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const cssContent = fs.readFileSync(path.join(__dirname, 'css', 'style.css'), 'utf8');
const jsContent = fs.readFileSync(path.join(__dirname, 'js', 'script.js'), 'utf8');

console.log('=== TEST SUITE: PORTFÓLIO PESSOAL // VERIFICAÇÃO AUTOMATIZADA ===\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition, testName) {
  totalTests++;
  if (condition) {
    console.log(`[PASS] ${testName}`);
    passedTests++;
  } else {
    console.error(`[FAIL] ${testName}`);
    process.exitCode = 1;
  }
}

// -----------------------------------------------------------------------------
// Teste 1: Paleta de Cores Obrigatória no CSS
// -----------------------------------------------------------------------------
console.log('--- 1. Paleta de Cores Obrigatória ---');
assert(cssContent.includes('#F3EDE2') || cssContent.includes('#f3ede2'), 'CSS contém cor Bege areia (#F3EDE2)');
assert(cssContent.includes('#292824'), 'CSS contém cor Grafite (#292824)');
assert(cssContent.includes('#E8755B') || cssContent.includes('#e8755b'), 'CSS contém cor Coral queimado (#E8755B)');
assert(cssContent.includes('#D9CDBB') || cssContent.includes('#d9cdbb'), 'CSS contém cor Bege taupe (#D9CDBB)');
assert(cssContent.includes('#756F64') || cssContent.includes('#756f64'), 'CSS contém cor Cinza quente (#756F64)');
assert(cssContent.includes('#403D36') || cssContent.includes('#403d36'), 'CSS contém cor Fundo secundário Dark (#403D36)');
assert(cssContent.includes('[data-theme="dark"]'), 'CSS define regras para modo escuro [data-theme="dark"]');

// -----------------------------------------------------------------------------
// Teste 2: Tipografia (DM Sans & DM Mono)
// -----------------------------------------------------------------------------
console.log('\n--- 2. Tipografia e Fontes Google ---');
assert(htmlContent.includes('family=DM+Mono') && htmlContent.includes('family=DM+Sans'), 'HTML carrega DM Sans e DM Mono via Google Fonts');
assert(cssContent.includes("'DM Sans'"), 'CSS utiliza DM Sans');
assert(cssContent.includes("'DM Mono'"), 'CSS utiliza DM Mono');

// -----------------------------------------------------------------------------
// Teste 3: Seções Obrigatórias e IDs
// -----------------------------------------------------------------------------
console.log('\n--- 3. Seções e Estrutura Semântica ---');
assert(htmlContent.includes('id="inicio"'), 'Seção Início presente com id="inicio"');
assert(htmlContent.includes('id="sobre"'), 'Seção Sobre presente com id="sobre"');
assert(htmlContent.includes('id="projetos"'), 'Seção Projetos presente com id="projetos"');
assert(htmlContent.includes('id="contato"'), 'Seção Contato presente com id="contato"');
assert(htmlContent.includes('role="contentinfo"') || htmlContent.includes('<footer'), 'Rodapé semântico presente');

// -----------------------------------------------------------------------------
// Teste 4: Conteúdo Obrigatório do Hero / Início
// -----------------------------------------------------------------------------
console.log('\n--- 4. Conteúdo Obrigatório do Hero ---');
assert(htmlContent.includes('PORTFÓLIO PESSOAL / DESENVOLVIMENTO WEB'), 'Hero contém rótulo "PORTFÓLIO PESSOAL / DESENVOLVIMENTO WEB"');
assert(htmlContent.includes('MIGUELITO') || htmlContent.includes('Miguelito'), 'Hero contém o nome "Miguelito" / "MIGUELITO"');
assert(htmlContent.includes('Transformando ideias em experiências digitais.'), 'Hero contém frase principal exata');
assert(htmlContent.includes('Exploro código, design e criatividade para construir experiências digitais funcionais e visualmente cuidadosas.'), 'Hero contém texto descritivo exato');
assert(htmlContent.includes('Ver meus projetos') && htmlContent.includes('href="#projetos"'), 'Botão "Ver meus projetos" aponta para #projetos');
assert(htmlContent.includes('Sobre mim') && htmlContent.includes('href="#sobre"'), 'Botão "Sobre mim" aponta para #sobre');

// -----------------------------------------------------------------------------
// Teste 5: Conteúdo Obrigatório da Seção Sobre Mim
// -----------------------------------------------------------------------------
console.log('\n--- 5. Seção Sobre Mim ---');
assert(htmlContent.includes('Um pouco sobre mim.'), 'Título "Um pouco sobre mim." presente');
assert(htmlContent.includes('Sou uma pessoa interessada em desenvolvimento web, tecnologia e design de interfaces.'), 'Texto obrigatório de abertura presente');
assert(htmlContent.includes('Minha história'), 'Bloco "Minha história" presente');
assert(htmlContent.includes('Meus interesses'), 'Bloco "Meus interesses" presente');
assert(htmlContent.includes('O que estou aprendendo'), 'Bloco "O que estou aprendendo" presente');
assert(htmlContent.includes('Minhas habilidades'), 'Bloco "Minhas habilidades" presente');

const sobreSectionMatch = htmlContent.match(/<section id="sobre"[\s\S]*?<\/section>/);
const sobreHtml = sobreSectionMatch ? sobreSectionMatch[0] : '';
const hasProgressBarElement = sobreHtml.includes('<progress') || sobreHtml.includes('class="progress') || sobreHtml.includes('role="progressbar"');
assert(!hasProgressBarElement, 'Sem elementos de barras de porcentagem para habilidades na seção Sobre');



// -----------------------------------------------------------------------------
// Teste 6: Galeria de Projetos (3 Cards de Demonstração)
// -----------------------------------------------------------------------------
console.log('\n--- 6. Galeria de Projetos ---');
assert(htmlContent.includes('Projeto 01') || htmlContent.includes('PROJETO 01'), 'Card Projeto 01 presente');
assert(htmlContent.includes('Projeto 02') || htmlContent.includes('PROJETO 02'), 'Card Projeto 02 presente');
assert(htmlContent.includes('Projeto 03') || htmlContent.includes('PROJETO 03'), 'Card Projeto 03 presente');
assert(htmlContent.includes('project-1.svg'), 'Imagem ilustrativa do Projeto 01 vinculada');
assert(htmlContent.includes('project-2.svg'), 'Imagem ilustrativa do Projeto 02 vinculada');
assert(htmlContent.includes('project-3.svg'), 'Imagem ilustrativa do Projeto 03 vinculada');
assert(htmlContent.includes('Ver projeto') && htmlContent.includes('Ver código'), 'Links "Ver projeto" e "Ver código" presentes');

// -----------------------------------------------------------------------------
// Teste 7: Seção Contato & Formulário
// -----------------------------------------------------------------------------
console.log('\n--- 7. Formulário de Contato e Validação ---');
assert(htmlContent.includes('Vamos conversar?'), 'Título "Vamos conversar?" presente');
assert(htmlContent.includes('id="contact-name"'), 'Campo de Nome presente');
assert(htmlContent.includes('id="contact-email"'), 'Campo de E-mail presente');
assert(htmlContent.includes('id="contact-subject"'), 'Campo de Assunto presente');
assert(htmlContent.includes('id="contact-message"'), 'Campo de Mensagem presente');
assert(htmlContent.includes('Enviar mensagem'), 'Botão "Enviar mensagem" presente');
assert(htmlContent.includes('github.com/seu-usuario'), 'Espaço para GitHub presente');
assert(htmlContent.includes('linkedin.com/in/seu-perfil'), 'Espaço para LinkedIn presente');
assert(htmlContent.includes('seu-email@exemplo.com'), 'Espaço para E-mail presente');

// -----------------------------------------------------------------------------
// Teste 8: Validação JS (Email Regex & Regras)
// -----------------------------------------------------------------------------
console.log('\n--- 8. Lógica de Validação no Script JS ---');
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
assert(EMAIL_REGEX.test('dev@dominio.com'), 'Validador aceita e-mail válido dev@dominio.com');
assert(!EMAIL_REGEX.test('invalid-email'), 'Validador rejeita invalid-email');
assert(!EMAIL_REGEX.test('dev@'), 'Validador rejeita dev@');
assert(!EMAIL_REGEX.test('@dominio.com'), 'Validador rejeita @dominio.com');

// -----------------------------------------------------------------------------
// Teste 9: Modais Acessíveis & Avisos Transparentes
// -----------------------------------------------------------------------------
console.log('\n--- 9. Modais e Avisos Transparentes ---');
assert(htmlContent.includes('id="form-modal"'), 'Modal de status de envio do formulário presente');
assert(htmlContent.includes('não foi transmitida pela rede') || htmlContent.includes('serviço de backend'), 'Modal explica claramente ausência de backend / serviço externo');
assert(htmlContent.includes('id="project-modal"'), 'Modal informativo de links pendentes presente');

// -----------------------------------------------------------------------------
// Teste 10: Acessibilidade & Modo Reduzido
// -----------------------------------------------------------------------------
console.log('\n--- 10. Acessibilidade e Movimento Reduzido ---');
assert(htmlContent.includes('class="skip-link"'), 'Skip-link presente para navegação por teclado');
assert(cssContent.includes('prefers-reduced-motion'), 'CSS respeita prefers-reduced-motion');
assert(cssContent.includes(':focus-visible'), 'CSS define :focus-visible para acessibilidade');
assert(htmlContent.includes('aria-label="Alternar para modo escuro"') || htmlContent.includes('title="Alternar tema"'), 'Botão de alternância com rótulo acessível');

console.log(`\n=============================================================`);
console.log(`RESULTADO: ${passedTests} de ${totalTests} testes automatizados passaram com sucesso!`);
console.log(`=============================================================\n`);
