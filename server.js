const express = require('express');
const app = express();

app.use(express.static('dist'));

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log('server listening on port: ', port);
});
