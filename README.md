# Template - Web App

Template for web app with front-end, back-end, and other integrations.

## Setup 

`npm i` 

### Database 

- create a MongoDB collection 
- copy DB collection name to `./workspaces/server/.env` `MONGODB_DB={NAME_HERE}`

### Environment 

#### Google OAuth 

- go to [google cloud console](https://console.cloud.google.com/apis/credentials?authuser=1&project=web-app-template-486016&supportedpurview=project)
- select "Create credentials" 
- select "OAuth client ID" 
- select "Web application" under Application type
- add `http://localhost` under Authorized Javascript origins 
- add `http://localhost` under Authorized redirect URIs 
- click "Create" 
- paste public key in `./workspaces/wapp/.env` `VITE_GOOGLE_AUTH_KEY={API_KEY_HERE}`
- save secret key in secure location. you won't be able to access it again from Google's console 

#### API key 

- comment out `app.use(authTokenMiddleware);` in `./workspaces/server/index.js` 
- run application 
- login 
- go to mongodb, and change `user.type` to `admin` 
- log out
- log in 
- go to settings 
- select developer 
- select "Generate Token" 
- create a new API key 
- paste key in `./workspaces/wapp/.env` `VITE_API_TOKEN_KEY={API_KEY_HERE}`
- comment back in `app.use(authTokenMiddleware);` in `./workspaces/server/index.js` 
