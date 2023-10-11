const handleError = (res, message = {msg: "Algo sucedio"}, code = 403) => {
    res.status(code);
    return res.send(message);
}

module.exports = handleError;