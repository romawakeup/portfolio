// Мобильное меню
const hamburger = document.querySelector('.navbar__hamburger');
const navMenu = document.querySelector('.navbar__menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Закрытие мобильного меню при клике на ссылку
document.querySelectorAll('.navbar__link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Плавная прокрутка для навигационных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Изменение шапки при скролле
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Фильтрация портфолио (перенесена в Swiper инициализацию)

// Анимация появления элементов при скролле
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

// Наблюдаем за элементами для анимации
document.querySelectorAll('.about__text, .about__stats, .contact__info, .contact__form').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Обработка формы контактов
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Получаем данные формы
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Простая валидация
    if (!name || !email || !subject || !message) {
        showNotification('Пожалуйста, заполните все поля', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Пожалуйста, введите корректный email', 'error');
        return;
    }
    
    // Имитация отправки (здесь можно добавить реальную отправку)
    showNotification('Сообщение отправлено! Я свяжусь с вами в ближайшее время.', 'success');
    contactForm.reset();
});

// Валидация email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Показ уведомлений
function showNotification(message, type) {
    // Удаляем существующие уведомления
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Создаем новое уведомление
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Стили для уведомления
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    if (type === 'success') {
        notification.style.background = '#10b981';
    } else {
        notification.style.background = '#ef4444';
    }
    
    document.body.appendChild(notification);
    
    // Анимация появления
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Автоматическое скрытие
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Плавное появление секций при скролле
const sections = document.querySelectorAll('section');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    sectionObserver.observe(section);
});

// Исключение для главной секции
const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroSection.style.opacity = '1';
    heroSection.style.transform = 'translateY(0)';
}

// Эффект печатания для заголовка
function typeWriter(element, text, speed = 100) {
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

// Запуск эффекта печатания после загрузки страницы
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-banner__title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 80);
    }
});

