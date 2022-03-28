const router = require('express').Router();
const { User, Reaction, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try {
    User.findAll({
      // include: [{ model: User },{ model: Tag }]
    });
    res.status(200).json(usersData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one product
router.get('/:id', (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try {
    const singleUserData = User.findByPk(req.params.id, {
      // include: [{ model: Category },{ model: Tag }]
    });

    if (!singleUserData) {
      res.status(404).json({ message: 'No User was found with that id!' });
      return;
    }

    res.status(200).json(singleUserData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  User.create(req.body)
    .then((user) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      // if (req.body.tagIds.length) {
      //   const productTagIdArr = req.body.tagIds.map((tag_id) => {
      //     return {
      //       product_id: product.id,
      //       tag_id,
      //     };
      //   });
      //   return ProductTag.bulkCreate(productTagIdArr);
      // }
      // if no product tags, just respond
      res.status(200).json(user);
    })
    // .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  User.updateOne(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((user) => {
      // find all associated tags from ProductTag
      res.status(200).json(user)
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
  try {
    const singleUserData = User.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!singleUserData) {
      res.status(404).json({ message: 'No User found with that id!' });
      return;
    }
    res.status(200).json(singleUserData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
