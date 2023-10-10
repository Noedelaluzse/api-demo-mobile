const {Schema, model} = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    phone: {
        type: String,
        required: [true, 'El email es obligatorio'],
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
},
{
    timestamps: true,
    versionKey: false
});

UserSchema.methods.toJSON = function() {
    const { __v, password, ...user } = this.toObject();
    usuario.id = _id;
    return user;
};

module.exports = model('User', UserSchema);