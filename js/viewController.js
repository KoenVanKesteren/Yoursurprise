
class ViewController{

	constructor(){
		
		this.dataManager;
		this.mapController;
		
		// view
		this.roadViews		= [];
		
		// model
		this.snapshot;
		
		this.isInitial		= true;
	}



	setDataManager( dataManager ){
		this.dataManager = dataManager;
	}
	
	
	
	setMapController( mapController ){
		this.mapController = mapController;
	}
	
	

	update( dateKey ){
		
		console.log( 'update', dateKey );
		
		// huidige content resetten:
		this.resetOutput();
		
		this.snapshot		= this.dataManager.getSnapshot( dateKey );
		if( this.snapshot ){
			var roadEntries		= this.snapshot.getRoadEntries();
			this.outputData( roadEntries );
		}
		else{
			console.log( 'Geen file informatie beschikbaar!' );
		}
	}
	
	
	
	outputData( roadEntries ){
		
		// Voor alle wegen ...
		for( var i=0; i< roadEntries.length; i++ ){
			
			this.setRoadView( roadEntries[i] );
		}
		
		if( this.isInitial ){
			this.setInitialOutput();
		}
	}
	
	
	
	resetOutput(){
		
		this.mapController.reset();
		
		// roadViews resetten
		for( var i=0; i< this.roadViews.length; i++ ){
			
			this.roadViews[i].reset();
		}
	}
	
	
	
	setRoadView( roadEntry ){
		
		var roadName		= roadEntry.getName();
		
		var roadView 		= this.getRoadView( roadName );
		
		if( !roadView ){
			
			roadView 			= new RoadView( roadName );
			roadView.setMapController( this.mapController );
			roadView.createView( roadEntry );
			this.addRoadView( roadView );
		}

		roadView.update( roadEntry );
	}
	
	
	
	addRoadView( roadView ){
		
		this.roadViews.push( roadView );
	}
	
	
	
	getRoadView( roadName ){
	
		if( this.roadViews !== undefined && this.roadViews.length != 0 ){
			
			var roadView = this.roadViews.find( o => o.name === roadName );
			return roadView;
		}
		else{
			console.log( 'No roads set' );
		}
	}
	
	
		
	setInitialOutput(){
		
		var roadEntry	= this.snapshot.getRoadEntry(0);
		if( roadEntry ){
			var trafficJam	= roadEntry.getTrafficJam(0);
			
			var lat1 	= trafficJam.lat1;
			var lon1 	= trafficJam.lon1;
			
			var lat2 	= trafficJam.lat2;
			var lon2 	= trafficJam.lon2;
			
			// zoom in op de kaart
			this.mapController.setMapView( lat1, lon1, lat2, lon2 );
			
			// toggle de knop van de eerste weg
			this.roadViews[0].sideBarButton.toggleContent();
		}
		this.isInitial = false;	
	}
									
}