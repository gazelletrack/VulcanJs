Package.describe({
  name: "telescope:settings",
  summary: "Telescope settings package",
  version: "0.23",
  git: "https://github.com/TelescopeJS/Telescope.git"
});

Package.onUse(function(api) {
  var both = ['server', 'client'];

  api.versionsFrom(['METEOR@1.0']);

  api.use([
    'telescope:lib@0.23', 
    'telescope:i18n@0.23'
  ]);

  api.addFiles([
    'lib/settings.js',
    'lib/router.js',
    'lib/menus.js',
    'package-tap.i18n'
  ], both);

  api.addFiles([
    'lib/server/publications.js',
  ], 'server');

  api.addFiles([
    'lib/client/language_changer.js',
    'lib/client/helpers.js',
    'lib/client/templates/settings.html',
    'lib/client/templates/settings.js'
  ], 'client');

  var languages = ["ar", "bg", "cs", "da", "de", "el", "en", "es", "et", "fr", "hu", "it", "ja", "ko", "nl", "pl", "pt-BR", "ro", "ru", "sv", "th", "tr", "vi", "zh-CN"];
  var languagesPaths = languages.map(function (language) {
    return "i18n/"+language+".i18n.json";
  });
  api.addFiles(languagesPaths, ["client", "server"]);

  api.export('Settings', both);
});
