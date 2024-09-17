# Football Eye Q Backend
A RESTful API and database for the website and android apps.

## Setup
You will need to have Node Version Manager (nvm). The version of node this project uses is stored in `.nvmrc`, and you can run `nvm use` to install it.

Swap to the `dev` branch: `git checkout dev`. If you want to push something into `main`, make a PR in Bitbucket and let someone else check it first, I'd like to keep `main` as always working. If you're working on something big, might be good to branch off `dev` as well, and make a PR to merge back in, just to keep things tidy.

Once you're in the correct branch, make sure you run `npm install`.

Finally, to run the project, run `npm start`. In lieu of a frontend, I'm using [Postman](https://www.postman.com/downloads/) to test endpoints.

## TODO

- Set up database. Mongo? Whatever's easiest.
- Set up endpoints: 
    - GET all exercises
    - GET selected exercises for account
    - PUT selected exercises for account
    - Anything else?
- Figure out accounts (proper authentication can come later, just do dummy accounts in database for now)
- Share with rest of team
