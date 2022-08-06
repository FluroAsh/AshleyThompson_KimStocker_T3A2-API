## Setup

---

Install Dependencies

```
$ npm install
```

Create an `.env` file in the cloned root directory. It should contain:

```conf
DB_NAME=<your_postgres_username>
DB_PASSWORD=<your_postgres_password>
DB_HOST=<localhost/given_hostname>
NODE_ENV=<node_envrionment>
```

> **Note that** you can omit NODE_ENV if you're just running the default development server.

Create the _iev_development_ Postgres database

```
$ npx sequelize db:create
$ npx sequelize-cli db:migrate
$ npx sequelize-cli db:seed:all

```

> This will create a new database using your given Postgres credentials

## Testing

$ npm test
---

TBC
