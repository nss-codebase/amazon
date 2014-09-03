'use strict';

var config = {};

config.twitter = {
  apiKey      : 'g50NmXpkYAj6VPmuC2fWSAILv',
  apiSecret   : process.env.TWITTER_SECRET,
  callbackUrl : 'http://chyld-vm.com:3333/auth/twitter/callback'
};

config.github = {
  clientId    : 'd664ac33673ba02948bd',
  clientSecret: process.env.GITHUB_SECRET,
  callbackUrl : 'http://chyld-vm.com:3333/auth/github/callback'
};

module.exports = config;

