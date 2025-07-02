my-portfolio/
├── public/
├── src/
│   ├── app/
│   │   ├── providers/     # Инициализация роутера, стора и т.д.
│   │   ├── styles/        # Глобальные стили, переменные, миксины
│   │   ├── App.vue        # Корневой компонент приложения
│   │   └── main.ts        # Точка входа в приложение
│   │
│   ├── pages/
│   │   ├── home/
│   │   │   ├── index.ts   # Публичный API для страницы
│   │   │   └── ui/
│   │   │       └── HomePage.vue
│   │   ├── case-study/    # Пример страницы для конкретного кейса
│   │   └── not-found/     # Страница 404
│   │
│   ├── widgets/
│   │   ├── the-header/
│   │   ├── case-studies-list/
│   │   ├── testimonials-list/
│   │   ├── recent-work/
│   │   ├── contact-form/
│   │   └── the-footer/
│   │
│   ├── features/
│   │   ├── send-contact-form/
│   │   ├── switch-language/
│   │   └── theme-toggler/
│   │
│   ├── entities/
│   │   ├── case/            # Сущность "Кейс"
│   │   ├── testimonial/     # Сущность "Отзыв"
│   │   └── project/         # Сущность "Проект" из "Recent Work"
│   │
│   └── shared/
│       ├── api/             # Конфигурация API и инстансы (напр. axios)
│       ├── assets/          # Изображения, иконки (если не в public)
│       ├── config/          # Конфиги роутера, i18n и т.д.
│       ├── lib/             # Вспомогательные функции, хуки
│       └── ui/              # UI-kit: Button, Input, Spinner, etc.
│
├── .eslintrc.cjs
├── .prettierrc.json
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── vite.config.ts
└── yarn.lock