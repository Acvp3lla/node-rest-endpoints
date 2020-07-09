module.exports = (app, db) => {
    app.get( "/User/:id", (req, res) =>
      db.User.findByPk(req.params.id).then( (result) => res.json(result))
    );
  }