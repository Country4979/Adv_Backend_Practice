'use strict';
//ESTO ES LO QUE TIENE QUE TIENE QUE HACER EL MICROSERVICIO

//Debe recibir un mensaje con la ruta del filsystem a la imagen

//suscribir el worker al mensaje y hacer los thumnails
const jimp = require('jimp');
const multer = require('multer');
const { Responder } = require('cote');

const responder = new Responder({
    name: 'The Image Conversion Service',
});

responder.on('Thumbnail conversion', (req, done) => {
    const { name } = req;

    console.log(Date.now(), 'Service:', name);

    //Hacer la conversión

    const imgeThumbnail = async () => {
        // Read the image.
        const image = await jimp.read('test/image.png'); //<-- Obtener el archivo de la ruta que le digamos

        //Resize image method
        image.resize(100, 100, jimp.RESIZE_BEZIER);

        // Save the image
        await image.writeAsync('public/thumbnails/small_' + file.filename); //Poner algo así como 'small_'+nombre original del archivo
    };
});

async function imgeThumbnail() {}
