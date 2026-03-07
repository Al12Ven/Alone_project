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
            const tabId = button.getAttribute('data-tab');
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
    email: 'artist@alr1beats.com',
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
