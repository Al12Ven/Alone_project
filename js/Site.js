/* 
 * ==========================================================================
 * JAVASCRIPT ДЛЯ САЙТА AlR1_Beats
 * Файл: js/Site.js
 * Назначение: Работа мобильного меню (открытие/закрытие)
 * ==========================================================================
 */

/* --------------------------------------------------------------------------
   1. ПОИСК ЭЛЕМЕНТОВ НА СТРАНИЦЕ
   -------------------------------------------------------------------------- */

// Находим кнопку бургера по её id="mobile-menu"
// const - объявление переменной (значение можно читать, нельзя менять)
const menuToggle = document.getElementById('mobile-menu');

// Находим навигационное меню по его id="nav-menu"
const navMenu = document.getElementById('nav-menu');


/* --------------------------------------------------------------------------
   2. ОБРАБОТЧИК КЛИКА НА БУРГЕР
   -------------------------------------------------------------------------- */

// Вешаем обработчик события "клик" на кнопку бургера
// addEventListener - метод для добавления обработчика
menuToggle.addEventListener('click', function() {
    
    // toggle - переключает класс: добавляет, если нет; удаляет, если есть
    // active - класс, который показывает меню
    navMenu.classList.toggle('active');
    
    // Переключаем класс is-active для анимации бургера (превращение в крестик)
    menuToggle.classList.toggle('is-active');
    
});


/* --------------------------------------------------------------------------
   3. ОБРАБОТЧИК КЛИКА НА ССЫЛКИ В МЕНЮ
   -------------------------------------------------------------------------- */

// Находим все ссылки внутри меню
// querySelectorAll - возвращает коллекцию всех найденных элементов
// 'a' - селектор тега (ищем все <a>)
const navLinks = navMenu.querySelectorAll('a');

// Перебираем каждую ссылку в коллекции
// forEach - метод перебора массива/коллекции
navLinks.forEach(function(link) {
    
    // Вешаем обработчик клика на каждую ссылку
    link.addEventListener('click', function() {
        
        // При клике на ссылку - закрываем меню
        // remove - удаляет класс
        navMenu.classList.remove('active');
        menuToggle.classList.remove('is-active');
        
    });
    
});


/* --------------------------------------------------------------------------
   4. ЗАКРЫТИЕ МЕНЮ ПРИ КЛИКЕ ВНЕ ЕГО ОБЛАСТИ
   -------------------------------------------------------------------------- */

// Вешаем обработчик клика на весь документ (страницу)
document.addEventListener('click', function(e) {
    
    // Проверяем условие: клик был НЕ по меню И НЕ по кнопке бургера
    // ! - логическое "НЕ" (отрицание)
    // contains - проверяет, содержит ли элемент другой элемент
    // e.target - элемент, по которому кликнули
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        
        // Если клик вне - закрываем меню
        navMenu.classList.remove('active');
        menuToggle.classList.remove('is-active');
        
    }
    
});





/* --------------------------------------------------------------------------
   КАК ЭТО РАБОТАЕТ (ПОШАГОВО):
   --------------------------------------------------------------------------

   1. Пользователь кликает на бургер (☰)
      → menuToggle.addEventListener срабатывает
      → navMenu получает класс 'active' → меню показывается
      → menuToggle получает класс 'is-active' → бургер становится крестиком

   2. Пользователь кликает на ссылку в меню
      → navLinks.forEach обрабатывает клик
      → Классы 'active' и 'is-active' удаляются → меню закрывается

   3. Пользователь кликает в пустое место (вне меню)
      → document.addEventListener проверяет условие
      → Если клик не по меню и не по бургеру → меню закрывается

   --------------------------------------------------------------------------
*/


/* ==========================================================================
   ФУНКЦИОНАЛ ЛИЧНОГО КАБИНЕТА АРТИСТА
   ========================================================================== */

/* --------------------------------------------------------------------------
   5. ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК
   -------------------------------------------------------------------------- */

// Находим все кнопки вкладок
const tabButtons = document.querySelectorAll('.tab-btn');

