_ = require('underscore');
axios = require('axios');
colors = require('colors/safe');

ocs = {};
createjs = {};

var classes = [
	'createjs/events/Event',
	'createjs/events/EventDispatcher',
	
	'ocs/utils/Object',
	'ocs/utils/Number',
	'ocs/utils/String',
	'ocs/utils/Array',
	'ocs/utils/Timer',
	'ocs/utils/Tools',
	'ocs/utils/Tracer',
	
	'ocs/data/VO',
	
	'ocs/net/BaseService',
	'ocs/net/ServiceRequest',
	'ocs/net/HTTPServiceRequest',
	'ocs/net/GQLService'	

	
];

for (var i = 0; i < classes.length; i++) {
	var path = classes[i];
	var name = path.split('/').pop();
	require('./' + path + '.js');
};

