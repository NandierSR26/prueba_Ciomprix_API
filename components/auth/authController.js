const Users = require("../users/Users")
const bcrypt = require('bcrypt');
const { generateJWT } = require("../../helpers/generateJWT");
const { uploadFile } = require("../../services/uploadFile");

const register = async(req, res) => {
    try {
        const user = new Users(req.body)
    
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(req.body.password, salt)

        if(req.files) user.avatar = await uploadFile(req.files)

        await user.save()

        return res.status(200).send({
            ok: true,
            msg: 'user created successfully',
            user
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            ok: false,
            msg: 'something went wrong'
        })
    }
}

module.exports = {
    register
}