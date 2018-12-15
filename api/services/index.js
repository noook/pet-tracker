const
  fs = require('fs'),
  _ = require('lodash'),
  Comments = require('parse-comments'),
  comments = new Comments(),
  recurRead = require('recursive-readdir-sync'),
  services = {};


let files = recurRead('./services');
_.remove(files, file => file === 'services/index.js');

files.forEach(file => {
  const data = fs.readFileSync(file, 'utf-8');
  const name = comments.parse(data)[0].tags.find(comment => comment.title === 'service').description;
  services[`$${name}`] = require(`${process.cwd()}/${file}`);
});

module.exports = services;