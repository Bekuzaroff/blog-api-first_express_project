const express = require('express');
const app = express();
const router = require('./routes/router');

app.use(express.json());
app.use('/api/v1/auth', router);


const port = 8000;
app.listen(port, (err) => {
    if(err) throw err;
    console.log('server has started');
});

module.exports = app;
 