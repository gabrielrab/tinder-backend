const express = require ('express');
const mongoose = require('mongoose');
const cores = require('cors');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb://gabrielrab:67920000Ab@ds133632.mlab.com:33632/omni-stack-8', {
    useNewUrlParser: true
});

app.use(express.json());
app.use(cores());
app.use(routes);

app.listen(3000 || process.env.PORT, ()=>{
    console.log('Api ouvindo');
});