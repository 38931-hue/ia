/**
 * ============================================================================
 * PORTFÓLIO PESSOAL // DESENVOLVIMENTO WEB
 * Arquivo: js/script.js
 * Funcionalidades:
 *  - Alternância de Modo Claro / Escuro com persistência em localStorage
 *  - Detecção da preferência do sistema operacional (prefers-color-scheme)
 *  - Navegação fluida com destaque dinâmico da seção ativa (IntersectionObserver)
 *  - Menu mobile acessível (Drawer com suporte a teclado e ARIA)
 *  - Validação completa de formulário com mensagens acessíveis (WCAG)
 *  - Modal informativo de ausência de backend / serviço de envio
 *  - Tratamento de links pendentes para evitar URLs fictícias
 *  - Atualização dinâmica do ano no rodapé
 *  - Respeito à preferência de movimento reduzido (prefers-reduced-motion)
 * ============================================================================
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. CONSTANTES & SELETORES DOM
  // --------------------------------------------------------------------------
  const STORAGE_KEY_THEME = 'portfolio-theme-preference';

  const htmlElement = document.documentElement;
  const themeToggleBtn = document.getElementById('theme-toggle');
  const sunIcon = themeToggleBtn?.querySelector('.sun-icon');
  const moonIcon = themeToggleBtn?.querySelector('.moon-icon');

  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const desktopLinks = document.querySelectorAll('.desktop-nav .nav-link');

  const sections = document.querySelectorAll('main > section[id]');

  const contactForm = document.getElementById('contact-form');
  const formModal = document.getElementById('form-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalOkBtn = document.getElementById('modal-ok-btn');

  const projectModal = document.getElementById('project-modal');
  const projModalCloseBtn = document.getElementById('proj-modal-close-btn');
  const projModalOkBtn = document.getElementById('proj-modal-ok-btn');
  const projModalDesc = document.getElementById('proj-modal-desc');

  const currentYearSpan = document.getElementById('current-year');
  const backToTopBtn = document.getElementById('btn-back-to-top');

  // --------------------------------------------------------------------------
  // 2. TEMA CLARO / ESCURO (LIGHT / DARK MODE)
  // --------------------------------------------------------------------------

  /**
   * Obtém o tema preferido inicial:
   * 1º Prioridade: escolha salva no localStorage
   * 2º Prioridade: preferência do sistema operacional
   * 3º Fallback: modo claro ('light')
   */
  function getInitialTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY_THEME);
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  /**
   * Aplica o tema visual no HTML e sincroniza ícones e rótulos acessíveis
   */
  function applyTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY_THEME, theme);

    if (themeToggleBtn) {
      const isDark = theme === 'dark';
      themeToggleBtn.setAttribute('aria-label', isDark ? 'Alternar para modo claro' : 'Alternar para modo escuro');
      themeToggleBtn.setAttribute('title', isDark ? 'Ativar modo claro' : 'Ativar modo escuro');

      if (sunIcon && moonIcon) {
        sunIcon.style.display = isDark ? 'block' : 'none';
        moonIcon.style.display = isDark ? 'none' : 'block';
      }
    }
  }

  /**
   * Alterna entre modo claro e modo escuro
   */
  function toggleTheme() {
    const currentTheme = htmlElement.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  }

  // Inicializa tema
  applyTheme(getInitialTheme());

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  // Ouve mudanças do sistema operacional caso o usuário não tenha feito escolha explícita
  if (window.matchMedia) {
    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    colorSchemeQuery.addEventListener('change', (e) => {
      const hasManualChoice = localStorage.getItem(STORAGE_KEY_THEME);
      if (!hasManualChoice) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 3. MENU MOBILE & GAVETA (DRAWER)
  // --------------------------------------------------------------------------

  function setMobileMenuState(isOpen) {
    if (!mobileMenuBtn || !mobileDrawer) return;

    mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
    mobileMenuBtn.setAttribute('aria-label', isOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação');

    if (isOpen) {
      mobileDrawer.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      // Focar o primeiro link do menu para acessibilidade
      const firstLink = mobileDrawer.querySelector('a');
      if (firstLink) firstLink.focus();
    } else {
      mobileDrawer.classList.remove('is-open');
      document.body.style.overflow = '';
      mobileMenuBtn.focus();
    }
  }

  function toggleMobileMenu() {
    const isOpen = mobileDrawer?.classList.contains('is-open');
    setMobileMenuState(!isOpen);
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  }

  // Fechar menu mobile ao clicar em qualquer item
  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      setMobileMenuState(false);
    });
  });

  // Fechar menu ao pressionar Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer?.classList.contains('is-open')) {
      setMobileMenuState(false);
    }
  });

  // --------------------------------------------------------------------------
  // 4. DESTAQUE DINÂMICO DE SEÇÃO ATIVA (INTERSECTION OBSERVER)
  // --------------------------------------------------------------------------

  function highlightActiveLink(sectionId) {
    desktopLinks.forEach((link) => {
      const href = link.getAttribute('href');
      const isActive = href === `#${sectionId}`;
      link.classList.toggle('is-active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });

    mobileLinks.forEach((link) => {
      const href = link.getAttribute('href');
      link.classList.toggle('is-active', href === `#${sectionId}`);
    });
  }

  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          highlightActiveLink(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((section) => sectionObserver.observe(section));
  }

  // --------------------------------------------------------------------------
  // 5. VALIDAÇÃO ACESSÍVEL DO FORMULÁRIO DE CONTATO
  // --------------------------------------------------------------------------

  // RegEx robusta para validação de formato de e-mail
  const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

  const fields = {
    name: {
      input: document.getElementById('contact-name'),
      error: document.getElementById('name-error'),
      validate: (val) => val.trim().length >= 2
    },
    email: {
      input: document.getElementById('contact-email'),
      error: document.getElementById('email-error'),
      validate: (val) => EMAIL_REGEX.test(val.trim())
    },
    subject: {
      input: document.getElementById('contact-subject'),
      error: document.getElementById('subject-error'),
      validate: (val) => val.trim().length >= 3
    },
    message: {
      input: document.getElementById('contact-message'),
      error: document.getElementById('message-error'),
      validate: (val) => val.trim().length >= 10
    }
  };

  /**
   * Valida um campo específico e atualiza as classes visuais e atributos ARIA
   */
  function validateField(fieldName, isBlurEvent = false) {
    const field = fields[fieldName];
    if (!field || !field.input) return true;

    const value = field.input.value;
    const isValid = field.validate(value);

    // No evento de digitação inicial, só exibe erro se o campo já tiver sido marcado como inválido
    if (!isValid && !isBlurEvent && !field.input.classList.contains('is-invalid')) {
      return isValid;
    }

    if (!isValid) {
      field.input.classList.add('is-invalid');
      field.input.setAttribute('aria-invalid', 'true');
      if (field.error) field.error.classList.add('is-visible');
    } else {
      field.input.classList.remove('is-invalid');
      field.input.removeAttribute('aria-invalid');
      if (field.error) field.error.classList.remove('is-visible');
    }

    return isValid;
  }

  // Registra validações em tempo real (blur e input)
  Object.keys(fields).forEach((key) => {
    const field = fields[key];
    if (field.input) {
      field.input.addEventListener('blur', () => validateField(key, true));
      field.input.addEventListener('input', () => validateField(key, false));
    }
  });

  /**
   * Manipula o envio do formulário
   */
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let formIsValid = true;
      let firstInvalidInput = null;

      // Executa validação em todos os campos
      Object.keys(fields).forEach((key) => {
        const isValid = validateField(key, true);
        if (!isValid) {
          formIsValid = false;
          if (!firstInvalidInput) {
            firstInvalidInput = fields[key].input;
          }
        }
      });

      if (!formIsValid) {
        // Direciona o foco para o primeiro campo com erro
        if (firstInvalidInput) {
          firstInvalidInput.focus();
        }
        return;
      }

      // Se todos os dados forem válidos:
      // Exibe modal explicativo sobre ausência de backend / serviço de envio real
      openModal(formModal);
      contactForm.reset();

      // Limpa os estados de erro se houver resíduos
      Object.keys(fields).forEach((key) => {
        const field = fields[key];
        if (field.input) {
          field.input.classList.remove('is-invalid');
          field.input.removeAttribute('aria-invalid');
        }
        if (field.error) {
          field.error.classList.remove('is-visible');
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // 6. GERENCIAMENTO DE MODAIS (ACESSIBILIDADE & TECLADO)
  // --------------------------------------------------------------------------

  let previousActiveElement = null;

  function openModal(modalElement) {
    if (!modalElement) return;
    previousActiveElement = document.activeElement;
    modalElement.classList.add('is-open');
    modalElement.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Foco no botão principal do modal
    const closeBtn = modalElement.querySelector('button');
    if (closeBtn) closeBtn.focus();
  }

  function closeModal(modalElement) {
    if (!modalElement) return;
    modalElement.classList.remove('is-open');
    modalElement.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // Restaura o foco para o elemento anterior
    if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
      previousActiveElement.focus();
    }
  }

  // Eventos do Modal de Formulário
  modalCloseBtn?.addEventListener('click', () => closeModal(formModal));
  modalOkBtn?.addEventListener('click', () => closeModal(formModal));
  formModal?.addEventListener('click', (e) => {
    if (e.target === formModal) closeModal(formModal);
  });

  // Eventos do Modal de Projetos Pendentes
  projModalCloseBtn?.addEventListener('click', () => closeModal(projectModal));
  projModalOkBtn?.addEventListener('click', () => closeModal(projectModal));
  projectModal?.addEventListener('click', (e) => {
    if (e.target === projectModal) closeModal(projectModal);
  });

  // Fechar modais com tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (formModal?.classList.contains('is-open')) closeModal(formModal);
      if (projectModal?.classList.contains('is-open')) closeModal(projectModal);
    }
  });

  // --------------------------------------------------------------------------
  // 7. TRATAMENTO DE LINKS PENDENTES DE PROJETOS
  // --------------------------------------------------------------------------

  const pendingLinks = document.querySelectorAll('[data-action="pending-link"]');
  pendingLinks.forEach((button) => {
    button.addEventListener('click', () => {
      const projectName = button.getAttribute('data-project') || 'Projeto';
      const type = button.getAttribute('data-type') === 'code' ? 'código-fonte' : 'demonstração ao vivo';

      if (projModalDesc) {
        projModalDesc.textContent = `O link para ${type} do "${projectName}" está atualmente pendente de configuração no repositório.`;
      }

      openModal(projectModal);
    });
  });

  // --------------------------------------------------------------------------
  // 8. ANO ATUAL DINÂMICO & VOLTAR AO TOPO
  // --------------------------------------------------------------------------

  if (currentYearSpan) {
    currentYearSpan.textContent = String(new Date().getFullYear());
  }

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      // Mover foco para o topo para acessibilidade
      const heroTitle = document.getElementById('hero-title');
      if (heroTitle) {
        heroTitle.setAttribute('tabindex', '-1');
        heroTitle.focus();
      }
    });
  }

})();
