import React, { useState, useEffect } from 'react';

const DisplayFile = () => {
  const [fileContents, setFileContents] = useState('');

  useEffect(() => {
    fetch('output_for_webpage.txt.txt')
      .then(response => response.text())
      .then(text => setFileContents(text))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <pre>{fileContents}</pre>
    </div>
  );
};

export default DisplayFile;
