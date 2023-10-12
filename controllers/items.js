const Place = require("../models/place");
const handleHttpError = require('../helpers/handleError');
const { matchedData, body } = require("express-validator");


const getItems = async(req, res) => {
    try {
        const items = await Place.find().select('-isdeleted');
        const data = {
            ok: true,
            items
        }
        res.status(200).send(data);
    } catch (error) {
        handleHttpError(res, {msg: 'ERROR_GET_ITEMS', ok: false}, 400);
    }
}

const getItem = async(req, res) => {
    try {
        const { id } = req.params;
        const item = await Place.findById({_id: id}).select('-isdeleted');
        res.status(200).send(item);
    } catch (error) {
        handleHttpError(res, {msg: 'ERROR_GET_ITEM', ok: false}, 400);
    }
}

const createItem = async(req, res) => {
    try {
        const body = matchedData(req);
        const item = new Place(body);
        await item.save();
        item.set('isdeleted', undefined, {strict: false})
        res.status(200).send({msg: 'Item creado correctamente', ok: true});
    } catch (error) {
        handleHttpError(res, {msg: 'ERROR_CREATE_ITEM', ok: false}, 400);
    }
};


const updateItem = async(req, res) => {  
    
    try {
        const { id } = req.params;
        const body = req.body;
        await Place.findOneAndUpdate({_id: id}, body);
        res.status(200).send({msg: 'Item Actualizado correctamente', ok: true});
    } catch(error) {
        console.log(error);
        handleHttpError(res, {msg: 'ERROR_UPDATE_ITEM', ok: false}, 400);
    }
   
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