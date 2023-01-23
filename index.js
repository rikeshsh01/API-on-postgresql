const express = require('express');

const apiData = require('./Api/api');
const app = express();
const port = 5000;

app.use(express.json());


// Available Routes 
app.post('/api/test/create',apiData.createTest);
app.get('/api/test/get_all',apiData.getAllTest);
app.get('/api/test/get/:id',apiData.getTestById);
app.put('/api/test/update/:id',apiData.updateTest);
app.delete('/api/test/delete/:id',apiData.deleteTest);

app.listen(port, () => {
  console.log(`REST API listening on port ${port}`)
});