google.controller("GoogleController",["$scope","$rootScope","$timeout","GoogleService",
	function($scope,$rootScope,$timeout,GoogleService){
		
		$scope.names = [];
		$scope.googleWebResults = [];


		
		$scope.searchWeb = function(query){
			$rootScope.query = query;
			GoogleService.getWeb($rootScope.query,1).success(function(data){	
				$scope.googleWebResults = data.responseData.results;
			});			
		};

		$scope.imageSearch = function(query){
			$rootScope.query = query;
			GoogleService.getImages($rootScope.query,1).success(function(data){	
				$scope.googleImageResults = data.responseData.results;
				$scope.imagePage = 1;
			});			
		};

		$scope.videoSearch = function(query){
			$rootScope.query = query;
			GoogleService.getVideos($rootScope.query).success(function(data){	
				$scope.googleVideoResults = data.responseData.results;				
			});			
		};

		$scope.autoCompleteItems = function(query){
			var httpResult =  GoogleService.getSuggestions(query).then(function(response){				
       				return response.data[1];					
			});	
			return httpResult;
		};

		$scope.updatePage = function(page){
			GoogleService.getWeb($rootScope.query,page).success(function(data){	
				$scope.googleWebResults = data.responseData.results;
			});	
		}

	    function updateImages(){

	    	if($scope.googleImageResults)
	    	{
			$scope.imagePage++;
			GoogleService.getImages($rootScope.query,$scope.imagePage).success(function(data){	

				for(var image = 0; image < data.responseData.results.length;image++)
				{
					$scope.googleImageResults.push(data.responseData.results[image]);
				}
			});	
			}
		}

		$scope.$on('endlessScroll:next', function() {
      		// Determine which page to load
      		var page = $scope.pagination ? $scope.pagination.current_page + 1 : 1;

      		// Load page
      		updateImages();
   		 });

	}]);