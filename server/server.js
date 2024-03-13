const exp = require('express');
const app = exp();
const path = require('path');
require('dotenv').config();

app.use(exp.json());

const mongoose = require('mongoose');
const DB_URL = process.env.LOCAL_DB_URL;
mongoose.connect(DB_URL)
    .then(() => {
        console.log("DB connection success");
    })
    .catch(err => console.log("Error in DB connect", err));

app.use(exp.static(path.join(__dirname, '../client/dist/my-project/browser')));

const userApp = require('./APIs/user-api');
const adminApp = require('./APIs/admin-api');
const applicationApp = require('./APIs/application-api');

app.use('/user-api', userApp);
app.use('/admin-api', adminApp);
app.use('/application-api', applicationApp);

app.use((err, req, res, next) => {
    res.send({ message: 'error occuurred', payload: err.message });
})

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, '../client/dist/my-project/browser/index.html'));
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`web server started at port ${PORT}`));