// Находим все содержимое вкладок
const tabPanes = document.querySelectorAll('.tab-pane');

// Проверяем, есть ли элементы вкладок на странице
if (tabButtons.length > 0) {

    // Добавляем обработчик на каждую кнопку
    tabButtons.forEach(function(button) {

        button.addEventListener('click', function() {

            // Удаляем класс active у всех кнопок
            tabButtons.forEach(function(btn) {
                btn.classList.remove('active');
            });

            // Удаляем класс active у всех содержимых
            tabPanes.forEach(function(pane) {
                pane.classList.remove('active');
            });

            // Добавляем класс active нажатой кнопке
            button.classList.add('active');

            // Показываем соответствующее содержимое
            const tabId = button.getAttribute('tab');
            const activePane = document.getElementById(tabId);
            if (activePane) {
                activePane.classList.add('active');
            }

        });

    });

}


/* --------------------------------------------------------------------------
   6. ИМИТАЦИЯ ДАННЫХ ПОЛЬЗОВАТЕЛЯ
   -------------------------------------------------------------------------- */

// Объект с данными артиста (имитация базы данных)
const artistData = {
    name: 'AlR1_Beats',
    email: 'alr1beats@gmail.com',
    bio: 'Музыкальный продюсер и битмейкер. Создаю хиты с 2020 года.',
    stats: {
        tracks: 12,
        plays: 45680,
        fans: 1250,
        earnings: 15400
    }
};

// Функция загрузки данных профиля
function loadProfileData() {

    // Проверяем, есть ли элементы профиля на странице
    const nameElement = document.getElementById('artist-name');
    const emailElement = document.getElementById('artist-email');
    const tracksElement = document.getElementById('total-tracks');
    const playsElement = document.getElementById('total-plays');
    const fansElement = document.getElementById('total-fans');
    const earningsElement = document.getElementById('total-earnings');

    // Заполняем данные, если элементы существуют
    if (nameElement) nameElement.textContent = artistData.name;
    if (emailElement) emailElement.textContent = artistData.email;
    if (tracksElement) tracksElement.textContent = artistData.stats.tracks;
    if (playsElement) playsElement.textContent = artistData.stats.plays.toLocaleString();
    if (fansElement) fansElement.textContent = artistData.stats.fans;
    if (earningsElement) earningsElement.textContent = artistData.stats.earnings.toLocaleString() + ' ₽';

}

// Вызываем загрузку данных при загрузке страницы
loadProfileData();


/* --------------------------------------------------------------------------
   7. ДОБАВЛЕНИЕ ТРЕКА (ИМИТАЦИЯ)
   -------------------------------------------------------------------------- */

// Находим кнопку добавления трека
const addTrackBtn = document.getElementById('add-track-btn');

// Массив для хранения треков
let tracks = [];

// Проверяем, есть ли кнопка на странице
if (addTrackBtn) {

    addTrackBtn.addEventListener('click', function() {

        // Запрашиваем название трека
        const trackName = prompt('Введите название трека:');

        // Если пользователь ввёл название и не нажал "Отмена"
        if (trackName && trackName.trim() !== '') {

            // Создаём объект трека
            const newTrack = {
                id: tracks.length + 1,
                name: trackName.trim(),
                plays: 0
            };

            // Добавляем в массив
            tracks.push(newTrack);

            // Обновляем отображение
            renderMusicList();

            // Увеличиваем счётчик треков
            artistData.stats.tracks++;
            document.getElementById('total-tracks').textContent = artistData.stats.tracks;

            // Сообщение об успехе
            alert('Трек "' + trackName + '" успешно добавлен!');

        }

    });

}

