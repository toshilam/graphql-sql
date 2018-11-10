var ocs = require('../src/');

//console.log(new ocs.GQLService().query().select(['id','name']).from('getProduct').where({id:1}).toString());

var vo = new ocs.VO('id');
vo.addEventListener(ocs.VOEvent.VALUE_CHANGED, (e)=>{ console.log(e.propertyName, e.propertyValue); });

var timer = new ocs.Timer(2000, 10);
timer.addEventListener(ocs.TimerEvent.TIMER, (e)=>{ vo.dispatchChangeEvent(e.type, timer.currentCount); });
timer.start();