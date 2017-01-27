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
  // might need to switch check from obj to obj.v
  return row.map(obj => { return obj ? obj.v : null });
};

const mapRowsToKeys = (data, keys) => {
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
        if (keys && !Array.isArray(keys)) reject('Supplied keys must be an array');

        let data = googleResponseToArray(response.body);

        if (keys && !isColumns && data.filter(row => row.length > keys.length).length) reject('Must supply as many keys as there are items in a row');
        if (keys && isColumns && data.length > keys.length) reject('Must supply as many keys as there are items in a column');

        data = mappingFn(data, keys);
        resolve(JSON.stringify({ data }));
      }
  	});
  })
};

module.exports = googleSheetToJSON;
