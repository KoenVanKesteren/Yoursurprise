class SnapshotSelector{


	constructor(){
		
		this.userTime;
		this.currentScaleTime;
		this.selector;
		this.listener;
	}


			
	setSelector( selector ){
		// zet de selector voor de input
		this.selector						= selector;				
		this.selector.oninput 				= this.processSelector.bind(this);
	}
	
	
	
	addListener( listener ){
		this.listener = listener;
		this.updateSelector();
	}


					
	processSelector(){
		
		var selectorDate		= new Date( this.currentScaleTime - (-this.selector.value * window.MS_PER_MINUTE));
		var dateKey 			= selectorDate.getFullYear()
									+ ('0' + (selectorDate.getMonth()+1)).slice(-2)
									+ ('0' + selectorDate.getDate()).slice(-2)
									+ ('0' + (selectorDate.getHours())).slice(-2)
									+ ('0' + (selectorDate.getMinutes())).slice(-2);
		
		this.listener.update( dateKey );
	}
						
				

	update(){
		// update de selector
		this.updateSelector();
	}
						
						
						
	/*** bepaal de eerste waarde voor de scale (laatste punt op de fysieke schaal) */
	updateSelector(){
						
		var selector 				= document.getElementById("myRange");
		var scaleValues 			= document.getElementById("myRangeValues").getElementsByTagName("td");
		
		// huidige tijd ophalen	
		var MyDate 					= new Date();
		var interval				= 5;
		var restMinuten				= interval - MyDate.getMinutes()%interval;
		this.currentScaleTime 		= new Date( MyDate - ( -restMinuten * window.MS_PER_MINUTE ) );
		
		// scaleValues bepalen
		for ( var i=0; i< scaleValues.length; i++ ) {
			var myStartDate 			= new Date( this.currentScaleTime - interval * (scaleValues.length - i -1) * MS_PER_MINUTE);
			var scaleTime 				= ('0' + (myStartDate.getHours())).slice(-2)
											+ ':'+ ('0' + myStartDate.getMinutes()).slice(-2) + '';
			scaleValues[i].innerHTML 	= scaleTime;
		}
		
		selector.value	= scaleTime.replace(':', '' );
	}	

}