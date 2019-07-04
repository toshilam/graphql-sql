# graphql-sql

## A micro library that helps making graphql request in a simple way using sql like style.

## Installing

Using npm:

```bash
$ npm install graphql-sql
```

### Quickstart

```js
var ocs = require('graphql-sql');

//your graphql services endpoint
var endPoint = 'https://www.endpoint.com/graphql';

new ocs.GQLService().query().select(['id','name']).from('getProduct').where({id:1})
.request(new ocs.HTTPServiceRequest('post', {Authorization:'bearer TOKEN'}, null, endPoint))
.then(response=>console.log(response.data))
.catch(error=>console.log('error',error));
```

### Preview graphql query

```js
require('graphql-sql');

console.log(new ocs.GQLService().query().select(['id','name']).from('getProduct').where({id:1}).toString());
// query 
// {
// 	getProduct(id:1) 
// 	{
// 		id,
// 		name
// 	}
// }
```

### Creating an instance
creating a new instance with a custom config
more info about config please refer to : [https://www.npmjs.com/package/axios#request-config](https://www.npmjs.com/package/axios#request-config)
```js
require('graphql-sql');

var gqlService = (new gsql.GQLService())

gqlService.getRequester().defaults.baseURL = 'BASE_URL';
gqlService.getRequester().defaults.headers.common['Authorization'] = 'AUTH_TOKEN';

gqlService.query().select(['id','name']).from('getProduct').where({id:1}).post('/path/to/request').then(console.log);
```

### Example

```js
var ocs = require('graphql-sql');

//your graphql services endpoint
var endPoint = 'https://www.endpoint.com/graphql';

//initialize GQLService
new ocs.GQLService()
/* [optional] type of request (query or mutation) by calling .query() or .mutation()
* by default "query" is set.
*/
.query()
/* [required] defining which fields to be returned by passing an array with field name, 
* or object with key (type name) and value (array with list of field)
* #select([fieldName1, fieldName2, {typeName:[fieldName1, fieldName2]}])
*/
.select([{product:['id','name','path','status']},{collection:['id','name','path']}])
//defining type of service
.from('getProduct')
/* [optional] defining condition by passing an object with key pair value ()
* #where(key1:value1,key2:value2})
*/
.where({id:1,madeFrom:"HK"})
/*
* [required] start making request by passing HTTPServiceRequest
* @param {string} type - request method post, get, put...
* @param {object} data - currently only support Authorization
* @param {object} requester - callback object which has implemented result method for data handling and fault method for error handling
* @param {string} endpoint'
* @returns {Promise} 
*/
.request(new ocs.HTTPServiceRequest('post', {Authorization:'bearer TOKEN'}, null, endPoint))
// data handling once receiving server response
.then(response=>console.log(response.data))
// or error handling if anything goes wrong
.catch(error=>console.log('error',error));
```

