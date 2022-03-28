const router = require('express').Router();
const { User } = require('../../models');

// The `/api/categories` endpoint

router.put('/:userId/friends/:friendId', (req, res) => {
  try {
    const singleUserdata = User.findOne(req.params.userId);

    if (!singleUserdata) {
      res.status(404).json({ message: 'No User found with that id!' });
      return;
    }
    singleUserdata.friends.push(req.params.friendId);
    singleUserdata.save(done);
    res.status(200).json(singleUserdata.friends);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:userId/friends/:friendId', (req, res) => {
  User.updateOne({ id: req.params.userId }, {
    $pull: {
        friends: req.params.friendId
    },
});
});

module.exports = router;
