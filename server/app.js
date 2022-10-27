const express = require('express');
const app = express();
const PORT = process.env.PORT || 9000;
const Router = require('./routes/index');
const cors = require('cors');
const client = require('./db/conn');

client.connect(() => console.log(`conected to db on port = ${client.port}`, client.query))

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', Router);

app.listen(PORT, () => {
    console.log(`Server is running on port number ${PORT}`);
});