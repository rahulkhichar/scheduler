Here’s your updated `README.md` with the correct environment setup and detailed instructions:

---

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository with MySQL integration.

## Project setup

```bash
$ pnpm install
```

## Configure Environment Variables

To configure your environment variables, create a `.env` file at the root of your project:

```
# .env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=newpassword
DB_DATABASE=schedular
```

```bash
$ pnpm run start:dev
```

### Other modes

```bash
# development
$ pnpm run start

# watch mode (hot reload)
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

✅ Environment setup with `.env`
