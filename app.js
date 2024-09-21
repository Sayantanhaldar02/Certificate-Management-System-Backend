const express = require('express');
const { certificateRouter } = require('./routes/certificate.routes');
const { checkAuthentication } = require('./middleware/auth.middleware');
const { authRouter } = require('./routes/auth.routes');
const app = express()
const cors = require("cors")

// define middlewares
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(checkAuthentication)


// define routes
app.use("/certificate",certificateRouter);
app.use("/auth",authRouter);

app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

// Middleware to handle errors (both 404 and server errors).
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});

module.exports =app