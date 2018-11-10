var _ = require('underscore');
var createjs = require('../../createjs/');
var ocs;
module.exports = ocs = require('../');

(function(){
	
	var VO = function(inID)
	{
		this.initialize(inID);
	}
	
	var p = VO.prototype;
	
	p.id = null;
	p.addEventListener = null;
	p.removeEventListener = null;
	p.removeAllEventListeners = null;
	p.dispatchEvent = null;
	p.hasEventListener = null;
	p._listeners = null;
	
	createjs.EventDispatcher && createjs.EventDispatcher.initialize(p);
	
	p.initialize = function(inID)
	{
		this.id = inID;
	}
	
	p.clear = function() 
	{
		
	}
	
	p.clone = function() 
	{
		return null;
	}
	
	p.toInfoString = function()
	{
		return ocs.Tools.objectToString(this);
	}
	
	p.toInfoObject = function()
	{
		var obj = {id:this.id};
		_.each(this,(element,index,list)=>{
			obj[index] = element;
		});
		return obj;
	}
	
	p.dispatchChangeEvent = function(inPropertyName, inValue)
	{
		this.dispatchEvent(new ocs.VOEvent(ocs.VOEvent.VALUE_CHANGED, null, this, inPropertyName, inValue));
	} 
	
	
	p.toString = function()
	{
		return "[object {0}]".format([this.constructor.name]);
	}
	
ocs.VO = VO;
}());