// Параллакс эффект для hero секции
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-banner');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Добавление активного класса к навигационным ссылкам при скролле
const navLinks = document.querySelectorAll('.navbar__link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Стили для активной ссылки навигации
const style = document.createElement('style');
style.textContent = `
    .navbar__link.active {
        color: #6366f1;
    }
    .navbar__link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Инициализация анимаций при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Добавляем класс для анимаций
    document.body.classList.add('loaded');
    
    // Анимация счетчиков в секции "О себе"
    const stats = document.querySelectorAll('.stat__number');
    const animateCounters = () => {
        stats.forEach(stat => {
            const target = parseInt(stat.textContent);
            const increment = target / 50;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    stat.textContent = Math.ceil(current) + (stat.textContent.includes('%') ? '%' : '+');
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target + (stat.textContent.includes('%') ? '%' : '+');
                }
            };
            
            updateCounter();
        });
    };
    
    // Запускаем анимацию счетчиков когда секция становится видимой
    const aboutSection = document.querySelector('.about');
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                aboutObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (aboutSection) {
        aboutObserver.observe(aboutSection);
    }
});

// Инициализация Swiper для портфолио
document.addEventListener('DOMContentLoaded', () => {
    const portfolioSwiper = new Swiper('.portfolio-swiper', {
        // Основные настройки
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        
        // Навигация
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        
        // Пагинация
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        
        // Адаптивность
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
        },
        
        // Эффекты
        effect: 'slide',
        speed: 600,
        
        // Дополнительные настройки
        grabCursor: true,
        keyboard: {
            enabled: true,
        },
        mousewheel: {
            invert: false,
        },
        
        // События для работы с видео
        on: {
            slideChange: function() {
                // Останавливаем все видео при смене слайда
                const videos = document.querySelectorAll('.portfolio-item video');
                videos.forEach(video => {
                    video.pause();
                });
            },
            init: function() {
                // Инициализация видео элементов
                const videos = document.querySelectorAll('.portfolio-item video');
                videos.forEach(video => {
                    video.addEventListener('play', function() {
                        // Останавливаем другие видео при воспроизведении текущего
                        videos.forEach(otherVideo => {
                            if (otherVideo !== video) {
                                otherVideo.pause();
                            }
                        });
                    });
                });
            }
        },
    });
    
    // Интеграция с фильтрами портфолио
    const filterButtons = document.querySelectorAll('.filter-btn');
    const swiperSlides = document.querySelectorAll('.swiper-slide');
    
    // Функция для фильтрации слайдов
    function filterSlides(filterValue) {
        swiperSlides.forEach(slide => {
            const portfolioItem = slide.querySelector('.portfolio-item');
            if (portfolioItem) {
                if (filterValue === 'all') {
                    slide.style.display = 'block';
                    slide.classList.remove('hidden');
                } else {
                    if (portfolioItem.getAttribute('data-category') === filterValue) {
                        slide.style.display = 'block';
                        slide.classList.remove('hidden');
                    } else {
                        slide.style.display = 'none';
                        slide.classList.add('hidden');
                    }
                }
            }
        });
        
        // Обновляем Swiper после изменения видимости слайдов
        setTimeout(() => {
            portfolioSwiper.update();
            // Переходим к первому видимому слайду
            const visibleSlides = Array.from(swiperSlides).filter(slide => 
                slide.style.display !== 'none' && !slide.classList.contains('hidden')
            );
            if (visibleSlides.length > 0) {
                const firstVisibleIndex = Array.from(swiperSlides).indexOf(visibleSlides[0]);
                portfolioSwiper.slideTo(firstVisibleIndex);
            }
            
            // Обновляем медиа элементы для модального окна
            collectMediaItems();
        }, 100);
    }
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Убираем активный класс со всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('filter-btn--active'));
            // Добавляем активный класс к нажатой кнопке
            button.classList.add('filter-btn--active');
            
            const filterValue = button.getAttribute('data-filter');
            filterSlides(filterValue);
        });
    });
    
    // Инициализируем с фильтром "Все работы"
    filterSlides('all');
    
    // Модальное окно для просмотра медиа
    const modal = document.getElementById('mediaModal');
    const modalImage = document.getElementById('modalImage');
    const modalVideo = document.getElementById('modalVideo');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalClose = document.getElementById('modalClose');
    const modalPrev = document.getElementById('modalPrev');
    const modalNext = document.getElementById('modalNext');
    
    let currentMediaIndex = 0;
    let currentMediaItems = [];
    
    // Собираем все медиа элементы
    function collectMediaItems() {
        currentMediaItems = [];
        const visibleSlides = Array.from(swiperSlides).filter(slide => 
            slide.style.display !== 'none' && !slide.classList.contains('hidden')
        );
        
        visibleSlides.forEach(slide => {
            const portfolioItem = slide.querySelector('.portfolio-item');
            if (portfolioItem) {
                const img = portfolioItem.querySelector('img');
                const video = portfolioItem.querySelector('video');
                
                if (img) {
                    currentMediaItems.push({
                        type: 'image',
                        src: img.src,
                        alt: img.alt,
                        title: img.alt,
                        description: 'Фотография из портфолио'
                    });
                }
                
                if (video) {
                    currentMediaItems.push({
                        type: 'video',
                        src: video.src,
                        title: 'Видео из портфолио',
                        description: 'Видео контент'
                    });
                }
            }
        });
    }
    
    // Открытие модального окна
    function openModal(index) {
        currentMediaIndex = index;
        collectMediaItems();
        
        if (currentMediaItems.length === 0) return;
        
        const media = currentMediaItems[currentMediaIndex];
        
        // Скрываем все медиа
        modalImage.style.display = 'none';
        modalVideo.style.display = 'none';
        
        if (media.type === 'image') {
            modalImage.src = media.src;
            modalImage.alt = media.alt;
            modalImage.style.display = 'block';
        } else if (media.type === 'video') {
            modalVideo.src = media.src;
            modalVideo.style.display = 'block';
        }
        
        modalTitle.textContent = media.title;
        modalDescription.textContent = media.description;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Закрытие модального окна
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Останавливаем видео при закрытии
        modalVideo.pause();
    }
    
    // Навигация по медиа
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
    modalClose.addEventListener('click', closeModal);
    modalPrev.addEventListener('click', showPrev);
    modalNext.addEventListener('click', showNext);
    
    // Закрытие по клику на overlay
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('modal__overlay')) {
            closeModal();
        }
    });
    
    // Закрытие по Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Навигация клавишами
    document.addEventListener('keydown', (e) => {
        if (modal.classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                showPrev();
            } else if (e.key === 'ArrowRight') {
                showNext();
            }
        }
    });
    
    // Добавляем обработчики клика на медиа элементы
    swiperSlides.forEach((slide, slideIndex) => {
        const portfolioItem = slide.querySelector('.portfolio-item');
        if (portfolioItem) {
            const img = portfolioItem.querySelector('img');
            const video = portfolioItem.querySelector('video');
            
            if (img) {
                img.style.cursor = 'pointer';
                img.addEventListener('click', () => {
                    // Находим индекс этого элемента среди видимых
                    const visibleSlides = Array.from(swiperSlides).filter(s => 
                        s.style.display !== 'none' && !s.classList.contains('hidden')
                    );
                    const mediaIndex = visibleSlides.indexOf(slide);
                    openModal(mediaIndex);
                });
            }
            
            if (video) {
                video.style.cursor = 'pointer';
                video.addEventListener('click', () => {
                    // Находим индекс этого элемента среди видимых
                    const visibleSlides = Array.from(swiperSlides).filter(s => 
                        s.style.display !== 'none' && !s.classList.contains('hidden')
                    );
                    const mediaIndex = visibleSlides.indexOf(slide);
                    openModal(mediaIndex);
                });
            }
        }
    });
});