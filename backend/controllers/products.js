const Product = require("../models/Product");

const uniqueRandom = require("unique-random");
const rand = uniqueRandom(0, 999999);

const queryCreator = require("../commonHelpers/queryCreator");
const filterParser = require("../commonHelpers/filterParser");
const _ = require("lodash");
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dyjwpccso',
  api_key: '535722222753226',
  api_secret: 'ZAkkqjUsrURXMeMnqCVJeK4zyrw',
});


exports.addImages = (req, res, next) => {
  if (req.files.length > 0) {
    res.json({
      message: "Photos are received"
    });
  } else {
    res.json({
      message:
        "Something wrong with receiving photos at server. Please, check the path folder"
    });
  }
};

exports.addProduct = (req, res, next) => {
  const productFields = _.cloneDeep(req.body);
  const {
    vendorCode,
    grape,
    volume,
    color,
    strength,
    sweetness,
    supplyTemperature,
    country,
    year,
    aroma,
    taste,
    ...rest
  } = productFields;

  const updatedProductFields = {
    ...rest,
    characteristics: {
      vendorCode,
      grape,
      volume,
      color,
      strength,
      sweetness,
      supplyTemperature,
      country,
      year,
    },
    productDescription: {
      aroma,
      taste,
    }
  }
  updatedProductFields.itemNo = rand();

  try {
    updatedProductFields.name = updatedProductFields.name
      .trim()
      .replace(/\s\s+/g, " ");

    // const imageUrls = req.body.previewImages.map(img => {
    //   return `/img/products/${productFields.itemNo}/${img.name}`;
    // });

    // productFields.imageUrls = _.cloneDeep(imageUrls);
  } catch (err) {
    res.status(400).json({
      message: `Error happened on server: "${err}" `
    });
  }

  const updatedProduct = queryCreator(updatedProductFields);

  const newProduct = new Product(updatedProduct);

  newProduct
    .save()
    .then(product => res.json(product))
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};

exports.updateProduct = (req, res, next) => {
  Product.findOne({ _id: req.params.id })
    .then(product => {
      if (!product) {
        return res.status(400).json({
          message: `Product with id "${req.params.id}" is not found.`
        });
      } else {
        const productFields = _.cloneDeep(req.body);

        try {
          productFields.name = productFields.name
            .trim()
            .replace(/\s\s+/g, " ");
        } catch (err) {
          res.status(400).json({
            message: `Error happened on server: "${err}" `
          });
        }

        const updatedProduct = queryCreator(productFields);

        Product.findOneAndUpdate(
          { _id: req.params.id },
          { $set: updatedProduct },
          { new: true }
        )
          .then(product => res.json(product))
          .catch(err =>
            res.status(400).json({
              message: `Error happened on server: "${err}" `
            })
          );
      }
    })
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};

exports.updateProductImg = (req, res, next) => {
  Product.findOne({ _id: req.params.id })
    .then(async product => {
      if (!product) {
        return res.status(400).json({
          message: `Product with id "${req.params.id}" is not found.`
        });
      } else {
        const productFields = _.cloneDeep(product);

        const filePaths = req.files.map(file => file.path);        

        const uploadPromises = filePaths.map(filePath => {
          return cloudinary.uploader.upload(filePath);
        });

        try {
          const result = await Promise.all(uploadPromises);

          const resultUrls = result.map(res => {
            const { url, ...rest } = res;
            return url;
          });

          productFields.productImg = resultUrls[0];
          productFields.slidesImageUrls = resultUrls.slice(1);
          const updatedProduct = queryCreator(productFields);

          Product.findOneAndUpdate(
            { _id: req.params.id },
            { $set: updatedProduct },
            { new: true }
          )
            .then(product => res.json(product))
            .catch(err =>
              res.status(400).json({
                message: `Error happened on server: "${err}" `
              })
            );
        } catch (err) {
          res.status(400).json({
            message: `Error happened on server: "${err}" `
          });
        }
      }
    })
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};

exports.getProducts = (req, res, next) => {
  const perPage = Number(req.query.perPage);
  const startPage = Number(req.query.startPage);
  const sort = req.query.sort;

  Product.find()
    .skip(startPage * perPage - perPage)
    .limit(perPage)
    .sort(sort)
    .then(products => res.send(products))
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};

exports.getProductById = (req, res, next) => {
  Product.findOne({
    _id: req.params.itemNo
  })
    .then(product => {
      if (!product) {
        res.status(400).json({
          message: `Product with itemNo ${req.params.itemNo} is not found`
        });
      } else {
        res.json(product);
      }
    })
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};

exports.getProductsFilterParams = async (req, res, next) => {
  const mongooseQuery = filterParser(req.query);
  const perPage = Number(req.query.perPage);
  const startPage = Number(req.query.startPage);
  const sort = {};

  switch (req.query.sortBy) {
    case "Alphabetically A-Z":
      sort.name = "asc";
      break;

    case "Alphabetically Z-A":
      sort.name = "desc";
      break;
    default:
      break;
  }

  try {
    const products = await Product.find(mongooseQuery)
      .skip(startPage * perPage - perPage)
      .limit(perPage)
      .sort(sort);

    const allProducts = await Product.find(mongooseQuery);

    const productsQuantity = await Product.find(mongooseQuery);

    res.json({ allProducts, products, productsQuantity: productsQuantity.length });
  } catch (err) {
    res.status(400).json({
      message: `Error happened on server: "${err}" `
    });
  }
};

exports.searchProducts = async (req, res, next) => {
  if (!req.body.query) {
    res.status(400).json({ message: "Query string is empty" });
  }

  //Taking the entered value from client in lower-case and trimed
  let query = req.body.query
    .toLowerCase()
    .trim()
    .replace(/\s\s+/g, " ");

  // Creating the array of key-words from taken string
  let queryArr = query.split(" ");

  // Finding ALL products, that have at least one match
  let matchedProducts = await Product.find({
    $text: { $search: query }
  });

  res.send(matchedProducts);
};
