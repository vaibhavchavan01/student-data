import express from 'express';
import connectdb from './database/connectdb.js';
import web from './routes/web.js';
import path from 'path'
const app = express();
const port = process.env.PORT || '3000';
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:27017";

//jwt key
const JwtKey = "JwtSecreteKey"
//database connections
connectdb(DATABASE_URL);

//middleware for req.body
app.use(express.urlencoded({ extended: false }))
// app.use(express.urlencoded({ extended: true}))

//static file
app.use('/', express.static(path.join(process.cwd(), "static")))
app.use('/edit', express.static(path.join(process.cwd(), "static")))
// app.use('/student', express.static("static"))


// load routes
app.use('/', web);

// how to create routes
app.listen(port, () => {
    console.log('server listening at http://localhost:' + [port]);
})
