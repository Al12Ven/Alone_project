/*
 * ==========================================================================
 * JAVASCRIPT ДЛЯ САЙТА AlR1_Beats
 * Файл: js/Site.js
 * ==========================================================================
 */

// ======================== API МОДУЛЬ ========================

const API_URL = 'http://localhost/serverAlone/index.php';

function sendToServer(action, data) {
    const formData = new FormData();
    formData.append('action', action);

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            formData.append(key, data[key]);
        }
    }

    return fetch(API_URL, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('HTTP ошибка: ' + response.status);
        }
        return response.json();
    })
    .catch(error => {
        console.error('Ошибка сети:', error);
        throw error;
    });
}

function registerUser(name, email, password, passwordConfirm) {
    return sendToServer('register', {
        name: name,
        email_signup: email,
        password_signup: password,
        password_confirm: passwordConfirm
    });
}

function sendFeedback(name, email, message) {
    return sendToServer('feedback', {
        name: name,
        email: email,
        message: message
    });
}

function getUserProfile(userId) {
    return sendToServer('get_profile', {
        user_id: userId
    });
}

function updateUserProfile(userId, profileData) {
    return sendToServer('update_profile', {
        user_id: userId,
        bio: profileData.bio || '',
        avatar_url: profileData.avatar_url || ''
    });
}

function getUserRoles(userId) {
    return sendToServer('get_roles', {
        user_id: userId
    });
}

function loginUser(email, password) {
    const formData = new FormData();
    formData.append('action', 'login');
    formData.append('email_signup', email);
    formData.append('password_signup', password);

    return fetch(API_URL, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .catch(error => {
        console.error('Ошибка сети:', error);
        throw error;
    });
}

function logoutUser() {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    sessionStorage.clear();
    window.location.href = 'index.html';
}

function checkAuth() {
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');

    if (userId && userName) {
        return { id: userId, name: userName };
    }
    return null;
}

// ======================== ВАЛИДАЦИЯ ========================

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^(\+7|8)\s?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;
const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s-]{2,50}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
const trackNameRegex = /^[a-zA-Zа-яА-ЯёЁ0-9\s\-_().,!?]{1,100}$/;

function validateEmail(email) {
    return emailRegex.test(email);
}

function validatePhone(phone) {
    if (phone.trim() === '') return true;
    return phoneRegex.test(phone);
}

function validateName(name) {
    return nameRegex.test(name);
}

function validatePassword(password) {
    return passwordRegex.test(password);
}

function validateTrack(track) {
    if (track.trim() === '') return false;
    return trackNameRegex.test(track.trim());
}

// ======================== МОБИЛЬНОЕ МЕНЮ ========================

const menuToggle = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('is-active');
    });

    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('is-active');
        });
    });

    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('is-active');
        }
    });
}

// ======================== СЛАЙДЕР ========================

const slider = document.querySelector('.slider');

if (slider) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('sliderPrev');
    const nextBtn = document.getElementById('sliderNext');
    let currentSlide = 0;
    let slideInterval;

    function goToSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    function startAutoPlay() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
        clearInterval(slideInterval);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            prevSlide();
            stopAutoPlay();
            startAutoPlay();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            nextSlide();
            stopAutoPlay();
            startAutoPlay();
        });
    }

    dots.forEach(function(dot, index) {
        dot.addEventListener('click', function() {
            goToSlide(index);
            stopAutoPlay();
            startAutoPlay();
        });
    });

    slider.addEventListener('mouseenter', stopAutoPlay);
    slider.addEventListener('mouseleave', startAutoPlay);
    startAutoPlay();
}

// ======================== ВКЛАДКИ (ПРОФИЛЬ) ========================

const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

if (tabButtons.length > 0) {
    tabButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            tabButtons.forEach(function(btn) {
                btn.classList.remove('active');
            });
            tabPanes.forEach(function(pane) {
                pane.classList.remove('active');
            });

            button.classList.add('active');
            const tabId = button.getAttribute('tab');
            const activePane = document.getElementById(tabId);
            if (activePane) {
                activePane.classList.add('active');
            }
        });
    });
}

// ======================== ИНИЦИАЛИЗАЦИЯ ========================

document.addEventListener('DOMContentLoaded', function() {
    // Базовая инициализация — только меню и слайдер
    // Все эффекты отключены для стабильности
});

// ======================== ФОРМА РЕГИСТРАЦИИ ========================

const signupForm = document.getElementById('signup-form');

