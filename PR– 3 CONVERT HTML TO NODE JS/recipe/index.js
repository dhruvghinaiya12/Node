const express = require("express");
const path = require("path");
const db = require("./config/db");
const Recipe = require("./model/recipeModel");

const app = express();
const PORT = 8090;
let counter = 1;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let initialRecipe = [
  {
    name: 'Spaghetti Carbonara',
    description: 'A classic Italian pasta dish.',
    preparationTime: '15 minutes',
    cookingTime: '15',
    imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/carbonara-index-6476367f40c39.jpg?crop=0.888888888888889xw:1xh;center,top&resize=1200:*',
    country: "India",
    veg: true,
    id: 1
  }
]


const checkMissingData = (req, res, next) => {
  const { name, description, preparationTime, cookingTime, imageUrl, country, veg } = req.body;

  if (!name || !description || !preparationTime || !cookingTime || !imageUrl || !country || veg === undefined) {
    return res.status(400).send("All fields are required."); 
  }

  next();
};

app.get('/', (req, res) => {
  res.send('welcome to the recipe api.');
});

app.get('/recipe/all', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.send(recipes);
  } catch (error) {
    res.status(500).send('Failed to fetch recipes from database.');
  }
});

app.get('/index', (req, res) => {
  res.render("index");
});

app.get("/add", (req, res) => {
  res.render("recipe");
});

app.post('/recipe/add', checkMissingData, async (req, res) => {
  const { name, description, preparationTime, cookingTime, imageUrl, country, veg } = req.body;

  const newRecipe = new Recipe({
    name,
    description,
    preparationTime,
    cookingTime,
    imageUrl,
    country,
    veg,
    id: counter++,
  });

  try {
    await newRecipe.save();
    const allRecipes = await Recipe.find();
    res.status(200).send(allRecipes);
  } catch (error) {
    res.status(500).send('Failed to save recipe to database.');
  }
});

app.patch('/recipe/update/:id', async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedRecipe = await Recipe.findOneAndUpdate({ id: Number(id) }, updateData, { new: true });
    if (updatedRecipe) {
      const allRecipes = await Recipe.find();
      res.status(200).send(allRecipes);
    } else {
      res.status(404).send('Recipe not found');
    }
  } catch (error) {
    res.status(500).send('Failed to update recipe in database.');
  }
});

app.delete("/recipe/delete/:id", async (req, res) => {
  const { id } = req.params;
  
  try {
    const deletedRecipe = await Recipe.findOneAndDelete({ id: Number(id) });
    if (deletedRecipe) {
      const allRecipes = await Recipe.find();
      res.status(200).send(allRecipes);
    } else {
      res.status(404).send('Recipe not found');
    }
  } catch (error) {
    res.status(500).send('Failed to delete recipe from database.');
  }
});

app.get('/recipe/filter', async (req, res) => {
  try {
    const { veg, sort, country } = req.query;
    let filters = {};

    if (veg === 'true' || veg === 'false') {
      filters.veg = veg === 'true';
    }

    if (country) {
      filters.country = country;
    }

    let recipes = await Recipe.find(filters);

    if (sort === 'lth') {
      recipes = recipes.sort((a, b) => a.name-b.name);
    } else if (sort === 'htl') {
      recipes = recipes.sort((a, b) =>b.name-a.name);
    }

    res.status(200).send(recipes);
  } catch (error) {
    res.status(500).send('Failed to filter recipes.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  db();
});
