﻿(function () {
    'use strict';

    angular.module('exceptionless.filter')
        .factory('filterService', ['$rootScope', function ($rootScope) {
            var _rawfilter;
            var _organizationFilter;
            var _projectFilter;
            var _timeFilter;

            function apply(source) {
                return angular.extend({}, getDefaultOptions(), source);
            }

            function buildFilter() {
                var filters = [];
                if (_organizationFilter)
                    filters.push(_organizationFilter);

                if (_projectFilter)
                    filters.push(_projectFilter);

                if (_rawfilter)
                    filters.push(_rawfilter);

                return filters.join(' ');
            }

            function fireFilterChanged() {
                $rootScope.$emit('filterChanged', getDefaultOptions());
            }

            function getDefaultOptions() {
                var options = { offset: getTimeZoneOffset() };

                var filter = buildFilter();
                if (filter) {
                    angular.extend(options, { filter: filter });
                }

                if (_timeFilter) {
                    angular.extend(options, { time: _timeFilter });
                }

                return options;
            }

            function getTimeZoneOffset() {
                return new Date().getTimezoneOffset() * -1;
            }

            function setOrganization(id) {
                var filter = 'organization:' + id;
                if (angular.equals(filter, _organizationFilter)) {
                    return;
                }

                if (id) {
                    _organizationFilter = filter;
                    _projectFilter = void 0;
                } else {
                    _organizationFilter = void 0;
                }
                fireFilterChanged();
            }

            function setProject(id) {
                var filter = 'project:' + id;
                if (angular.equals(filter, _projectFilter)) {
                    return;
                }

                if (id) {
                    _projectFilter = filter;
                    _organizationFilter = void 0;
                } else {
                    _projectFilter = void 0;
                }

                fireFilterChanged();
            }

            function setTime(time) {
                var filter = 'time:' + time;
                if (angular.equals(filter, _timeFilter)) {
                    return;
                }

                _timeFilter = time ? filter : void 0;
                fireFilterChanged();
            }

            function setFilter(filter) {
                if (angular.equals(filter, _rawfilter)) {
                    return;
                }

                _rawfilter = filter;
                fireFilterChanged();
            }

            var service = {
                apply: apply,
                setFilter: setFilter,
                setOrganization: setOrganization,
                setProject: setProject,
                setTime: setTime
            };

            return service;
        }
    ]);
}());