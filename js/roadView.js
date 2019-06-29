
class RoadView{


	constructor( name ){
		
		this.name = name;
		
		this.sideBarButton;
		this.contentView;
		this.mapController;
	}



	setMapController( mapController ){
		this.mapController = mapController;
	}
	

	createView( roadEntry ){
		
		this.createContentView( roadEntry );
		this.createSideBarButton( roadEntry );
	}
	

	
	createSideBarButton( roadEntry ){
		
		var roadName					= roadEntry.getName();
		this.sideBarButton 				= new SideBarButton( roadName );
		this.sideBarButton.init();
		this.sideBarButton.setTextFromEntry( roadEntry );
		this.sideBarButton.setOnClickTarget( this.contentView.div );
	}
	


	createContentView( roadEntry ){
		
		var roadName					= roadEntry.getName();
		this.contentView				= new ContentView( roadName );
		this.contentView.init();
	}				



	reset(){
		this.contentView.reset();
		this.sideBarButton.reset();
	}
	
	

	update( roadEntry ){
		
		this.contentView.update( roadEntry );
		this.sideBarButton.update( roadEntry );
		this.markTrafficJams( roadEntry );
	}
	
	
	
	markTrafficJams( roadEntry ){
		
		var trafficJams = roadEntry.getTrafficJams();
		for( var i= 0;  i < trafficJams.length; i++ ){
			var jam 		= trafficJams[i];
			var latlngs 	= [
								[jam.lat1, jam.lon1],
								[jam.lat2, jam.lon2]
							];
			// kleur voor intenstiteit file				
			var color 		= (jam.delay > 600) ? "red" : "orange";
			
			// marker plaatsen
			this.mapController.setMarker( latlngs, color );
		}
	}

}