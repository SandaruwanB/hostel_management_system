const roles = require('../../app/models/roles');

module.exports.roles_seeder = async ()=>{
    await roles.bulkCreate([
        {
            'name' : 'admin'
        },
        {
            'name' : 'student'
        },
        {
            'name' : 'manager'
        }
    ]);
}