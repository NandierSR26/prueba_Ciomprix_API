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

const login = async(req, res) => {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    if(!user) {
        return res.status(400).send({
            ok: false,
            msg: 'The user not exist'
        })
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if(!validPassword){
        return res.status(401).send({
            ok: false,
            msg: 'password is wrong'
        })
    }

    const token = await generateJWT(user.id)

    return res.status(200).send({
        ok: true,
        msg: 'User authenticated successfully',
        token
    })
}

module.exports = {
    register,
    login
}