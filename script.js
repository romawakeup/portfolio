// Портфолио сайт - Оптимизированный JavaScript код
// Автор: Roman Wakeup

// Конфигурация
const CONFIG = {
  scrollThreshold: 100,
  animationSpeed: 300,
  notificationDuration: 4000,
  typewriterSpeed: 80
};

// Кэш DOM элементов
const DOM = {
  hamburger: null,
  navMenu: null,
  header: null,
  sections: null,
  navLinks: null,
  contactForm: null,
  portfolioSwiper: null,
  modal: null,
  modalImage: null,
  modalVideo: null,
  modalClose: null,
  modalPrev: null,
  modalNext: null
};

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', init);

function init() {
  cacheDOMElements();
  initMobileMenu();
  initSmoothScroll();
  initScrollEffects();
  initContactForm();
  initPortfolioSwiper();
  initModal();
  initAnimations();
  
  // Добавляем класс для анимаций
  document.body.classList.add('loaded');
}

// Кэширование DOM элементов
function cacheDOMElements() {
  DOM.hamburger = document.querySelector('.navbar__hamburger');
  DOM.navMenu = document.querySelector('.navbar__menu');
  DOM.header = document.querySelector('.header');
  DOM.sections = document.querySelectorAll('section');
  DOM.navLinks = document.querySelectorAll('.navbar__link');
  DOM.contactForm = document.getElementById('contactForm');
  DOM.modal = document.getElementById('mediaModal');
  DOM.modalImage = document.getElementById('modalImage');
  DOM.modalVideo = document.getElementById('modalVideo');
  DOM.modalClose = document.getElementById('modalClose');
  DOM.modalPrev = document.getElementById('modalPrev');
  DOM.modalNext = document.getElementById('modalNext');
}

// Мобильное меню
function initMobileMenu() {
  if (!DOM.hamburger || !DOM.navMenu) return;

  DOM.hamburger.addEventListener('click', toggleMobileMenu);
  
  // Закрытие при клике на ссылку
  DOM.navLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
}

function toggleMobileMenu() {
  DOM.hamburger.classList.toggle('active');
  DOM.navMenu.classList.toggle('active');
}

function closeMobileMenu() {
  DOM.hamburger.classList.remove('active');
  DOM.navMenu.classList.remove('active');
}

// Плавная прокрутка
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', handleSmoothScroll);
  });
}

function handleSmoothScroll(e) {
  e.preventDefault();
  const target = document.querySelector(this.getAttribute('href'));
  if (target) {
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Эффекты при скролле
function initScrollEffects() {
  window.addEventListener('scroll', throttle(handleScroll, 16));
}

function handleScroll() {
  updateHeaderOnScroll();
  updateActiveNavLink();
  updateParallaxEffect();
}

function updateHeaderOnScroll() {
  if (!DOM.header) return;
  
  const scrolled = window.pageYOffset > CONFIG.scrollThreshold;
  DOM.header.style.background = scrolled 
    ? 'rgba(255, 255, 255, 0.98)' 
    : 'rgba(255, 255, 255, 0.95)';
  DOM.header.style.boxShadow = scrolled 
    ? '0 2px 20px rgba(0, 0, 0, 0.1)' 
    : 'none';
}

function updateActiveNavLink() {
  if (!DOM.sections || !DOM.navLinks) return;

  let current = '';
  DOM.sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  DOM.navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

function updateParallaxEffect() {
  const hero = document.querySelector('.hero-banner');
  if (hero) {
    const rate = window.pageYOffset * -0.5;
    hero.style.transform = `translateY(${rate}px)`;
  }
}

// Обработка формы контактов
function initContactForm() {
  if (!DOM.contactForm) return;

  DOM.contactForm.addEventListener('submit', handleFormSubmit);
}

function handleFormSubmit(e) {
  e.preventDefault();
  
  const formData = new FormData(DOM.contactForm);
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message')
  };

  if (!validateForm(data)) return;

  showNotification(
    'Сообщение отправлено! Я свяжусь с вами в ближайшее время.',
    'success'
  );
  DOM.contactForm.reset();
}

function validateForm(data) {
  const { name, email, subject, message } = data;
  
  if (!name || !email || !subject || !message) {
    showNotification('Пожалуйста, заполните все поля', 'error');
    return false;
  }

  if (!isValidEmail(email)) {
    showNotification('Пожалуйста, введите корректный email', 'error');
    return false;
  }

  return true;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Система уведомлений
function showNotification(message, type) {
  removeExistingNotification();
  
  const notification = createNotificationElement(message, type);
  document.body.appendChild(notification);
  
  animateNotification(notification);
  scheduleNotificationRemoval(notification);
}

function removeExistingNotification() {
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();
}

function createNotificationElement(message, type) {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  Object.assign(notification.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '15px 20px',
    borderRadius: '8px',
    color: 'white',
    fontWeight: '500',
    zIndex: '10000',
    transform: 'translateX(100%)',
    transition: 'transform 0.3s ease',
    maxWidth: '300px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    background: type === 'success' ? '#10b981' : '#ef4444'
  });

  return notification;
}

function animateNotification(notification) {
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
}

function scheduleNotificationRemoval(notification) {
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, CONFIG.notificationDuration);
}

// Swiper для портфолио
function initPortfolioSwiper() {
  if (typeof Swiper === 'undefined') {
    console.warn('Swiper не загружен, пропускаем инициализацию портфолио');
    return;
  }

  DOM.portfolioSwiper = new Swiper('.portfolio-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      768: { slidesPerView: 2, spaceBetween: 20 },
      1024: { slidesPerView: 3, spaceBetween: 30 }
    },
    effect: 'slide',
    speed: 600,
    grabCursor: true,
    keyboard: { enabled: true },
    mousewheel: { invert: false },
    on: {
      slideChange: handleSlideChange,
      init: initVideoElements
    }
  });

  initPortfolioFilters();
}

