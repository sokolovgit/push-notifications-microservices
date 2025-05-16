# Push Notifications Microservices

Цей проект є системою мікросервісів, розробленою для керування користувачами та надсилання їм Push-сповіщень через 24 години після реєстрації. Система складається з двох основних сервісів: `user-service` та `notification-service`, які взаємодіють через RabbitMQ. Для зберігання даних використовується PostgreSQL, а для відкладених завдань — BullMQ

## Архітектура

Система має наступну архітектуру:

- **user-service**: Відповідає за створення користувачів через HTTP-запит та публікацію події про створення користувача в RabbitMQ.
- **notification-service**: Прослуховує події про створення користувача з RabbitMQ та планує відправку Push-сповіщення через 24 години за допомогою BullMQ.
- **RabbitMQ**: Використовується для асинхронного обміну повідомленнями між сервісами.
- **PostgreSQL**: База даних для зберігання інформації про користувачів (ім'я користувача).
- **BullMQ**: Бібліотека для роботи з чергами та відкладеними завданнями.


![Архітектура](screenshots/architecture.png)

## Вимоги

- Розробка мікросервісів на базі **NestJS**.
- Можливість створення користувача через HTTP POST запит.
- Зберігання імені користувача в базі даних PostgreSQL.
- Відправка Push-сповіщення через 24 години після створення користувача.
- Імітація Push-сповіщень через фейковий запит на зовнішній сервіс (наприклад, [https://webhook.site/](https://webhook.site/)).
- Відсутність прямої залежності між мікросервісами (асинхронна взаємодія через RabbitMQ).
- Використання **Docker Compose** для розгортання інфраструктури.

## Встановлення та запуск

1. Клонуйте репозиторій:
   ```sh
   git clone https://github.com/sokolovgit/push-notifications-microservices.git
   cd push-notifications-microservices
   ```

2. Запустіть Docker Compose:
   ```sh
   docker-compose up -d
   ```

   Це запустить усю необхідну інфраструктуру: PostgreSQL, RabbitMQ, Redis та pgAdmin.

3. Запустіть user-service з ./apps/user-service:
    ```sh
    pnpm i
    pnpm run dev
    ```
4. Налаштуйте .env для user-service
    ```
    PORT=3000

    DOCS_ENABLED=true
    DOCS_PATH=docs

    DATABASE_URL=postgresql://USERNAME:PASSWORD@HOST/NAME?schema=public
    DATABASE_LOGGING=true

    RABBITMQ_URL=amqp://guest:guest@host:port
    RABBITMQ_USER_QUEUE=user

    ```

5. Запустіть виконання міграцій в базу даних:
    ```sh
    pnpm run db:migration:run
    ```

6. Запустіть notification-service з ./apps/notification-service:
    ```sh
    pnpm i
    pnpm run dev
    ```
7. Налаштуйте .env для notification-service
    ```
    PORT=3001


    RABBITMQ_URL=amqp://guest:guest@host:port
    RABBITMQ_USER_QUEUE=user


    WEBHOOK_UNIQUE_URL=https://webhook.site/453e750e-1cee-424a-bda8-d16b7deed818


    BULLBOARD_ENABLED=true
    BULLBOARD_PATH=/queues
    ```

![Services Started](screenshots/services-started.jpeg)

## Використання

### 1. Створення користувача
Виконайте POST запит на ендпоінт `http://localhost:3000/users` з body:

```json
{
  "firstName": "John Doe"
}
```

Це створить нового користувача в базі даних та опублікує подію в RabbitMQ.

![Endpoint in Action](screenshots/endpoint-in-action.jpeg)  
![Saved Users in DB](screenshots/saved-users-in-db.jpeg)  
![Users DB Schema](screenshots/users-db-schema.jpeg)

Документація до ендпоінтів доступна за адресою: [http://localhost:3000/docs](http://localhost:3000/docs).  
![Users Docs](screenshots/users-docs.jpeg)

### 2. Моніторинг черг
BullBoard за адресою [http://localhost:3001](http://localhost:3001/queues). Можна переглянути стан черг BullMQ.

![BullBoard](screenshots/bullboard.jpeg)  
![Delayed Jobs](screenshots/delayed-jobs.jpeg)  
![Completed Jobs](screenshots/completed-jobs.jpeg)

### 3. Перевірка відправлених сповіщень
Для імітації Push-сповіщень використовується сервіс [https://webhook.site/](https://webhook.site/). 

![Sent Webhooks](screenshots/sent-webhooks.jpeg)

