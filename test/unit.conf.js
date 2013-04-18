basePath = '../app';

files = [
  JASMINE,
  JASMINE_ADAPTER,
  'components/angular/angular.js',
  'components/angular-mocks/angular-mocks.js',
  'components/angular-resource/angular-resource.js',

  'js/**/*.js',
  
  '../test/unit/global.js',
  '../test/unit/**/*.spec.js',

  // templates
  'js/**/*.template.html'
];

preprocessors = {
  'js/**/*.template.html': 'html2js'
};

autoWatch = true;

browsers = ['Chrome'];