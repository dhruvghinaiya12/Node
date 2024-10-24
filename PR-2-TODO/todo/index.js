const express = require('express');

let app = express();
app.use(express.json());
let counter = 3;

let initialTodo = [
  { title: "HTML", isCompleted: true, id: 1 },
  { title: "javascript", isCompleted: true, id: 2 },
  { title: "React", isCompleted: false, id: 3 },
];

app.get('/', (req, res) => {
  res.send("welcome to the todo api");
});

app.get('/todos', (req, res) => {
  res.send(initialTodo);
});

app.post('/addtodo', (req, res) => {
  const { title, isCompleted } = req.body;
  const newTodo = {
    title: title,
    isCompleted: isCompleted,
    id: ++counter 
  };
  initialTodo.push(newTodo);
  res.status(200).json(newTodo);
});

app.get('/todo/:id', (req, res) => {
  let { id } = req.params;
  id = Number(id);
  const found = initialTodo.find(todo => todo.id === id);
  res.status(200).json(found);
});

app.delete('/delete/:id', (req, res) => {
  let { id } = req.params;
  id = Number(id);
  const index = initialTodo.findIndex(todo => todo.id === id);
  if (index !== -1) {
    let remove = initialTodo.splice(index, 1)[0];
    res.status(200).json({ deletedTodo: remove, todos: initialTodo });
  } else {
    res.status(404).json({ message: `Todo with ID ${id} not found` });
  }
});

app.patch('/update/:id', (req, res) => {
  let { id } = req.params;
  id = Number(id);
  const index = initialTodo.findIndex(todo => todo.id === id);
  if (index !== -1) {
    const update = { ...initialTodo[index], ...req.body };
    initialTodo[index] = update;
    res.status(200).json(update);
  } else {
    res.status(404).json({ message: `Todo with ID ${id} not found` });
  }
});

app.get('/findbystatus', (req, res) => {
  let { isCompleted } = req.query;
  if (isCompleted === 'true') {
    const TrueTodo = initialTodo.filter(todo => todo.isCompleted === true);
    res.status(200).json(TrueTodo);
  } else if (isCompleted === 'false') {
    const FalseTodo = initialTodo.filter(todo => todo.isCompleted === false);
    res.status(200).json(FalseTodo);
  } else {
    res.status(400).json({ message: "Invalid query parameter." });
  }
});

app.listen(8090, () => {
  console.log('Server is running on port 8090');
});
