(function() {
	function SoundCloudService ($window) {
		this.doSearch = function (term, pageSize, currPageNumber,callback) {
			SC.get('/tracks', {q:term, limit:pageSize, linked_partitioning:1, offset:pageSize*currPageNumber}).then(function(tracks) {
				callback(tracks, term);
			});
		};
		this.getHistory = function () {
			  if ($window.localStorage.getItem('scHistory') == null) {
			    return [];
			 } else {
			    return $window.localStorage.getItem('scHistory').split(',');
			 }
		 };

		 this.saveHistory = function ( value) {
		    $window.localStorage.setItem('scHistory', value);
		 };

		this.getSettings = function () {
			if ($window.localStorage.getItem('scSettings') == null) {
				return {display:'list'};
			} else {
				return JSON.parse($window.localStorage.getItem('scSettings'));
			}
		};

		this.saveSettings = function (value) {
			$window.localStorage.setItem('scSettings', JSON.stringify(value));
		};
	}

	angular.module('SoundCloud')
		.service('SoundCloudService', ['$window', SoundCloudService]);
})();