require('../src/index');

/*var endPoint = 'https://oo081ls098.execute-api.ap-southeast-1.amazonaws.com/dev/graphql';
new ocs.GQLService()
.query()
.select([{product:['id','name','path','status']},{collection:['id','name','path']}]).from('getProduct')
.where({id:1,live:"HK",age:40})
.request(new ocs.HTTPServiceRequest('post', {Authorization:'bearer eyJ0aGlyZFBhcnR5SUQiOjEsICJyb2xlIjoiQURNSU4ifQ=='}, this, endPoint))
.then(response=>console.log('root',response.data))
.catch(error=>console.log('error',error));*/


console.log(new ocs.GQLService().query().select(['id','name']).from('getProduct').where({id:1}).toString());