// Функция отображения списка музыки
function renderMusicList() {

    const musicList = document.getElementById('music-list');

    if (!musicList) return;

    // Если треков нет
    if (tracks.length === 0) {
        musicList.innerHTML = '<p class="empty-message">У вас пока нет треков. Добавьте первый!</p>';
        return;
    }

    // Генерируем HTML для каждого трека
    let html = '';
    tracks.forEach(function(track) {
        html += `
            <div class="track-item">
                <div class="track-info">
                    <div class="track-cover">🎵</div>
                    <div>
                        <div class="track-title">${track.name}</div>
                        <div class="track-plays">${track.plays} прослушиваний</div>
                    </div>
                </div>
            </div>
        `;
    });

    musicList.innerHTML = html;

}


/* --------------------------------------------------------------------------
   8. СОХРАНЕНИЕ НАСТРОЕК ПРОФИЛЯ
   -------------------------------------------------------------------------- */

// Находим форму настроек
const settingsForm = document.getElementById('settings-form');

// Проверяем, есть ли форма на странице
if (settingsForm) {

    settingsForm.addEventListener('submit', function(e) {

        // Отменяем стандартную отправку формы
        e.preventDefault();

        // Получаем данные из полей
        const nameInput = document.getElementById('name-input').value;
        const emailInput = document.getElementById('email-input').value;
        const bioInput = document.getElementById('bio-input').value;

        // Проверяем заполненность
        if (nameInput.trim() === '' || emailInput.trim() === '') {
            alert('Пожалуйста, заполните имя и email!');
            return;
        }

        // Обновляем данные (имитация сохранения)
        artistData.name = nameInput.trim();
        artistData.email = emailInput.trim();
        artistData.bio = bioInput.trim();

        // Обновляем отображение в карточке профиля
        document.getElementById('artist-name').textContent = artistData.name;
        document.getElementById('artist-email').textContent = artistData.email;

        // Сообщение об успехе
        alert('Настройки успешно сохранены!');

        // Очищаем форму
        settingsForm.reset();

    });

}


/* --------------------------------------------------------------------------
   КАК РАБОТАЕТ ЛИЧНЫЙ КАБИНЕТ:
   --------------------------------------------------------------------------

   1. При загрузке страницы:
      → loadProfileData() загружает данные артиста
      → Статистика отображается в карточках

   2. Переключение вкладок:
      → Клик на кнопку вкладки → показывается соответствующий раздел
      → Остальные вкладки скрываются

   3. Добавление трека:
      → Клик на "+ Добавить трек" → появляется prompt
      → Ввод названия → трек добавляется в список
      → Счётчик треков обновляется

   4. Сохранение настроек:
      → Заполнение формы → клик "Сохранить"
      → Данные обновляются в карточке профиля

   --------------------------------------------------------------------------
*/



/* --------------------------------------------------------------------------
   9. Отдел для базы данных
   -------------------------------------------------------------------------- */

   async function fetchData(name, email_signup, password_signup, password_confirm) {
	let url = `http://localhost/serverAlone/?name=${name}&email_signup=${email_signup}&password_signup=${password_signup}&password_confirm=${password_confirm}`
	let response = await fetch(url, {
		method: 'GET',
		headers: { Accept: 'application/json' },
	})

	//let param = await response.json()
	//console.log(param)
}

function get_data_form() {
	//const forms = document.querySelectorAll('#form_reg')
	const signup_form = document.querySelector('#signup-form')
	signup_form.addEventListener('submit', event => {
		// валидация элементов

		const exp = /[a-z]/
		const name = document.querySelector('#name').value
		const email_signup = document.querySelector('#email-signup').value
		const password_signup = document.querySelector('#password-signup').value
		const password_confirm = document.querySelector('#password-confirm').value


		// d = { name: name }
		if (exp.test(name) && exp.test(email_signup) && exp.test(password_signup) && exp.test(password_confirm)){
			console.log('Истино')
			//d_to_server = JSON.stringify(d)
			//console.log(d_to_server)
			fetchData(name, email_signup, password_signup, password_confirm)
		} else {
			console.log('Ложно')
		}

		event.preventDefault()
	})
}

document.addEventListener('DOMContentLoaded', function () {
	get_data_form()
})


/* --------------------------------------------------------------------------
   10. ОБРАБОТКА ФОРМЫ РЕГИСТРАЦИИ
   -------------------------------------------------------------------------- */

