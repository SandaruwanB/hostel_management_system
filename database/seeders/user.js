const users = require('../../app/models/users');
const roles = require('../../app/models/roles');
const bcrypt = require('bcrypt');
const { where } = require('sequelize');

module.exports.user_seed = async ()=>{
    const role = await roles.findOne({
        where : {
            'name' : 'admin'
        }
    });

    bcrypt.genSalt(10,(err, salt)=>{
        bcrypt.hash("admin@123", salt, async (err, hash)=>{
            await users.create({
                'userName' : 'admin',
                'email' : 'admin@gmail.com',
                'password' : hash,
                'status' : false,
                'roleId' : role.id
            });
        });
    });
}