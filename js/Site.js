document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = navMenu.querySelectorAll('a[href^="#"]'); // Ищем ссылки внутри меню

    // Функция для открытия/закрытия меню
    function toggleMenu() {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('is-active');
    }

    // Функция для закрытия меню
    function closeMenu() {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('is-active');
    }

    // Обработчик клика на кнопку меню
    menuToggle.addEventListener('click', toggleMenu);

    // Обработчик клика по ссылкам внутри меню
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Если клик произошел, когда меню уже открыто, закрываем его
            if (navMenu.classList.contains('active')) {
                closeMenu();
                // Проверка, чтобы избежать двойного скролла, если ссылка ведет к текущей секции
                const href = this.getAttribute('href');
                if (href.startsWith('#') && document.querySelector(href)) {
                    e.preventDefault(); // Предотвращаем стандартное поведение, если есть якорь
                }
            }
        });
    });

    // Закрытие меню при клике вне его области
    document.addEventListener('click', function(e) {
        // Проверяем, кликнули ли мы вне меню и вне кнопки-переключателя
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // Плавный скролл к секциям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Проверяем, является ли ссылка якорем и существует ли соответствующий элемент
            if (href.startsWith('#') && document.querySelector(href)) {
                e.preventDefault(); // Предотвращаем переход по ссылке без JS
                const targetElement = document.querySelector(href);
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start' // Прокручиваем к началу элемента
                });

                // Если мы открыли меню, чтобы нажать на ссылку, нужно его закрыть после скролла */
                // Эта логика уже встроена в обработчик click для navLinks
            }
        });
    });
});
