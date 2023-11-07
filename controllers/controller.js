const fs = require("fs");

const todoList = [];

let data = fs.readFileSync("src/data.json", "utf8");
let array = JSON.parse(data);

array.forEach((item) => {
  todoList.push(item);
});

const render = (req, res) => {
  console.log(todoList);
  res.render("index", { todoList });
};

const create = (req, res) => {
  const { todo } = req.body;

  const todoItem = {
    id: todoList.length + 1,
    todo,
    done: false,
  };

  todoList.push(todoItem);

  fs.writeFileSync("src/data.json", JSON.stringify(todoList));
  res.render("success", { type: "create" });
};

const update = (req, res) => {
  const { id, todo, done } = req.body;

  const todoItem = todoList.filter((todoItem) => todoItem.id == id);

  if (todoItem.length > 0) {
    const updatedTodo = {
      id: todoItem[0].id,
      todo: todo,
      done: done === "on" ? true : false,
    };
    todoList.splice(todoList.indexOf(todoItem[0]), 1, updatedTodo);
    fs.writeFileSync("src/data.json", JSON.stringify(todoList));
  } else {
    console.log(`No todo item found with id: ${id}`);
  }

  res.render("success", { type: "update" });
};

const remove = (req, res) => {
  const { id } = req.body;

  const todoItem = todoList.filter((todoItem) => todoItem.id == id);

  if (todoItem.length > 0) {
    todoList.splice(todoList.indexOf(todoItem[0]), 1);
    fs.writeFileSync("src/data.json", JSON.stringify(todoList));
  }

  res.render("success", { type: "remove" });
};

module.exports = {
  render,
  create,
  update,
  remove,
};
