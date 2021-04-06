/**
 * :copyright (c) 2014 - 2021, The Regents of the University of California, through Lawrence Berkeley National Laboratory (subject to receipt of any required approvals from the U.S. Department of Energy) and contributors. All rights reserved.
 * :author
 */
angular.module('SEED.components', [])
  .component('about', {
    bindings: {
      urls: '<',
      versionPayload: '<'
    },
    templateUrl: `${BE.urls.STATIC_URL}seed/templates/about.html`
  });
