const rewire = require('rewire');
const gSheet = rewire('../index.js');

const privateFns = { 
	googleResponseToArray: gSheet.__get__('googleResponseToArray'),
	googleRowsToKeyedObjs: gSheet.__get__('googleRowsToKeyedObjs'),
	googleRowToArr: gSheet.__get__('googleRowToArr'),
	mapRowsToKeys: gSheet.__get__('mapRowsToKeys'),
	mapColsToKeys: gSheet.__get__('mapColsToKeys')
};

const dummyData = '/*O_o*/\ngoogle.visualization.Query.setResponse({"version":"0.6","reqId":"0","status":"ok","sig":"273948816","table":{"cols":[{"id":"A","label":"","type":"string"},{"id":"B","label":"","type":"string"},{"id":"C","label":"","type":"string"},{"id":"D","label":"","type":"string"},{"id":"E","label":"","type":"string"}],"rows":[{"c":[{"v":"category"},{"v":"menu_title"},{"v":"url_slug"},{"v":"resource_id"},{"v":"video_url"}]},{"c":[{"v":"H5 Process"},{"v":"Playbook"},{"v":"/playbook"},{"v":"15D_pw7lCBdyXBtczaob4dJE4D745BwpvHUv0qq2SAGc);"},{"v":null}]},{"c":[{"v":"H5 Process"},{"v":"Jira Workflow"},{"v":"/jira"},{"v":"1tfhsqjhMbDGKbgg50uIh8p3I4viep5moUkkcrJbYdHk"},{"v":null}]},{"c":[{"v":"H5 Process"},{"v":"QA"},{"v":"/qa"},{"v":"1W4QBlajDGw3uom1LFwfSzJv0B6EHu0Tb6Ovel3fbijg"},{"v":null}]},{"c":[{"v":"H5 Process"},{"v":"AQR"},{"v":"/aqr"},{"v":"1F89vqc_bIrsSRbC57OIgUgjdZZ4b3Utmvw-LLK5n8RU"},{"v":null}]},{"c":[{"v":"H5 Tools"},{"v":"Design | Adobe Generator"},{"v":"/design"},{"v":"1O0Vvk524IKoybBYkfQ8wZe6JarNyeUgDbqxPjO83jTI"},{"v":"https://player.vimeo.com/video/144186632"}]},{"c":[{"v":"H5 Tools"},{"v":"Code | Craft Banner Generator"},{"v":"/code"},{"v":"10pZDTVczJ3b_hrNWKTqpMYwicR2krLpJmMr2tzUgLOs"},{"v":"https://player.vimeo.com/video/144300825"}]},{"c":[{"v":"H5 Tools"},{"v":"Code | Creating Banner Adapts"},{"v":"/adapt"},{"v":"1HKM1L_KlWiZEQ7yenUBXgoQrRYMjBSMtzaem6cTF__w"},{"v":null}]},{"c":[{"v":"H5 Tools"},{"v":"Release | Craft Automated Staging"},{"v":"/release"},{"v":"1dTYWXDawbuf8LsXjvAe1pwp8TDQ_DsQMSi0Xdg24tSE"},{"v":"https://player.vimeo.com/video/144575474"}]},{"c":[{"v":"home"},{"v":"Home"},{"v":"/"},{"v":"hard coded on server"},{"v":null}]}]}});';

describe('googleResponseToArray', function() {
	const sheetArr = privateFns.googleResponseToArray(dummyData);

	it('should be defined', function() {
		expect(privateFns.googleResponseToArray).toBeDefined();
	});

	it('should return an array', function() {
		expect(Array.isArray(sheetArr)).toEqual(true);
	});

	it('should have an array of objects at each index of the return array', function() {
		const eachIndexIsArray = sheetArr.reduce((isArrays, row) => {
			return isArrays ? Array.isArray(row) : false;
		}, true);
		expect(eachIndexIsArray).toEqual(true);
	});
});





