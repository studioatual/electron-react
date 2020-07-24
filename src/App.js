import React, { useState } from 'react';
const { ipcRenderer } = require('electron');

function App() {
  const path =
    'C:\\Program Files\\Adobe\\Adobe Photoshop CC 2015\\Photoshop.exe';
  const [statusMonitor, setStatusMonitor] = useState('');

  const openPhotoshop = () => {
    ipcRenderer.send('open_exec', { path });
  };

  const monitorPhotoshop = () => {
    ipcRenderer.send('monitor', { path });
  };

  ipcRenderer.on('monitor.get', (e, args) => {
    setStatusMonitor(args.status);
  });

  return (
    <div>
      <h1>App</h1>
      <button onClick={openPhotoshop}>Open Photoshop</button>
      <br />
      <br />
      <button onClick={monitorPhotoshop}>Photoshop Monitor</button>
      <div>{statusMonitor}</div>
    </div>
  );
}

export default App;
