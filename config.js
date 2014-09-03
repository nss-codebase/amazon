'use strict';

var config = {};

config.twitter = {
  apiKey      : 'g50NmXpkYAj6VPmuC2fWSAILv',
  apiSecret   : process.env.TWITTER_SECRET,
  callbackUrl : 'http://chyld-vm.com:3333/auth/twitter/callback'
};

module.exports = config;

