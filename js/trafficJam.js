
class TrafficJam{

	
	// to do: getter en setters maken
	
	// to do: aparte location class gebruiken

	constructor(){
		
		this.from;	
		this.lat1;	
		this.lon1;	
		this.to;		
		this.lat2;	
		this.lon2;
		this.start; 	
		this.delay;	
		this.distance;
	}
	
	
	
	setData( trafficJamData ){
		
		this.from		= trafficJamData.from;										
		this.lat1		= trafficJamData.fromLoc.lat;
		this.lon1		= trafficJamData.fromLoc.lon;
		
		this.to			= trafficJamData.to;
		this.lat2		= trafficJamData.toLoc.lat;
		this.lon2		= trafficJamData.toLoc.lon;
		
		this.start 		= trafficJamData.start;
		this.delay		= trafficJamData.delay;
		this.distance 	= trafficJamData.distance;
	}

}