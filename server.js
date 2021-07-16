const express = require("express");
const cors = require("cors");
const uuid = require("uuid");
let todoList = [];

const app = express();

app.use(cors());
app.use(express.json());

app.get("/data", (req, res) => {
  res.json(todoList);
});

app.post("/data", (req, res) => {
  //console.log(req.body);
  todoList.push({ id: uuid.v4(), task: req.body.task });
  res.json({ msg: "task added successfully!!" });
});

app.delete("/data/:id", (req, res) => {
  todoList = todoList.filter((task, index, arr) => {
    return task.id != req.params.id;
  });
  //console.log(todoList);
  res.json({ msg: `task ${req.params.id} deleted` });
});

app.listen(5000, () => {
  console.log(`Server Started Listening at port 5000`);
});
