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
  res.send(newTodo);
});

app.get('/todo/:id', (req, res) => {
  let { id } = req.params;
  const found = initialTodo.find(todo => todo.id == id);
  res.send(found);
});

app.delete('/delete/:id', (req, res) => {
  let { id } = req.params;
  const Delete = initialTodo.find(todo => todo.id == id);
  if (Delete) {
    initialTodo.filter(todo => todo.id != id);
    res.send({ deletedTodo:Delete, todos: initialTodo });
  } else {
    res.send({ message: `Todo with ID ${id} not found` });
  }
});


app.patch("/update/:id", (req, res) => {
  let { id } = req.params;
  const data = initialTodo.map((ele) =>
    ele.id == id ? { ...ele, ...req.body } : ele
  );
  initialTodo = data;
  const updatedTodo = initialTodo.find(todo => todo.id == id);
    res.send(updatedTodo);  
});


app.get('/findbystatus', (req, res) => {
  let { isCompleted } = req.query;
  if (isCompleted === 'true') {
    const TrueTodo = initialTodo.filter(todo => todo.isCompleted === true);
    res.send(TrueTodo);
  } else if (isCompleted === 'false') {
    const FalseTodo = initialTodo.filter(todo => todo.isCompleted === false);
    res.send(FalseTodo);
  } else {
    res.send({ message: "Invalid query parameter." });
  }
});

app.listen(8090, () => {
  console.log('Server is running on port 8090');
});
