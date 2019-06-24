const _ = require('underscore');
const decodeUriComponent = require('decode-uri-component');
const axios = require('axios');
var createjs = require('../../createjs/');
var gsql;
module.exports = gsql = require('../');

const Tracer = gsql.Tracer;

( function() {

	
	var GQLService = function() 
	{
		this.initialize();
	}
	
	GQLService.TYPE_QUERY = 'query';
	GQLService.TYPE_MUTATION = 'mutation';
	
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
		/*if(!_.isObject(inData) || !_.keys(inData).length)
		{
			throw new Error('GQLService : initialize : expecting object with key pair value!');
		}*/
		
		this._objCondition = _.isObject(inData) && _.keys(inData).length ? _.extendOwn(this._objCondition, inData) : this._objCondition;
		
		return this;
	}
	
	p.getResultVO = function(inCode, inData)
	{
		return new gsql.ResultVO('', this._serviceType, inCode, inData/*,  this._requestData ?  this._requestData.uniqueID : ''*/);
	}
	
	p.request = function(inRequest)
	{
		if
		(
			!(inRequest instanceof gsql.HTTPServiceRequest) ||
			!/^(get|post)$/i.test(inRequest.type) ||
			!gsql.Tools.hasValue(inRequest.host)
		)
		{
			console.log(inRequest, !(inRequest instanceof gsql.HTTPServiceRequest),!/^(get|post)$/i.test(inRequest.type),!gsql.Tools.hasValue(inRequest.host));
			gsql.Tracer.echo('GQLService : request : unknown data object! {0} : {1}'.format([inRequest.type, inRequest.host]), this, gsql.Tracer.TYPE_ERROR);
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
		.then(result=>{
			
			if(result && result.data)
			{
				result.data =  this._decodeUriComponent(result.data);
			}
			
			return result;
		})
	}
	
	p._decodeUriComponent = function(data)
	{
		return gsql.Tools.decodeUriComponent(data);
	}
	
	p.result = function(inResponse)
	{
		if(inResponse instanceof gsql.ServiceResponse)
		{
			var request = inResponse.request;
			var data = inResponse.data;
			
			inResponse.data = this.getResultVO(  gsql.ServicesErrorID.NONE, data);
			
			if(_.isFunction(request.result))
			{
				request.result(inResponse);
			}
			
			this._dispatchResult
			( 
				//new gsql.ServiceEvent
				//(
					gsql.ServiceEvent.RESPONSE, 
					inResponse/*{response:'fail', error:'game_round_id did not exists'}*/
				//) 
			);
			
			this._promiseResolve(inResponse);
		}
		else
		{
			gsql.Tracer.echo(this + ' : result : unknown data object : ' + inResponse, this, gsql.Tracer.TYPE_ERROR );
			this._promiseReject(inResponse);
		}
	}
	
	p.fault = function(inResponse)
	{
		if(inResponse instanceof gsql.ServiceResponse)
		{
			var err = inResponse.data;
			inResponse.data = this.getResultVO( gsql.ServicesErrorID.DB_CONNECTION_ERROR, err );
			
			if(_.isFunction(inResponse.request.fault))
			{
				inResponse.request.fault(inResponse);
			}
			
			this._dispatchResult( gsql.ServiceEvent.FAULT, inResponse );
		
		}
		else
		{
			gsql.Tracer.echo(this + ' : fault : unknown data object : ' + inResponse, this, gsql.Tracer.TYPE_ERROR );
		}
		
		this._promiseReject(inResponse);
	}
	
	p._dispatchResult = function(inType, inResponse)
	{
		//if( !_.isUndefined(inResponse.request) )
		//{
			inResponse.request = this._currRequest;
			this.dispatchEvent( new gsql.ServiceEvent( inType, inResponse ) );
		//}
		
	}
	
	p._getSelectorStatement = function(arrSelector, level)
	{
		numTab = (_.isNumber(level) ? level : 1) +1;
		let tab = new Array( numTab ).join("\t");
		let selector = _.isArray(arrSelector) && arrSelector.length ? /* "{\n" +  */arrSelector.map
		(
			item=>
			{
				return tab + (_.isObject(item) ? `${Object.keys(item)[0]}\n${tab}{\n${this._getSelectorStatement(item[Object.keys(item)[0]], numTab)} \n${tab}}` : item);
			}
		)
		.join(',\n') /* + "\n}" */ : "";

		return level == 1 && selector.length ? `${tab}{\n${selector}\n${tab}}`  : selector;
	}
	
	p._getConditionStatement = function(objCondition)
	{
		return _.isObject(objCondition) && _.keys(objCondition).length ? `(${
			_.pairs
			(
				_.pick
				(
					objCondition, 
					(v,k,o)=>_.isNumber(v) || _.isString(v) || _.isBoolean(v)
				) 
			)
			.map
			(
				(data,i)=>
				{
					if(_.isString(data[1])) data[1] = `"${encodeURIComponent(data[1])}"`;
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
\t${this._from}${this._getConditionStatement(this._objCondition)}  
${this._getSelectorStatement(this._arrSelector, 1)}
}`;
		
	}
	

gsql.GQLService = GQLService;
}());