
class ContentTable{

	constructor(){
		
		this.table;
		this.parentElement;
	}
	
	
	
	init(){
		
		this.table 		= document.createElement('table');
		var tr			= this.createTableHeader();
		
		this.table.appendChild( tr );
	}
	
	
	setParent( parentElement ){
		
		this.parentElement = parentElement;
		parentElement.appendChild( this.table );
	}
	
	
	
	setData( roadEntry ){
		
		this.updateContent( roadEntry );
	}
	
	

	createTableHeader(){
		
		var tr 				= document.createElement('tr');
		tr.setAttribute( 'style','font-weight: bold; background-color: #bbbbbb;' );
		
		var from 			= this.createCell( 'from' );
		tr.appendChild(from);
		var lat1 			= this.createCell( 'lat' );
		tr.appendChild(lat1);
		var lon1 			= this.createCell( 'lon' );
		tr.appendChild(lon1);
		var to 				= this.createCell( 'to' );
		tr.appendChild(to);
		var lat2 			= this.createCell( 'lat' );
		tr.appendChild(lat2);
		var lon2 			= this.createCell( 'lon' );
		tr.appendChild(lon2);
		var startCell 		= this.createCell( 'start' );
		tr.appendChild(startCell);
		var delayCell 		= this.createCell( 'delay' );
		tr.appendChild(delayCell);
		var distanceCell 	= this.createCell( 'distance' );
		tr.appendChild(distanceCell);
		
		return tr;
	}
	
	
	
	reset(){
		// eventueel oude content verwijderen
		var oldContent = this.table.getElementsByTagName("tbody")[0];
		if( oldContent ){
			this.table.removeChild( oldContent );
		}
	}
	
	
	
	updateContent( roadEntry ){
	
		/*** 
			- Rijen maken voor alle files op weg ...
			- cellen maken...
				
			To do: eerste cell bevat een link met een callback die naar de locatie van de file zoomt
		*/
		
		// nieuwe content aanmaken en toevoegen
		var new_tbody 	= document.createElement('tbody');
		var trafficJams	= roadEntry.getTrafficJams();
		
		for( var j = 0; j < trafficJams.length; j++ ){
			var jam				= trafficJams[j];
			
			var tr 				= document.createElement('tr');
			tr.setAttribute( 'style','background-color: #ebebe0;' );
			
			var linkCell 		= this.createLinkCell( jam );
			tr.appendChild( linkCell );
			var lat1Cell 		= this.createCell( jam.lat1 );
			tr.appendChild( lat1Cell );
			var lon1Cell 		= this.createCell( jam.lon1 );
			tr.appendChild( lon1Cell );
			var toCell 			= this.createCell( jam.to );
			tr.appendChild(	toCell );
			var lat2Cell 		= this.createCell( jam.lat2 );
			tr.appendChild( lat2Cell );
			var lon2Cell 		= this.createCell( jam.lon2 );
			tr.appendChild( lon2Cell );
			var startCell 		= this.createCell( jam.start );
			tr.appendChild( startCell );
			var delayCell 		= this.createCell( jam.delay );
			tr.appendChild( delayCell );
			var distanceCell 	= this.createCell( jam.distance );
			tr.appendChild( distanceCell );
			
			new_tbody.appendChild( tr );
		}
		
		this.table.appendChild( new_tbody );
	}
	
	
	
	createLinkCell( trafficJam ){
		var td			= document.createElement('td');
		var a			= document.createElement('a');
		var textNode 	= document.createTextNode( trafficJam.from );
		
		a.appendChild( textNode );
		a.title 		= "my title text";
		a.href 			= "#";
		
		var lat1 		= trafficJam.lat1;
		var lon1 		= trafficJam.lon1;
		
		var lat2 		= trafficJam.lat2;
		var lon2 		= trafficJam.lon2;
		
		/*** 
		
		To do: 
			- callback toevoegen om in te zoomen
			- aanroep naar map anders oplossen
		
		a.onclick		= function(){
							setMapView( map, lat1, lon1, lat2, lon2 );
						};
		*/
		td.appendChild( a );		
		
		return td;
	}
	
	
	
	createCell( text ){
		var td			= document.createElement('td');
		var textNode 	= document.createTextNode( text );
		td.appendChild( textNode );		
		
		return td;
	}
	
}