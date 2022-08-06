## Setup

---

Install Dependencies

```
$ npm install
```

Create an `.env` file in the cloned root directory. It should contain:

```

NODE_ENV=<node_envrionment>
DB_NAME='iev_development'
DB_USERNAME=<your_postgres_username>
DB_HOST=<localhost/given_hostname>
SECRET_KEY=<secret_key_word>
AWS_REGION=<your_aws_region>
AWS_BUCKET_NAME=<your_aws_bucket>
AWS_IMAGE_KEY=<your_image_name>
STRIPE_WEBHOOK_SECRET=<your_stripe_webhook_secret>
STRIPE_PUBLISHABLE_KEY=<your_stripe_webhook_secret>
STRIPE_SECRET_KEY=<your_stripe_secret_key>

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


