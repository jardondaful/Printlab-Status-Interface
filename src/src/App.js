import React, { useState, useEffect } from 'react';
import DisplayFile from './DisplayFile';

const colonRegex = /: (.+)$/m;
const ipAddressRegex = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*(\.[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)+)/;

const App = () => {
  const [output, setOutput] = useState([]);
  const [error, setError] = useState(null);

  function parseData(data) {
    // Parse data into an array
    const dataAsArr = data.split('\n').map(s => s.trim())

    // Push objects into array where hostname is first element
    const dataAsObjs = []
    for (let x = 0; x < dataAsArr.length; x += 6) {
      const dataSlice = dataAsArr.slice(x, x + 6)

      const ipAddressMatch = dataSlice[0].match(ipAddressRegex);
      const ipAddress = ipAddressMatch ? ipAddressMatch[0] : '';
      const host = ipAddress !== '' && ipAddress !== 'localhost' ? ipAddress : dataSlice[0];

      dataAsObjs.push({
        host,
        ipaddress: ipAddress,
        device: dataSlice[1].match(colonRegex)[1],
        totalMemory: dataSlice[2],
        memory: dataSlice[3].match(colonRegex)[1],
        usedCapacity: dataSlice[4].match(colonRegex)[1],
        capacity: dataSlice[5].match(colonRegex)[1],
      })
    }

    return dataAsObjs
  }

  function handleError(error) {
    setError(error);
  }

  useEffect(() => {

    fetch(process.env.PUBLIC_URL + '/output.txt')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.text();
      })
      .then(data => {
        setOutput(parseData(data));
        setError(null);
      })
      .catch(error => {
        console.error(error);
        setError(error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Printlab Computer Statuses</h1>
      {error && <p>{error.message}</p>}


      {output.length > 0 && (
        <div className={'info-table'}>
          <div className={'info-table-head'}>
            <div>Host</div>
            <div>IP Address</div>
            <div>CPU</div>
            <div>Unused Storage</div>
            <div>Total RAM</div>
            <div>Unused RAM</div>
          </div>

          {/* Generate table rows */}
          {output.map(
            ({ host, ipaddress, device, capacity, memory, usedCapacity }, index) => {
              return (
                <div key={index} className="info-table-row">
                  <div>{host}</div>
                  <div>{ipaddress}</div>
                  <div>{device}</div>
                  <div>{capacity}</div>
                  <div>{memory}</div>
                  <div>{usedCapacity}</div>
                </div>
              )
            }
          )}
        </div>
      )}
    </div>
  )
};

export default App;
