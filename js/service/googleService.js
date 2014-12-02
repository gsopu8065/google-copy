google.factory("GoogleService",["$http",
	function($http){

		var GoogleService = {};

		GoogleService.getWeb = function(query,page){

			page = (page - 1)*8;
			return $http({
				method: 'JSONP',
				url: 'https://ajax.googleapis.com/ajax/services/search/web?v=1.0&rsz=8&start='+page+'&q='+query+'&callback=JSON_CALLBACK',
			});
		};

		GoogleService.getImages = function(query,page){
			page = (page - 1)*8;
			return $http({
				method: 'JSONP',
				url: 'https://ajax.googleapis.com/ajax/services/search/images?v=1.0&rsz=8&start='+page+'&q='+query+'&callback=JSON_CALLBACK',
			});
		};

		GoogleService.getVideos = function(query){
			return $http({
				method: 'JSONP',
				url: 'https://ajax.googleapis.com/ajax/services/search/video?v=1.0&rsz=8&q='+query+'&callback=JSON_CALLBACK',
			});
		};

		GoogleService.getSuggestions = function(query){
			return $http({
				method: 'JSONP',
				dataType: 'jsonp',
				url: 'http://suggestqueries.google.com/complete/search?client=chrome&q='+query+'&callback=JSON_CALLBACK',
			});
		};


		return GoogleService;

	}]);