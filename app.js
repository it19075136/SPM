const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes');
const vehicleRouter = require('./routes/vehicleRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const sparePartsRouter = require('./routes/sparePartsRoutes');
// const documentRouter = require('./routes/documentRoutes');

mongoose.connect(process.env.DB_KEY||'&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}, () => {
    console.log("Connected to database");
});

let app = express();

app.use(express.json({limit: '50mb'}));

app.use(express.urlencoded({limit: '50mb', extended: true}))

app.use(cors());

app.use('/user', userRouter);//user routes

app.use('/vehicle', vehicleRouter);//user routes

app.use('/category', categoryRouter);//category routes

app.use('/spareparts', sparePartsRouter);//spare parts routes

// app.use('/document',documentRouter); //document routes

module.exports = app;