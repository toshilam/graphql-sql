var _ = require('underscore');
var createjs = require('../../createjs/');
var gsql;
module.exports = gsql = require('../');

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
		let keys = Object.keys(this);
		keys.forEach((k)=>{
			let type = typeof this[k]
			switch(type)
			{
				case 'string' :
					this[k] = "";
					break;
				case 'number':
					this[k] = 0;
					break;
				case 'object':
					if(this[k] instanceof Array)
					{
						this[k] = [];
					}
					else if( this[k] instanceof gsql.VO )
					{
						this[k].clear();
					} 
					else 
					{
						this[k] = {}
					}
			}
		});
	}
	
	p.clone = function() 
	{
		return null;
	}
	
	p.toInfoString = function()
	{
		return gsql.Tools.objectToString(this);
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
		this.dispatchEvent(new gsql.VOEvent(gsql.VOEvent.VALUE_CHANGED, null, this, inPropertyName, inValue));
	} 
	
	
	p.toString = function()
	{
		return "[object {0}]".format([this.constructor.name]);
	}
	
gsql.VO = VO;
}());
