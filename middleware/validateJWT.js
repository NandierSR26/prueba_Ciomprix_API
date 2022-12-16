const jwt = require('jsonwebtoken');
const Users = require('../components/users/Users');

const validateJWT = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).send({
                ok: false,
                msg: 'No token'
            })
        }

        const token = authorization.split(' ')[1];

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = await Users.findById(uid);
        if( !user ){
            return res.status(400).send({
                ok: false,
                msg: 'Token is not valid - the user not exist'
            });
        }

        req.user = uid;
        next();

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            ok: false,
            msg: 'someting went wrong'
        })
    }
}

module.exports = {
    validateJWT
}