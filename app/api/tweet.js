module.exports = (app, db) => {
    app.get( "/pTweet", (req, res) =>
      db.Tweet.findAll().then( (result) => res.json(result) )
    );
  
    app.get( "/Tweet/:id", (req, res) =>
      db.Tweet.findByPk(req.params.id).then( (result) => res.json(result))
    );
  
    app.post("/Tweet", (req, res) => 
      db.Tweet.create({
        content: req.body.content
      }).then( (result) => res.json(result) )
    );
  
    app.put( "/Tweet/:id", (req, res) =>
      db.Tweet.update({
        content: req.body.content
      },
      {
        where: {
          id: req.params.id
        }
      }).then( (result) => res.json(result) )
    );
  
    app.delete( "/Tweet/:id", (req, res) =>
      db.Tweet.destroy({
        where: {
          id: req.params.id
        }
      }).then( (result) => res.json(result) )
    );
  }