const request = require('request');

const googleResponseToArray = response => {
  let data = response.replace(/^\/\*O_o\*\/\ngoogle\.visualization\.Query\.setResponse\(/, '').replace(/\);$/, '');
  return JSON.parse(data)['table']['rows'].map(row => row.c);
};

const googleRowsToKeyedObjs = keys => {
  return row => {
    return row.reduce((obj, val, idx) => {
      if (val.v) obj[keys[idx]] = val.v;
      return obj;
    }, {});
  }
};

const googleRowToArr = row => {
  return row.map(obj => { return obj ? obj.v : null });
};

const mapRowsToKeys = (data, keys) => {
  keys = keys ? keys : googleRowToArr(data.shift());
  return data.map(googleRowsToKeyedObjs(keys));
}

const mapColsToKeys = (data, keys) => {
  // rotate data array
  data = data.reduce((rotatedData, row, rowIdx) => {
    row.forEach((item, colIdx) => {
      if (rotatedData.length <= colIdx) {
        rotatedData.push([]);
      }
      rotatedData[colIdx].push(item);
    });
    return rotatedData;
  }, []);
  
  // then map rows to keys
  return mapRowsToKeys(data, keys);
}

const googleSheetToJSON = (sheetId, keys, isColumns) => {
  return new Promise((resolve, reject) => {
  	request(`https://spreadsheets.google.com/tq?&key=${sheetId}`, (error, response, body) => {
  		if (error) {
        reject(error);
      } else {
        let data = googleResponseToArray(response.body);
        data = mapRowsToKeys(data, keys);
        resolve(JSON.stringify({ data }));
      }
  	});
  })
};

module.exports = googleSheetToJSON;
