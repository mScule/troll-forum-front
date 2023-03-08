# Troll forum frontend

## How to start stuff

| Command      | What it does                       |
|--------------|------------------------------------|
| `yarn dev`   | Run server in interactive dev mode |
| `yarn build` | Build the project                  |

## Running the project for the first time
Be sure to install dependencies from 'package.json' by typing 'yarn install' in the terminal

In order to run the project, a '.env.local' -file needs to be made in the root directory. Please insert the following line within the file. You can replace the localhost port number with the port that you have applied.

```conf
VITE_API_URL="http://localhost:3001/v1"
```