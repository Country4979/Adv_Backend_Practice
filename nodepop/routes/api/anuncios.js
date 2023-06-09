const express = require('express');
const router = express.Router();
const Anuncio = require('../../models/Anuncio');
const upload = require('../../lib/upLoadConfigure');
const { Requester } = require('cote');

// Returns a list of ads
router.get('/', async (req, res, next) => {
    try {
        //Tags list
        res.locals.listaTag = [
            { name: ['Work', 'Lifestyle', 'Motor', 'Mobile'] },
        ];
        // Filters
        const filterByName = req.query.name;
        const filterBySale = req.query.sale;
        // http://localhost:3000/api/anuncios?tag=Motor
        const filterByTag = req.query.tag;
        // http://localhost:3000/api/anuncios/price=value
        const filterByPrice = req.query.price;

        // Pagination
        const skip = req.query.skip;
        const limit = req.query.limit;

        // Fields
        const fields = req.query.fields;

        // Order
        const sort = req.query.sort;

        const filter = {};

        if (filterByName) {
            filter.name = { $regex: filterByName, $options: 'i' }; //Obvia mayúsculas y minúsculas y permite búsqueda por palabras
        }

        if (filterByPrice) {
            filter.price = filterByPrice;
        }

        if (filterBySale) {
            filter.sale = filterBySale;
        }

        if (filterByTag) {
            filter.tag = filterByTag;
        }

        const anuncios = await Anuncio.lista(filter, skip, limit, sort, fields);

        if (req.originalUrl.startsWith('/api/')) {
            res.json({ results: anuncios });
        } else {
            res.locals.anuncios = anuncios;
            res.render('index');
        }
    } catch (error) {
        next(error);
    }
});

//  GET /api/anuncios?tag
router.get('/', async (req, res, next) => {
    try {
        const tags = await Anuncio.distinctTags();
        res.json({ results: tags });
    } catch (error) {
        next(error);
    }
});

//Range price - // http://localhost:3000/value1-value2
router.get('/:price', async (req, res, next) => {
    try {
        //Tags list
        res.locals.listaTag = [
            { name: ['Work', 'Lifestyle', 'Motor', 'Mobile'] },
        ];
        let price = req.params.price;

        const anuncios = await Anuncio.price(price);

        if (req.originalUrl.startsWith('/api/')) {
            res.json({ results: anuncios });
        } else {
            res.locals.anuncios = anuncios;
            res.render('index');
        }
    } catch (error) {
        next(error);
    }
});

// Create an advertisement
router.post('/', upload.single('photo'), async (req, res, next) => {
    const requester = new Requester({ name: 'Nodepop' });
    try {
        const anuncioData = req.body;

        console.log(req.file);

        anuncioData.photo = req.file.filename;

        // Create an Ad instance

        const anuncio = new Anuncio(anuncioData);

        // Persist in the DB the created instance

        const anuncioPersistido = await anuncio.save();

        const event = {
            type: 'Thumbnail conversion',
            name: 'Thumbnail Conversion',
            filepath: req.file.path,
        };

        requester.send(event, (err, thumbnailRoute) => {
            console.log(
                'Sent thumbnail creation event with the image: ' +
                    req.file.originalname
            );
            if (err) {
                res.status(500).send(err.message);
            } else {
                console.log(
                    Date.now(),
                    'Nodepop obtiene thumbnail: ',
                    thumbnailRoute
                );
            }
        });

        res.json({ result: anuncioPersistido });
        console.log(`Ad created successfully`);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
