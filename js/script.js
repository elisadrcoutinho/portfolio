// Configuração inicial
document.body.style.overflow = 'hidden';

// Elementos DOM
const logo = document.getElementById('logo');
const sideMenu = document.getElementById('side-menu');
const mainContent = document.getElementById('main-content');
const footer = document.querySelector('footer');
const preloader = document.querySelector('.preloader');
const sections = document.querySelectorAll('section');

// Menu lateral
logo.addEventListener('click', () => {
  sideMenu.classList.toggle('open');
});

// Botões de navegação com fade
document.querySelectorAll('.button').forEach(button => {
  button.addEventListener('click', function(e) {
    const href = button.getAttribute('href');
    if (!href.startsWith("#")) {
      e.preventDefault();
      const content = document.querySelector('.content');
      content.classList.add('fade-out');
      setTimeout(() => {
        window.location.href = href;
      }, 600);
    }
  });
});

// Animação de reveal ao scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.reveal, .timeline-item').forEach(el => {
  observer.observe(el);
});

// Animação de digitação do título
function typeTitle() {
  const typedTitleElement = document.getElementById("typed-title");
  if (!typedTitleElement) return;
  
  const typedTitleText = typedTitleElement.dataset.text || "Explora el Futuro.";
  let titleIndex = 0;
  
  function type() {
    if (titleIndex < typedTitleText.length) {
      typedTitleElement.textContent += typedTitleText.charAt(titleIndex);
      titleIndex++;
      setTimeout(type, 150);
    } else {
      typedTitleElement.style.borderRight = "none";
    }
  }
  type();
}

// Gerenciamento do preloader
window.addEventListener('load', function() {
  if (!localStorage.getItem('preloaderShown')) {
    setTimeout(() => {
      if (preloader) {
        preloader.classList.add('fade-out');
        setTimeout(() => {
          preloader.style.display = 'none';
          if (mainContent) mainContent.style.opacity = 1;
          if (footer) footer.style.opacity = 1;
          document.body.style.overflow = 'auto';
          typeTitle();
          localStorage.setItem('preloaderShown', 'true');
        }, 1100);
      }
    }, 3000);
  } else {
    if (preloader) preloader.style.display = 'none';
    if (mainContent) mainContent.style.opacity = 1;
    if (footer) footer.style.opacity = 1;
    document.body.style.overflow = 'auto';
    typeTitle();
  }
});

// Botão voltar ao topo
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.style.display = "block";
    } else {
      backToTopBtn.style.display = "none";
    }
  });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


// Event listeners para o modal
document.querySelector('.close')?.addEventListener('click', closeModal);

// Gerenciamento do formulário overlay
const overlayForm = document.getElementById('overlay-form');
let modalWasOpen = false;

function mostrarFormulario() {
  const modal = document.getElementById('productModal');
  if (modal && modal.classList.contains('open')) {
    modalWasOpen = true;
    modal.classList.remove('open');
  } else {
    modalWasOpen = false;
  }
  if (overlayForm) overlayForm.classList.add('open');
}

function fecharFormulario() {
  if (overlayForm) {
    overlayForm.classList.remove('open');
    if (modalWasOpen) {
      const modal = document.getElementById('productModal');
      if (modal) {
        setTimeout(() => {
          modal.classList.add('open');
        }, 0);
      }
    }
  }
}

// Animação dos contadores
const counters = document.querySelectorAll('.counter');
if (counters.length > 0) {
  const animateCounters = () => {
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.textContent;
        const increment = target / 200;
        if (count < target) {
          counter.textContent = Math.ceil(count + increment);
          setTimeout(updateCount, 20);
        } else {
          counter.textContent = target;
        }
      };
      updateCount();
    });
  };

  const resultsSection = document.getElementById('results');
  if (resultsSection) {
    const resultsObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          resultsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    resultsObserver.observe(resultsSection);
  }
}

// Seta para baixo
const downArrow = document.getElementById('down-arrow');
if (downArrow) {
  setTimeout(() => {
    downArrow.style.display = 'block';
  }, 3500);

  downArrow.addEventListener('click', () => {
    const target = document.getElementById('quienes-somos') || document.querySelector('.carreras-header');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// Formulário de carreira
function mostrarFormularioCarreira() {
  const overlayFormCareer = document.getElementById("overlay-form-career");
  if (overlayFormCareer) {
    overlayFormCareer.classList.add("open");
  }
}

function fecharFormularioCarreira() {
  const overlayFormCareer = document.getElementById("overlay-form-career");
  if (overlayFormCareer) {
    overlayFormCareer.classList.remove("open");
  }
}

// Configuração dos botões de vaga
document.querySelectorAll('.vacancy-card .btn').forEach(btn => {
  btn.setAttribute('onclick', 'mostrarFormularioCarreira()');
  btn.setAttribute('href', 'javascript:void(0);');
});