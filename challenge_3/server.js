const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('tiny'));



const port = process.env.port || 3000;
app.listen(port, () => console.log(`App listening on port ${port}`));
