const Users = require("./Users")
const bcrypt = require('bcrypt');
const { disconnect } = require("mongoose");
const { uploadFile } = require("../../services/uploadFile");

const getUsers = async (req, res) => {
    try {
        const users = await Users.find()

        return res.status(200).send({
            ok: true,
            users
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            ok: false,
            msg: 'Something went wrong'
        })
    }
}
const getUser = async (req, res) => {

    const { id } = req.params;
    const user = await Users.findById(id);

    return res.status(200).send({
        ok: true,
        user
    })

}

const updateUser = async (req, res) => {
    let avatar
    try {
        const { id } = req.params
        const { password, ...rest } = req.body

        if(req.user.uid !== id) {
            return res.status(401).send({
                ok: false,
                msg: 'Not authorized'
            })
        }
        
        if (password) {
            const salt = bcrypt.genSaltSync();
            rest.password = bcrypt.hashSync(password, salt);
        }
        
        if(req.files) avatar = await uploadFile(req.files)

        const data = {
            ...rest,
            avatar
        }

        const user = await Users.findByIdAndUpdate(id, data, { new: true })

        return res.status(200).send({
            ok: true,
            msg: 'User updated successfully',
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            ok: false,
            msg: 'Something went wrong'
        })
    }

}
const deleteUser = async (req, res) => {
    const {id} = req.params

    if(req.user !== id) {
        return res.status(401).send({
            ok: false,
            msg: 'Not authorized'
        })
    }

    await Users.findByIdAndDelete(id);
    return res.status(200).send({
        ok: true,
        msg: 'The User was delete successfully'
    })
}

module.exports = {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
}