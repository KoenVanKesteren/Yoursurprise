
class Snapshot{

	constructor( dateKey  ){
		
		this.dateKey		= dateKey;
		this.roadEntries	= [];
	}


	
	getRoadEntries(){
		
		return this.roadEntries;
	}
	
	
	
	getRoadEntry( index ){
		
		return this.roadEntries[ index ];
	}
	
	

	setRoadEntries( roadEntryData ){
		
		for( var i=0; i< roadEntryData.length; i++ ){
				
			var roadEntry 		= new RoadEntry();
			var data			= roadEntryData[i];
			
			// alleen toevoegen als road files heeft
			if( data.events.trafficJams.length > 0 ){
				roadEntry.setData( data );
				this.roadEntries.push( roadEntry );
			}
		}
	}
	
}