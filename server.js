const express = require('express');
const routes = require('./routes');
// import sequelize connection
const sequelize = require('./config/connection');
const seedCategories = require('./seeds/category-seeds')
const seedProducts =  require('./seeds/product-seeds')
const seedTags = require('./seeds/tag-seeds')
const seedProductTags = require('./seeds/product-tag-seeds')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: true }).then( async () => {
  await seedCategories()
  await seedProducts()
  await seedTags()
  await seedProductTags()
  app.listen(PORT, () => console.log('Now listening'));
}); 
