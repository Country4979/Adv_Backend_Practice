const express = require('express');
//const { routes } = require('../../app');
const router = express.Router();
const Anuncio = require('../../models/Anuncio')

// creamos una instancia de Anuncio en memoria
const anuncio = new Anuncio({ name: 'Boli Bic', venta: true, precio: 1, foto: "./images/anuncios/boliBic.png", tags: ['work']});

anuncio.save((err, anuncioCreado) => {
    if(err) throw err;
    console.log(`Anuncio ${anuncioCreado.name} creado.`)
});

module.exports = router;