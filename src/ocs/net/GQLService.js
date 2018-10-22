
const Tracer = ocs.Tracer;

( function() {

	
	var GQLService = function() 
	{
		this.initialize();
	}
	
	GQLService.TYPE_QUERY = 'query';
	GQLService.TYPE_MUTATION = 'nutation';
	
	var p = GQLService.prototype = Object.create( Object.prototype );
	
	//p._endPoint = '';
	p._currRequest = null;
	p._serviceType = null;
	
	p._type = GQLService.TYPE_QUERY;
	p._arrSelector = null;
	p._from = ''
	p._objCondition = null
	p._axiosInstance = null
	
	/**
	 * Initialization method called by the constructor.
	 * @method initialize
	 * @protected
	 **/
	p.initialize = function()
	{
		
		this._arrSelector = [];
		this._objCondition = {};
		
		
	}
	
	p.query = function()
	{
		this._type = GQLService.TYPE_QUERY;
		return this;
	}
	
	p.mutation = function()
	{
		this._type = GQLService.TYPE_MUTATION;
		return this;
	}
	
	p.select = function(inData)
	{
		if(!_.isArray(inData) || !inData.length)
		{
			throw new Error('GQLService : select : expecting Array object!');
		}
		
		this._arrSelector = this._arrSelector.concat(inData);
		
		return this;
	}
	
	p.from = function(inData)
	{
		if(!_.isString(inData) || !inData.length)
		{
			throw new Error('GQLService : initialize : expecting string!');
		}
		
		this._from = inData;
		
		return this;
	}
	
	p.where = function(inData)
	{
		if(!_.isObject(inData) || !_.keys(inData).length)
		{
			throw new Error('GQLService : initialize : expecting object with key pair value!');
		}
		
		this._objCondition = _.extend(this._objCondition, inData);
		
		return this;
	}
	
	p.getResultVO = function(inCode, inData)
	{
		return new ocs.ResultVO('', this._serviceType, inCode, inData/*,  this._requestData ?  this._requestData.uniqueID : ''*/);
	}
	
	p.request = function(inRequest)
	{
		if
		(
			!(inRequest instanceof ocs.HTTPServiceRequest) ||
			!/^(get|post)$/i.test(inRequest.type) ||
			!ocs.Tools.hasValue(inRequest.host)
		)
		{
			console.log(inRequest);
			ocs.Tracer.echo('GQLService : request : unknown data object! {0} : {1}'.format([inRequest.type, inRequest.host]), this, ocs.Tracer.TYPE_ERROR);
			return false;
		}
		
		
		return this._execute(inRequest);
	}
	
	p._execute = function(inRequest)
	{
		var instance = axios.create({
		  baseURL: inRequest.host
		});
		
		//currently only support auth token
		if(inRequest.data && inRequest.data['Authorization'])
		{
			instance.defaults.headers.common['Authorization'] = inRequest.data['Authorization'];	
		}
		
		Tracer.echo('GQLService : _execute : {0} : {1}'.format([inRequest.host, this]), this, Tracer.TYPE_INFO);
		
		return axios[inRequest.type]
		(
			inRequest.host, 
			this.toString()
		)
	}
	
	p.result = function(inResponse)
	{
		if(inResponse instanceof ocs.ServiceResponse)
		{
			var request = inResponse.request;
			var data = inResponse.data;
			
			inResponse.data = this.getResultVO(  ocs.ServicesErrorID.NONE, data);
			
			if(_.isFunction(request.result))
			{
				request.result(inResponse);
			}
			
			this._dispatchResult
			( 
				//new ocs.ServiceEvent
				//(
					ocs.ServiceEvent.RESPONSE, 
					inResponse/*{response:'fail', error:'game_round_id did not exists'}*/
				//) 
			);
			
			this._promiseResolve(inResponse);
		}
		else
		{
			ocs.Tracer.echo(this + ' : result : unknown data object : ' + inResponse, this, ocs.Tracer.TYPE_ERROR );
			this._promiseReject(inResponse);
		}
	}
	
	p.fault = function(inResponse)
	{
		if(inResponse instanceof ocs.ServiceResponse)
		{
			var err = inResponse.data;
			inResponse.data = this.getResultVO( ocs.ServicesErrorID.DB_CONNECTION_ERROR, err );
			
			if(_.isFunction(inResponse.request.fault))
			{
				inResponse.request.fault(inResponse);
			}
			
			this._dispatchResult( ocs.ServiceEvent.FAULT, inResponse );
		
		}
		else
		{
			ocs.Tracer.echo(this + ' : fault : unknown data object : ' + inResponse, this, ocs.Tracer.TYPE_ERROR );
		}
		
		this._promiseReject(inResponse);
	}
	
	p._dispatchResult = function(inType, inResponse)
	{
		//if( !_.isUndefined(inResponse.request) )
		//{
			inResponse.request = this._currRequest;
			this.dispatchEvent( new ocs.ServiceEvent( inType, inResponse ) );
		//}
		
	}
	
	p._getSelectorStatement = function(arrSelector)
	{
		return _.isArray(arrSelector) && arrSelector.length ? arrSelector.map
		(
			item=>
			{
				return _.isObject(item) ? `${Object.keys(item)[0]}\n{\n${this._getSelectorStatement(item[Object.keys(item)[0]])} \n}` : item;
			}
		)
		.join(',\n') : "";
	}
	
	p._getConditionStatement = function(objCondition)
	{
		return _.isObject(objCondition) && _.keys(objCondition).length ? `(${
			_.pairs
			(
				_.pick
				(
					objCondition, 
					(v,k,o)=>_.isNumber(v) || _.isString(v)
				) 
			)
			.map
			(
				(data,i)=>
				{
					if(_.isString(data[1])) data[1] = `"${data[1]}"`;
					return data.join(':') 
				}
			)
			.join(',')
		})` : "";
	}
	
	p.toString = function()
	{
		return `${this._type} 
		{
			${this._from}${this._getConditionStatement(this._objCondition)}  
			{
				${this._getSelectorStatement(this._arrSelector)}
			}
		}`
		
	}
	

ocs.GQLService = GQLService;
}());