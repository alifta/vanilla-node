const fs = require('fs');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Home</title></head>');
    res.write('<body>');
    res.write('<h1>Hello from Node.js Server!</h1>');
    res.write(
      '<form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form>'
    );
    res.write('</body>');
    res.write('</html>');
    return res.end();
  }

  if (url === '/users') {
    res.write('<html>');
    res.write('<head><title>Home</title></head>');
    res.write('<body>');
    res.write('<ul>');
    res.write('<li>User 1</li>');
    res.write('<li>User 2</li>');
    res.write('<li>User 3</li>');
    res.write('</ul>');
    res.write('</body>');
    res.write('</html>');
    return res.end();
  }

  if (url === '/create-user' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });

    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const username = parsedBody.split('=')[1];
      console.log(username);

      // fs.writeFile('data.txt', username, (err) => {
      //   res.statusCode = 302;
      //   res.setHeader('Location', '/');
      //   return res.end();
      // });
    });

    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  }

  // res.setHeader('Content-Type', 'text/html');

  res.write('<html>');
  res.write('<head><title>Page Not Found</title><head>');
  res.write('<body><h1>Page Not Found</h1></body>');
  res.write('</html>');
  res.end();
};

exports.handler = requestHandler;
exports.someText = 'Some hard coded text';
