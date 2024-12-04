const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  preparationTime: String,
  cookingTime: String,
  imageUrl: String,
  country: String,
  veg: Boolean,
  id: { type: Number, required: true },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports=Recipe;




