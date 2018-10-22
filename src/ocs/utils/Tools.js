this.ocs = this.ocs || {}; 

(function(){
	
	var Tools = function()
	{
		throw "Tools cannot be instantiated.";
	}
	
	Tools.global = this;
	
	Tools.isProduction = function()
	{
		return process.env.NODE_ENV == 'production';
	}
	
	/*Tools.isDebug = function()
	{
		return process.env.DEBUG_MODE !== false;
	}*/
	
	
	Tools.hasValue = function(inValue)
	{
		return typeof inValue == 'number' && inValue != 0 ? true : !_.isEmpty(inValue);
	}
	
	
	Tools.md5 = function(inValue)
	{
		return crypto.createHash('md5').update( inValue ).digest('hex');
	}
	
	Tools.base64 = function(inValue)
	{
		return new Buffer(inValue).toString('base64');//.toUpperCase();
	}
	
	Tools.isDateString = function(inData, inWithTime)
	{
		if(!_.isEmpty(inData) && _.isString(inData))
		{
			//2017-02-17 16:45:49
			return new RegExp( '\\d{4}([-])\\d{2}\\1\\d{2}' + (inWithTime === true ? '\\s\\d{2}([:])\\d{2}\\2\\d{2}' : '') ).test(inData);
		}
		
		return false;
	}
	
	Tools.formatNumber = function(inNumber)
	{
		var numString = inNumber.toString()
		var result = ''

		while (numString.length > 3)
		{
			var chunk = numString.substr(-3)
			numString = numString.substr(0, numString.length - 3)
			result = ',' + chunk + result
		}

		if (numString.length > 0)
		{
			result = numString + result
		}

		return result
	}
	
	Tools.formatString = function(inString, inArrString)
	{
		if (!inString || !_.isArray(inArrString)) return '';
		var regExp = /{(\d)}/i;
		for(var i =0; i < inArrString.length; i++)
		{
			inString = inString.replace(regExp, inArrString[i]);
		}
		return inString;
	}
	
	Tools.isJQueryObj = function(inData)
	{
		return inData && inData.jquery != undefined;
	}
	
	Tools.getPackageObjByString = function(inValue, scope)
	{
		if(!inValue || !inValue.length) return null;
		
		var nodes= inValue.split('.')
	    ,   node = scope || Tools.global
	    ,   lastNode
	    ,   newNode
	    ,   nodeName;
	                
	    for (var i= 0, n= nodes.length; i < n; i++)
	    {
	        lastNode= node;
	        nodeName= nodes[i];
	        
	        node = ( null == node[nodeName] ? node[nodeName] = {} : node[nodeName] );
	    }
	                    
	    // if (null == object)
	        // return node;
	                        
	    // return lastNode[nodeName]= object;
	    return node;
	}
	
	Tools.getRandomString = function(inLength, inHasString/*:Boolean = true*/)//:String
	{
		inHasString = inHasString === true;
		
		var string = '0123456789';
		
		if (inHasString)
		{
			string += 'abcdef';
		}
		
		var value = '';
		for (var i = 0; i < inLength; i++)
		{
			value +=  string.substr( Math.floor(Math.random() * string.length), 1 );
		}
		
		return value;
	}
	
	
	Tools.loadNodeClasses = function(classes)
	{
		if (!(classes instanceof Array) || !classes.length)
		{
			return false;
		}
		
		var numClass = classes.length;
		for (var i = 0; i < numClass; i++) 
		{
			var path = classes[i];
			var name = path.split('/').pop();
			
			//ocs.Tracer.echo('Tools : loadNodeClasses : loading : ' + path, this, ocs.Tracer.TYPE_DEBUG);
			
			require(path + '.js');//[name];
		};
	}
	
	Tools.clone = function(inData)
	{
		
		try
		{
			if((inData instanceof ocs.VO))
			{
				return inData.clone();
			}
			
			var obj = _.isArray(inData) ? [] : _.isObject(inData) ? {} : null;
			if(obj)
			{
				for(key in inData)
				{
					obj[key] = inData[key];
				}
				
				return obj;
			}
			
		}
		catch(e){}
		
		return null;
	}
	
	Tools.cloneWithLevel = function(inData, inDeepLevel, inArrExceptionKey)
	{
		deepLevel = _.isNumber(inDeepLevel) /*&& inDeepLevel >= 1*/ ? inDeepLevel : -1;
		arrException = _.isArray(inArrExceptionKey) ? inArrExceptionKey : [];
		//console.log('deepLevel : ' + deepLevel + ', inDeepLevel : ' + inDeepLevel );
		try
		{
			/*if((inData instanceof ocs.VO))
			{
				return inData.clone();
			}*/
			
			var obj = null; //_.isArray(inData) ? [] : _.isObject(inData) ? {} : null;
			
			if(_.isObject(inData) || _.isArray(inData))
			{
				obj = _.isObject(inData) ? {} : [];
				for (var attr in inData) 
				{
					if( _.isFunction(inData[attr]) || arrException.indexOf(attr) != -1 ) continue;
					
					//if (inData.hasOwnProperty(attr)) 
					if (_.isObject(inData[attr])) 
					{
						
						if(deepLevel == -1 || deepLevel > 1)
						{
							//obj[key] = Tools.clone(targetData, deepLevel == -1 ? deepLevel : deepLevel - 1);
							obj[attr] = Tools.cloneWithLevel(inData[attr], deepLevel == -1 ? deepLevel : deepLevel - 1);
							
							
						}
						else
						{
							obj[attr] = '[object Object]';//targetData.toString();
						}
						
					}
					else
					{
						obj[attr] = inData[attr];
					}
				}
				
				return obj;
			}
			
		}
		catch(e){}
		
		return inData;
	}
	
	Tools.objectToString = function(inData)
	{
		var info = '';
		var isObject = _.isFunction(inData.constructor);
		
		if(isObject) info +=  inData.constructor.name + ' { '
		
		for(var key in inData)
		{
			if(_.isFunction(inData[key]))
			{
				continue;
			}
			
			info += /*_.isObject(inData[key]) ? Tools.objectToString(inData[key]) :*/ (key + ' : '+ inData[key] + '\n');
		}
		
		if(isObject) info += ' }'
		
		return info;
	}
	
	Tools.getCurrentUTCTimestamp = function()
	{
		var d = new Date();
		return Math.floor( (d.getTime() + d.getTimezoneOffset()*60*1000)/1000 );
	}
	
	Tools.stringToDate = function(inData/*, inWithTime*/)
	{
		if(ocs.Tools.hasValue(inData) && Tools.isDateString(inData, inData.split(' ').length == 2))
		{
			var arrDateTime = /*inWithTime ?*/ inData.split(' ');// : [inData];
			var arrDate = arrDateTime[0].split('-');
			var arrTime = arrDateTime[1] ? arrDateTime[1].split(':') : [0,0,0];
			
			console.log(arrDate);
			console.log(arrTime);
			
			return new Date(Number(arrDate[0]), Number(arrDate[1]) - 1, Number(arrDate[2]), Number(arrTime[0]), Number(arrTime[1]), Number(arrTime[2]));
		}
		
		return false;
	}
	
	
ocs.Tools = Tools;
}());
