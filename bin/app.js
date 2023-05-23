const express = require('express');
const path = require('path');
const fs = require('fs');
const siteMap = require('../sitemap');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

app.get('*', function(req, res, next) {
  let path = req.path.split('/').filter(Boolean).join('/');
  let page = siteMap[path] || siteMap['404'];
  if (typeof page === 'string') return res.redirect(301, page);
  if (!fs.existsSync(`views/${page.main}.ejs`)) page = siteMap['404'];
  res.render('_layout', { page });
});

module.exports = app;
