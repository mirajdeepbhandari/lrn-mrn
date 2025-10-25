require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors'); 



const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use("/resources", express.static('public'));


// Routes
const indexRouter = require('./routes/index');
app.use("/api", indexRouter);



// Error handler
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || 'Something went wrong';

  res.status(statusCode).json({
    data: null,
    msg: message,
  });
});

// Immediately-invoked async function to use await at the top level
(async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('Database connected');

        app.listen(PORT, () => {
            const host = '127.0.0.1';
            console.log(`Server is running at http://${host}:${PORT}`);
        });
    } catch (err) {
        console.error('Failed to connect to the database:', err.toString());
        process.exit(1);
    }
})();
