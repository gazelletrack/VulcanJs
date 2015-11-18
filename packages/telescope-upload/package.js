Package.describe({
  name: 'telescope:upload',
  summary: 'Telescope file upload package.',
  version: '0.25.5',
  git: "https://github.com/TelescopeJS/Telescope.git"
});

Package.onUse(function (api) {

  api.versionsFrom(['METEOR@1.0']);

  api.use([
    'telescope:core@0.25.5',
    // 'lepozepo:cloudinary@4.1.1',
    'lepozepo:s3@5.1.5'
  ]);

  api.addFiles([
    'package-tap.i18n',
    'lib/upload.js'
  ], ['client', 'server']);

  api.addFiles([
    
  ], ['client']);

  api.addFiles([
  ], ['server']);

  // var languages = ["ar", "bg", "cs", "da", "de", "el", "en", "es", "et", "fr", "hu", "id", "it", "ja", "kk", "ko", "nl", "pl", "pt-BR", "ro", "ru", "sl", "sv", "th", "tr", "vi", "zh-CN"];
  // var languagesPaths = languages.map(function (language) {
  //   return "i18n/"+language+".i18n.json";
  // });
  // api.addFiles(languagesPaths, ["client", "server"]);
  
  // api.export('Users');

});
