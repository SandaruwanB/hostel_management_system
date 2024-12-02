const { sequalize } = require('../connection');

require('../../app/models/roles');
require('../../app/models/users');

module.exports.migrate = ()=>{
    sequalize.sync({force : true}).then(()=>{
        console.log("tables created");
    }).catch((err)=>{
        console.log(err);
    });
}