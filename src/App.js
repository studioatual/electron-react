import React, { useState } from 'react';
const { ipcRenderer } = require('electron');

function App() {
  const [statusMonitor, setStatusMonitor] = useState('');
  const openPhotoshop = () => {
    const path =
      'C:\\Program Files\\Adobe\\Adobe Photoshop CC 2015\\Photoshop.exe';
    ipcRenderer.send('open_exec', { path });
  };
  const monitorPhotoshop = () => {
    const path =
      'C:\\Program Files\\Adobe\\Adobe Photoshop CC 2015\\Photoshop.exe';
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
      <button onClick={monitorPhotoshop}>Monitorar Photoshop</button>
      <div>{statusMonitor}</div>
    </div>
  );
}

export default App;
