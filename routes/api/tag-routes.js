const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
 Tag.findAll({
  include: [
     {
      model: Product,
      through: ProductTag
    } 
   ] //to find all tags / associated data
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => { console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
Tag.findOne({
      where: {
      id: req.params.id
    }, //locate single tag by id
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
.then(dbTagData => {
   if (!dbTagData) {
    res.status(404).json({ message: 'tag was not found with this id' });
    }
  res.status(200).json(dbTagData);
  })
  .catch(err => res.status(400).json(err));
});

router.post('/', (req, res) => {
  // create a new tag
 Tag.create({ 
  tag_name: req.body.tag_name
 })   
 .then(dbTagData => res.json(dbTagData));
}); //vector stores the tag

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
