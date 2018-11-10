var colors = require('colors/safe');
var _ = require('underscore');
var createjs = require('../../createjs/');
var ocs;
module.exports = ocs = require('../');

( function() {
	
	
	var Tracer = function() 
	{
		throw "Tracer cannot be instantiated.";
	}
	
	Tracer.TYPE_INFO = 'info';
	Tracer.TYPE_DATA = 'data';
	Tracer.TYPE_HELP = 'help';
	Tracer.TYPE_WARN = 'warn';
	Tracer.TYPE_DEBUG = 'debug';
	Tracer.TYPE_ERROR = 'error';
	Tracer._isProduction = ocs.Tools.isProduction();
	//Tracer._hasLog = true;
	
	Tracer._log = console.log;
	
	Tracer._arrFilter = [];
	
	Tracer.init = function()
	{
		colors.setTheme({
		  silly: 'rainbow',
		  input: 'grey',
		  verbose: 'cyan',
		  prompt: 'grey',
		  info: 'green',
		  data: 'grey',
		  help: 'cyan',
		  warn: 'yellow',
		  debug: 'blue',
		  error: 'red'
		});
		
		
		if(Tracer._isProduction)
		{
			Tracer.hasConsoleLog(false);
		}
	}
	
	Tracer.hasConsoleLog = function(inHasLog)
	{
		if(!inHasLog)
		{
			console.log = function(){};
		}
		else
		{
			console.log = Tracer._log;
		}
	}
	
	
	Tracer.setFilter = function(inData)
	{
		if(_.isArray(inData))
		{
			for(var i = 0; i < inData.length; i++)
			{
				Tracer._arrFilter.push(inData[i]);
			}
		}
	}
	
	Tracer.echo = function(inMessage, inTarget, inColor)
	{
		if(Tracer._arrFilter.indexOf(inColor) != -1 || !inColor)
		{
			return;
		}
		
		if(!Tracer._isProduction)
		{
			//var targetColor = colors.info;
			if(inColor && colors[inColor])
			{
				inMessage = colors[inColor](inMessage);
			}
			else
			{
				inMessage = colors.info(inMessage);
			}
		}
		
		Tracer._log(inMessage);
	}
	
	
	
Tracer.init();	
	

ocs.Tracer = Tracer;
}());
