
class RoadEntry{

	constructor(){
	
		this.name;
		this.trafficJams = [];
	}
	
	
	
	setData( data ){
		this.name						= data.road;
		var trafficJamData				= data.events.trafficJams;
		
		for( var i=0; i< trafficJamData.length; i++ ){
			
			var data			= trafficJamData[i];
			var trafficJam		= new TrafficJam();
			trafficJam.setData( data );
			this.trafficJams.push( trafficJam );
		}
	}
	
	
	
	getName(){
		return this.name;
	}
	
	
	
	getNumOfJams(){
		return this.trafficJams.length;
	}
	
	
	
	getTrafficJams(){
		return this.trafficJams;
	}
	
	
	
	getTrafficJam( index ){
		if( this.trafficJams[index] ){
			return this.trafficJams[index];
		}
	}

}