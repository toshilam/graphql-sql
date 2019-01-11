var _ = require('underscore');
var createjs = require('../../createjs/');
var gsql;
module.exports = gsql = require('../');

( function() {

	
	var ServiceRequest = function(inType, inData, inRequester) 
	{
		this.initialize(inType, inData, inRequester);
	}
	
	var p = ServiceRequest.prototype = Object.create( gsql.VO.prototype);
	
	p.type = null;
	p.data = null;
	p.requester = null;
	
	//private property, convert data (json string) property to an object
	p._jsonData = null;
	
	p.initialize = function(inType, inData, inRequester)
	{
		// if(!inRequester || !_.isFunction(inRequester.result) || !_.isFunction(inRequester.fault))
		// {
			// gsql.Tracer.echo('ServiceRequest : initialize : unknown data object!');
		// }
		
		this.type = inType;
		this.data = inData;
		this.requester = inRequester;
	}
	
	p.toJsonObject = function()
	{
		return {};
	}
	
	p.toString = function()
	{
		return "[object ServiceRequest (" + this.type + ") ]";
	}
	

gsql.ServiceRequest = ServiceRequest;
}());
