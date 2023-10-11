const {Schema, model} = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    lastname: {
        type: String,
        required: [true, 'El apellido es obligatorio']
    },
    phone: {
        type: String,
        required: [true, 'El telefono es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    gender: {
        type: String,
        required: [true, 'El genero es obligatorio']
    },
    status: {
        type: Boolean,
        default: false
    },
    opt: {
        type: Number,
        default: 0
    },
},
{
    timestamps: true,
    versionKey: false
});

UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject();
    user.id = _id;
    return user;
};

module.exports = model('User', UserSchema);