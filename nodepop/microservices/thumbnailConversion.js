'use strict';

const jimp = require('jimp');
const path = require('node:path');
const multer = require('multer');
const { Responder } = require('cote');

const responder = new Responder({
    name: 'The Image Conversion Service ',
});

//Lógica de la conversión
responder.on('Thumbnail conversion', async (req, cb) => {
    try {
        const { name, filepath } = req;
        const route = path.join(__dirname, '..', 'public', 'thumbnails', '/');
        const filenames = path.basename(filepath);
        const nameReSized = 'small_' + filenames;
        const thumbnailRoute = route + nameReSized;

        console.log(thumbnailRoute);
        console.log(Date.now(), 'Service:', name);

        //Read the image from path.
        const image = await jimp.read(req.filepath);

        //Resize image method
        image.resize(100, 100, jimp.RESIZE_BEZIER);
        console.log('Conversión realizada correctamente');

        const thumbnail = await image.writeAsync(thumbnailRoute);
        console.log('Thumnail saved in: ' + thumbnailRoute);
        cb(null, nameReSized);
    } catch (error) {
        cb(error);
    }
});

console.log('Microservice ready to receive API requests');
