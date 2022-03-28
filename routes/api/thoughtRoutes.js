const router = require('express').Router();
const Thought = require('../../models/Thought');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const thoughtsData = Thought.findAll();
    res.status(200).json(thoughtsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const singleThoughtData = Thought.findByPk(req.params.id);

    if (!singleThoughtData) {
      res.status(404).json({ message: 'No thought was found with that id!' });
      return;
    }

    res.status(200).json(singleThoughtData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  Thought.create(req.body)
    .then((thought) => {
      res.status(200).json(thought);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Thought.updateOne(req.body)
    .then((tag) => {
      res.status(200).json(tag);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const singleThoughtData = Thought.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!singleThoughtData) {
      res.status(404).json({ message: 'No thought found with that id!' });
      return;
    }

    res.status(200).json(singleThoughtData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
