const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema(
    {
        id: Number,
        brand: String,
        model: String,
        year: Number
}
);



module.exports = mongoose.model("Data", DataSchema);