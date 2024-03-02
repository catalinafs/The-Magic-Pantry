module.exports = (req, res, next, regex) => {
    const { body, method } = req;

    if (method === 'PATCH') {
        return res.status(500).json({ msg: "Invalid 'PATCH' method" });
    }

    if (Object.keys(body).length > Object.keys(regex).length) {
        return res.status(400).json({ msg: 'Se enviaron campos demas' });
    }

    for (let value in regex) {
        if (!body[value]) {
            return res.status(400).json({ msg: `Es requerido el campo ${value}` });
        }

        if (!regex[value].test(body[value])) {
            return res.status(400).json({ msg: `El campo ${value} esta erroneo` });
        }
    }

    next();
}