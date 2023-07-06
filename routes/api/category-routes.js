const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {

  // find all categories
  try {
    const getCategories = await Category.findAll(
      {
        include: [{ model: Product }]
      }
    );
    res.status(200).json(getCategories);
  } catch (err){
    res.status(500).json(err);
  };
});

router.get('/:id', async (req, res) => {
  try {
    const getCategory = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
      }
    );
    if (!getCategory){
      res.status(404).json(err);
    }
    res.status(200).json(getCategory);
  } catch (err) {
    res.status(500).json(err);
  };
  // find one category by its `id` value
});

router.post('/', async (req, res) => {
  // create a new category
  try{
    const createCategory = await Category.create(req.body);
    res.status(200).json(createCategory);
  } catch (err) {
    res.status(500).json(err);
  };
});

router.put('/:id', async (req, res) => {
  try {
    const updateCategory = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (!updateCategory){
      res.status(404).json(err);
    };
    res.status(200).json(updateCategory);
  } catch (err) {
    res.status(500).json(err);
  }
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy(
      {
        where: {
          id: req.params.id
        }
      }
    );
    if (!deleteCategory){
      res.status(404).json(err);
    };
    res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(500).json(err);
  };
});

module.exports = router;
