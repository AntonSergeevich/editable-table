# Редактируемая таблица

## Описание

Это интерактивная таблица с возможностью редактирования ячеек, включая шапку. Таблица автоматически сохраняет изменения через определенный промежуток времени после окончания редактирования.

## Функциональность

1. **Редактирование ячеек:**
   - Все ячейки таблицы доступны для редактирования.
   - При клике на ячейку она становится редактируемой текстовым полем.

2. **Автоматическое сохранение изменений:**
   - Через 5 секунд после завершения редактирования (выход из поля) начинается отсчет времени до автоматического сохранения (10 секунд).
   - Отображается прогресс-бар и счетчик секунд до сохранения.
   - Если пользователь продолжает редактировать любую ячейку, счетчик времени и прогресс-бар сбрасываются.

3. **Валидация данных:**
   - Ячейки с ФИО принимают только кириллические символы, точки и пробелы.
   - Ячейки с процентами принимают только числовые значения, за которыми следует символ `%`.
   - Ячейки с числами принимают только числовые значения.
   - Комбинированные поля не требуют валидации.

4. **Сохранение данных:**
   - Измененные данные автоматически сохраняются в `localStorage` браузера.
   - После перезагрузки страницы данные остаются актуальными.

---

## Как запустить проект

### Предварительные требования:
- Убедитесь, что у вас установлен [Node.js](https://nodejs.org/) (версии 16+).
- Установите npm (входит в состав Node.js).

### Шаги для запуска:

1. **Клонирование репозитория:**
   ```bash
   git clone https://github.com/ваш_репозиторий.git
   cd editable-table
   

2. Установка зависимостей:
      npm install
   

3. Запуск приложения:
      npm start
   

4. Открытие в браузере:
   - После успешной сборки проекта откройте браузер и перейдите по адресу:
     
     http://localhost:3000
     

---

## Технологии

- React.js: Библиотека для создания пользовательского интерфейса.
- JavaScript: Логика работы приложения.
- HTML/CSS: Структура и стилизация таблицы.
- localStorage: Хранение данных между перезагрузками страницы.

---

## Инструкция по использованию

1. Редактирование ячейки:
   - Щелкните по любой ячейке, чтобы начать редактирование.
   - Внесите необходимые изменения.
   - Нажмите Enter, чтобы сохранить изменения, или Escape, чтобы отменить их.

2. Автоматическое сохранение:
   - После выхода из редактируемой ячейки (например, клик вне поля или нажатие Tab) запускается таймер.
   - Через 5 секунд бездействия начинается обратный отсчет (10, 9, 8, ..., 1) с отображением прогресс-бара.
   - По достижении нуля данные автоматически сохраняются в localStorage.

3. Ручное сохранение:
   - Вы можете вручную сохранить изменения, нажав кнопку "Сохранить изменения".
   - Кнопка становится активной, если есть хотя бы одна отредактированная ячейка.

4. Перезагрузка страницы:
   - После перезагрузки страницы данные остаются актуальными благодаря хранению в localStorage.

---

## Структура проекта

editable-table/
│
├── public/
│   └── index.html          # HTML-шаблон
├── src/
│   ├── App.js              # Главный компонент приложения
│   ├── components/
│   │   └── EditableCell.js # Компонент для редактируемых ячеек
│   ├── style.css           # Стили приложения
│   └── index.js            # Точка входа в приложение
├── .gitignore              # Исключаемые файлы из Git
├── package.json            # Конфигурация проекта
└── README.md               # Документация

---



## Автор

Глухов Антон Сергеевич

- GitHub: https://github.com/AntonSergeevich/editable-table
- Email: glukhovas@yandex.ru

---



## Пример работы

1. Откройте таблицу в браузере.
2. Щелкните по любой ячейке для редактирования.
3. Внесите изменения и покиньте поле.
4. Через 5 секунд появится прогресс-бар и счетчик.
5. По истечении 10 секунд данные будут автоматически сохранены.
6. Перезагрузите страницу — данные останутся актуальными.

---