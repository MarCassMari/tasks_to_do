const badRequestError = (res, message) => {
    return res.status(400).send(message);
};

const internalServerError = (res, message) => {
    return res.status(500).send(message);
};
module.exports = {
    badRequestError,
    internalServerError,
};
