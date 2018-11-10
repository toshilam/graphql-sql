
(function(){
	
	/*var String = function()
	{
		throw "Tools cannot be instantiated.";
	}*/
	
	String.prototype.format = function(inArrString)
	{
		if (!_.isArray(inArrString)) return this;
		var regExp = /{(\d+)}/i;
		var tempString = this;
		for(var i =0; i < inArrString.length; i++)
		{
			tempString = tempString.replace(regExp, inArrString[i]);
		}
		//this = tempString;
		return tempString;
	}
	
	String.prototype.toJson = function()
	{
		return JSON.parse(this);
	}
	
	
}());
