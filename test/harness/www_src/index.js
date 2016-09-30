var Promise = require('bluebird');

require('style!css!./lib/jasmine-2.5.2/jasmine.css');

require('script!./lib/jasmine-2.5.2/jasmine.js');
require('script!./lib/jasmine-2.5.2/jasmine-html.js');
require('script!./lib/jasmine-2.5.2/boot.js');

require('./specs.js');
