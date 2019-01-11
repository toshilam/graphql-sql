
(function(){
	
	
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
	}
	
}());
