var _ = require('underscore');
var createjs = require('../../createjs/');
var ocs;
module.exports = ocs = require('../');

(function() {

	var VOEvent = function(type, inTargetDisplayObject, inData, inPropertyName, inPropertyValue) 
	{
	  this.initialize(type, inTargetDisplayObject, inData, inPropertyName, inPropertyValue);
	}
	
	VOEvent.VALUE_CHANGED = 'valueChanged';
	VOEvent.VO_ADDED = 'voAdded';
	VOEvent.VO_REMOVED = 'voRemoved';
	
	var p = VOEvent.prototype = Object.create( ocs.ApplicationEvent.prototype);
	
	p.propertyName = null;
	p.propertyValue = null;
	
	/**
	 * Initialization method.
	 * @method initialize
	 * @protected
	 **/
	p.ApplicatoinEvent_initialize = p.initialize;
	p.initialize = function(type, inTargetDisplayObject, inData, inPropertyName, inPropertyValue) 
	{
		this.ApplicatoinEvent_initialize(type, inTargetDisplayObject, inData);
		this.propertyName = inPropertyName;
		this.propertyValue = inPropertyValue;
	}

	p.clone = function() 
	{
		return new ocs.VOEvent(this.type, this.targetDisplayObject, this.data, this.propertyName, this.propertyValue);
	}

	p.toString = function() {
		return "[VOEvent (type="+this.type+" propertyName="+this.propertyName+" propertyName="+this.propertyName+" data="+this.data+ ")]";
	}

ocs.VOEvent = VOEvent;
}());