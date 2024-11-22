const express = require('express');
const app = express();
const PORT = 3000;

app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  let id = 0;

  const sendEvent = (data) => {
    res.write(`data: ${JSON.stringify(data)}\n`);
    res.write(`id: ${++id}\n`);
    res.write("\n");
  };


  const intervalId = setInterval(() => {
    const message = {
        appName: 'MyApp',
        date: new Date().toISOString()
      };
    sendEvent(message);
  }, 2000);

  req.on('close', () => {
    clearInterval(intervalId);
    res.end();
    console.log('Close connection');
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});