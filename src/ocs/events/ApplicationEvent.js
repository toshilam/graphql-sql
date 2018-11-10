var _ = require('underscore');
var createjs = require('../../createjs/');
var ocs;
module.exports = ocs = require('../');

(function() {

	var ApplicationEvent = function(type, inTargetDisplayObject, inData) 
	{
	  this.initialize(type, inTargetDisplayObject, inData);
	}
	
	ApplicationEvent.NAME = 'ApplicationEvent';
	
	ApplicationEvent.STARTUP = 'startup';
	ApplicationEvent.LANGUAGE = 'language';
	
	ApplicationEvent.CONTENT_CHANGED = 'contentChanged';
	ApplicationEvent.CONTENT_CHANGING = 'contentChanging';
	
	ApplicationEvent.INIT_ASSET = 'initAsset';
	ApplicationEvent.INIT_ASSET_COMPLETE = 'initAssetComplete';
	
	ApplicationEvent.SUBSCRIBE = 'subscribe';
	ApplicationEvent.UNSUBSCRIBE = 'unsubscribe';
	
	ApplicationEvent.BROADCAST = 'broadcast';
	
	ApplicationEvent.SYSTEM_NOTIFICATION = 'systemNotification';
	
	ApplicationEvent.SEND_EMAIL = 'sendEmail';
	
	
	var p = ApplicationEvent.prototype = Object.create( createjs.Event.prototype);
	
	p.type = null;
	p.targetDisplayObject = null;
	p.data = null;
	
	/**
	 * Initialization method.
	 * @method initialize
	 * @protected
	 **/
	p.Event_initialize = p.initialize;
	p.initialize = function(type, inTargetDisplayObject, inData, bubbles, cancelable) {
		this.Event_initialize(type, bubbles, cancelable);
		
		this.type = type;
		this.targetDisplayObject = inTargetDisplayObject;
		this.data = inData;
	}

// public methods:
	/**
	 * Returns a clone of the ApplicationEvent instance.
	 * @method clone
	 * @return {ApplicationEvent} a clone of the ApplicationEvent instance.
	 **/
	p.clone = function() 
	{
		return new ApplicationEvent(this.type, this.targetDisplayObject, this.data, this.bubbles, this.cancelable);
	}

	/**
	 * Returns a string representation of this object.
	 * @method toString
	 * @return {String} a string representation of the instance.
	 **/
	p.toString = function() {
		return "[ApplicationEvent (type="+this.type+" targetDisplayObject="+this.targetDisplayObject+" data="+this.data+")]";
	}

ocs.ApplicationEvent = ApplicationEvent;
}());