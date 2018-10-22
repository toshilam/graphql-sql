// namespace:
this.ocs = this.ocs || {}; 
( function() {
	
	
	var Timer = function(inInterval, inCount) 
	{
		inCount = inCount || 99999999;//Number.MAX_VALUE;
		if(!_.isNumber(inInterval) || !_.isNumber(inCount) || inInterval <= 0/* || inCount <= 0*/)
		{
			throw 'Timer : unable to initialize ocs.Timer!';
		}
		
		this.initialize(inInterval, inCount);
		
	}
	
	var p = Timer.prototype;
	
	p.addEventListener = null;
	p.removeEventListener = null;
	p.removeAllEventListeners = null;
	p.dispatchEvent = null;
	p.hasEventListener = null;
	p._listeners = null;
	
	createjs.EventDispatcher && createjs.EventDispatcher.initialize(p);
	
	p._timerID = -1;
	p.delay = 0;
	p.repeatCount = 0;
	p.currentCount = 0;
	p.running = false;
	
	p.initialize = function(inInterval, inCount) 
	{
		this.delay = inInterval;
		this.repeatCount = inCount;
	}
	
	p.start = function()
	{
		if(this.repeatCount > 0 && this.delay > 0 && !this.running)
		{
			var that = this;
			var TimerEvent = ocs.TimerEvent;
			
			this.running = true;
			this._timerID = setInterval(function(){
				
				that.running = true;
				++that.currentCount;
				
				that.dispatchEvent(new TimerEvent(TimerEvent.TIMER));
				
				if(that.currentCount >= that.repeatCount)
				{
					that.reset();
					that.dispatchEvent(new TimerEvent(TimerEvent.TIMER_COMPLETE));
					
				}
				
			},this.delay);
			
			//console.log('this._timerID : ' + this._timerID);
			//ocs.Tracer.echo('Timer : start : ' + this._timerID);
			return true;
		}
		
		ocs.Tracer.echo('Timer : start : fail : timer is running or no data is set!');
		return false;
	}
	
	p.stop = function()
	{
		//ocs.Tracer.echo('Timer : stop : ' + this._timerID);
		
		this.running = false;
		if(this._timerID != -1)
		{
			//console.log('clearInterval');
			clearInterval(this._timerID);
			this._timerID = -1;
		}
		
	}
	
	p.reset = function()
	{
		this.stop();
		this.currentCount = 0;
	}
	

ocs.Timer = Timer;
}());
