# Practica_Fund_Backend
Practice corresponding to the Fundamentals Backend, Node.js &amp; MongoDB module

## General info

Used Framework: Express

```sh
npx express-generator nodeapp --ejs
```

#### Install dependencies:

```sh
npm install 
```

#### Install croos-env:

```sh
npm i cross-env
```

#### Install Mongoose

In API path:

```sh
npm i mongoose
```
#### Install nodemon:

In API folder

```sh
npm i nodemon 
```

### Settings

Script development mode set to cross-platform with croos-env, and default starts at port 3000 and directly with nodemom.

```sh
"dev": "cross-env SET DEBUG=nodepop:* 3000 nodemon ./bin/www"
```


#### Create a connection file with mongoose

In API path create a folder called "lib" and create a file called "connectMongoose.js" inside with:
    
```sh
    const mongoose = require('mongoose');

    mongoose.set('strictQuery', false);

    mongoose.connection.on('error', err => {
        console.log('Error de conexión ', err);
    });

    mongoose.connection.once('open', () => {
        console.log('Conectado a MongoDB en ', mongoose.connection.name);
    });

    mongoose.connect('mongodb://127.0.0.1:27017/nodepop');

    module.exports = mongoose.connection;
```

## Start a MongoDB Server in Macos or Linux

In the console go to MongoDB folder and:

```sh
./bin/mongod --dbpath ./data
```


## DB resets

Open a terminal and go to the API path "../nodepop>" and type "npm run initDB" to run the API.
6 ads must been created.

## API starts

Open a terminal and go to the API path "../nodepop>" and type "npm start" to run the API.
For developer mode, type "npm run dev" to start server.

### Homepage

You can access to he NodePop main page writing http://localhost:3000 in your browser. If an error occurs, type http://127.0.0.1:3000.


If port 3000 is already busy, access the file "package.jason and replace with the following text into the line 7,after "dev":

"cross-env DEBUG=nodepop:* nodemon PORT=3001 ./bin/www"

If port 3001 is already busy, try with another one typing other number in PORT=value.

### Querys

You can search typing in the url box of your browser.
You can type directly the query after the initial url for obtain the web page or type "api/anuncios?query for a json response:

    -Web: http://localhost:port/?query
    -Json: http://localhost:port/api/anuncios?query

Follow always the same syntaxis.

#### Prices

Exact price: http://localhost:port/?price=value or http://localhost:port/api/anuncios?price=value
Price range: http://locaslhost:port/value1-value2 or http://locaslhost:port/api/anuncios/value1-value2
Price "Lower than": http://locaslhost:port/-value or http://locaslhost:port/api/anuncios/-value
Price "Greater than": http://locaslhost:port/value- or http://ocaslhost:port/api/anuncios/value-

#### Tags

http://localhost:3000/api/anuncios?tag=value

http://localhost:3000/?tag=value

You need type uppercase the first letter of the tag. You can see a list of available tags at the top of the page.
You can add mora than 1 tag dor searching:

http://localhost:3000/api/anuncios?tag=value1&tag=valu2

#### Adding diferents tags
http://localhost:3000/api/anuncios?tag=Work&price=50
http://localhost:3000/?tag=Work&price=50

### Adding ads

For add others use a software like Postman. Select POST method, option "Body" and "x-www-form-urlencoded".
Then, type the keys and values:
name (text), sale (true o false), price (Number between 1 and 10000), photo (../images/anuncios/filename.extension) and tag (Work, Lifestyle, Motor, Mobile).







