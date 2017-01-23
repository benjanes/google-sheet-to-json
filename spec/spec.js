const rewire = require('rewire');
const gSheet = rewire('./index.js');

const gSheetFns = { 
	googleResponseToArray: gSheet.__get__('googleResponseToArray'),
	googleRowsToKeyedObjs: gSheet.__get__('googleRowsToKeyedObjs'),
	googleRowToArr: gSheet.__get__('googleRowToArr'),
	mapRowsToKeys: gSheet.__get__('mapRowsToKeys'),
	googleSheetToJSON: gSheet.__get__('googleSheetToJSON'),
};

// const googleResponseToArray = gSheet.__get__('googleResponseToArray');
// const googleRowsToKeyedObjs = gSheet.__get__('googleRowsToKeyedObjs');
// const googleRowToArr = gSheet.__get__('googleRowToArr');
// const mapRowsToKeys = gSheet.__get__('mapRowsToKeys');
// const googleSheetToJSON = gSheet.__get__('googleSheetToJSON');


