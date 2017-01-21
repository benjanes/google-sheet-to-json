const request = require('request');

const googleResponseToJSON = response => {
  let data = response.replace('/*O_o*/\ngoogle.visualization.Query.setResponse(', '');
  data = data.replace(');', '');
  return JSON.parse(data)['table']['rows'];
};

const googleRowsToKeyedObjs = keys => {
  return row => {
    return row['c'].reduce((obj, val, idx) => {
      if (val.v) obj[keys[idx]] = val.v;
      return obj;
    }, {});
  }
};

const googleRowToArr = row => {
  return row['c'].map(obj => { return obj ? obj.v : null });
};

const mapRowsToKeys = (data, keys) => {
	keys = keys ? keys : googleRowToArr(data.shift());
	return data.map(googleRowsToKeyedObjs(keys));
}

const mapColsToKeys = (data, keys) => {
  // rotate data array
  // then map rows to keys
}

module.exports = (sheetId, keys, isColumns) => {
  return new Promise((resolve, reject) => {
  	request(`https://spreadsheets.google.com/tq?&key=${sheetId}`, (error, response, body) => {
  		if (error) {
        reject(error);
      } else {
        let data = googleResponseToJSON(response.body);
        data = mapRowsToKeys(data, keys);
        resolve(JSON.stringify({ data }));
      }
  	});
  })
};
