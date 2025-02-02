/**
 * :copyright (c) 2014 - 2021, The Regents of the University of California, through Lawrence Berkeley National Laboratory (subject to receipt of any required approvals from the U.S. Department of Energy) and contributors. All rights reserved.
 * :author
 */
angular.module('BE.seed.controller.inventory_detail_notes', [])
  .controller('inventory_detail_notes_controller', [
    '$scope',
    '$window',
    '$uibModal',
    '$stateParams',
    'urls',
    'inventory_service',
    'inventory_payload',
    'user_service',
    'note_service',
    '$translate',
    'i18nService', // from ui-grid
    'organization_payload',
    'notes',
    function ($scope, $window, $uibModal, $stateParams, urls, inventory_service, inventory_payload, user_service, note_service, $translate, i18nService, organization_payload, notes) {
      $scope.item_state = inventory_payload.state;
      $scope.notes = notes;
      $scope.translations = {};
      $scope.organization = organization_payload.organization;

      var needed_translations = [
        'Reset Defaults'
      ];

      $translate(needed_translations).then(function succeeded (translations) {
        $scope.translations = translations;
      }, function failed (translationIds) {
        $scope.translations = translationIds;
      });

      // let angular-translate be in charge ... need
      // to feed the language-only part of its $translate setting into
      // ui-grid's i18nService
      var stripRegion = function (languageTag) {
        return _.first(languageTag.split('_'));
      };
      i18nService.setCurrentLang(stripRegion($translate.proposedLanguage() || $translate.use()));

      // set some defaults and load the notes
      $scope.inventory_type = $stateParams.inventory_type;
      $scope.inventory = {
        view_id: $stateParams.view_id
      };
      $scope.cycle = $stateParams.cycle_id;
      $scope.org_id = user_service.get_organization().id;

      var refreshNotes = function () {
        $scope.notes = {results: []};
        note_service.get_notes($scope.org_id, $scope.inventory_type, $scope.inventory.view_id).then(function (data) {
          $scope.notes = data;
        });
      };

      $scope.open_create_note_modal = function () {
        var newNoteModalInstance = $uibModal.open({
          templateUrl: urls.static_url + 'seed/partials/inventory_detail_notes_modal.html',
          controller: 'inventory_detail_notes_modal_controller',
          size: 'lg',
          resolve: {
            inventoryType: function () {
              return $scope.inventory_type;
            },
            viewId: function () {
              return $scope.inventory.view_id;
            },
            orgId: function () {
              return $scope.org_id;
            },
            note: _.constant({text: ''}),
            action: _.constant('new')
          }
        });

        newNoteModalInstance.result.finally(function () {
          refreshNotes();
        });
      };

      $scope.open_edit_note_modal = function (note) {
        var noteModalInstance = $uibModal.open({
          templateUrl: urls.static_url + 'seed/partials/inventory_detail_notes_modal.html',
          controller: 'inventory_detail_notes_modal_controller',
          size: 'lg',
          resolve: {
            inventoryType: function () {
              return $scope.inventory_type;
            },
            viewId: function () {
              return $scope.inventory.view_id;
            },
            orgId: function () {
              return $scope.org_id;
            },
            note: function () {
              return note;
            },
            action: _.constant('update')
          }
        });

        noteModalInstance.result.finally(function () {
          refreshNotes();
        });
      };

      $scope.inventory_display_name = function (property_type) {
        let error = '';
        let field = property_type == 'property' ? $scope.organization.property_display_field : $scope.organization.taxlot_display_field;
        if (!(field in $scope.item_state)) {
          error = field + ' does not exist';
          field = 'address_line_1';
        }
        if (!$scope.item_state[field]) {
          error += (error == '' ? '' : ' and default ') + field + ' is blank';
        }
        $scope.inventory_name = $scope.item_state[field] ? $scope.item_state[field] : '(' + error + ') <i class="glyphicon glyphicon-question-sign" title="This can be changed from the organization settings page."></i>';
      };


      $scope.open_delete_note_modal = function (note) {
        var noteModalInstance = $uibModal.open({
          templateUrl: urls.static_url + 'seed/partials/inventory_detail_notes_modal.html',
          controller: 'inventory_detail_notes_modal_controller',
          size: 'lg',
          resolve: {
            inventoryType: function () {
              return $scope.inventory_type;
            },
            viewId: function () {
              return $scope.inventory.view_id;
            },
            orgId: function () {
              return $scope.org_id;
            },
            note: function () {
              return note;
            },
            action: _.constant('delete')
          }
        });

        noteModalInstance.result.finally(function () {
          refreshNotes();
        });
      };
    }]);