// Находим форму регистрации
const signupForm = document.getElementById('signup-form');

// Вешаем обработчик отправки формы
if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        // Отменяем стандартную отправку формы
        e.preventDefault();

        // ==================== ШАГ 1: ПОЛУЧЕНИЕ ДАННЫХ ====================

        // Получаем значения из полей формы
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email-signup').value.trim();
        const password = document.getElementById('password-signup').value.trim();
        const passwordConfirm = document.getElementById('password-confirm').value.trim();

        // ==================== ШАГ 2: ВАЛИДАЦИЯ С REGEX ====================

        // Проверяем имя с помощью регулярного выражения
        if (!validateName(name)) {
            alert('Ошибка: Имя должно содержать только буквы (2-50 символов)');
            return;
        }

        // Проверяем email с помощью регулярного выражения
        if (!validateEmail(email)) {
            alert('Ошибка: Введите корректный email (например, name@example.com)');
            return;
        }

        // Проверяем пароль с помощью регулярного выражения
        if (!validatePassword(password)) {
            alert('Ошибка: Пароль должен содержать минимум 6 символов, включая буквы и цифры');
            return;
        }

        // Проверяем совпадение паролей
        if (password !== passwordConfirm) {
            alert('Ошибка: Пароли не совпадают');
            return;
        }

        // ==================== ШАГ 3: ПОДГОТОВКА ДАННЫХ ====================

        // Собираем данные формы
        const formData = new FormData(signupForm);
        formData.append('action', 'register'); // Добавляем действие

        // ==================== ШАГ 4: ОТПРАВКА НА СЕРВЕР ====================

        // Отправляем данные на сервер
        fetch('http://localhost/serverAlone/index.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('Регистрация успешна!');
                signupForm.reset();
            } else {
                alert('Ошибка: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Ошибка отправки данных');
        });
    });
}


/* --------------------------------------------------------------------------
   11. ОБРАБОТКА ФОРМЫ ОБРАТНОЙ СВЯЗИ (МОДАЛЬНОЕ ОКНО)
   -------------------------------------------------------------------------- */

// Находим форму обратной связи по её id="feedback-form"
// document.getElementById - метод для поиска элемента по ID
const feedbackForm = document.getElementById('feedback-form');

