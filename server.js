import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDb from './config/db.js';
import authRoute from './routes/authRoute.js';
import activityRoute from './routes/activityRoute.js';
import cors from 'cors'


//config .env
dotenv.config();

//config database
connectDb();

//rest object
const app = express()

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/activity", activityRoute);

app.get('/', (req, res) => {
    res.send({
        message: 'Welcome to Tracking App'
    })
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server ${process.env.DEV_MODE} Running on ${PORT}`.bgCyan.white);
})