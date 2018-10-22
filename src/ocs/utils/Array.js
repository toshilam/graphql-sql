//this.ocs = this.ocs || {}; 

(function(){
	
	/*var String = function()
	{
		throw "Tools cannot be instantiated.";
	}*/
	
	Array.prototype.concatUnique = function(inArray)
	{
		if(_.isArray(inArray) && inArray.length)
		{
			var numItem = inArray.length;
			for(var i = 0; i < numItem; i++)
			{
				if(this.indexOf(inArray[i]) == -1)
				{
					this.push(inArray[i]);
				}
			}
		}
		
		return this;
		/*var a = this.concat();
		for(var i=0; i<a.length; ++i) 
		{
			for(var j=i+1; j<a.length; ++j) 
			{
				if(a[i] === a[j])
				{
					a.splice(j--, 1);
				}
					
			}
		}

		return a;*/
	}
	
	
//ocs.Tools = Tools;
}());
