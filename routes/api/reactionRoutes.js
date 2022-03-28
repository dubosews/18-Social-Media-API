const router = require('express').Router();
const Thought = require('../../models/Thought');
const Reaction = require('../../models/Reaction')

// The `/api/tags` endpoint

router.put('/thoughts/:thoughtId/reactions', (req, res) => {
    try {
      const singleThoughtData = Thought.findOne(req.params.thoughtId);
  
      if (!singleThoughtData) {
        res.status(404).json({ message: 'No thought found with that id!' });
        return;
      }
      singleThoughtData.Reactions.push(req.body);
      singleThoughtData.save(done);
      res.status(200).json(singleThoughtData.Reactions);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.delete('/thoughts/:thoughtId/reactions', (req, res) => {
    Thought.updateOne({ id: req.params.thoughtId }, {
      $pull: {
          Reactions: req.body
      },
  });
  });

module.exports = router;
