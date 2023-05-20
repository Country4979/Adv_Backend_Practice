'use strict';
const fs = require('fs')
const Anuncio = require('../models/Anuncio');
const connection = require('../lib/connectMongoose');
const path = require('path')
const anuncioData = fs.readFileSync(path.join(__dirname, '../routes/api/anuncios-json.json'))
const init = JSON.parse(anuncioData)

main().catch(err => console.log('Hubo un error: ', err));

async function main() {

  // inicializamos colección de anuncios
  await initAnuncios();

  connection.close();

}

async function initAnuncios() {

  // borra todos los documentos de la colección anuncios
  const deleted = await Anuncio.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} anuncios.`);

  // crear anuncios iniciales
  const inserted = await Anuncio.insertMany(init)

  console.log(`Creados ${inserted.length} anuncios`);
}
