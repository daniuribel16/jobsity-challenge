((express) => {
  var app = express();
  var port = 3000

  app.use(express.static(__dirname +'/build/'));

  app.listen(port, () => {
    console.log(`Node server running on http://localhost:${port}`);
  });
})(require('express'))
