var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Data = require('../schema/Data');

const dbRoute =
    'mongodb+srv://zgilden_db_user:XgZikaLiWjd2JHbC@335finalexamproject.ftidppf.mongodb.net';//*

    mongoose.connect(dbRoute, {
  dbName: 'dealership' // Overrides any database specified in the URI string
});//*
let db = mongoose.connection;//*

db.once('open', () => console.log('connected to the database'));//*

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));//*

let idAssign = 2;
let dealership =[
    {id:1,brand: "Ford", model: "Focus", year: 2015},
    {id:2, brand: "Kia", model: "Stinger", year: 2020},
    {id:3, brand: "Chevy", model: "SS", year: 2010}
];

/* GET home page. */
router.get('/dealership', async (req, res, next) => {
    try {
        const data = await Data.find({});
        console.log(data)
        return res.json({ success: true, info: data });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message || err });
    }
});




//localhost:3001/dealership

router.post('/dealership/', function (req, res, next) {
    let newYear = req.body.year;
    let newModel = req.body.model;
    let newBrand = req.body.brand;
    console.log({id: idAssign, year: newYear, brand: newBrand, model: newModel});
    // dealership.push({id: idAssign, year: newYear, brand: newBrand, model: newModel});
    
    let stuffToAdd = new Data();
    stuffToAdd.year = newYear;
    stuffToAdd.model = newModel;
    stuffToAdd.brand = newBrand;
    stuffToAdd.id = idAssign;

    stuffToAdd.save()





    idAssign++;
})
router.delete('/dealership/', async (req, res, next) => {
    try {
        const { brand, model, year } = req.body;

        if (!brand) {
            return res.status(400).json({ success: false, error: 'Brand/Make is required to perform deletion.' });
        }

        const deletedDealership = await Data.findOneAndDelete({ brand: brand, model: model, year:year });

        if (!deletedDealership) {
            return res.status(404).json({ success: false, error: `No dealership entry found matching brand: ${brand}` });
        }

        return res.json({ success: true, info: deletedDealership });
    } catch (err) {
        console.error('DELETE Error:', err);
        return res.status(500).json({ success: false, error: err.message || err });
    }
});
router.put('/dealership/', async (req, res, next) => {
    try {
        const { year, model, brand } = req.body;

        if (!brand) {
            return res.status(400).json({ success: false, error: 'Brand/Make is required to perform the update.' });
        }

        const updatedDealership = await Data.findOneAndUpdate(
            { brand: brand }, // Match condition (filters by make/brand)
            { 
                year: year, 
                model: model 
            }, // Updated fields
            { new: true, runValidators: true } // Options: return modified doc & validate
        );

        if (!updatedDealership) {
            return res.status(404).json({ success: false, error: `No dealership entry found matching brand: ${brand}` });
        }

        return res.json({ success: true, info: updatedDealership });
    } catch (err) {
        console.error('PUT Error:', err);
        return res.status(500).json({ success: false, error: err.message || err });
    }
});
module.exports = router;