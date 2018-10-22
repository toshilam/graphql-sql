require('../src/index');

console.log(new ocs.GQLService().query().select(['id','name']).from('getProduct').where({id:1}).toString());