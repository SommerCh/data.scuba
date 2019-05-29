

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const scubaRoutes = express.Router();
const PORT = 4000;


// Model der arbejdes med i server
let Scuba = require('./scuba.model')

// Server på port 4000 - indstillinger
app.use(cors());
app.use(bodyParser.json());

app.use('/scubas', scubaRoutes);
app.listen(PORT, function () {
    console.log("Server is running on Port:" + PORT)
});


// Her åbnes der for databasen - og der tjekkes om der er hul igennem
mongoose.connect('mongodb://127.0.0.1:27017/scubas', {
    useNewUrlParser: true
});
const connection = mongoose.connection;
connection.once('open', function () {
    console.log('MongoDB connection successfully')
})



// GET - henter alle 
scubaRoutes.route('/').get(function (req, res) {
    Scuba.find(function (err, scubas) {
        if (err) {
            console.log(err);
        } else {
            res.json(scubas)
        }
    });
});


// GET - 
scubaRoutes.route('/:id').get(function (req, res) {
    let id = req.params.id;
    Scuba.findById(id, function (err, scuba) {
        res.json(scuba);
    });
});


// POST - 
scubaRoutes.route('/add').post(function (req, res) {

    let scuba = new Scuba(req.body);

    scuba.save()
        .then(scuba => {
            res.status(200).json({ 'scuba': 'scuba added sucssesfully' })
                .catch(err => {
                    res.status(400).send('adding new scuba failed');
                });
        });
});


// POST - rette 
scubaRoutes.route('/update/:id').post(function (req, res) {
    Scuba.findById(req.params.id, function (err, scuba) {
        if (!scuba)
            res.status(404).send('data is not found')
        else
        scuba.scuba_description = req.body.scuba_description;
        scuba.scuba_name = req.body.scuba_name;
        scuba.scuba_pris = req.body.scuba_pris;
        scuba.save().then(scuba => {
            res.json('Scuba updated')
        })
            .catch(ree => {
                res.status(400).send("Update not possible");
            });
    })
})

scubaRoutes.delete('/delete/:id', function (req, res) {
    Scuba.deleteOne({_id: req.params.id}, function (err, result) {

        console.log("svaret fro Mongoose, når vi har slettet er:", result);

        if (err) {
            console.log("fejl!!!");
        } else {
            var svarretur="antal slettet scubas:"+ result.deleteCount
            res.json(svarretur);
            console.log("antal slettet:", result.deleteCount);
        }
    }).catch(function () {
        console.log("noget gik galt");
    });
})
