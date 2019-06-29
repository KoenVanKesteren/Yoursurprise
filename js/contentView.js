
class ContentView{


	constructor( roadName ){
		
		this.id		= roadName;
		
		this.div;
		this.contentTable;
		this.tableHeader;
	}


	
	init(){
					
		this.div					= document.createElement('div');
		this.div.className 			= "roadEntryDiv";
		this.div.id					= this.id;
		
		this.createHeader();
		this.createContentTable();
		
		var mainContentDiv			= document.getElementById( "content" );
		mainContentDiv.appendChild( this.div );
	}



	reset(){
		this.contentTable.reset();
	}
	
	

	update( roadEntry ){
		
		this.contentTable.setData( roadEntry );
		this.tableHeader.innerHTML = roadEntry.getName();
	}		

	

	createHeader(){
		// header van content
		this.tableHeader 					= document.createElement("BUTTON");
		this.tableHeader.className			= "collapsible";
		
		this.div.appendChild( this.tableHeader );	
	}
		


	createContentTable(){
		
		this.contentTable	= new ContentTable();
		this.contentTable.init();
		this.contentTable.setParent( this.div );
	}	
	

	
}