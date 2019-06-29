
class MapController{

	/***
		functionaliteit voor kaart:
		
			- zoomen naar locatie 
			- file markeren op kaart
			- files verwijderen van kaart
	*/
		

	constructor(){
		
		this.map;
		this.accessToken;
	}

		

	init( mapID ){
		/*** 
			kaartje instellen
			
			- accessToken kan aangevraagd worden via LeafletJS website
		*/
		
		this.map 				= L.map( mapID ).setView([51.505, -0.09], 13);;
		this.accessToken		= 'pk.eyJ1Ijoia29lbmlvIiwiYSI6ImNqd3J2ODlkdDAyenU0M28ybjVscHM1aHgifQ.CCL4x7-vKuFstOLT7tW2KA';
		
		L.tileLayer(
			'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
				attribution: 	'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
				maxZoom: 		18,
				id: 			'mapbox.streets',
				accessToken: 	this.accessToken
			}
		).addTo( this.map );
	}
	
						

	reset(){
		this.clearMap( this.map );
	}
	
		
		
	setMapView( lat1, lon1, lat2, lon2 ){
		
		this.map.setView([(lat1+lat2)/2,(lon1+lon2)/2], 12);
	}


	
	setMarker( latlngs, color ){
		
		var polyline 	= L.polyline( latlngs, { color: color } ).addTo( this.map );
	
		/*** 
			indien gewenst: 
				- zoom the map to the polyline
		*/
		//	map.fitBounds(polyline.getBounds());
	}
						
						
						
	clearMap( map ) {
	
		for( var i in map._layers ){
			
			if( map._layers[i]._path != undefined ){
				try {
					map.removeLayer( map._layers[i] );
				}
				catch(e) {
					console.log( "problem with " + e + map._layers[i] );
				}
			}
		}
	}
						
						
}