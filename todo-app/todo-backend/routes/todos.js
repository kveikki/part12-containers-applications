const redis = require('../redis');
const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {

  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })

  let addedTodos = await redis.getAsync("added_todos")
  if (!addedTodos) addedTodos = 0
  await redis.setAsync("added_todos", parseInt(addedTodos) + 1)

  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)
  req.todo.id = id

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  if (!req.todo) return res.sendStatus(404)
  return res.send(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  if(!req.body.text) return res.sendStatus(400)
  
  console.log(req.body)

  let newTodo = {
    text: req.body.text,
    done: (!req.body.done) ? false : true
  }

  newTodo = await Todo.findOneAndReplace({"_id": req.todo.id}, newTodo)
  return res.send(newTodo)
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
