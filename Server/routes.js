const verbModel = require('./models/verbSchema');

module.exports = function(app){

  app.get('/', function(req,res){
    res.sendfile(__dirname +'../client/index.html');
  });

  app.get('/api/verbs', (req, res) => {
    verbModel.find((err,response) => {
      res.json(response);
    });
  });

  app.post('/api/verbs', (req, res) => {
    let verb = new verbModel(req.body);
    verb.save();
    res.json(verb);
  })
}
