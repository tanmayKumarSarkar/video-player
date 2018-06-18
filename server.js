const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const api = require('./server/routes/api');

const port = process.env.PORT || 3000;
const environment = process.env.NODE_ENVIRONMENT;

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use('/api', api);

app.get('*', (req, res)=>{
  if(environment == 'PROD'){
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  }else{
    res.send('res');
  }
})

app.listen(port, ()=>{
	console.log(`App running on port ${port}`);
});
