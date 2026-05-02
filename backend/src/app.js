const express = require('express');
const cors = require('cors');
const session = require('express-session');

const pool = require('./config/db');
const authRoute = require('./routes/auth.route');
const reportRoute = require('./routes/report.route');
const stockInRoute = require('./routes/stockIn.route');
const stockOutRoute = require('./routes/stockOut.route');
const sparePartRoute = require('./routes/sparePart.route');

const app = express();
const port = 5000;

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(session({
    secret: 'this-is-a-secret-key',
    resave: false,
    saveUninitialized: false,
}));

app.use('/auth', authRoute);
app.use('/report', reportRoute)
app.use('/stock-in', stockInRoute);
app.use('/stock-out', stockOutRoute);
app.use('/spare-parts', sparePartRoute);

app.listen(port, () => {
    console.log(`[V] Server is running here: http://localhost:${port}`);
});