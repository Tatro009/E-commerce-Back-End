const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try {
    const productsData = await Product.findAll({
      include: [{ model: Category }, { model: Tag, through: ProductTag }],
    });
    res.status(200).json(productsData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag, through: ProductTag }],
    });

    if (!productData) {
      res.status(404).json({ message: 'No product found with this id' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// create new product
router.post('/', async (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
    try {
      const productData = await Product.create(req.body);
      if (req.body.tagIds && req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: productData.id,
            tag_id,
          };
        });
        await ProductTag.bulkCreate(productTagIdArr);
      }
      res.status(200).json(productData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
});

// update product
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updatedProduct[0]) {
      res.status(404).json({ message: 'No product found with this id' });
      return;
    }
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagsToRemove = await ProductTag.destroy({
        where: {
          product_id: req.params.id,
          tag_id: {
            [Op.notIn]: req.body.tagIds,
          },
        },
      });
      const newProductTags = req.body.tagIds
        .filter((tag_id) => {
          return !updatedProduct.productTags
            .map(({ tag_id }) => tag_id)
            .includes(tag_id);
        })
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      await ProductTag.bulkCreate(newProductTags);
    } else {
      await ProductTag.destroy({ where: { product_id: req.params.id } });
    }
    res.status(200).json(updatedProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!productData) {
      res.status(404).json({ message: 'No product found with this id' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
