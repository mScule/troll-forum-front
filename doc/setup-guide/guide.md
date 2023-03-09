# Trolf - Frontend | Setup guide

## Requirements

Before advancing, make sure that you have installed following:

- [Node.js and npm](https://nodejs.org/en/) *(Only Node.js versions 18 and up have been tested to work)*
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)

## Setup

0. Run `yarn install` to install all dependencies.

1. Create `.env.local` file with the boilerplate below.

```conf
# API
VITE_API_URL="http://localhost:3001/v1"
```

2. Run `yarn dev` to start the dev server.

Now you should be able to access the frontend at `http://localhost:5173/`!

[Back to README](../../README.md)
