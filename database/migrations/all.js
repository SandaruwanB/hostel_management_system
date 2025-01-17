const { sequalize } = require('../connection');

require('../../app/models/roles');
require('../../app/models/users');
require('../../app/models/faculties');
require('../../app/models/students');
require('../../app/models/payments');
require('../../app/models/complaints');
require('../../app/models/maintainers');
require('../../app/models/outtime');

module.exports.migrate = ()=>{
    sequalize.sync({force : true}).then(()=>{
        console.log("tables created");
    }).catch((err)=>{
        console.log(err);
    });
}