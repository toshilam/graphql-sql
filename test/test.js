var gsql = require('../src/');
const _ = require('underscore');
const decodeUriComponent = require('decode-uri-component');
const normalizeNewline = require('normalize-newline');

console.log(new gsql.GQLService().query().select(['id','name',{"product":["pid","pname"]}]).from('getProduct').where({id:1,name:"你好",chareter:"!#$%",boo:true}).toString());
//console.log(JSON.parse(decodeUriComponent( encodeURIComponent( JSON.stringify({id:1,name:"你好",chareter:"!#$%", array:[1,true, false, "今日天氣好好", "!@#$%^&*()(*&^%$#@!"]}) ) )));

//var vo = new gsql.VO('id');
//vo.addEventListener(gsql.VOEvent.VALUE_CHANGED, (e)=>{ console.log(e.propertyName, e.propertyValue); });
//
//var timer = new gsql.Timer(2000, 10);
//timer.addEventListener(gsql.TimerEvent.TIMER, (e)=>{ vo.dispatchChangeEvent(e.type, timer.currentCount); });
//timer.start();

/*var name = `multi languages
@#$%^&*()(*&^%$#@!
العربية
Български
Bosanski
Català
Čeština
Dansk
Deutsch
Eesti
Ελληνικά
Español
Esperanto
Euskara
فارسی
Français
Galego
한국어
Hrvatski
Bahasa Indonesia
Italiano
עברית
ქართული
Latviešu
Lietuvių
Magyar
Bahasa Melayu
Nederlands
日本語
Norsk
Norsk nynorsk
Polski
Português
Română
Русский
Simple English
Slovenčina
Slovenščina
Српски / srpski
Srpskohrvatski / српскохрватски
Suomi
Svenska
ไทย
Türkçe
Українська
Tiếng Việt
中文`;
new gsql.GQLService().mutation().select(['feedID','fbObjectID']).from('createLinkPost').where({link:"https://www.google.com", description:name})
.request
(
	new gsql.HTTPServiceRequest
	(
		gsql.HTTPServiceRequest.TYPE_POST, 
		{Authorization:'Basic MjQ6UnNwejVuZHZqZ25VMFJvOGFQRmd2WjdWMTBidTRaMlo='}, 
		null, 
		'http://localhost:3000/dev/graphql'
	)
)
.then(result=>console.log(JSON.stringify(result.data)));*/

/*console.log(JSON.stringify(
	new Buffer(normalizeNewline(`foo\n\n\n\n\n\n\n
	captionSide
	backgroundPositionX
	scrollbarDarkShadowColor
	
	baz`)).toString()
))*/

/*var _decodeUriComponent = function(data)
{
	return _.isString(data) ? decodeUriComponent(data) : _.each(data, (v,i,o)=>{
		o[i] = _.isObject(o[i]) || _.isArray(o[i]) ? _decodeUriComponent(o[i]) : _.isString(o[i]) ? encodeURIComponent(o[i]) : v;
	});
}*/

/*console.log(_decodeUriComponent(
	{
		id:1,
		name:"你好",
		chareter:"!#$%", 
		array:[1,true, false, "今日天氣好好", "!@#$%^&*()(*&^%$#@!"],
		level1:
		{
			name:"你好",
			chareter:"!#$%", 
			array:[1,true, false, "今日天氣好好", "!@#$%^&*()(*&^%$#@!"],
			level2:
			{
				name:"你好",
				chareter:"!#$%", 
				array:[1,true, false, "今日天氣好好", "!@#$%^&*()(*&^%$#@!"],
			}
		}
	}
));*/