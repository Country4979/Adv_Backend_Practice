//ESTO ES LO QUE TIENE QUE TIENE QUE HACER EL MICROSERVICIO

    //Debe recibir un mensaje con la ruta del filsystem a la imagen

    //suscribir el worker al mensaje y hcer los thumnails
const jimp = require('jimp');

async function imgeThumbnail() {
    // Read the image.
    const image = await jimp.read('test/image.png'); //<-- Obtener el archivo de la ruta que le digamos

    //Resize image method
    image.resize(100, 100, Jimp.RESIZE_BEZIER);

    // Save the image
    await image.writeAsync('test/image.png'); //Poner algo así como 'small_'+nombre original del archivo
}
