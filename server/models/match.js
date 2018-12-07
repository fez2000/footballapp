var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var MatchSchema = new Schema({
 terrain : {type: Schema.Types.ObjectId},
 equipes: [{equipe:Schema.Types.ObjectId,but:Number}],
 status:{type: String, enum:['jouer','pasjouer'],default:'pasjouer'},
 statistiques: [{joeur:String,but:Number}]
},{ sparse: true,unique: true, index:true });

mongoose.model('Match', MatchSchema);