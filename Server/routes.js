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

  app.get('/api/verbs/favourites', (req, res) => {
    verbModel.find({"isFavourite":true},(err,response) => {
      res.json(response);
    });
  });

  app.post('/api/verbs', (req, res) => {
    let verb = new verbModel(req.body);
    verb.save();
    res.json(verb);
  })

  app.post('/api/verbs/bulk', (req,res) => {
    let verbs = req.body;
    verbs.forEach((verb) => {
      let newVerb = new verbModel(verb);
      newVerb.save();
    });
    res.send("saved")
  })

  app.put('/api/verbs/:id/favourite', (req,res) => {
    verbModel.findById(req.params.id, function (err, doc){
      if(err){
        throw err;
      }
      doc.isFavourite = req.body.isFavourite;
      doc.save();
    });
  })
}
