const shortid = require('shortid')
const path = require('path')

const uploadFile = ( files ) => {

    return new Promise((resolve, reject) => {
        const { avatar } = files;
        const extension = avatar.mimetype.split('/')[1];
        const fileName = shortid.generate() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads', fileName);

        avatar.mv(uploadPath, (err) => {
            if (err) {
                return reject(err);
            }
            resolve( fileName );
        });
    })
}

module.exports = {
    uploadFile
}