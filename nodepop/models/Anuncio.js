const { name } = require('ejs');
const mongoose = require('mongoose');

// Define the ads scheme
const anuncioSchema = mongoose.Schema({
    name: String,
    sale: Boolean,
    price: { type: Number, min: 0.1, max: 10000 },
    photo: String,
    tag: [String]
    });

// Define the filter list
anuncioSchema.statics.lista = function(filtro, skip, limit, sort, fields) {
  const query = Anuncio.find(filtro);
  query.skip(skip);
  query.limit(limit);
  query.sort(sort);
  query.select(fields);
  return query.exec();
}

anuncioSchema.statics.price = function(price) {
  const newPrice = price.split('-');
  const price1 = newPrice[0];
  const price2 = newPrice[1];
  const exactPrice = price;


  if (price1 && price2) {
    const query = Anuncio.find({ price: { $gte: price1, $lte: price2 } });
    return query.exec();
  }
  else if (price1) {
    const query = Anuncio.find({ price: { $gte: price1} });
    return query.exec();
  }
  else if (price2){
    const query = Anuncio.find({ price: { $lte: price2} });
    return query.exec();
  }
  else if (exactPrice){
    const query = Anuncio.find({ price : { $eq: exactPrice} });
    return query.exec();
  }
}

anuncioSchema.statics.distinctTags = function() {
  const query = Anuncio.distinct('tag');
  return query.exec();
}


// crear el modelo de anuncio
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

// exportar el modelo
module.exports = Anuncio;