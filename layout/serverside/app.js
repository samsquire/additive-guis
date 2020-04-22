var path = require('path');
var fs = require('fs');

var React = require('react');
var express = require('express');
var ReactDOMServer = require('react-dom/server')
var additive = require('./additive');
var layout_page = additive.layout_page;
var template = additive.template;
var Environment = additive.Environment;

const PORT = process.env.PORT || 3006;
const app = express();

app.use(express.static('./build'));

app.get('/*', (req, res) => {
  var environment = new Environment();
  const app = ReactDOMServer.renderToString(layout_page(environment, template.data, template, template.predicates, "", "root"));

  const indexFile = path.resolve('index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    return res.send(
      data.replace('%OUTPUT%', `${app}`)
    );
  });
});

app.listen(PORT, () => {
  console.log(`😎 Server is listening on port ${PORT}`);
});
