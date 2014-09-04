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

config.google = {
  clientId    : '484535587590-l8ddlf68r4edld25rum02nepcj24mmdr.apps.googleusercontent.com',
  clientSecret: process.env.GOOGLE_SECRET,
  callbackUrl : 'http://chyld-vm.com:3333/auth/google/callback'
};

config.spotify = {
  clientId    : 'bc16b2195bc940ef80b6c18f3d244985',
  clientSecret: process.env.SPOTIFY_SECRET,
  callbackUrl : 'http://chyld-vm.com:3333/auth/spotify/callback'
};

config.stripe = {
  publishKey : 'pk_test_hITBCSvRquKbXqH4FnLGUclK',
  secretKey  : process.env.STRIPE_SECRET
};

module.exports = config;

