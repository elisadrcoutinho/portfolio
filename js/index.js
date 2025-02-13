document.body.style.overflow = 'hidden';
  
const logo = document.getElementById('logo');
const sideMenu = document.getElementById('side-menu');
const mainContent = document.getElementById('main-content');
const footer = document.querySelector('footer');
const preloader = document.querySelector('.preloader');
const sections = document.querySelectorAll('section');

logo.addEventListener('click', () => {
  sideMenu.classList.toggle('open');
});

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

const revealSection = () => {
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < window.innerHeight - 150) {
      section.classList.add('visible');
    }
  });
};
window.addEventListener('scroll', revealSection);
function typeTitle() {
const typedTitleText = "Elisa Drummond";
const typedTitleElement = document.getElementById("typed-title");
let titleIndex = 0;
let isDeleting = false;

function type() {
if (!isDeleting) {
  typedTitleElement.textContent += typedTitleText.charAt(titleIndex);
  titleIndex++;
  if (titleIndex === typedTitleText.length) {
    setTimeout(() => {
      isDeleting = true;
      type();
    }, 2000); 
  } else {
    setTimeout(type, 200); 
  }
} else {
  typedTitleElement.textContent = typedTitleText.substring(0, titleIndex);
  titleIndex--;
  if (titleIndex < 0) {
    isDeleting = false;
    setTimeout(type, 2000); 
  } else {
    setTimeout(type, 100); 
  }
}
}

type();
}

window.addEventListener('load', function() {
if (!localStorage.getItem('preloaderShown')) {
setTimeout(() => {
  preloader.classList.add('fade-out');
  setTimeout(() => {
    preloader.style.display = 'none';
    mainContent.style.opacity = 1;
    footer.style.opacity = 1;
    document.body.style.overflow = 'auto';

    typeTitle();
    localStorage.setItem('preloaderShown', 'true');
  }, 3000);
}, 3000);
} else {
preloader.style.display = 'none';
mainContent.style.opacity = 1;
footer.style.opacity = 1;
document.body.style.overflow = 'auto';
typeTitle();
}
});
