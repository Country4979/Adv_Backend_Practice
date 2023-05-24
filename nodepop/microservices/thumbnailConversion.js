'use strict';

const jimp = require('jimp');
const path = require('node:path');
const multer = require('multer');
const { Responder } = require('cote');

const responder = new Responder({
    name: 'The Image Conversion Service',
});

//Lógica de la conversión
responder.on('Thumbnail conversion', async (req, cb) => {
    try {
        const { name, path } = req;
        console.log(Date.now(), 'Service:', name);
         //Read the image from path.
        const image = await jimp.read(req.path);

        //Resize image method
        image.resize(100, 100, jimp.RESIZE_BEZIER);

        // Save the image
        const filename = path.basename(req.path);
        const thumbnail = await image.writeAsync(
            'public/thumbnails/small_' + filename
        );

        cb(null, 'Thumbnail generated correctly');
    } catch (error) {
        cb(error);
    }
});

console.log('Microservice ready to receive API requests');