function handleSlideChange() {
  const videos = document.querySelectorAll('.portfolio-item video');
  videos.forEach(video => video.pause());
}

function initVideoElements() {
  const videos = document.querySelectorAll('.portfolio-item video');
  videos.forEach(video => {
    video.addEventListener('play', () => pauseOtherVideos(video));
  });
}

function pauseOtherVideos(currentVideo) {
  const videos = document.querySelectorAll('.portfolio-item video');
  videos.forEach(video => {
    if (video !== currentVideo) video.pause();
  });
}

// Фильтры портфолио
function initPortfolioFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const swiperSlides = document.querySelectorAll('.swiper-slide');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      updateActiveFilter(button, filterButtons);
      const filterValue = button.getAttribute('data-filter');
      filterSlides(filterValue, swiperSlides);
    });
  });

  filterSlides('all', swiperSlides);
}

function updateActiveFilter(activeButton, allButtons) {
  allButtons.forEach(btn => btn.classList.remove('filter-btn--active'));
  activeButton.classList.add('filter-btn--active');
}

function filterSlides(filterValue, slides) {
  slides.forEach(slide => {
    const portfolioItem = slide.querySelector('.portfolio-item');
    if (!portfolioItem) return;

    const shouldShow = filterValue === 'all' || 
      portfolioItem.getAttribute('data-category') === filterValue;
    
    slide.style.display = shouldShow ? 'block' : 'none';
    slide.classList.toggle('hidden', !shouldShow);
  });

  setTimeout(() => {
    if (DOM.portfolioSwiper) {
      DOM.portfolioSwiper.update();
    }
    updateModalMediaItems();
  }, 100);
}

