var _ = require('underscore');
var createjs = require('../../createjs/');
var gsql;
module.exports = gsql = require('../');

(function() {

	var ServiceEvent = function(type, inServiceResponse, inData) 
	{
	  this.initialize(type, inServiceResponse, inData);
	}
	
	ServiceEvent.SYSTEM_REQUEST = 'systemRequest';
	ServiceEvent.BROADCAST = 'broadcast';
	ServiceEvent.REQUEST = 'request';
	ServiceEvent.HTTP_REQUEST = 'httpRequest';
	ServiceEvent.WEB_SOCKET_REQUEST = 'webSocketRequest';
	ServiceEvent.RESPONSE = 'response';
	ServiceEvent.FAULT = 'fault';
	ServiceEvent.CONNECT_FAIL = 'connectFail';
	ServiceEvent.CONNECT = 'connect';
	ServiceEvent.CONNECT_SUCCESS = 'connectSuccess';
	ServiceEvent.DISCONNECT = 'disconnect';
	ServiceEvent.DISCONNECTED = 'disconnected';
	
	var p = ServiceEvent.prototype = Object.create( gsql.ApplicationEvent.prototype);
	
	p._response;//:IServiceResponse;
	p.getResponse = function() { return this._response; }
	
	p._result;//:ResultVO; 
	p.getResult = function(){ return this._result; }
	
	/**
	 * Initialization method.
	 * @method initialize
	 * @protected
	 **/
	p.ApplicatoinEvent_initialize = p.initialize;
	p.initialize = function(type, inServiceResponse, inData, inTarget) 
	{
		this.ApplicatoinEvent_initialize(type, inTarget, inData);
		
		this._response = inServiceResponse;
		
		if (inData instanceof gsql.ResultVO) this._result = inData;
	}

	p.clone = function() 
	{
		return new gsql.ServiceEvent(this.type, this._response, this._result);
	}

	p.toString = function() {
		return "[ServiceEvent (type="+this.type+" response=" + this._response + " data="+this._result + ")]";
	}

gsql.ServiceEvent = ServiceEvent;
}());