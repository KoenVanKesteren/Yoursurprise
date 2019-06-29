
class DataManager{


	constructor(){
	
		this.listeners 	= [];
		this.snapshots	= {};
		
		this.savedData	= {};
		
		this.feed		= 'https://www.anwb.nl/feeds/gethf';
	}



	start(){
		
		// eventueel opgeslagen data ophalen
		this.fetchSavedData();
		
		// feed periodiek verversen	
		this.retrieveLoop();
	}



	retrieveLoop(){
						
		// haal de feed op
		this.executeQuery();
		
		// 4) herhaal elke x seconden
		var delay	= 60000;	
		setTimeout( this.retrieveLoop.bind(this), delay );			
	}


			
	executeQuery(){
		$.get(
			this.feed, 
			function( data ){
				
				// nieuwe update toevoegen
				var dateKey				= ""+data.dateTime.replace(', ','').replace(':','')+"";
				var roadEntryData		= data.roadEntries;
				
				// data in browser opslaan
				this.saveData( roadEntryData, dateKey );
				
				// nieuwe shapshot maken
				this.createSnapshot( roadEntryData, dateKey );
				
				// listeners updaten
				this.updateListeners();
			
			}.bind(this)
		);
	}



	saveData( roadEntryData, dateKey ){
		
		// nieuwe update toevoegen
		this.savedData[ dateKey ] 	= roadEntryData;
		
		// data weer inpakken
		var jsonData				= JSON.stringify( this.savedData );
		
		// localStorage updaten
		localStorage.setItem( 'savedData', jsonData );
	}		



	fetchSavedData(){
		
		// opgeslagen data uitpakken	
		var jsonData				= localStorage.savedData;
		
		if( jsonData ){
			this.savedData			= JSON.parse( jsonData );
		}
		else{
			this.savedData			= {};
		}
		
		// opgeslagen data naar snapshots
		
		$.each(	
			this.savedData, 
			function( key, value ) {
				this.createSnapshot( value, key );
			}.bind(this)
		);
		
		// eventuele data van niet-vandaag verwijderen
		this.removeOldData();
	}
					


	createSnapshot( roadEntryData, dateKey ){
		
		var snapshot = new Snapshot( dateKey );
		snapshot.setRoadEntries( roadEntryData );
		this.addSnapshot( snapshot );
	}
	


	addSnapshot( snapshot ){
		
		var dateKey					= snapshot.dateKey;
		this.snapshots[ dateKey ] 	= snapshot;
	}
	
	
	
	getSnapshot( dateKey ){
		
		var snapshot;
		
		if( dateKey ){
			snapshot = this.snapshots[ dateKey ];
			
			// anders snapshot vlak voor opgegeven dateKey
			if( ! snapshot ){
				snapshot 	= this.getClosestSnapshot( dateKey );
			}
		}
		else{
			// indien geen dateKey: de laatste pakken
			var lastSnapshotKey	= Object.keys(this.snapshots).sort().pop();
			snapshot = this.snapshots[ lastSnapshotKey ];
		}
		
		return snapshot;
	}
		


	getClosestSnapshot( dateKey ){
		
		var bestKey;
		var keys 			= [];

		for( var k in this.snapshots ){ 
			keys.push(k);
		}
		
		// pak het laatste tijdstip óp of vóór de opgegeven waarde
		for( var i=0; i< keys.length; i++ ){
			if( Number(dateKey) >= Number(keys[i]) ){
				bestKey = keys[i];
			}
		}
		
		return this.snapshots[ bestKey ];
	}

	

	removeOldData(){
		
		// data van niet-vandaag verwijderen
		if( ! jQuery.isEmptyObject( this.snapshots ) ){
			var MyDate 			= new Date();
			var MyDateString;
			MyDateString 		= MyDate.getFullYear()
									+ ('0' + (MyDate.getMonth()+1)).slice(-2)
									+ ('0' + MyDate.getDate()).slice(-2) + '';
			$.each(	
				this.snapshots, 
				function(key, value) {
					console.log(this.snapshots, key);
					if( Number(key.substring(0,8)) < Number(MyDateString) ){
						delete this.snapshots[key];
					}
				}.bind(this)
			);
		}
	}
		

	
	addListener( listener ){
		
		this.listeners.push( listener );
		if( listener.setDataManager ){
			listener.setDataManager( this );
		}
	}
				


	updateListeners(){
		
		console.log( "%c"+"update listeners", "color:blue;", this.listeners );
		
		var l = this.listeners.length;		
		for( var i = 0; i < l; i++ ){
			
			this.listeners[i].update();
		}
	}
						
}