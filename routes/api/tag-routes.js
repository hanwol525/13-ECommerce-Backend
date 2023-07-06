const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const getTags = await Tag.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(getTags);
  } catch (err) {
    res.status(500).json(err);
  };
});

router.get('/:id', async (req, res) => {
  try {
    const getTag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!getTag){
      res.status(404).json(getTag);
    };
    res.status(200).json(getTag);
  } catch (err) {
    res.status(500).json(err);
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try {
    const createTag = await Tag.create(req.body);
    res.status(200).json(createTag);
  } catch (err) {
    res.status(500).json(err);
  }
  // create a new tag
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (!updateTag){
      res.status(404).json(err);
    };
    res.status(200).json(updateTag);
  } catch (err) {
    res.status(500).json(err);
  };
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!deleteTag){
      res.status(404).json(err)
    };
    res.status(200).json(deleteTag);
  } catch (err) {
    res.status(500).json(err);
  };
});

module.exports = router;
