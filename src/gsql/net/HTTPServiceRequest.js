var _ = require('underscore');
var createjs = require('../../createjs/');
var gsql;
module.exports = gsql = require('../');

( function() {

	
	var HTTPServiceRequest = function(inType, inData, inRequester, inHost, inShareSecretKey, inSalt) 
	{
		var Tools = gsql.Tools;
		
		this.host = inHost;
		this.initialize(inType, inData, inRequester);
		
		this.shareSecretKey = Tools.hasValue(inShareSecretKey) ? inShareSecretKey : Tools.getRandomString(16);
		this.salt = Tools.hasValue(inSalt) ? inSalt : Tools.getRandomString(6);
	}
	
	HTTPServiceRequest.TYPE_POST = 'post';
	HTTPServiceRequest.TYPE_GET = 'get';
	
	var p = HTTPServiceRequest.prototype = Object.create( gsql.ServiceRequest.prototype);
	
	
	p.host = '';
	p.shareSecretKey = '';
	p.salt = '';
	
	p.toJsonObject = function()
	{
		try
		{
			if( !this._jsonData && !_.isUndefined(this.data) && !_.isUndefined(this.data.body) ) 
			{
				this._jsonData = _.isString(this.data.body) ? JSON.parse(this.data.body) : this.data.body;
			}
			
			return this._jsonData;
		}
		catch(e)
		{
			gsql.Tracer.echo('HTTPServiceRequest : toJsonObject : ' + e);
			gsql.Tracer.echo(this.data);
		}
		
		return {};
	}
	
	p.toString = function()
	{
		return "[object HTTPRequestServiceRequest (" + this.host + " )]";
	}
	
	p.toHashString = function( isArray )
	{
		var querystring = require('querystring'); 
		
		var Tools = gsql.Tools;
		var result =  [];
        var jsonData = Tools.hasValue(this.data) && !_.isString(this.data) ? JSON.stringify(this.data) : '';
		
		result['data'] = Tools.base64(jsonData);
		result['salt'] = this.salt;
        result['hash'] = Tools.md5(this.shareSecretKey + result['data'] + result['salt']);
		
		//gsql.Tracer.echo( querystring.stringify(result));
		
		return isArray === true ? result : querystring.stringify(result);
	}
	
	

gsql.HTTPServiceRequest = HTTPServiceRequest;
}());
