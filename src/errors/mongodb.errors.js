const notFoundError = (res, message) => {
    return res.status(404).send(message);
};

module.exports = {
    notFoundError,
};
