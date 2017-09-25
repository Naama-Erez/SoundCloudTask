(function () {
	function searchController ($scope, SoundCloudService) {
		var that = this;
		const PAGE_SIZE = 6;
		var currPageNumber = 0;
		this.searchResults = [];
		this.selectedTrack = {};
		this.selectedImg = '';
		this.hideImage = true;
		this.history = [];
		this.settings = {};

		this.updateSearchResults = function (tracks, term) {
			console.log(tracks);
			$scope.searchTerm = term;
			that.searchResults = tracks.collection;
			$scope.$digest();
		};

		this.searchClick = function (term) {
			currPageNumber = 0;
			SoundCloudService.doSearch(term, PAGE_SIZE, currPageNumber, that.updateSearchResults);
			updateHistory(term);
		};
		this.nextPage = function (term) {
			currPageNumber++;
			SoundCloudService.doSearch(term, PAGE_SIZE, currPageNumber, that.updateSearchResults);
		};
		this.selectTrack = function (track) {
			that.selectedTrack = track;
			replaceImg();
		};
		this.embedTrack = function () {
			var streamUrl = '/tracks/' + that.selectedTrack.id;
			SC.stream(streamUrl).then(function(player){
				player.play();
			});
		};

		this.setDisplay = function (type) {
			that.settings.display = type;
			SoundCloudService.saveSettings(that.settings);
			console.log(1);
		};

		function replaceImg () {
			var imgDelay = that.hideImage ? 0 : 500;
			that.hideImage = true;

				setTimeout(function () {
					if (that.selectedTrack.artwork_url == null) {
						that.selectedImg = '../img/no_img.png';
					} else {
						that.selectedImg = that.selectedTrack.artwork_url;
					}
					that.hideImage = false;
					$scope.$digest();
				},imgDelay);

		}
		function initHistory () {
			that.history = SoundCloudService.getHistory();
		}

		function initSettings () {
			that.settings = SoundCloudService.getSettings();
		}

		function updateHistory (term) {
			if (that.history.indexOf(term) != -1){
				that.history.splice(that.history.indexOf(term),1);
			}
			that.history.unshift(term);
			that.history = that.history.slice(0,5);
			SoundCloudService.saveHistory(that.history);
		}

		initHistory();
		initSettings();
	}

	angular.module('SoundCloud')
		.controller('searchController', ['$scope', 'SoundCloudService',searchController]);
})();