// Проверяем, существует ли форма на странице
// Это нужно, чтобы код не выдавал ошибку на других страницах сайта
if (feedbackForm) {

    // Вешаем обработчик события "отправка формы"
    // submit - событие, которое срабатывает при нажатии кнопки отправки
    feedbackForm.addEventListener('submit', function(e) {

        // Отменяем стандартную отправку формы
        // Без этой строки страница бы перезагрузилась
        // preventDefault - метод для отмены стандартного действия
        e.preventDefault();


        // ==================== ШАГ 1: ПОЛУЧЕНИЕ ДАННЫХ ====================

        // Получаем значение из поля "Ваше имя"
        // .value - свойство, возвращающее значение поля ввода
        // .trim() - метод, удаляющий пробелы в начале и в конце строки
        const name = document.getElementById('feedback-name').value.trim();

        // Получаем значение из поля "Email"
        const email = document.getElementById('feedback-email').value.trim();

        // Получаем значение из поля "Сообщение"
        const message = document.getElementById('feedback-message').value.trim();


        // ==================== ШАГ 2: ПРОВЕРКА ДАННЫХ ====================

        // Проверяем: если хотя бы одно поле пустое
        // ! - логическое "НЕ" (проверяет на пустоту)
        // || - логическое "ИЛИ"
        if (!name || !email || !message) {
            // Показываем сообщение об ошибке
            alert('Пожалуйста, заполните все поля!');
            // Прерываем выполнение функции (данные не отправляются)
            return;
        }


        // ==================== ШАГ 3: ПОДГОТОВКА ДАННЫХ ====================

        // Создаём новый объект FormData для отправки данных
        // FormData - встроенный объект браузера для формирования данных формы
        const formData = new FormData();

        // Добавляем в данные параметр "action" со значением "feedback"
        // Это нужно серверу, чтобы понять: это форма обратной связи
        // append - метод добавления данных в FormData
        formData.append('action', 'feedback');

        // Добавляем имя пользователя
        formData.append('name', name);

        // Добавляем email пользователя
        formData.append('email', email);

        // Добавляем сообщение пользователя
        formData.append('message', message);


        // ==================== ШАГ 4: ОТПРАВКА НА СЕРВЕР ====================

        // fetch - функция для отправки HTTP-запросов (AJAX)
        // Позволяет отправлять данные без перезагрузки страницы
        fetch('http://localhost/serverAlone/index.php', {

            // method: 'POST' - метод отправки данных (передача на сервер)
            method: 'POST',

            // body: formData - тело запроса (наши данные)
            body: formData

        })

        // .then() - обработка ответа от сервера (цепочка промисов)
        // response => response.json() - преобразуем ответ в формат JSON
        .then(response => response.json())

        // Второй .then() - работа с распарсенными данными
        // data - объект, который вернул сервер
        .then(data => {

            // Проверяем статус ответа
            // if - условная конструкция
            if (data.status === 'success') {

                // Если успешно - показываем сообщение
                alert('Сообщение отправлено! Мы свяжемся с вами.');

                // Очищаем форму (все поля становятся пустыми)
                // reset - метод формы для сброса значений
                feedbackForm.reset();

                // ==================== ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА ====================

                // Находим элемент модального окна по ID
                const modalElement = document.getElementById('feedbackModal');

                // Получаем экземпляр Bootstrap Modal
                // bootstrap.Modal.getInstance - метод Bootstrap для работы с модальными окнами
                const modal = bootstrap.Modal.getInstance(modalElement);

                // Если модальное окно существует - закрываем его
                // if (modal) - проверка на существование
                if (modal) {
                    // hide() - метод для закрытия модального окна
                    modal.hide();
                }

            } else {

                // Если ошибка - показываем сообщение от сервера
                alert('Ошибка: ' + data.message);

            }
        })

        // .catch() - обработка ошибок (если сервер недоступен или ошибка сети)
        // error - объект ошибки
        .catch(error => {

            // Выводим ошибку в консоль разработчика (F12 → Console)
            console.error('Ошибка:', error);

            // Показываем сообщение пользователю
            alert('Ошибка отправки сообщения');
        });

    }); // Конец обработчика submit
} // Конец проверки if (feedbackForm)


/* --------------------------------------------------------------------------
   12. ВАЛИДАЦИЯ С РЕГУЛЯРНЫМИ ВЫРАЖЕНИЯМИ
   -------------------------------------------------------------------------- */

// Регулярные выражения для валидации данных
// test() - метод, проверяющий строку на соответствие шаблону

// Валидация email: буквы/цифры, @, домен, точка, 2-4 буквы
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Валидация телефона: +7 или 8, затем 10 цифр (российский формат)
const phoneRegex = /^(\+7|8)\s?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;

// Валидация имени: только буквы (кириллица/латиница), пробелы, дефисы, 2-50 символов
const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s-]{2,50}$/;

// Валидация пароля: минимум 6 символов, буквы и цифры
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

// Валидация ссылок на соцсети: начинается с http:// или https://
const urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;

// Функция для валидации email
function validateEmail(email) {
    // Проверяем, соответствует ли email шаблону
    return emailRegex.test(email);
}

// Функция для валидации телефона (необязательное поле)
function validatePhone(phone) {
    // Если поле пустое - валидно (т.к. необязательное)
    if (phone.trim() === '') return true;
    // Иначе проверяем по шаблону
    return phoneRegex.test(phone);
}

// Функция для валидации имени
function validateName(name) {
    return nameRegex.test(name);
}

// Функция для валидации пароля
function validatePassword(password) {
    return passwordRegex.test(password);
}


