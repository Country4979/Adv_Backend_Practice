'use strict';
const fs = require('fs');
const { Anuncio, Usuario } = require('../models');
const connection = require('../lib/connectMongoose');
const path = require('path');
const anuncioData = fs.readFileSync(
    path.join(__dirname, '../routes/api/anuncios-json.json')
);
const init = JSON.parse(anuncioData);

main().catch((err) => console.log('Hubo un error: ', err));

async function main() {
    // Initialise Anuncios collection
    await initAnuncios();

    await initUsuarios();

    connection.close();
}

async function initAnuncios() {
    // Delete all documents in the Anuncios collection
    const deleted = await Anuncio.deleteMany();
    console.log(`Eliminados ${deleted.deletedCount} anuncios.`);

    // Create initial advertisements
    const inserted = await Anuncio.insertMany(init);

    console.log(`Creados ${inserted.length} anuncios`);
}

async function initUsuarios() {
    // Deletes all users from the Usuarios collection
    const deleted = await Usuario.deleteMany();
    console.log(`Eliminados ${deleted.deletedCount} usuarios.`);

    // Create initial users
    const inserted = await Usuario.insertMany([
        {
            email: 'admin@example.com',
            password: await Usuario.hashPassword('1234'),
        },
        {
            email: 'user@example.com',
            password: await Usuario.hashPassword('1234'),
        },
        {
            email: 'usuario@example.com',
            password: await Usuario.hashPassword('1234'),
        },
    ]);

    console.log(`Creados ${inserted.length} usuarios`);
}
