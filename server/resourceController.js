
module.exports = function(app, path, resource) {
  app.get(path, function(req, res) {
    resource.list(req.query).then(function(result) {
      res.send(result);
    });
  });

  app.get(path + '/:id', function(req, res) {
    resource.get(parseInt(req.params.id)).then(function(result) {
      res.send(result);
    });
  });
  
  app.post(path, function(req, res) {
    resource.create(req.body).then(function() {
      res.status(200).end();
    }, function(reason) {
      res.status(500).end(reason);
    });
  });

  app.post(path + '/:id', function(req, res) {
    resource.update(parseInt(req.params.id), req.body).then(function() {
      res.status(200).end();
    }, function(reason) {
      res.status(500).end(reason);
    });
  });

  app.delete(path + '/:id', function(req, res) {
    resource.destroy(parseInt(req.params.id)).then(function() {
      res.status(200).end();
    }, function(reason) {
      res.status(500).end(reason);
    });
  });

};
