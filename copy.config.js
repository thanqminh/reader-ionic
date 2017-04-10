// <projectRoot>/copy.config.js
const defaultConfig = require('@ionic/app-scripts/config/copy.config');

module.exports = Object.assign({}, defaultConfig, {
  copyLogo: {
    src: 'platforms/browser/img/logo.png',
    dest: '{{WWW}}/img',
  },
});