if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email-signup').value.trim();
        const password = document.getElementById('password-signup').value.trim();
        const passwordConfirm = document.getElementById('password-confirm').value.trim();

        if (!validateName(name)) {
            alert('Ошибка: Имя должно содержать только буквы (2-50 символов)');
            return;
        }

        if (!validateEmail(email)) {
            alert('Ошибка: Введите корректный email');
            return;
        }

        if (!validatePassword(password)) {
            alert('Ошибка: Пароль должен содержать минимум 6 символов, включая буквы и цифры');
            return;
        }

        if (password !== passwordConfirm) {
            alert('Ошибка: Пароли не совпадают');
            return;
        }

        registerUser(name, email, password, passwordConfirm)
            .then(data => {
                if (data.status === 'success') {
                    alert('Регистрация успешна!');
                    signupForm.reset();
                    if (data.user_id) {
                        localStorage.setItem('userId', data.user_id);
                        localStorage.setItem('userName', name);
                        localStorage.setItem('userEmail', email);
                    }
                    window.location.href = 'profile.html';
                } else {
                    alert('Ошибка: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Ошибка регистрации:', error);
                alert('Ошибка отправки данных. Проверьте:\n1. Запущен ли XAMPP\n2. Создана ли база данных alr1');
            });
    });
}

// ======================== ФОРМА ВХОДА ========================

const loginForm = document.getElementById('login-form');

if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value.trim();

        if (!email || !password) {
            alert('Пожалуйста, заполните все поля!');
            return;
        }

        loginUser(email, password)
            .then(data => {
                if (data.status === 'success') {
                    localStorage.setItem('userId', data.user_id);
                    localStorage.setItem('userName', data.name);
                    localStorage.setItem('userEmail', email);
                    alert('Вход выполнен успешно!');
                    loginForm.reset();
                    window.location.href = 'profile.html';
                } else {
                    alert('Ошибка: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Ошибка:', error);
                alert('Ошибка входа. Проверьте email и пароль.');
            });
    });
}

// ======================== ФОРМА ОБРАТНОЙ СВЯЗИ ========================

const feedbackForm = document.getElementById('feedback-form');

if (feedbackForm) {
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('feedback-name').value.trim();
        const email = document.getElementById('feedback-email').value.trim();
        const message = document.getElementById('feedback-message').value.trim();

        if (!name || !email || !message) {
            alert('Пожалуйста, заполните все поля!');
            return;
        }

        sendFeedback(name, email, message)
            .then(data => {
                if (data.status === 'success') {
                    alert('Сообщение отправлено!');
                    feedbackForm.reset();
                    const modalElement = document.getElementById('feedbackModal');
                    const modal = bootstrap.Modal.getInstance(modalElement);
                    if (modal) {
                        modal.hide();
                    }
                } else {
                    alert('Ошибка: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Ошибка:', error);
                alert('Ошибка отправки сообщения');
            });
    });
}

// ======================== ФОРМА ЗАЯВКИ ========================

const applicationForm = document.getElementById('application-form');

if (applicationForm) {
    applicationForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const artistName = document.getElementById('artist-name-app').value.trim();
        const emailInput = document.getElementById('application-email').value.trim();
        const phone = document.getElementById('application-phone').value.trim();
        const genre = document.getElementById('application-genre').value;
        const trackCount = document.getElementById('application-tracks').value;
        const trackName = document.getElementById('track').value.trim();
        const experience = document.querySelector('input[name="experience"]:checked');
        const experienceValue = experience ? experience.value : '';
        const socialLinks = document.getElementById('application-social').value.trim();
        const agreeRules = document.getElementById('agree-rules').checked;
        const agreeNewsletter = document.getElementById('agree-newsletter').checked;

        // Если пользователь залогинен — берём его email
        const authData = checkAuth();
        let email = authData ? localStorage.getItem('userEmail') : emailInput;

        // Если из localStorage пусто — берём из поля ввода
        if (!email) {
            email = emailInput;
        }

        if (!validateName(artistName)) {
            alert('Ошибка: Имя должно содержать только буквы (2-50 символов)');
            return;
        }

        if (!validateEmail(email)) {
            alert('Ошибка: Введите корректный email');
            return;
        }

        if (!validatePhone(phone)) {
            alert('Ошибка: Введите корректный телефон');
            return;
        }

        if (!genre) {
            alert('Ошибка: Выберите жанр музыки');
            return;
        }

        const trackNum = parseInt(trackCount);
        if (isNaN(trackNum) || trackNum < 1 || trackNum > 100) {
            alert('Ошибка: Количество треков должно быть от 1 до 100');
            return;
        }

        if (!validateTrack(trackName)) {
            alert('Ошибка: Название песни неверного формата (1-100 символов, допустимы буквы, цифры, пробелы и знаки -_().,!?)');
            return;
        }

        if (!experienceValue) {
            alert('Ошибка: Выберите ваш опыт работы');
            return;
        }

        if (!agreeRules) {
            alert('Ошибка: Необходимо согласиться с правилами сервиса');
            return;
        }

        const formData = new FormData();
        formData.append('action', 'application');
        formData.append('artist_name', artistName);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('genre', genre);
        formData.append('track_count', trackNum);
        formData.append('track_name', trackName);
        formData.append('experience', experienceValue);
        formData.append('social_links', socialLinks);
        formData.append('agree_rules', agreeRules ? '1' : '0');
        formData.append('agree_newsletter', agreeNewsletter ? '1' : '0');

        fetch(API_URL, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('Заявка отправлена!');
                applicationForm.reset();
                window.location.href = 'index.html';
            } else {
                alert('Ошибка: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Ошибка отправки заявки. Проверьте подключение.');
        });
    });
}