/* --------------------------------------------------------------------------
   13. ОБРАБОТКА ФОРМЫ ЗАЯВКИ (5 ТИПОВ ПОЛЕЙ)
   -------------------------------------------------------------------------- */

// Находим форму заявки
const applicationForm = document.getElementById('application-form');

// Вешаем обработчик отправки формы
if (applicationForm) {
    applicationForm.addEventListener('submit', function(e) {
        // Отменяем стандартную отправку формы
        e.preventDefault();

        // ==================== ШАГ 1: ПОЛУЧЕНИЕ ДАННЫХ ====================

        // Получаем значения из полей формы
        const artistName = document.getElementById('artist-name').value.trim();
        const email = document.getElementById('application-email').value.trim();
        const phone = document.getElementById('application-phone').value.trim();
        const genre = document.getElementById('application-genre').value;
        const trackCount = document.getElementById('application-tracks').value;
        
        // Для радио-кнопок: находим выбранную
        const experience = document.querySelector('input[name="experience"]:checked');
        const experienceValue = experience ? experience.value : '';
        
        const socialLinks = document.getElementById('application-social').value.trim();
        const agreeRules = document.getElementById('agree-rules').checked;
        const agreeNewsletter = document.getElementById('agree-newsletter').checked;

        // ==================== ШАГ 2: ВАЛИДАЦИЯ С REGEX ====================

        // Проверяем имя артиста с помощью регулярного выражения
        if (!validateName(artistName)) {
            alert('Ошибка: Имя должно содержать только буквы (2-50 символов)');
            return;
        }

        // Проверяем email с помощью регулярного выражения
        if (!validateEmail(email)) {
            alert('Ошибка: Введите корректный email (например, name@example.com)');
            return;
        }

        // Проверяем телефон с помощью регулярного выражения
        if (!validatePhone(phone)) {
            alert('Ошибка: Введите корректный телефон (например, +7 (999) 999-99-99)');
            return;
        }

        // Проверяем жанр
        if (!genre) {
            alert('Ошибка: Выберите жанр музыки');
            return;
        }

        // Проверяем количество треков
        const trackNum = parseInt(trackCount);
        if (isNaN(trackNum) || trackNum < 1 || trackNum > 100) {
            alert('Ошибка: Количество треков должно быть от 1 до 100');
            return;
        }

        // Проверяем опыт
        if (!experienceValue) {
            alert('Ошибка: Выберите ваш опыт работы');
            return;
        }

        // Проверяем согласие с правилами
        if (!agreeRules) {
            alert('Ошибка: Необходимо согласиться с правилами сервиса');
            return;
        }

        // ==================== ШАГ 3: ПОДГОТОВКА ДАННЫХ ====================

        // Создаём объект FormData для отправки
        const formData = new FormData();
        
        // Добавляем параметр action для сервера
        formData.append('action', 'application');
        
        // Добавляем все данные формы
        formData.append('artist_name', artistName);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('genre', genre);
        formData.append('track_count', trackNum);
        formData.append('experience', experienceValue);
        formData.append('social_links', socialLinks);
        formData.append('agree_rules', agreeRules ? '1' : '0');
        formData.append('agree_newsletter', agreeNewsletter ? '1' : '0');

        // ==================== ШАГ 4: ОТПРАВКА НА СЕРВЕР ====================

        // Отправляем данные на сервер через fetch (AJAX)
        fetch('http://localhost/serverAlone/index.php', {
            method: 'POST',
            body: formData
        })
        // Преобразуем ответ сервера в JSON
        .then(response => response.json())
        // Обрабатываем данные от сервера
        .then(data => {
            if (data.status === 'success') {
                // Если успешно - показываем сообщение
                alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
                
                // Очищаем форму
                applicationForm.reset();
                
                // Перенаправляем на главную
                window.location.href = 'index.html';
            } else {
                // Если ошибка - показываем сообщение
                alert('Ошибка: ' + data.message);
            }
        })
        // Обрабатываем ошибки сети
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Ошибка отправки заявки. Проверьте подключение к интернету.');
        });
    });
}




