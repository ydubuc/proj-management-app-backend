## Description

Project management app backend

## Installation

```bash
$ npm install
```

## Configuration

Add a file called .env in the root directory.\
Add the fields below and fill in accordingly.

```bash
PORT=3000
JWT_SECRET=aStringOfRandomNumbersAndLetters123
DB_USER=db-user-name
DB_PASS=db-user-pass
DB_DOMAIN=cluster-name.something.mongodb.net
DB_NAME=db-name
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
