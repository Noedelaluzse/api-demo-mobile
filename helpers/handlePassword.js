const bcrypt = require('bcryptjs');

const encrypt = async(password) => {
    const hash = await bcrypt.hashSync(password, 10);
    return hash;
};

const compare = async(password, hash) => {

    const compare = await bcrypt.compareSync(password, hash);
    return compare;
};

module.exports = {
    encrypt,
    compare
};