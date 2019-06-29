
class SideBarButton{


	constructor( roadName ){
		
		this.name		= roadName;
		this.button;
		this.textNode;
		
		this.target;
	}



	init(){
		
		this.button 					= document.createElement("BUTTON");
		this.button.id					= this.name+'-side';;
		this.textNode 					= document.createTextNode('');
		this.button.appendChild( this.textNode );
		
		this.button.className			= "collapsible";
		this.button.value				= 'inactive';
		this.button.style.display		= 'block';
		
		document.getElementById( "sideBar" ).appendChild( this.button );
		
		this.button.addEventListener(
			"click", 
			this.toggleContent.bind(this)
		);
	}
	
	
	
	setTextFromEntry( roadEntry ){
		var text;
		if( roadEntry ){
			text 						= this.name+"   ("+roadEntry.getNumOfJams()+" files)";
			
		}
		else{
			text						= this.name+"   (geen files)";
		}
		this.textNode.nodeValue		= text;
	}
	
	
	
	reset(){
		this.setTextFromEntry();
	}
	
	
	
	update( roadEntry ){
		this.setTextFromEntry( roadEntry );
	}
	
	
	setOnClickTarget( target ){
		
		this.target = target;
	}
	
		
	
	toggleContent(){
		
		if( this.button.value === "active" ){
			this.button.value 			= 'inactive';
			this.target.style.display 	= "none";
		} 
		else{
			this.button.value = 'active';
			this.target.style.display 	= "block";
		}
	}

}