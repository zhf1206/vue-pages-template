const fs = require('fs');
const path = require('path');
const jsonServer = require('json-server');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const file = path.join(__dirname,'db.json');
server.use(middlewares);

server.post('/mts/api.go', (req, res) => {
  var data = {};
  var action = req.query.action||req.params.action;
  var result = JSON.parse(fs.readFileSync(file), 'utf8');
  if (result) {
    for (var Key in result) {
      if (Key == action) {
        data = result[Key];
      }
    }
  }
  res.json(data);
});

server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  next();
});

server.listen(3000, () => {
  console.log('http://localhost:3000/');
  console.log('JSON Server is running');
});
