var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var ArbitresSchema = new Schema({
  nom: {type: String, required: true, trim: true},
  age: Number,
  photo: String
},{ sparse: true,unique: true, index:true });

mongoose.model('Arbitres', ArbitresSchema);
