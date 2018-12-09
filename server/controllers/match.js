
var mongoose = require('mongoose');
Match = mongoose.model('Match');
Tournois = mongoose.model('Tournois');
Poule = mongoose.model('Poule');
Equipe = mongoose.model('Equipe');


exports.findAll = function(req, res){
  Match.find({},function(err, results) {
    if(err){
      console.log('localhost:3000->db error 503')
      return res.send({status:null,message:err})
    }
    return res.send(results);
  });
};
exports.equipesMatch = function(req, res){
  let id = req.params.id 
  Match.findOne({_id:id},function(err, results) {
    if(err){
      console.log('localhost:3000->db error 503')
      return res.send({status:null,message:err})
    }
    if(results){
 
      Equipe.findOne({"_id":results.equipes[0].equipe},(err,equipe1)=>{
        if(err){
          console.log('localhost:3000->db error 503')
          return res.send({status:null,message:err})
        }
  
        if(equipe1){

          Equipe.findOne({"_id":results.equipes[1].equipe},(err,equipe2)=>{
            if(err){
              console.log('localhost:3000->db error 503')
              return res.send({status:null,message:err})
            }
           
            return res.send({status:true,poule:results.poule, message:[{equipe1:{nom:equipe1.nom,id:equipe1._id,represente:equipe1.represente,coach:equipe1.coach,joueurs:equipe1.joueurs,banniere:equipe1.banniere},but1:results.equipes[0].but,equipe2:{nom:equipe2.nom,id:equipe2._id,represente:equipe2.represente,coach:equipe2.coach,joueurs:equipe2.joueurs,banniere:equipe2.banniere},but2:results.equipes[1].but}]});
          })
        }else{
          res.send({status:false})
        }
   
      })
    }else{
      res.send({status:false})
    }
    
   
  });
};
exports.findAllPoule = function(req, res){
  let id = req.params.id
  Match.find({poule:id},function(err, results) {
    if(err){
      console.log('localhost:3000->db error 503')
      return res.send({status:null,message:err})
    }
    
    return res.send({status:null,matchs:results});
  });
};
exports.findById = function(req, res){
  var id = req.params.id;
  Match.findOne({'_id':id},function(err, result) {
    if(err){
      console.log('localhost:3000->db error 503')
     return res.send({status:null,message:err})
    }
    return res.send(result);
  });
};

exports.update = function(req, res) {
    //on verifie si le user est connecter
    if(typeof(req.session.auth) == 'undefined'){
      console.log('localhost:3000->authentification fallure')
      return res.send({status:null,message:'AuhtError'}) 
    }
      //on verifie si le tournoi est sein
    let autre = true
    for(let elm of req.session.auth.tournois){
      if(req.body.id == elm){
        autre = false
      }
    }
    if(autre){
      console.log('localhost:3000->ressource Tournois not found',req.body.id)
      return res.send({status:false,message:'NotFound'})
    }
  var id = req.params.id;
  
  Match.updateOne({"_id":id}, {equipes:req.body.equipes,status:req.body.status,statistiques:req.body.statistiques},
    function (err, up) {
      if (err){
        console.log('localhost:3000->db error 503')
        return res.send({status:null,message:err})
      }
      if(up){
        console.log(up)
        Poule.findOne({"_id":req.body.poule},(err,poul)=>{
          if (err){
            console.log('localhost:3000->db error 503')
            return res.send({status:null,message:err})
          }
          console.log(poul)
          Match.find({poule:req.body.poule},(err,matchs)=>{
            if (err){
              console.log('localhost:3000->db error 503')
              return res.send({status:null,message:err})
            }
            let classement = []
            let tab = []
            tab = poul.classement
            for(let i of tab){
              classement.push({equipe:i.equipe,points:0,gagner:0,perdue:0,Null:0,buts_pour:0,buts_contre:0})
            }
            tab = matchs
            let eq = 0
            for(let i of matchs){

              for( eq=0;eq <classement.legnth;eq++){
                if(classement[eq].equipe == i[0].equipe){
                  classement[eq].points += (i[0].but > i[1].but)? 3: (i[0].but == i[1].but)? 1: 0;
                  classement[eq].Null +=  (i[0].but == i[1].but)? 1: 0;
                  classement[eq].buts_contre += i[1].but;
                  classement[eq].buts_pour += i[0].but;
                  classement[eq].gagner += (i[0].but > i[1].but)? 1 : 0;
                  classement[eq].perdue += (i[0].but < i[1].but)? 1 : 0;
                }
                if(classement[eq].equipe == i[1].equipe){
                  classement[eq].points += (i[1].but > i[0].but)? 3: (i[1].but == i[0].but)? 1: 0;
                  classement[eq].Null +=  (i[1].but == i[0].but)? 1: 0;
                  classement[eq].buts_contre += i[0].but;
                  classement[eq].buts_pour += i[1].but;
                  classement[eq].gagner += (i[1].but > i[0].but)? 1 : 0;
                  classement[eq].perdue += (i[1].but < i[0].but)? 1 : 0;
                }
              }
            }
            
            Poule.updateOne({"_id":req.body.poule},{classement:classement},(err,good)=>{
              if (err){
                console.log('localhost:3000->db error 503')
                return res.send({status:null,message:err})
              }
              console.log('localhost:3000->match update');
              return res.send({status:true})
            })
          })

        })
       
      }
  });
}

