const request = require('request');

const googleResponseToArray = response => {
  let data = response.replace(/^\/\*O_o\*\/\ngoogle\.visualization\.Query\.setResponse\(/, '').replace(/\);$/, '');
  return JSON.parse(data)['table']['rows'].map(row => row.c);
};

const googleRowsToKeyedObjs = keys => {
  return row => {

    // exit out
    if (keys.length < row.length) return console.error('Must supply as many keys as there are items in a row');

    return row.reduce((obj, val, idx) => {
      if (val.v) obj[keys[idx]] = val.v;
      return obj;
    }, {});
  }
};

const googleRowToArr = row => {
  // might need to switch check from obj to obj.v
  return row.map(obj => { return obj ? obj.v : null });
};

const mapRowsToKeys = (data, keys) => {
  // exit out
  if (keys && !Array.isArray(keys)) return console.error('Supplied keys must be an array');
  
  keys = keys ? keys : googleRowToArr(data.shift());
  return data.map(googleRowsToKeyedObjs(keys));
}

const mapColsToKeys = (data, keys) => {
  data = data.reduce((rotatedData, row, rowIdx) => {
    row.forEach((item, colIdx) => {
      if (rotatedData.length <= colIdx) rotatedData.push([]);
      rotatedData[colIdx].push(item);
    });
    return rotatedData;
  }, []);

  return mapRowsToKeys(data, keys);
}

const googleSheetToJSON = (sheetId, isColumns, keys) => {
  const mappingFn = isColumns ? mapColsToKeys : mapRowsToKeys;
  return new Promise((resolve, reject) => {
  	request(`https://spreadsheets.google.com/tq?&key=${sheetId}`, (error, response) => {
  		if (error) {
        reject(error);
      } else {
        data = mappingFn(googleResponseToArray(response.body), keys);
        resolve(JSON.stringify({ data }));
      }
  	});
  })
};

module.exports = googleSheetToJSON;
