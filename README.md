# EzForm

Ez Form is a simple, easy to use, and powerful form builder.\
Let's get started!

## Installation

1. Install the [nodejs](https://nodejs.org/en/) package manager [npm](https://nodejs.org/en/)
2. Git clone our repository

```bash
git clone https://github.com/MrYasuo/form-finOS.git
```

3. Install requirements in package.json

```bash
npm i
```

## Prerequisite

**Important**:

1. This is our development version. We are using mongoDB in local mode, so you need to install [mongoDB Compass](https://www.mongodb.com/products/compass) first. Or you can use your mongoDB cluster online. After have mongoDB ready, you must add MONGODB_URI to your .env file
   <br>
2. We use third party service to authenticate user. It called [Auth0](https://auth0.com/). So that you must create a **Regular Web Application** in Auth0 first and then add the following information to your .env file:

- AUTH0_CLIENT_ID
- AUTH0_CLIENT_SECRET
- AUTH0_DOMAIN
- AUTH0_CALLBACK_URL
  You can find more information in [Auth0 Nodejs Quickstart](https://auth0.com/docs/quickstart/webapp/nodejs).

## Usage

When you have Auth0 and MongoDB ready, run our project in development environment

```bash
npm run dev
```

Now go to <localhost:3000> to explore our project\
**Note:** The default port is 3000 but you can custom your port by change the _port_ parameter in _server.js_ file

# Features

1. Login/Register
2. Create a number of different versions of form
3. Auto sync data
4. Send forms to your customers
5. Save customers progress
