documentatie
------------

	gemaakt door K van Kesteren 17-6-2019 in opdracht van YourSurprise
	
	
	werking:
	
		- retrieveLoop() haalt elke x minuten nieuwe data van de feed op
			- de feed geeft alleen de wegen waar events voor zijn.
			- om die reden wordt er bij elke iteratie gekeken of er nieuwe wegen zijn ipv een enkele nul-stand met alle wegen
			
		- executeQuery() verwijdert eventueel data die niet van vandaag is
		- data van nieuw tijdstip toevoegen / vervangen
		- localStorage toevoegen + listener triggeren
		- output updaten 
			indien:
				- de gebruiker niet aan de slider heeft gezeten (!userTime)
				- er data is met een nieuwer tijdstip
			betekent:
				- de schaal aanpassen
				- nieuwe file-informatie aan de DOM en kaart toevoegen
			
			- outputData()
				- alle bestaande html-elementen worden in de default staat gezet
				- door gebruiker geopende elementen blijven zichtbaar
				- kaartje wordt leeggemaakt
				
				- door alle aangeleverde wegen heenloopen
				- indien beschikbaar alle files in een table zetten
				- of
					- table toevoegen aan bestaande div inclusief sideBar button
					- nieuwe div met sideBar buttons maken en table toevoegen
						- bij eerste x zetten als voorbeeld een weg met informatie openzetten en inzoomen op de kaart
				- bij het aanmaken van de table wordt ook de file aan de kaart toegevoegd
					- en krijgt de eerste cell een link met callback die het mogelijk maakt om naar de betreffende file op de kaart te navigeren
					
				- bij het aanmaken van de html wordt er voor elke weg met files de volgende onderdelen gemaakt:
					- een knop voor in de sideBar die een callback meekrijgt om de inhoud al dan niet te tonen
					- een div voor de inhoud waar de table met files aan toegevoegd kan worden en een header
				
		- kaartje:
			- er kan op het kaartje worden genavigeerd naar de locatie van een file mbv de functie setMapView() 
			- met de functie markTrafficJam() worden de files op de kaart gezet
				- hierin wordt onderscheid gemaakt tussen 2 niveaus van intensiteit
			- via clearMap() worden alle markeringen verwijderd
		
		- processSlider(): 
			- er wordt gekeken naar de file informatie van het moment op of vlak voor de waarde van de schaal
			- vervolgens wordt de output aangepast voor die data
		
		- setScale():
			- de schaal wordt in z'n geheel aangemaakt
				- voor de eerste keer
				- of als er nieuwe data beschikbaar komt
		
		- initiele aanroep:
			- kaartje wordt gemaakt mbv een token die aangevraagd kan worden via de site van leaflet.js
			- de functie processSlider() wordt gekoppeld aan de slider
			- er wordt een functie gekoppeld aan de localStorage
			- de slider krijgt een schaal adhv de huidige tijd
			- de loop voor het ophalen van de files wordt aangezet