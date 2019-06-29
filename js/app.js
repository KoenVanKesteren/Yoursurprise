
window.MS_PER_MINUTE 			= 60000;


$(document).ready( 
	function() {
		
		window.addEventListener(
			'load',
			function(event){
				
				// dataManager
				var dataManager				= new DataManager();
				
				// viewContrller
				var viewController 			= new ViewController();
				dataManager.addListener( viewController );
				
				// snapshotSelector
				var snapshotSelector 		= new SnapshotSelector();
				var slider 					= document.getElementById("myRange");
				snapshotSelector.setSelector( slider );
				snapshotSelector.addListener( viewController );
				
				dataManager.addListener( snapshotSelector );
				
				// mapController
				var mapController 			= new MapController();
				mapController.init( 'mapid' );
				viewController.setMapController( mapController );
			
				// starten
				dataManager.start();	
			}
		);
	}
);
