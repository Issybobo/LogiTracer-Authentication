/*import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/conn.js';
import router from './router/route.js';

const app = express();

// middlewares 
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by'); // less hackers know about our stack


const port = 8080;

// HTTP GET Request 
app.get('/', (req, res) => {
    res.status(201).json("Home GET Request");
});


// api routes 
//app.use('/api', router)

// start server only when we have valid connection 
connect().then(() => {
    try {
        app.listen(port, () => {
            console.log(`Server connected to http://localhost:${port}`);
        })
    } catch (error) {
        console.log('Cannot connect to the server')
    }
}).catch(error => {
    console.log("Invalid database connection...!");
})

*/
/*import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/conn.js';
import router from './router/route.js';

const app = express();

// Middlewares 
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by'); // Less information about the stack

const port = 8080;

// HTTP GET Request 
app.get('/', (req, res) => {
  res.status(201).json("Home GET Request");
});

// API routes 
// app.use('/api', router);

//Start the server only when we have a valid connection 
connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server connected to http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("Invalid database connection...!");
  }); */

  // connecting to mongodb
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './database/conn.js';
import dotenv from 'dotenv';
dotenv.config()
import router from './controllers/auth.js';
const app = express();

// middlewares 
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by'); // less hackers know about our stack
app.use('/api', router);

const port = 8080;

const start = async () => {
    try {
    await connectDB(process.env.ATLAS_URI);
    console.log("connection successfully");
    app.listen(port, console.log(`server listening to port ${port}`));
    } catch (error) {
    console.log(error);
    }
    };
    
    start();
