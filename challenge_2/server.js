const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');

app.use(express.static(path.join(__dirname, '/public')));
app.use(morgan('tiny'));



app.listen(3000, () => console.log(`App listening on port 3000`))

