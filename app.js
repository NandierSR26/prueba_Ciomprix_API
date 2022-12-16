const express = require('express');
const cors = require('cors')
const fileUpload = require('express-fileupload')
require('dotenv').config({path: '.env'})
const indexRouter = require('./routes');
const { conectarDB } = require('./database/db');

const app = express();
const port = process.env.PORT

conectarDB();

app.use(express.json())

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    createParentPath: true
}));

app.use(cors())

app.use('/', indexRouter);

app.listen(port, () => {
    console.log(`server is running on port: ${ port }`);
})