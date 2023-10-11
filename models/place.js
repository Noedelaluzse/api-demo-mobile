const {Schema, model} = require('mongoose');


const PlaceSchema = Schema({

    name: {
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    description: {
        type: String,
        required: [true, "La descripcion es obligatoria"]
    },
    img: {
        type: String,
    },
    coordinates: {

        latitude : {
            type: Number,
            required: [true, "La latitud es obligatoria"]
        },
        longitude : {
            type: Number,
            required: [true, "La longitud es obligatoria"]
        }
    },
    isdeleted: {
        type: Boolean,
        default: false
    },
},
{
    timestamps: true,
    versionKey: false
}
);

PlaceSchema.methods.toJSON = function() {
    const { __v, _id, ...place } = this.toObject();
    place.id = _id;
    return place;
}

module.exports = model("Place", PlaceSchema);