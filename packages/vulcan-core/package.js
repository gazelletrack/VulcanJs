Package.describe({
  name: "vulcan:core",
  summary: "Vulcan core package",
  version: '1.6.1',
  git: "https://github.com/VulcanJS/Vulcan.git"
});

Package.onUse(function(api) {

  api.versionsFrom("METEOR@1.0");

  api.use([
    'vulcan:lib@1.6.1',
    'vulcan:i18n@1.6.1',
    'vulcan:users@1.6.1',
    'vulcan:routing@1.6.1'
  ]);

  api.imply([
    'vulcan:lib@1.6.1'
  ]);

  api.mainModule('lib/server/main.js', 'server');
  api.mainModule('lib/client/main.js', 'client');

});
