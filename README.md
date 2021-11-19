# Trivia Quiz React App

This is a multiplayer, multiple choice trvia game made with NodeJS (server), React (client), postgres (database), and hosted on heroku. Users can join trivia games and compete to see who can answer the most consecutive questions correctly. It can be played within a browser [here](https://dmitton-trivia-quiz.herokuapp.com/)

**_Note:_** Both the client and server have been package into the same repository for ease of use.

### Features

##### Modes
There are two modes a user can play:

1. Solo: The game ends only when a player answers incorrectly
2. Multiplayer, where any number players can join the same trivia match
   **_Note:_** A game will not start unless there are at least 2 people waiting to play.

##### Winning and Losing
When a player submits an answer, they will be shown the correct/incorrect answers. They will be taken to the win/loss screen after the match ends.

##### Trivia Questions

Questions are pulled from https://opentdb.com/ using the API

### Running Locally

1. Install libraries by running `npm install`
2. To start the server, navigate to the base directory and run `npm run start`
3. To start the frontend, navigate to `/client` and run `npm run start`

### Running on Heroku

1. It can be played within a browser [here](https://dmitton-trivia-quiz.herokuapp.com/)

### Migrations
The Sequelize package is used for creating migrations for the postgres DB.

##### Local
To run the migraitons locally:

1. run `npx sequelize-cli db:migrate` command

##### Heroku
To run the migrations on Heroku:

1. connect to heroku by running `heroku run bash`
2. run `sequelize-cli db: migrate`
   **_Note:_** Heroku will need to be configured on your machine

### Testing and Linting
Navigate to `/client` and then:

- Linting: `npm run lint`
- Auto-fix: `npm run lint-fix`
- Testing: `npm run test`

### Future/Improvements

- More stats
- Game modes
- server-side testing
- upgrade client-side testing
