const { request } = require('express');
const express = require('express');
const { Todo } = require('../mongo');
const { getAsync, setAsync } = require('../redis');
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });
  let counter = 0;
  const getCounter = Number(await getAsync('counter'));
  if (getCounter) {
    counter = getCounter;
  }
  setAsync('counter', counter + 1);
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

router.get('/statistics', async (req, res) => {
  let counter = 0;
  const getCounter = Number(await getAsync('counter'));
  if (getCounter) {
    counter = getCounter;
  }
  const data = { added_todos: counter };
  res.send(data);
});
/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res, next) => {
  const body = req.body;
  const todo = {
    text: body.text,
    done: body.done,
  };

  Todo.findByIdAndUpdate(req.todo._id, todo, { new: true })
    .then((updatedTodo) => {
      res.json(updatedTodo);
    })
    .catch((error) => next(error));
});

router.use('/:id', findByIdMiddleware, singleRouter);

module.exports = router;
