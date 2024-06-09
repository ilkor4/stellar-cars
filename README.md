<h1 align="center">Сервис заказа космических автомобилей</h1>

---

<p align="center">
    Pet-проект, демонстрирующий мои актуальные навыки работы
    с современными web-технологиями на практике.
    Проект постоянно обновляется, добавляются новые фичи, рефакторится код.
</p>

<img src="./src/shared/assets/images/readme/components/catalog.png" alt="Сайт Динамо"/>


## Содержание

- [Техническое задание](#Техническое-задание)
- [Функциональность](#Функциональность)
- [Стек](#стек)
- [Директории проекта](#Директории-проекта)
- [Описание](#Описание)
- [Установка](#установка)
- [Запуск](#запуск)
- [Команды для работы с проектом](#Команды-для-работы-с-проектом)
- [Планы](#Планы)
- [Ссылки на проект](#Ссылки-на-проект)


## Техническое задание:

---

<p>
    Реализовать сервис регистрации автомобилей с каталогом авто.
    Обязательно используем: любой стейт менеджер (например mobx, redux), любой сборщик (например webpack, vite), react, typescript.
</p>

### Страницы:

      - Авторизация

      - Список заявок в виде таблицы с возможностью сортировки и фильтрации на фронте (на беке не реализовано)

      - Страница заявки (ниже подробнее)

      - Страница с списком брендов авто (берем из справочника нашей api) с фотографиями и описанием автомобилей (берем из интернета)

      - Страница пользователя (в api особо ничего нет, выводит просто логин и почту). И возможность разлогиниться

### Страница заявки (заявка может быть в 4 разных статусах):

      DRAFT - страница с формой заполнения данных (id, status не заполняем)
        
      PENDING - если перешли сразу с DRAFT (через /proposal/{id}/send), то выводим loader, если из списочной - выводим ридонли страницу со всеми данными

      SUCCESS - страница успеха, выводим ридонли данные

      REJECTED - страница неудачи, выводи ридонли данные

### Форма:
<p>
    Требуется валидация данных (по примеру существующей заявки, валидации на бэке нет)
</p>

## Функциональность:

---

- конфигурация `webpack` на typeScript
- автоматический прогон тестов и деплой через `github actions`
- обработчик ошибок `ErrorBoundary`
- глобальные переменные стилей `global.scss`
- хранение данных в хранилище `Redux`
- работа с `API` через RTK Query
- сортировка и фильтрация заявок
- создание / редактирование / изменение / рассмотрение заявки
- валидация форм через `yup` и `React Hook Form`
- смена тем

## Стек:

---

<div id="stack">
  <img id="stack-img" src="./src/shared/assets/images/readme/stack/html5-original.svg" title="HTML5" alt="HTML5" width="50px" height="50px">&nbsp
  <img id="stack-img" src="./src/shared/assets/images/readme/stack/css3-original.svg" title="CSS3" alt="CSS3" width="50px" height="50px">&nbsp
  <img id="stack-img" src="./src/shared/assets/images/readme/stack/sass-original.svg" title="Sass\Scss" alt="Sass\Scss" width="50px" height="50px">&nbsp
  <img id="stack-img" src="./src/shared/assets/images/readme/stack/javascript-original.svg" title="JavaScript" alt="JavaScript" width="50px" height="50px">&nbsp
  <img id="stack-img" src="./src/shared/assets/images/readme/stack/typescript.svg" title="TypeScript" alt="TypeScript" width="50px" height="50px">&nbsp
  <img id="stack-img" src="./src/shared/assets/images/readme/stack/react-hook-form-logo-only.svg" title="ReactHookForm" alt="ReactHookForm" width="50px" height="50px">&nbsp
  <img id="stack-img" src="./src/shared/assets/images/readme/stack/redux-original.svg" title="Redux" alt="Redux" width="50px" height="50px">&nbsp
  <img id="stack-img" src="./src/shared/assets/images/readme/stack/react-original.svg" title="React" alt="React" width="50px" height="50px">&nbsp
  <img id="stack-img" src="./src/shared/assets/images/readme/stack/webpack-original.svg" title="Webpack" alt="Webpack" width="50px" height="50px">&nbsp
  <img id="stack-img" src="./src/shared/assets/images/readme/stack/storybook-original.svg" title="Storybook" alt="Storybook" width="50px" height="50px">&nbsp
  <img id="stack-img" src="./src/shared/assets/images/readme/stack/git-original.svg" title="Git" alt="Git" width="50px" height="50px">&nbsp
</div>

## Директории проекта:

---

- `.github` — директория с github actions
- `config` — директория с конфигами webpack и jest(в разработке)
- `docs` — директория с production сборкой
- `public` — директория с html
- `src` — директория с архитектурой проекта

### Архитектура проекта - Feature-Sliced Design (FSD):
- `src/shared` — директория с переиспользуемыми модулями
- `src/entities` — директория с компонентами, связанными с представлением бизнес-сущностей
- `src/features` — директория с частями функциональности приложения
- `src/widgets` — директория с самостоятельными и полноценными блоками страниц с конкретными действиями
- `src/pages` — директория со страницами приложения
- `src/app` — директория с общей инициализирующей логикой приложения

## Описание:

***

### Login
- Компонент с формой входа;
- Используется react hook form;
- Настроена валидация через библиотеку yup;
- Уведомление пользователя о не валидности введенных данных;
- Лоудер, всплывающий при загрузке данных;
- Появляющееся сообщение об успехе/ошибке;

<img src="./src/shared/assets/images/readme/components/login.png" alt="login" />

### Catalog
- Компонент с каталогом доступных автомобилей;
- Из массива данных, пришедшего с бэкенда формируются модельные ряды и отображаются карточки автомобилей;

<img src="./src/shared/assets/images/readme/components/catalog.png" alt="catalog" />

### User
- Компонент с информацией о пользователе;
- Отображает id и логин пользователя;

<img src="./src/shared/assets/images/readme/components/user.png" alt="user" />

### Proposals
- Компонент отображающий все заявки;
- Реализована фильтрация по статусу заявки;
- Есть возможность asc и desc сортировки по каждому заголовку таблицы;
- Семантически-правильно составленная таблица;
- Кнопка с возможностью создания новой заявки;

<img src="./src/shared/assets/images/readme/components/proposals.png" alt="proposals" />

### Proposal
- Компонент отображающий информацию по заявке;
- Отображения статуса заявки в виде infoTooltip;

<img src="./src/shared/assets/images/readme/components/proposal.png" alt="proposal" />

### Функциональность заявок
- Реализована возможность создания заявки;
  <img src="./src/shared/assets/images/readme/components/create.png" alt="create">
- Реализована возможность редактирования заявки;
  <img src="./src/shared/assets/images/readme/components/edit.png" alt="edit">
- Реализована возможность рассмотрения заявки;
  <img src="./src/shared/assets/images/readme/components/pending.png" alt="pending">
- Реализована возможность удаления заявки;
  <img src="./src/shared/assets/images/readme/components/delete.png" alt="delete">

### Валидация форм
- Подключена валидация всех форм по yup-схемам

<img src="./src/shared/assets/images/readme/components/validation.png" alt="validation">


### Тема
- Реализовано переключение светлой темы на темную

<img src="./src/shared/assets/images/readme/components/theme.png" alt="theme">

## Команды для работы с проектом:

---

- `npm start` - запускает проект в `dev` режиме;
- `npm run build:prod` - сборка проекта в `prod` режиме;
- `npm run build:dev` - сборка проекта в `dev` режиме;
- `npm run lint:ts` - запуск линтнера для `TypeScript`;
- `npm run lint:ts:fix` - исправление ошибок линтнера для `TypeScript`;
- `npm run lint:scss` - запуск линтнера для `SCSS`;
- `npm run lint:scss:fix` - исправление ошибок линтнера для `SCSS`;

## Планы:

---

- Добавить unit тестирование
- Добавить сторибук

## Ссылки на проект:

---

- `Адрес репозитория:` https://github.com/ilkor4/stellar-cars
- `Деплой:` https://ilkor4.github.io
- `Над проектом работал:` https://github.com/ilkor4

