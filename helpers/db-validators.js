const Users = require("../components/users/Users")

const verifyIfEmailExists = async(email) => {
    const user = await Users.findOne({email})
    if(user) throw new Error('The E-mail already exists')
}
const verifyIfIdExist = async(id) => {
    const user = await Users.findById(id)
    if(!user) throw new Error('This user not exist')
}

module.exports = {
    verifyIfEmailExists,
    verifyIfIdExist
}