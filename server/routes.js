
module.exports = function(app){
    var user = require('./controllers/utilisateur');
    app.get('/user', user.findAll);
    app.get('/user/:id', user.findById);
    app.post('/user', user.add);
    app.post('/login', user.login)
    app.put('/user/:id', user.update);
    app.delete('/user/:id', user.delete);

    var carton = require('./controllers/carton');
    app.get('/carton', carton.findAll);
    app.get('/carton/:id', carton.findById);
    app.post('/carton', carton.add);
    app.put('/carton/:id', carton.update);
    app.delete('/carton/:id', carton.delete);

    var equipe = require('./controllers/equipe');
    app.get('/equipe', equipe.findAll);
    app.get('/equipe/:id', equipe.findById);
    app.post('/equipe', equipe.add);
    app.put('/equipe/:id', equipe.update);
    app.delete('/equipe/:id', equipe.delete);

    var terrain = require('./controllers/terrain');
    app.get('/terrain', terrain.findAll);
    app.get('/terrain/:id', terrain.findById);
    app.post('/terrain', terrain.add);
    app.put('/terrain/:id', terrain.update);
    app.delete('/terrain/:id', terrain.delete);

    var joueur = require('./controllers/joueur');
    app.get('/joueur', joueur.findAll);
    app.get('/joueur/:id', joueur.findById);
    app.post('/joueur', joueur.add);
    app.put('/joueur/:id', joueur.update);
    app.delete('/joueur/:id', joueur.delete);

    app.get('/debut',function(req,res){
        if(typeof(req.session.auth) == 'undefined'){
          res.send({'status':'false'})
        }else{
          res.send({'status':true})
        }
      })
}