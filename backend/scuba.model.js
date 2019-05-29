const mongoose = require('mongoose');
const Schma = mongoose.Schema;
let Scuba = new Schma({
    
    scuba_description: {
        type: String
    },
    scuba_name: {
        type: String
    },
    scuba_pris: {
        type: Number
    }
})

module.exports = mongoose.model('Scuba', Scuba);