// ======================== ПРОФИЛЬ ========================

document.addEventListener('DOMContentLoaded', function() {
    const authData = checkAuth();
    if (!authData) return;

    // Автозаполняем email на странице заявки
    const emailField = document.getElementById('application-email');
    if (emailField) {
        emailField.value = localStorage.getItem('userEmail') || '';
    }

    // Загружаем профиль с сервера
    getUserProfile(authData.id)
        .then(data => {
            if (data.status === 'success' && data.profile) {
                const profile = data.profile;

                const nameEl = document.getElementById('artist-name');
                const emailEl = document.getElementById('artist-email');
                const bioEl = document.getElementById('bio-input');

                if (nameEl) nameEl.textContent = profile.name;
                if (emailEl) emailEl.textContent = profile.email_signup;
                if (bioEl) bioEl.value = profile.bio || '';
            }
        })
        .catch(error => {
            console.error('Ошибка загрузки профиля:', error);
        });

    // Кнопка выхода
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.style.display = 'inline-block';
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Вы уверены, что хотите выйти?')) {
                logoutUser();
            }
        });
    }

    // Загружаем заявки пользователя
    loadProfileApplications();
});

// ======================== СОХРАНЕНИЕ НАСТРОЕК ПРОФИЛЯ ========================

const profileSettingsForm = document.getElementById('settings-form');

if (profileSettingsForm) {
    profileSettingsForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const authData = checkAuth();
        if (!authData) {
            alert('Пожалуйста, войдите в систему!');
            return;
        }

        const bio = document.getElementById('bio-input').value.trim();

        updateUserProfile(authData.id, { bio: bio })
            .then(data => {
                if (data.status === 'success') {
                    alert('Профиль обновлён!');
                } else {
                    alert('Ошибка: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Ошибка:', error);
                alert('Ошибка сохранения настроек');
            });
    });
}



// ======================== ДОБАВИТЬ ТРЕК (ПЕРЕНАПРАВЛЕНИЕ) ========================

const addTrackBtn = document.getElementById('add-track-btn');

if (addTrackBtn) {
    addTrackBtn.addEventListener('click', function() {
        window.location.href = 'application.html';
    });
}

// =========== Заявки на выпуск музыки в профиле ========================

// Функция загружает список заявок пользователя из API и отображает их в профиле
async function loadProfileApplications() {
    // Получаем email пользователя из локального хранилища
    var email = localStorage.getItem('userEmail');
    console.log('loadProfileApplications: email =', email);
    // Если пользователь не авторизован — прерываем выполнение
    if (!email) return;

    // Формируем URL для запроса заявок пользователя через API
    var url = API_URL.replace('index.php', 'get.php') + '?action=get_user_applications&email=' + email;
    console.log('URL:', url);

    // Выполняем асинхронный запрос к API и получаем ответ
    var response = await fetch(url);
    // Преобразуем ответ из JSON-строки в JavaScript-объект (парсим)
    var data = await response.json();
    console.log('Ответ сервера:', data);

    // Находим контейнер, куда будем вставлять карточки заявок
    var container = document.getElementById('profile-applications-container');
    console.log('Контейнер:', container);
    // Извлекаем массив заявок из ответа сервера
    var list = data.applications;

    // Если заявок нет или массив пустой — выводим соответствующее сообщение
    if (!list || list.length === 0) {
        container.innerHTML = '<p>Заявок пока нет.</p>';
        return;
    }

    // Очищаем контейнер от предыдущего содержимого
    container.innerHTML = '';

    // Перебираем каждую заявку и создаём HTML-карточку
    for (var i = 0; i < list.length; i++) {
        var app = list[i];
        // Создаём новый div-элемент для карточки
        var card = document.createElement('div');
        card.className = 'application-card';
        // Заполняем карточку информацией о заявке
        card.innerHTML = '<h4>' + app.artist_name + '</h4>' +
            '<p>Трек: ' + app.track_name + '</p>' +
            '<p>Жанр: ' + app.genre + '</p>' +
            '<p>Кол-во: ' + app.track_count + '</p>';
        // Добавляем карточку в контейнер
        container.appendChild(card);
    }
}

