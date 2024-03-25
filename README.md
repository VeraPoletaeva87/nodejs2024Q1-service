# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/VeraPoletaeva87/nodejs2024Q1-service
```

## Installing NPM modules

```
npm install
```

## Running application
Install and start Docker

## Start application

docker compose build

## Start a project

docker compose -f docker-compose.yml up

or

docker compose up

wait until server starts then run tests

## Testing

In a new terminal:

npm run test

## Stop the project

docker compose down

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
