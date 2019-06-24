var gsql = require('../');
(function(){
	
	Object.prototype.toObjectString = function()
	{
		return gsql.Tools.objectToString(this);
	}
	
	
}());
