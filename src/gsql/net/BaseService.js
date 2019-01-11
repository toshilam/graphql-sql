var _ = require('underscore');
var createjs = require('../../createjs/');
var gsql;
module.exports = gsql = require('../');

( function() {

	
	var BaseService = function(inConnection) 
	{
		this.initialize(inConnection);
	}
	
	var p = BaseService.prototype = Object.create( Object.prototype );
	
	p.addEventListener = null;
	p.removeEventListener = null;
	p.removeAllEventListeners = null;
	p.dispatchEvent = null;
	p.hasEventListener = null;
	p._listeners = null;
	
	createjs.EventDispatcher && createjs.EventDispatcher.initialize(p);
	
	p._connection = null;
	
	p._promise = null;
	p._promiseResolve = null;
	p._promiseReject = null;
	
	p.initialize = function(inConnection)
	{
		this._connection = inConnection;
		this._promise = new Promise	(
										(resolve, reject)=>
										{
											this._promiseResolve = resolve; 
											this._promiseReject = reject;
										}
									);
	}
	
	
	p.connect = function(inURL/*:String*/, rest/*:Object = null*/)//:Boolean
	{
		if(this._connection && _.isFunction(this._connection.connect))
		{
			return this._connection.connect(inURL, rest);
		}
		
		return false;
	}
	
	p.disconnect = function()//:void
	{
		if(this._connection && _.isFunction(this._connection.disconnect))
		{
			return this._connection.disconnect();
		}
		
		return false;
	}
	
	
	//To be implemented by sub class
	p.request = function(inRequest/*:IServiceRequest*/)//:Boolean
	{
		
		return this._promise;
	}
	
	/*p.promise = function()
	{
		return this._promise;
	}*/
	
	
	

gsql.BaseService = BaseService;
}());
