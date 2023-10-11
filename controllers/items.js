const Place = require("../models/place");
const handleHttpError = require('../helpers/handleError');


const getItems = async(req, res) => {
    try {
        const items = await Place.find();
        res.status(200).send(items);
    } catch (error) {
        handleHttpError(res, {msg: 'ERROR_GET_ITEMS', ok: false}, 400);
    }
}

const getItem = async(req, res) => {
    try {
        const { id } = req.params;
        const item = await Place.findById(id);
        res.status(200).send(item);
    } catch (error) {
        handleHttpError(res, {msg: 'ERROR_GET_ITEM', ok: false}, 400);
    }
}

const createItem = async(req, res) => {
    try {
        const item = new Place(req.body);
        await item.save();
        res.status(200).send(item);
    } catch (error) {
        handleHttpError(res, {msg: 'ERROR_CREATE_ITEM', ok: false}, 400);
    }
};


const updateItem = async(req, res) => {    

    res.status(200).send({msg: 'updateItem'});

};

const deleteItem = async(req, res) => {
    res.status(200).send({msg: 'deleteItem'});
};



module.exports = {
    getItems,
    getItem,
    createItem,
    updateItem,
    deleteItem
}