// Модальное окно
function initModal() {
  if (!DOM.modal) return;

  let currentMediaIndex = 0;
  let currentMediaItems = [];

  function collectMediaItems() {
    currentMediaItems = [];
    const visibleSlides = Array.from(document.querySelectorAll('.swiper-slide'))
      .filter(slide => slide.style.display !== 'none' && !slide.classList.contains('hidden'));

    visibleSlides.forEach(slide => {
      const portfolioItem = slide.querySelector('.portfolio-item');
      if (!portfolioItem) return;

      const img = portfolioItem.querySelector('img');
      const video = portfolioItem.querySelector('video');

      if (img) {
        currentMediaItems.push({
          type: 'image',
          src: img.src,
          alt: img.alt || 'Фотография из портфолио'
        });
      }

      if (video) {
        currentMediaItems.push({
          type: 'video',
          src: video.src
        });
      }
    });
  }

  function openModal(index) {
    currentMediaIndex = index;
    collectMediaItems();
    if (currentMediaItems.length === 0) return;

    const media = currentMediaItems[currentMediaIndex];
    DOM.modalImage.style.display = 'none';
    DOM.modalVideo.style.display = 'none';

    if (media.type === 'image') {
      DOM.modalImage.src = media.src;
      DOM.modalImage.alt = media.alt;
      DOM.modalImage.style.display = 'block';
    } else if (media.type === 'video') {
      DOM.modalVideo.src = media.src;
      DOM.modalVideo.style.display = 'block';
    }

    DOM.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    DOM.modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    DOM.modalVideo.pause();
  }

  function showNext() {
    if (currentMediaItems.length === 0) return;
    currentMediaIndex = (currentMediaIndex + 1) % currentMediaItems.length;
    openModal(currentMediaIndex);
  }

  function showPrev() {
    if (currentMediaItems.length === 0) return;
    currentMediaIndex = (currentMediaIndex - 1 + currentMediaItems.length) % currentMediaItems.length;
    openModal(currentMediaIndex);
  }

  // Обработчики событий
  DOM.modalClose?.addEventListener('click', closeModal);
  DOM.modalPrev?.addEventListener('click', showPrev);
  DOM.modalNext?.addEventListener('click', showNext);

  DOM.modal.addEventListener('click', (e) => {
    if (e.target === DOM.modal || e.target.classList.contains('modal__overlay')) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && DOM.modal.classList.contains('active')) {
      closeModal();
    }
    
    if (DOM.modal.classList.contains('active')) {
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    }
  });

  // Обработчики клика на медиа элементы
  document.querySelectorAll('.swiper-slide').forEach((slide, slideIndex) => {
    const portfolioItem = slide.querySelector('.portfolio-item');
    if (!portfolioItem) return;

    const img = portfolioItem.querySelector('img');
    const video = portfolioItem.querySelector('video');

    [img, video].forEach(media => {
      if (media) {
        media.style.cursor = 'pointer';
        media.addEventListener('click', () => {
          const visibleSlides = Array.from(document.querySelectorAll('.swiper-slide'))
            .filter(s => s.style.display !== 'none' && !s.classList.contains('hidden'));
          const mediaIndex = visibleSlides.indexOf(slide);
          openModal(mediaIndex);
        });
      }
    });
  });

  // Экспорт для обновления медиа элементов
  window.updateModalMediaItems = collectMediaItems;
}

// Функция для обновления медиа элементов (экспортированная)
function updateModalMediaItems() {
  if (typeof window.updateModalMediaItems === 'function') {
    window.updateModalMediaItems();
  }
}

// Анимации
function initAnimations() {
  initScrollAnimations();
  initTypewriterEffect();
  initCounterAnimations();
}

function initScrollAnimations() {
  if (!DOM.sections || DOM.sections.length === 0) return;
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  DOM.sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
  });

  // Исключение для главной секции
  const heroSection = document.querySelector('.hero-banner');
  if (heroSection) {
    heroSection.style.opacity = '1';
    heroSection.style.transform = 'translateY(0)';
  }
}

function initTypewriterEffect() {
  window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-banner__title');
    if (heroTitle && heroTitle.textContent && heroTitle.textContent.trim()) {
      const originalText = heroTitle.textContent;
      typeWriter(heroTitle, originalText, CONFIG.typewriterSpeed);
    }
  });
}

function typeWriter(element, text, speed = 100) {
  if (!element || !text || typeof text !== 'string') return;
  
  let i = 0;
  element.innerHTML = '';

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

function initCounterAnimations() {
  const aboutSection = document.querySelector('.about');
  if (!aboutSection) return;

  const aboutObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          aboutObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  aboutObserver.observe(aboutSection);
}

function animateCounters() {
  const counters = document.querySelectorAll('.stat__number');
  if (counters.length === 0) return;
  
  counters.forEach(counter => {
    if (!counter.textContent) return;
    
    const target = parseInt(counter.textContent.replace(/\D/g, ''));
    if (isNaN(target)) return;

    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = counter.textContent.replace(/\d+/, target);
        clearInterval(timer);
      } else {
        counter.textContent = counter.textContent.replace(/\d+/, Math.floor(current));
      }
    }, 30);
  });
}

// Утилиты
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Добавление стилей для активной ссылки навигации
const navStyle = document.createElement('style');
navStyle.textContent = `
  .navbar__link.active {
    color: #6366f1;
  }
  .navbar__link.active::after {
    width: 100%;
  }
`;
document.head.appendChild(navStyle);