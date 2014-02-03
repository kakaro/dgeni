var path = require('canonical-path');
var packagePath = __dirname;
var basePackage = require('../jsdoc');

module.exports = function(config) {

  config = basePackage(config);

  config.append('source.extractors', require('./extractors/ngdoc'));
  
  config.set('processing.tagDefinitions', require('./tag-defs'));

  config.append('processing.processors', [
    require('./processors/filter-ngdocs'),
    require('./processors/paths'),
    require('./processors/memberof'),
    require('./processors/links'),
    require('./processors/module'),
    require('./processors/examples'),
    require('./processors/service-provider-mapping'),
    require('./processors/landing-pages')
  ]);

  config.prepend('rendering.templateFolders', path.resolve(packagePath, 'templates'));

  config.prepend('rendering.templatePatterns', [
    '${ doc.template }',
    '${ doc.id }.${ doc.docType }.template.html',
    '${ doc.id }.template.html',
    '${ doc.docType }.template.html'
  ]);

  config.append('rendering.filters', [
    require('./rendering/filters/code'),
    require('./rendering/filters/link'),
    require('./rendering/filters/type-class')
  ]);

  config.append('rendering.tags', [
    require('./rendering/tags/code')
  ]);

  return config;
};