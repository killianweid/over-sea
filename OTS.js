//déclaration des variable globales puis initilialisation de celles-ci dans la fonction load1()
var b;
var widthbody; var heightbody;

var life2;

var posBateau; var posBateau2;

var ship; var ship2;


var bouton1; var bouton2; var bouton3;

var boutongo;

var bouton12; var bouton22; var bouton32;

var rightPressed = false; var rightPressed2 = false;
var leftPressed = false;  var leftPressed2 = false;
var upPressed = false;    var upPressed2 = false;
var downPressed = false;  var downPressed2 = false;


var bateauTouche = false;
var champs;
var EnTrainDeTirer1 = false; var EnTrainDeTirer2 = false;
var debutPartie; //variable qui permet de savoir si la phase de choix des bateaux est terminé


function load1(){
	//humane est un framework CSS qui va permettre d'afficher une boite contenant un messge à l'écran
	humane.clickToClose = true; //cette boite pourra être fermé en cliquant dessus
	humane.log("Débutez une partie en sélectionnant vos bateaux"); //ceci est le message affiché
	
	debutPartie = true;
	
	b = document.body;
	
	widthbody = parseInt((document.body.clientWidth*55)/100); //widthbody va prendre comme valeur 55% de la largeur du body de la page du client
	heightbody = parseInt((document.body.clientHeight*70)/100); //pareil que pour widthbody mais cette fois c'est pour la longueur
	
	
	
	champs = document.getElementById("Champs"); //zone de guerre (mer)
	
	life2 = document.getElementById("life2"); //image du coeur (vie)
	
	posBateau = "bas"; //orientation de base du bateau ship (J1)
	posBateau2 = "haut"; //orientation de base du bateau ship2 (J2)
	
	ship = document.getElementById("ship"); //bateau du joueur 1
	ship2 = document.getElementById("ship2"); //bateau du joueur 2
	
	
	bouton1 = document.getElementById("choix1"); // bouton de choix du bateau 1 pour le J1
	
	bouton2 = document.getElementById("choix2"); 
	
	bouton3 = document.getElementById("choix3"); 
	
	bouton3.addEventListener("click",choixBateau3); // lorsqu'on clique sur le bouton 3 on execute la fonction choixBateau3 (qui affiche la bateau 3 à la position initiale de départ sur la zone de guerre)
	
	bouton2.addEventListener("click",choixBateau2);
	
	bouton1.addEventListener("click",choixBateau1);
	
	bouton1.addEventListener("mouseover",profilBateau1); // on affiche l'image du bateau en question ainsi que ses caractéristiques au survol du bouton1 (bateau 1)
	bouton1.addEventListener("mouseout",cacherProfilB1); // on cache ce qu'on affichait au survol lorsqu'on ne survole plus le bouton
	bouton2.addEventListener("mouseover",profilBateau2);
	bouton2.addEventListener("mouseout",cacherProfilB2);
	bouton3.addEventListener("mouseover",profilBateau3);
	bouton3.addEventListener("mouseout",cacherProfilB3);
	
	//bateau 2
	
	bouton12 = document.getElementById("choix12"); // bouton de choix du bateau 1 pour le J2
	
	bouton22 = document.getElementById("choix22");
	
	bouton32 = document.getElementById("choix32");
	
	bouton32.addEventListener("click",choixBateau32);
	
	bouton22.addEventListener("click",choixBateau22);
	
	bouton12.addEventListener("click",choixBateau12);
	bouton12.addEventListener("mouseover",profilBateau12);
	bouton12.addEventListener("mouseout",cacherProfilB12);
	bouton22.addEventListener("mouseover",profilBateau22);
	bouton22.addEventListener("mouseout",cacherProfilB22);
	bouton32.addEventListener("mouseover",profilBateau32);
	bouton32.addEventListener("mouseout",cacherProfilB32);
	
	boutongo = document.getElementById("go"); //bouton qui permet de lancer la partie 
	
	boutongo.addEventListener("click",debutpartie); // en cliquant sur le bouton on execute la fonction debutpartie qui cache les boutons de choix et go et affiche une boite pour notifier du début de la partie
	
	
	document.addEventListener("keydown", keyDown); //lorsqu'une touche est appuyé on appelle la fonction keyDown
	document.addEventListener("keyup", keyUp); //lorsqu'une touche est relaché on appelle la fonction keyUp
}


function debutpartie(){
	// on cache les boutons (Bateau 1, bateau 2, GO ! etc..)
	var boutons = document.getElementsByTagName("button");
	for (var i = 0; i < boutons.length; i++) { 
    boutons[i].style.display = "none" ;
	}
	//on place les points de vie au bon endroit (au centre ce chaque coeur)
	document.getElementById("valeur_life1").style.top = "81px";
	document.getElementById("valeur_life2").style.top = "81px";
	//la boite qui sera affichée par la suite pourra être fermé en cliquant dessus (sinon elle se fermera toute seule au bout d'un certain temps)
	humane.clickToClose;
	//on affiche une boite avec du texte
	humane.log("La guerre est déclarée ! (Les boulets sont tirés par la gauche du bateau)");
	//on affiche les textes "J1" et "J2" à côté du bateau concerné
	document.getElementById("J2").style.display = "block";
	document.getElementById("J1").style.display = "block";
	//le choix des bateaux est terminé et la partie est lancée donc :
	debutPartie = false;
	
}


function MyCollision(ship1, ship2) { //test si les bateaux rentrent en collisions
	
	
	
	var box1l = document.getElementById(ship1).style.left;
	box1l = box1l.substr(0,box1l.length-1);
	box1l = Number(box1l.substr(0,box1l.length-1));
	
	
	var box1t = document.getElementById(ship1).style.top;
	box1t = box1t.substr(0,box1t.length-1);
	box1t = Number(box1t.substr(0,box1t.length-1));
	
	
	var box1w = document.getElementById(ship1).style.width;
	box1w = box1w.substr(0,box1w.length-1);
	box1w = Number(box1w.substr(0,box1w.length-1));
	
	
	var box1h = document.getElementById(ship1).style.height;
	box1h = box1h.substr(0,box1h.length-1);
	box1h = Number(box1h.substr(0,box1h.length-1));
	
		
	var box2l = document.getElementById(ship2).style.left;
	box2l = box2l.substr(0,box2l.length-1);
	box2l = Number(box2l.substr(0,box2l.length-1));
	
	
	var box2t = document.getElementById(ship2).style.top;
	box2t = box2t.substr(0,box2t.length-1);
	box2t = Number(box2t.substr(0,box2t.length-1));
	
	
	var box2w = document.getElementById(ship2).style.width;
	box2w = box2w.substr(0,box2w.length-1);
	box2w = Number(box2w.substr(0,box2w.length-1));
	
	
	var box2h = document.getElementById(ship2).style.height;
	box2h = box2h.substr(0,box2h.length-1);
	box2h = Number(box2h.substr(0,box2h.length-1));
	
	
	var e1 = box1l + box1w;
	var e2 = box2t + box2h;
	var e3 = box2l + box2w;
	var e4 = box1t + box1h;
	
	
	var top = document.getElementById("ship").style.width;
	top = top.substr(0,top.length-1);
	top = Number(top.substr(0,top.length-1));
	
	
   if(
   (e1 < box2l) || (box1t > e2) || (box1l > e3) || (e4 < box2t) //trop a droite || trop en haut || trop a gauche || trop en bas
   ){
	return false;   	// pas de collision
   }
   else return true; // collision

}


// Fonction qui supprime l'image selon son ID et son parent (id de la balise supérieur)
function removeElementById (id,parentE) {
		var parentElement = document.getElementById(parentE);
    var elementASupprime = document.getElementById(id);
    parentElement.removeChild(elementASupprime);
}
// Fonction qui configure la position de départ des boulets et vers où ils partent puis les affiche
function confTir (id,bateau) {

  //spécifier le nombre de boulet
  nbFormules = 5;
  //longueur du tir
  longueurTir = 350;
  
  if(bateau == "ship"){
  	positionBateau = posBateau;
  }else if(bateau == "ship2"){
  	positionBateau = posBateau2;
  }
  //proprietes de placement d'un boulet (ce sont les valeurs qu'on additionnera au top et au left du bateau)
  switch (positionBateau) {
    	case "bas":
    		positionLeftBoule=70;
    		positionTopBoule=60;
    		break;
    	case "haut":
    		positionLeftBoule=10;
    		positionTopBoule=75;
    		break;
    	case "gauche":
    		positionTopBoule=65;
    		positionLeftBoule=85;
    		break;
    	case "droite":
    		positionTopBoule=-20;
    		positionLeftBoule=65;
    		break;
  }
  // une variable contiendra la position left et l'autre la position top du boulet
  var leftTir = document.getElementById(bateau).style.left;
  		leftTir = leftTir.substr(0,leftTir.length-1); //on enleve la caractere "x" à leftTir
  		leftTir = Number(leftTir.substr(0,leftTir.length-1))+positionLeftBoule; //on enleve le caractere "p" à leftTir puis on convertie la chaine de caractere restante en nombre et on additionne la valeur de position 
  var topTir = document.getElementById(bateau).style.top;
  		topTir = topTir.substr(0,topTir.length-1);
  		topTir = Number(topTir.substr(0,topTir.length-1))+positionTopBoule;
  //tableau contenant les proprietes de placement de chaque boule
  formules = new Array();
  for (var i=0; i < nbFormules; i++) {
    formules[i] = new Array();
    formules[i]["left"] = leftTir;
    formules[i]["top"] = topTir;
    //selon la position du bateau les proprietes css de chaque boulet vont changer (comme le bateau ne tire que à sa gauche s'il est positionné vers le haut chaque boulet aura 20 px de moins en left que son précédent)
    switch (positionBateau) {
    	case "bas":
    		leftTir +=20;
    		break;
    	case "haut":
    		leftTir -= 20;
    		break;
    	case "gauche":
    		topTir += 20;
    		break;
    	case "droite":
    		topTir-=20;
    		break;
    }
    //on affiche les boulets en creant à chaque fois une balise span qui aura un id de type "gi" en fonction de la var i de la boucle for et des propriétés css top et left tirées du tableau formules
		if(bateau=="ship"){
    	document.getElementById("Champs").innerHTML +='<span id="g'+i+'"  style="position: absolute; left: '+formules[i]["left"]+'px; top: '+formules[i]["top"]+'px"><img src="boulet.png" style="width: 5px;"></span>'; 
		}else if(bateau=="ship2"){
			document.getElementById("Champs").innerHTML +='<span id="b'+i+'"  style="position: absolute; left: '+formules[i]["left"]+'px; top: '+formules[i]["top"]+'px"><img  src="boulet.png" style="width: 5px;"></span>'; 
		}
			
	}
	//selon le bateau qui tire on appellera une fonctions specifique qui se répétera toutes les 5 millisecondes
	//tir() et tir2() ont la même vocation mais pas pour le même bateau
  if(bateau == "ship"){
  	intervalG1 = window.setInterval ("tir()", 5); 
  }else if(bateau == "ship2"){
  	intervalG2 = window.setInterval ("tir2()", 5); 
  }
}


function tir() {
	finPartie = false; //variable qui permet de savoir si le bateau adverse a coulé sous vos attaques
	bateauTouche = false; // variable qui permet de savoir si le bateau adverse a été touché par votre tir
	// s'il existe un bateau adverse on va recuperer ces proprietes de position top et left
	if(document.getElementById("ship2").style.visibility == "visible"){ 
			var leftAdversaire = document.getElementById("ship2").style.left;
			leftAdversaire = leftAdversaire.substr(0,leftAdversaire.length-1);
			leftAdversaire = Number(leftAdversaire.substr(0,leftAdversaire.length-1));
			
			var topAdversaire = document.getElementById("ship2").style.top;
			topAdversaire = topAdversaire.substr(0,topAdversaire.length-1);
			topAdversaire = Number(topAdversaire.substr(0,topAdversaire.length-1));
			
			var adversaire = true;
	}
	// on recupere les propriétés de position du bateau qui tire
	var topBateauTirant = document.getElementById("ship").style.top;
	topBateauTirant = topBateauTirant.substr(0,topBateauTirant.length-1);
	topBateauTirant = Number(topBateauTirant.substr(0,topBateauTirant.length-1));
	var leftBateauTirant = document.getElementById("ship").style.left;
	leftBateauTirant = leftBateauTirant.substr(0,leftBateauTirant.length-1);
	leftBateauTirant = Number(leftBateauTirant.substr(0,leftBateauTirant.length-1));
	
	tableau = new Array();
	tableau = anglesBateau("ship2"); //tableau contiendra les propriétés top et left pour chaque coin du bateau adverse
	var supprime = false; //variable qui permettra de savoir si la balise contenant l'image du boulet a été supprimé
	var cpt = 0;
	//selon l'orientation du bateau qui tire on définit la position du dernier boulet (s'il depasse de la zone de guerre on diminue sa position de 1px jusqu'a qu'il ne depasse pas)
	if(positionBateau=="bas"){
		var placementTir = document.getElementById("ship").style.left;
		placementTir = placementTir.substr(0,placementTir.length-1);
		placementTir = Number(placementTir.substr(0,placementTir.length-1))+longueurTir;
		while(placementTir>=document.getElementById('map').clientWidth){
			placementTir--;
		}
	}else if(positionBateau=="haut"){
		var placementTir = document.getElementById("ship").style.left;
		placementTir = placementTir.substr(0,placementTir.length-1);
		placementTir = Number(placementTir.substr(0,placementTir.length-1))-longueurTir;
		while(placementTir<25){
			placementTir++;
		}
	}else if(positionBateau=="gauche"){
		var placementTir = document.getElementById("ship").style.top;
		placementTir = placementTir.substr(0,placementTir.length-1);
		placementTir = Number(placementTir.substr(0,placementTir.length-1))+longueurTir;
		while(placementTir>=document.getElementById('map').clientHeight){
			placementTir--;
		}
	}else if(positionBateau=="droite"){
		var placementTir = document.getElementById("ship").style.top;
		placementTir = placementTir.substr(0,placementTir.length-1);
		placementTir = Number(placementTir.substr(0,placementTir.length-1))-longueurTir;
		while(placementTir<15){
			placementTir++;
		}
	}
 for(var i=0;i<5;i++){
 	//si le boulet actuel a dépassé la position définit du dernier boulet on supprime toutes les balises contenant les boulets qu'on a crée
    if ((positionBateau=="bas"&&formules[i]["left"] >= placementTir)||(positionBateau=="haut"&&formules[i]["left"]<=placementTir)||(positionBateau=="droite"&&formules[i]["top"]<=placementTir)||(positionBateau=="gauche"&&formules[i]["top"]>=placementTir)) {
				for (var k = 0; k < 5; k++) {
					var balise = document.getElementById('g'+k);
					if(balise){
						removeElementById("g"+k,"Champs");//on supprime les balises span qui contiennent les images de boules
						supprime = true;
						cpt++;
						if(cpt==4){
							clearInterval(intervalG1); //on arrete d'appeler toutes les 5 millisecondes cette fonction (la fonction tir())
							EnTrainDeTirer1 = false;
						}
					}
				}
    }else if(!supprime){ // sinon si le boulet actuel ne dépasse pas et qu'on a rien supprimé pour l'instant
		//selon l'orientation du bateau tirant on additionne 1 à la position left ou top (selon l'orientation) du boulet actuel dans le tableau formules
			switch (positionBateau) {
				case "bas":
					formules[i]["left"] += 1;
					if(adversaire==true){ //s'il existe un adversaire
						if((topAdversaire<=formules[i]["top"])&&(formules[i]["top"]<=tableau[3]["top"])){// si le top du boulet actuel se trouve entre les deux extremites du bateau adverse
							if((leftBateauTirant<leftAdversaire)&&(leftAdversaire<=formules[i]["left"])){ //si le bateau adverse est bien en face du canon et que le boulet a depassé ou est à la meme position que le bateau adverse 
								bateauTouche = true; // le bateau adverse a donc été touché
							}
						}
					}
					break;
				case "haut":
					formules[i]["left"] -= 1;
					if(adversaire==true){
						if((topAdversaire<=formules[i]["top"])&&(formules[i]["top"]<=tableau[3]["top"])){
							if((leftBateauTirant>leftAdversaire)&&(tableau[2]["left"]>=formules[i]["left"])){
								bateauTouche = true;
							}
						}
					}
					break;
				case "gauche":
					formules[i]["top"] += 1;
					if(adversaire==true){
						if((leftAdversaire<=formules[i]["left"])&&(formules[i]["left"]<=tableau[1]["left"])){
							if((topBateauTirant<topAdversaire)&&(topAdversaire<=formules[i]["top"])){
								bateauTouche = true;	
							}
						}
					}
					break;
				case "droite":
					formules[i]["top"] -= 1;
					if(adversaire==true){
						if((leftAdversaire<=formules[i]["left"])&&(formules[i]["left"]<=tableau[1]["left"])){
							if((topBateauTirant>topAdversaire)&&(tableau[3]["top"]>=formules[i]["top"])){
								bateauTouche = true;
							}
						}
					}
					break;
			}
		if(bateauTouche==true){ // si le bateau a été touché on supprime les balises contenant les images des boulets crées
			for (var k = 0; k < 5; k++) {
					var balise = document.getElementById('g'+k);
					if(balise){
						removeElementById("g"+k,"Champs");//on supprime les balises span qui contiennent les images de boules
						supprime = true;
						cpt++;
						if(cpt==4){
							clearInterval(intervalG1);
							EnTrainDeTirer1 = false;
						}
					}
			}
				//on affiche les degats occasionés pendant 1 sec au dessus bateau visé
				document.getElementById('degat2').style.display = "block";
				document.getElementById('degat2').innerHTML = "-"+ship.atk;
				switch(posBateau){
					case "bas":
						document.getElementById('degat2').style.left = (leftAdversaire-25)+"px";
						document.getElementById('degat2').style.top = (topBateauTirant+60)+"px";
						//60 est la valeur qu'il faut additionner au top du bateau tirant pour se positionner à la même hauteur que les boulets
						break;
					case "haut":
						document.getElementById('degat2').style.left = (leftAdversaire+(tableau[1]["left"]-tableau[0]["left"])+25)+"px";
						//la soustraction avec le tableau est pour avoir la largeur du bateau adverse
						document.getElementById('degat2').style.top = (topBateauTirant+75)+"px";
						break;
						case "gauche":
							document.getElementById('degat2').style.left = (leftBateauTirant+85)+"px";
							document.getElementById('degat2').style.top = topAdversaire-25+"px";
							break;
						case "droite":
							document.getElementById('degat2').style.left = (leftBateauTirant+65)+"px";
						//la soustraction avec le tableau est pour avoir la largeur du bateau adverse
						document.getElementById('degat2').style.top = (topAdversaire+(tableau[3]["top"]-tableau[0]["top"])+10)+"px";
						break;
							
				}
				setTimeout(function(){document.getElementById('degat2').style.display = "none";},1000); //1 sec apres l'element 'degat2' sera masqué
			ship2.life -= ship.atk; // on enleve les points de vie à l'adversaire par rapport à la force d'attaque du bateau actuel
			document.getElementById('valeur_life2').innerHTML = ship2.life; // on affiche les nouveaux points de vie du bateau attaqué
			if(ship2.life<=0){ //si le bateau attaqué a plus de vie on affiche une image de bateau détruit à la place de son image actuel
					switch(posBateau2){
						case "haut":
								document.getElementById("ship2").src = "shipIA/ship_h_destroy.png";
								break;
						case "bas":
							document.getElementById("ship2").src = "shipIA/ship_b_destroy.png";
								break;
						case "gauche":
							document.getElementById("ship2").src = "shipIA/ship_g_destroy.png";
								break;
						case "droite":
							document.getElementById("ship2").src = "shipIA/ship_d_destroy.png";
								break;
					}
					finPartie = true; //la partie est donc terminé
					humane.timeout = 0; //la boite affiché restera à l'écran (si >0 la boite restera le temps indiqué en secondes ...ou.. milisecondes?)
					humane.log("VICTOIRE DU JOUEUR 1 ! (Cliquez pour fermer ce message)",function(){window.location.reload();}); //on affiche une boite avec du texte
				}
		}
		//s'il existe un element d'id gi (i étant un nombre par rapport a la boucle for) et que la partie n'est pas terminé (le bateau adverse n'est pas encore détruit)
	if(document.getElementById('g'+i)&&finPartie==false){
		//les boulets vont donc avancer de 1px (voir précédemment)
			document.getElementById('g'+i).style.top = formules[i]["top"]+'px';
			document.getElementById('g'+i).style.left = formules[i]["left"]+'px';
  }
	}
}


}

function tir2() {
	if(document.getElementById("ship").style.visibility == "visible"){
			var leftAdversaire2 = document.getElementById("ship").style.left;
			leftAdversaire2 = leftAdversaire2.substr(0,leftAdversaire2.length-1);
			leftAdversaire2 = Number(leftAdversaire2.substr(0,leftAdversaire2.length-1));
			
			var topAdversaire2 = document.getElementById("ship").style.top;
			topAdversaire2 = topAdversaire2.substr(0,topAdversaire2.length-1);
			topAdversaire2 = Number(topAdversaire2.substr(0,topAdversaire2.length-1));
			
			var adversaire2 = true;
	}
	var topBateauTirant2 = document.getElementById("ship2").style.top;
	topBateauTirant2 = topBateauTirant2.substr(0,topBateauTirant2.length-1);
	topBateauTirant2 = Number(topBateauTirant2.substr(0,topBateauTirant2.length-1));
	var leftBateauTirant2 = document.getElementById("ship2").style.left;
	leftBateauTirant2 = leftBateauTirant2.substr(0,leftBateauTirant2.length-1);
	leftBateauTirant2 = Number(leftBateauTirant2.substr(0,leftBateauTirant2.length-1));
	
	tableau2 = new Array();
	tableau2 = anglesBateau("ship");
	var supprime2 = false;
	var cpt2 =0;
	bateauTouche2 = false;
	
	
	if(posBateau2=="bas"){
		
		var placementTir2 = document.getElementById("ship2").style.left;
		placementTir2 = placementTir2.substr(0,placementTir2.length-1);
		placementTir2 = Number(placementTir2.substr(0,placementTir2.length-1))+longueurTir;
		while(placementTir2>=document.getElementById('map').clientWidth){
			placementTir2--;
		}
	}else if(posBateau2=="haut"){
		var placementTir2 = document.getElementById("ship2").style.left;
		placementTir2 = placementTir2.substr(0,placementTir2.length-1);
		placementTir2 = Number(placementTir2.substr(0,placementTir2.length-1))-longueurTir;
		while(placementTir2<25){
			placementTir2++;
		}
	}else if(posBateau2=="gauche"){
		var placementTir2 = document.getElementById("ship2").style.top;
		placementTir2 = placementTir2.substr(0,placementTir2.length-1);
		placementTir2 = Number(placementTir2.substr(0,placementTir2.length-1))+longueurTir;
		while(placementTir2>=document.getElementById('map').clientHeight){
			placementTir2= placementTir2 -1;
		}
	}else if(posBateau2=="droite"){
		var placementTir2 = document.getElementById("ship2").style.top;
		placementTir2 = placementTir2.substr(0,placementTir2.length-1);
		placementTir2 = Number(placementTir2.substr(0,placementTir2.length-1))-longueurTir;
		while(placementTir2<15){
			placementTir2++;
		}
	}

 for(var i=0;i<5;i++){
	  
    if ((posBateau2=="bas"&&formules[i]["left"] >= placementTir2)||(posBateau2=="haut"&&formules[i]["left"]<=placementTir2)||(posBateau2=="droite"&&formules[i]["top"]<=placementTir2)||(posBateau2=="gauche"&&formules[i]["top"]>=placementTir2)) {
		
		for (var k = 0; k < 5; k++) {
			var balise2 = document.getElementById('b'+k);
			if(balise2){
				removeElementById("b"+k,"Champs");//on supprime les balises span qui contiennent les images de boules
				supprime2 = true;
				cpt2++;
				if(cpt2==4){
					clearInterval(intervalG2);
					EnTrainDeTirer2 = false;
				}
			}
		}
    }else if(!supprime2){
			switch (posBateau2) {
	    	case "bas":
	    		formules[i]["left"] += 1;
				if(adversaire2==true){
						if((topAdversaire2<=formules[i]["top"])&&(formules[i]["top"]<=tableau2[3]["top"])){// si le top du dernier boulet se trouve entre les deux extremites du bateau adverse
							if((leftBateauTirant2<leftAdversaire2)&&(leftAdversaire2<=formules[i]["left"])){
								bateauTouche2 = true;
								
							}
						}
					}
	    		break;
	    	case "haut":
					formules[i]["left"] -= 1;
					if(adversaire2==true){
						if((topAdversaire2<=formules[i]["top"])&&(formules[i]["top"]<=tableau2[3]["top"])){
							if((leftBateauTirant2>leftAdversaire2)&&(tableau2[2]["left"]>=formules[i]["left"])){
								bateauTouche2 = true;
														}
						}
					}
					break;
				case "gauche":
					formules[i]["top"] += 1;
					if(adversaire2==true){
						if((leftAdversaire2<=formules[i]["left"])&&(formules[i]["left"]<=tableau2[1]["left"])){
							if((topBateauTirant2<topAdversaire2)&&(topAdversaire2<=formules[i]["top"])){
								bateauTouche2 = true;	
								
							}
						}
					}
					break;
				case "droite":
					formules[i]["top"] -= 1;
					if(adversaire2==true){
						if((leftAdversaire2<=formules[i]["left"])&&(formules[i]["left"]<=tableau2[1]["left"])){
							if((topBateauTirant2>topAdversaire2)&&(tableau2[3]["top"]>=formules[i]["top"])){
								bateauTouche2 = true;
								
							}
						}
					}
					break;
			}
		if(bateauTouche2){
			for (var k = 0; k < 5; k++) {
					var balise2 = document.getElementById('b'+k);
					if(balise2){
						removeElementById("b"+k,"Champs");//on supprime les balises span qui contiennent les images de boules
						supprime2 = true;
						cpt2++;
						if(cpt2==4){
							clearInterval(intervalG2);
							EnTrainDeTirer2 = false;
						}
					}
				}
				//on affiche les degats occasionés pendant 1 sec au dessus bateau visé
				document.getElementById('degat').style.display = "block";
				document.getElementById('degat').innerHTML = "-"+ship2.atk;
				switch(posBateau2){
					case "bas":
						document.getElementById('degat').style.left = (leftAdversaire2-25)+"px";
						document.getElementById('degat').style.top = (topBateauTirant2+60)+"px";
						//60 est la valeur qu'il faut additionner au top du bateau tirant pour se positionner à la même hauteur que les boulets
						break;
					case "haut":
						document.getElementById('degat').style.left = (leftAdversaire2+(tableau2[1]["left"]-tableau2[0]["left"])+25)+"px";
						//la soustraction avec le tableau2 est pour avoir la largeur du bateau adverse
						document.getElementById('degat').style.top = (topBateauTirant2+75)+"px";
						break;
						case "gauche":
							document.getElementById('degat').style.left = (leftBateauTirant2+85)+"px";
							document.getElementById('degat').style.top = topAdversaire2-25+"px";
							break;
						case "droite":
							document.getElementById('degat').style.left = (leftBateauTirant2+65)+"px";
						//la soustraction avec le tableau2 est pour avoir la largeur du bateau adverse
						document.getElementById('degat').style.top = (topAdversaire2+(tableau2[3]["top"]-tableau2[0]["top"])+10)+"px";
						break;
							
				}
				setTimeout(function(){document.getElementById('degat').style.display = "none";},1000);
			ship.life -= ship2.atk;
			document.getElementById('valeur_life1').innerHTML = ship.life;
			if(ship.life<=0){
					switch(posBateau){
						case "haut":
								document.getElementById("ship").src = "shipIA/ship_h_destroy.png";
								break;
						case "bas":
							document.getElementById("ship").src = "shipIA/ship_b_destroy.png";
								break;
						case "gauche":
							document.getElementById("ship").src = "shipIA/ship_g_destroy.png";
								break;
						case "droite":
							document.getElementById("ship").src = "shipIA/ship_d_destroy.png";
								break;
					}
					humane.timeout = 0; //la boite affiché restera à l'écran (si >0 la boite restera le temps indiqué en secondes ...ou.. milisecondes?)
					humane.log("VICTOIRE DU JOUEUR 2 ! (Cliquez pour fermer ce message)",function(){ window.location.reload();});//on affiche une boite avec du texte
				}
		}
			if(document.getElementById('b'+i)){
				document.getElementById('b'+i).style.top = formules[i]["top"]+'px';
				document.getElementById('b'+i).style.left = formules[i]["left"]+'px';
			}
  }
}


}

function anglesBateau(bateau){
	//on stocke la position du bateau (haut, bas, gauche ou droite) dans la variable positionBateau, si on a pas mit le bon paramètre on renvoie une erreur
	if(bateau=="ship"){
		positionBateau = posBateau;
	}else if(bateau=="ship2"){
		positionBateau = posBateau;
	}else{
		return 'ERREUR : ce bateau n\'existe pas, choisissez entre "ship" ou "ship2"';
	}
	var leftBateau = document.getElementById(bateau).style.left;
		leftBateau = leftBateau.substr(0,leftBateau.length-1);
		leftBateau = Number(leftBateau.substr(0,leftBateau.length-1));
	var topBateau = document.getElementById(bateau).style.top;
		topBateau = topBateau.substr(0,topBateau.length-1);
		topBateau = Number(topBateau.substr(0,topBateau.length-1));
	
	//on crée un tableau à deux dimensions pour stocker les propriétés left et top de chaque angle du bateau
	tabAngles = new Array();
	for (var i=0; i < 4; i++) {
		tabAngles[i] = new Array();
		tabAngles[i]["left"] = 0;
		tabAngles[i]["top"] = 0;
	}
	
	if(positionBateau=="haut"||positionBateau=="bas"){
		tabAngles[0]["left"] = leftBateau;
		tabAngles[0]["top"] = topBateau;
		tabAngles[1]["left"] = leftBateau+68; //68 est la largeur en px du bateau en position haut ou bas
		tabAngles[1]["top"] = topBateau;
		tabAngles[2]["left"] = leftBateau+68;
		tabAngles[2]["top"] = topBateau+158; //158 est la longueur en px du bateau en position haut ou bas
		tabAngles[3]["left"] = leftBateau;
		tabAngles[3]["top"] = topBateau+158;
	}else if(positionBateau=="gauche"||positionBateau=="droite"){
		tabAngles[0]["left"] = leftBateau;
		tabAngles[0]["top"] = topBateau;
		tabAngles[1]["left"] = leftBateau+158; //158 est la largeur en px du bateau en position droite ou gauche
		tabAngles[1]["top"] = topBateau;
		tabAngles[2]["left"] = leftBateau+158;
		tabAngles[2]["top"] = topBateau+68; //68 est la longueur en px du bateau en position droite ou gauche
		tabAngles[3]["left"] = leftBateau;
		tabAngles[3]["top"] = topBateau+68;
	}
	return tabAngles;
}

function choixBateau1 (){ //selection du premier bateau joueur 1
	ship.vitesse = 10;
	ship.munition = 5;
	ship.posX = 10;
	ship.posY = 10;
	ship.arreth = 10;
	ship.arretb = heightbody;
	ship.arretg = 10;
	ship.arretd = widthbody;
	ship.life = 25;
	document.getElementById("valeur_life1").innerHTML = ship.life;
	ship.atk = 5;
	ship.nom = "ship1";
	ship.src = ship.nom+"/ship_b.png";
	ship.style.visibility = "visible";
	ship.style.top = 10 + "px";
	ship.style.left = 10 + "px";
}

function choixBateau3 (){ //selection du troisieme bateau joueur 1
	ship.vitesse = 2;
	ship.munition = 5;
	ship.posX = 10;
	ship.posY = 10;
	ship.arreth = 10;
	ship.arretb = heightbody;
	ship.arretg = 10;
	ship.arretd = widthbody;
	ship.life = 75;
	document.getElementById("valeur_life1").innerHTML = ship.life;
	ship.atk = 10;
	ship.nom = "ship3";
	ship.src = ship.nom+"/ship_b.png";
	ship.style.visibility = "visible";
	ship.style.top = 10 + "px";
	ship.style.left = 10 + "px";
}

function choixBateau2 (){ // selection du deuxieme bateau joueur 1
	ship.vitesse = 5;
	ship.posX = 10;
	ship.munition = 5;
	ship.posY = 10;
	ship.arreth = 10;
	ship.arretb = heightbody;
	ship.arretg = 10;
	ship.arretd = widthbody;
	ship.life = 50;
	document.getElementById("valeur_life1").innerHTML = ship.life;
	ship.atk = 8;
	ship.nom = "ship2";
	ship.src = ship.nom+"/ship_b.png";
	ship.style.top = 10 + "px";
	ship.style.left = 10 + "px";
	ship.style.visibility = "visible";
}


function choixBateau12 (){ // selection du premier bateau joueur 2
	ship2.vitesse = 10;
	ship2.posX = 410;
	ship2.munition = 5;
	ship2.posY = 740;
	ship2.arreth = 10;
	ship2.arretb = heightbody;
	ship2.arretg = 10;
	ship2.arretd = widthbody;
	ship2.life = 25;
	document.getElementById("valeur_life2").innerHTML = ship2.life;
	ship2.atk = 5;
	ship2.nom = "ship1";
	ship2.src = ship2.nom+"/ship_h.png";
	ship2.style.visibility = "visible";
	ship2.style.top = heightbody + "px";
	ship2.style.left = widthbody + "px";
}

function choixBateau32 (){ // selection du troixieme bateau joueur 2
	ship2.vitesse = 2;
	ship2.posX = 410;
	ship2.posY = 740;
	ship2.munition = 5;
	ship2.arreth = 10;
	ship2.arretb = heightbody-28;
	ship2.arretg = 10;
	ship2.arretd = widthbody-44;
	ship2.life = 75;
	document.getElementById("valeur_life2").innerHTML = ship2.life;
	ship2.atk = 10;
	ship2.nom = "ship3";
	ship2.src = ship2.nom+"/ship_h.png";
	ship2.style.visibility = "visible";
	ship2.style.top = heightbody-28 + "px";
	ship2.style.left = widthbody-44 + "px";
}

function choixBateau22 (){ // selection du deuxieme bateau joueur 2
	ship2.vitesse = 5;
	ship2.posX = 410;
	ship2.posY = 740;
	ship2.munition = 5;
	ship2.arreth = 10;
	ship2.arretb = heightbody;
	ship2.arretg = 10;
	ship2.arretd = widthbody;
	ship2.life = 50;
	ship2.atk = 8;
	document.getElementById("valeur_life2").innerHTML = ship2.life;
	ship2.nom = "ship2";
	ship2.src = ship2.nom+"/ship_h.png";
	ship2.style.top = heightbody + "px";
	ship2.style.left = widthbody + "px";
	ship2.style.visibility = "visible";
}

function profilBateau1(){
	document.getElementById("block_life1").style.display = "none";
	document.getElementById("profil_Bateau1").style.display = "block";
}

function cacherProfilB1(){
	document.getElementById("block_life1").style.display = "block";
	document.getElementById("profil_Bateau1").style.display = "none";
}

function profilBateau2(){
	document.getElementById("block_life1").style.display = "none";
	document.getElementById("profil_Bateau2").style.display = "block";
}

function cacherProfilB2(){
	document.getElementById("block_life1").style.display = "block";
	document.getElementById("profil_Bateau2").style.display = "none";
}

function profilBateau3(){
	document.getElementById("block_life1").style.display = "none";
	document.getElementById("profil_Bateau3").style.display = "block";
}

function cacherProfilB3(){
	document.getElementById("block_life1").style.display = "block";
	document.getElementById("profil_Bateau3").style.display = "none";
}

function profilBateau12(){
	document.getElementById("block_life2").style.display = "none";
	document.getElementById("profil_Bateau12").style.display = "block";
}

function cacherProfilB12(){
	document.getElementById("block_life2").style.display = "block";
	document.getElementById("profil_Bateau12").style.display = "none";
}

function profilBateau22(){
	document.getElementById("block_life2").style.display = "none";
	document.getElementById("profil_Bateau22").style.display = "block";
}

function cacherProfilB22(){
	document.getElementById("block_life2").style.display = "block";
	document.getElementById("profil_Bateau22").style.display = "none";
}

function profilBateau32(){
	document.getElementById("block_life2").style.display = "none";
	document.getElementById("profil_Bateau32").style.display = "block";
}

function cacherProfilB32(){
	document.getElementById("block_life2").style.display = "block";
	document.getElementById("profil_Bateau32").style.display = "none";
}

function keyDown(e) { //test quelle touche est baissée pour faire avancer le bateau


	if(!debutPartie){
	
		if(EnTrainDeTirer1 === false){ // fleche droite
		  if (e.keyCode === 39) {
		    rightPressed = true;
		    moveship();
		    document.getElementById("J1").style.top = document.getElementById("ship").style.top;
  			document.getElementById("J1").style.left = document.getElementById("ship").style.left;
		  } else if (e.keyCode === 37) {//fleche gauche
		    leftPressed = true;
		    moveship();
		    document.getElementById("J1").style.top = document.getElementById("ship").style.top;
  			document.getElementById("J1").style.left = document.getElementById("ship").style.left;
		  } else if (e.keyCode === 38) { //fleche haut
		    upPressed = true;
		    moveship();
		    document.getElementById("J1").style.top = document.getElementById("ship").style.top;
  			document.getElementById("J1").style.left = document.getElementById("ship").style.left;
		  } else if (e.keyCode === 40) { //fleche bas
				downPressed = true;
		    moveship();
		    document.getElementById("J1").style.top = document.getElementById("ship").style.top;
  			document.getElementById("J1").style.left = document.getElementById("ship").style.left;
		  } else if (e.keyCode === 13) { //touche entrer
		  	EnTrainDeTirer1 = true;
		    confTir("Champs","ship");
		  }
		}
		if(EnTrainDeTirer2 == false){
		  if (e.keyCode === 65) { //bateau2 : touche A
		    leftPressed2 = true;
		    moveship();
		    document.getElementById("J2").style.top = document.getElementById("ship2").style.top;
  			document.getElementById("J2").style.left = document.getElementById("ship2").style.left;
		  } else if (e.keyCode === 68) { //touche D
		    rightPressed2 = true;
		    moveship();
		    document.getElementById("J2").style.top = document.getElementById("ship2").style.top;
  			document.getElementById("J2").style.left = document.getElementById("ship2").style.left;
		  } else if (e.keyCode === 90) { //touche Z
		    upPressed2 = true;
				moveship();
				document.getElementById("J2").style.top = document.getElementById("ship2").style.top;
  			document.getElementById("J2").style.left = document.getElementById("ship2").style.left;
		  } else if (e.keyCode === 83) { //touche S
		  	downPressed2 = true;
		  	moveship();
		  	document.getElementById("J2").style.top = document.getElementById("ship2").style.top;
  			document.getElementById("J2").style.left = document.getElementById("ship2").style.left;
		  } else if (e.keyCode === 32) { //barre d'espace
				EnTrainDeTirer2 = true;  
		  	confTir("Champs","ship2");
		  }
		
		}
	}
}





function keyUp(e) {
  if (e.keyCode === 39) { // fleche droite
    rightPressed = false;
  } else if (e.keyCode === 37) { // fleche gauche
    leftPressed = false;
  } else if (e.keyCode === 38) { //fleche haut
    upPressed = false;
  } else if (e.keyCode === 40) { //fleche bas
    downPressed = false;
  } else if (e.keyCode === 13) { //touche entrée
    attackPressed = false;
  } else if (e.keyCode === 65) { // bateau 2 : touche A
    leftPressed2 = false;
  } else if (e.keyCode === 68) {// touche D
    rightPressed2 = false;
  } else if (e.keyCode === 90) { // touche Z
    upPressed2 = false;
  } else if (e.keyCode === 83) { // touche S
    downPressed2 = false;
  } else if (e.keyCode === 32) { // barre d'espace
    attackPressed2 = false; 
  }
}

//fonction qui permet de faire avancer le bateau en fonction de la touche appuyée
function moveship(){
	var X = document.getElementById("ship").style.left;
	var Y = document.getElementById("ship").style.top ;
	var lx = X.length;
	var ly = Y.length;
	var nbX = X.slice(0,lx-2);
	var nbY = Y.slice(0,ly-2);
	var X2 = document.getElementById("ship2").style.left;
	var Y2 = document.getElementById("ship2").style.top;
	var lx2 = X2.length;
	var ly2 = Y2.length;
	var nbX2 = X2.slice(0,lx2-2);
	var nbY2 = Y2.slice(0,ly2-2);

	var Collision1 = MyCollision("ship","ship2");
	var Collision2 = MyCollision("ship2","ship");

	
	if(upPressed && rightPressed){}              //si il n'y a pas deux touches préssée en meme temps
	else if(upPressed && leftPressed){}
	else if(downPressed && rightPressed){}
	else if(downPressed && leftPressed){}
	else if(!Collision1){              //il n'y a pas de colision entre bateaux

		if (upPressed) {										//Si la touche Up est préssée
	
			if(parseInt(document.getElementById("ship").style.top) > ship.arreth){        //si le bateau n'est pas en bord de map
				
				document.getElementById("ship").src = ship.nom+"/ship_h.png";
				document.getElementById("ship").style.top = (Number(nbY) - ship.vitesse) + "px";    //on fait avancer le bateau
				ship.style.top = (Number(nbY) - ship.vitesse) + "px";                                //en changeant le top
				posBateau = "haut";
				document.getElementById("ship").style.width = "68px";
				document.getElementById("ship").style.height = "158px";
			}
		}
	
  	if (downPressed) {   //si la touche bas est préssée
  	
  		if(parseInt(document.getElementById("ship").style.top) < ship.arretb){   //si le bateau n'est pas en bord de map
			
				document.getElementById("ship").src = ship.nom+"/ship_b.png";
				document.getElementById("ship").style.top = (Number(nbY) + ship.vitesse) + "px";    //on fait avancer le bateau
				ship.style.top = (Number(nbY) + ship.vitesse) + "px";																//en changeant sa position top
				posBateau = "bas";
				document.getElementById("ship").style.width = "68px";
				document.getElementById("ship").style.height = "158px";
			}
  	}
  	if (leftPressed) {              // si la touhe left est préssée 
  	
  		if(parseInt(document.getElementById("ship").style.left) > ship.arretg){  //si le bateau n'est pas en bord de map
			
				document.getElementById("ship").src = ship.nom+"/ship_g.png";
				document.getElementById("ship").style.left = (Number(nbX) - ship.vitesse) + "px"; //on fait avancer le bateau
				ship.style.left = (Number(nbX) - ship.vitesse) + "px";                         //en changeant la position left
				posBateau = "gauche";
				document.getElementById("ship").style.width = "158px";
				document.getElementById("ship").style.height = "68px";

		}
  }
  if (rightPressed) {
  	
  	if(parseInt(document.getElementById("ship").style.left) < ship.arretd){  //la meme chose que les fois d'avant...
	
			document.getElementById("ship").src = ship.nom+"/ship_d.png";
			document.getElementById("ship").style.left = (Number(nbX) + ship.vitesse) + "px";
			ship.style.left = (Number(nbX) + ship.vitesse) + "px";
			posBateau = "droite";
			document.getElementById("ship").style.width = "158px";
			document.getElementById("ship").style.height = "68px";
		}
  
  }

  }
  else{
  	
  	
  	if(posBateau == "bas"){
  				if (upPressed) {		
	
		if(parseInt(document.getElementById("ship").style.top) > ship.arreth){
			
			document.getElementById("ship").src = ship.nom+"/ship_h.png";
			document.getElementById("ship").style.top = (Number(nbY) - ship.vitesse) + "px";
			ship.style.top = (Number(nbY) - ship.vitesse) + "px";
			posBateau = "haut";
			document.getElementById("ship").style.width = "68px";
			document.getElementById("ship").style.height = "158px";
		}
		
	}

  if (leftPressed) {
  	
  		if(parseInt(document.getElementById("ship").style.left) > ship.arretg){
			
				document.getElementById("ship").src = ship.nom+"/ship_g.png";
				document.getElementById("ship").style.left = (Number(nbX) - ship.vitesse) + "px";
				ship.style.left = (Number(nbX) - ship.vitesse) + "px";
				posBateau = "gauche";
				document.getElementById("ship").style.width = "158px";
				document.getElementById("ship").style.height = "68px";

		}
  	
  }
  if (rightPressed) {
  	
  	if(parseInt(document.getElementById("ship").style.left) < ship.arretd){
	
			document.getElementById("ship").src = ship.nom+"/ship_d.png";
			document.getElementById("ship").style.left = (Number(nbX) + ship.vitesse) + "px";
			ship.style.left = (Number(nbX) + ship.vitesse) + "px";
			posBateau = "droite";
			document.getElementById("ship").style.width = "158px";
			document.getElementById("ship").style.height = "68px";

	}
  
  }
 	}
  	
  	if(posBateau == "haut"){
	
  if (downPressed) {
  	
  		if(parseInt(document.getElementById("ship").style.top) < ship.arretb){
			
				document.getElementById("ship").src = ship.nom+"/ship_b.png";
				document.getElementById("ship").style.top = (Number(nbY) + ship.vitesse) + "px";
				ship.style.top = (Number(nbY) + ship.vitesse) + "px";
				posBateau = "bas";
				document.getElementById("ship").style.width = "68px";
				document.getElementById("ship").style.height = "158px";

	}
  }
  if (leftPressed) {
  	
  		if(parseInt(document.getElementById("ship").style.left) > ship.arretg){
			
				document.getElementById("ship").src = ship.nom+"/ship_g.png";
				document.getElementById("ship").style.left = (Number(nbX) - ship.vitesse) + "px";
				ship.style.left = (Number(nbX) - ship.vitesse) + "px";
				posBateau = "gauche";
				document.getElementById("ship").style.width = "158px";
				document.getElementById("ship").style.height = "68px";

		}
  	
  }
  if (rightPressed) {
  	
  	if(parseInt(document.getElementById("ship").style.left) < ship.arretd){
	
			document.getElementById("ship").src = ship.nom+"/ship_d.png";
			document.getElementById("ship").style.left = (Number(nbX) + ship.vitesse) + "px";
			ship.style.left = (Number(nbX) + ship.vitesse) + "px";
			posBateau = "droite";
			document.getElementById("ship").style.width = "158px";
			document.getElementById("ship").style.height = "68px";

	}
  
  }
}
  	
    	if(posBateau == "droite"){
    		
    		
    			if (upPressed) {		
	
		if(parseInt(document.getElementById("ship").style.top) > ship.arreth){
			
			document.getElementById("ship").src = ship.nom+"/ship_h.png";
			document.getElementById("ship").style.top = (Number(nbY) - ship.vitesse) + "px";
			ship.style.top = (Number(nbY) - ship.vitesse) + "px";
			posBateau = "haut";
			document.getElementById("ship").style.width = "68px";
			document.getElementById("ship").style.height = "158px";
		}
		
	}
	
  if (downPressed) {
  	
  		if(parseInt(document.getElementById("ship").style.top) < ship.arretb){
			
				document.getElementById("ship").src = ship.nom+"/ship_b.png";
				document.getElementById("ship").style.top = (Number(nbY) + ship.vitesse) + "px";
				ship.style.top = (Number(nbY) + ship.vitesse) + "px";
				posBateau = "bas";
				document.getElementById("ship").style.width = "68px";
				document.getElementById("ship").style.height = "158px";

	}
  }
  if (leftPressed) {
  	
  		if(parseInt(document.getElementById("ship").style.left) > ship.arretg){
			
				document.getElementById("ship").src = ship.nom+"/ship_g.png";
				document.getElementById("ship").style.left = (Number(nbX) - ship.vitesse) + "px";
				ship.style.left = (Number(nbX) - ship.vitesse) + "px";
				posBateau = "gauche";
				document.getElementById("ship").style.width = "158px";
				document.getElementById("ship").style.height = "68px";

		}
  	
  }
 }
  	
  if(posBateau == "gauche"){
  	
  	
  	
		if (upPressed) {		
	
		if(parseInt(document.getElementById("ship").style.top) > ship.arreth){
			
			document.getElementById("ship").src = ship.nom+"/ship_h.png";
			document.getElementById("ship").style.top = (Number(nbY) - ship.vitesse) + "px";
			ship.style.top = (Number(nbY) - ship.vitesse) + "px";
			posBateau = "haut";
			document.getElementById("ship").style.width = "68px";
			document.getElementById("ship").style.height = "158px";
		}
		
	}
	
  if (downPressed) {
  	
  		if(parseInt(document.getElementById("ship").style.top) < ship.arretb){
			
				document.getElementById("ship").src = ship.nom+"/ship_b.png";
				document.getElementById("ship").style.top = (Number(nbY) + ship.vitesse) + "px";
				ship.style.top = (Number(nbY) + ship.vitesse) + "px";
				posBateau = "bas";
				document.getElementById("ship").style.width = "68px";
				document.getElementById("ship").style.height = "158px";

	}
  }
  
  if (rightPressed) {
  	
  	if(parseInt(document.getElementById("ship").style.left) < ship.arretd){
	
			document.getElementById("ship").src = ship.nom+"/ship_d.png";
			document.getElementById("ship").style.left = (Number(nbX) + ship.vitesse) + "px";
			ship.style.left = (Number(nbX) + ship.vitesse) + "px";
			posBateau = "droite";
			document.getElementById("ship").style.width = "158px";
			document.getElementById("ship").style.height = "68px";

	}
  
  }
  	
  }
  	
  	
  }

  
  
  if(upPressed2 && rightPressed2){}
	else if(upPressed2 && leftPressed2){}
	else if(downPressed2 && rightPressed2){}
	else if(downPressed2 && leftPressed2){}
  
  
  //bateau2
  else if(!Collision2){
  
			if (upPressed2) {		
	
		if(parseInt(document.getElementById("ship2").style.top) > ship2.arreth){
			
			document.getElementById("ship2").src = ship2.nom+"/ship_h.png";
			document.getElementById("ship2").style.top = (Number(nbY2) - ship2.vitesse) + "px";
			ship2.style.top = (Number(nbY2) - ship2.vitesse) + "px";
			posBateau2 = "haut";
			document.getElementById("ship2").style.width = "68px";
			document.getElementById("ship2").style.height = "158px";

		}
		
	}
	
  if (downPressed2) {
  	
  		if(parseInt(document.getElementById("ship2").style.top) < ship2.arretb){
			
				document.getElementById("ship2").src = ship2.nom+"/ship_b.png";
				document.getElementById("ship2").style.top = (Number(nbY2) + ship2.vitesse) + "px";
				ship2.style.top = (Number(nbY2) + ship2.vitesse) + "px";
				posBateau2 = "bas";
				document.getElementById("ship2").style.width = "68px";
				document.getElementById("ship2").style.height = "158px";


	}
  }
  if (leftPressed2) {
  	
  		if(parseInt(document.getElementById("ship2").style.left) > ship2.arretg){
			
				document.getElementById("ship2").src = ship2.nom+"/ship_g.png";
				document.getElementById("ship2").style.left = (Number(nbX2) - ship2.vitesse) + "px";
				ship2.style.left = (Number(nbX2) - ship2.vitesse) + "px";
				posBateau2 = "gauche";
				document.getElementById("ship2").style.width = "158px";
				document.getElementById("ship2").style.height = "68px";


		}
  	
  }
  if (rightPressed2) {
  	
  	if(parseInt(document.getElementById("ship2").style.left) < ship2.arretd){
	
			document.getElementById("ship2").src = ship2.nom+"/ship_d.png";
			document.getElementById("ship2").style.left = (Number(nbX2) + ship2.vitesse) + "px";
			ship2.style.left = (Number(nbX2) + ship2.vitesse) + "px";
			posBateau2 = "droite";
			document.getElementById("ship2").style.width = "158px";
			document.getElementById("ship2").style.height = "68px";

	}
  
  }
}



else{
  	
  	
  	if(posBateau2 == "bas"){
  					if (upPressed2) {		
	
		if(parseInt(document.getElementById("ship2").style.top) > ship2.arreth){
			
			document.getElementById("ship2").src = ship2.nom+"/ship_h.png";
			document.getElementById("ship2").style.top = (Number(nbY2) - ship2.vitesse) + "px";
			ship2.style.top = (Number(nbY2) - ship2.vitesse) + "px";
			posBateau2 = "haut";
			document.getElementById("ship2").style.width = "68px";
			document.getElementById("ship2").style.height = "158px";

		}
		
	}

   if (leftPressed2) {
  	
  		if(parseInt(document.getElementById("ship2").style.left) > ship2.arretg){
			
				document.getElementById("ship2").src = ship2.nom+"/ship_g.png";
				document.getElementById("ship2").style.left = (Number(nbX2) - ship2.vitesse) + "px";
				ship2.style.left = (Number(nbX2) - ship2.vitesse) + "px";
				posBateau2 = "gauche";
				document.getElementById("ship2").style.width = "158px";
				document.getElementById("ship2").style.height = "68px";


		}
  	
  }
  if (rightPressed2) {
  	
  	if(parseInt(document.getElementById("ship2").style.left) < ship2.arretd){
	
			document.getElementById("ship2").src = ship2.nom+"/ship_d.png";
			document.getElementById("ship2").style.left = (Number(nbX2) + ship2.vitesse) + "px";
			ship2.style.left = (Number(nbX2) + ship2.vitesse) + "px";
			posBateau2 = "droite";
			document.getElementById("ship2").style.width = "158px";
			document.getElementById("ship2").style.height = "68px";

	}
  
  }
 	}
  	
  	if(posBateau2 == "haut"){
	
 if (downPressed2) {
  	
  		if(parseInt(document.getElementById("ship2").style.top) < ship2.arretb){
			
				document.getElementById("ship2").src = ship2.nom+"/ship_b.png";
				document.getElementById("ship2").style.top = (Number(nbY2) + ship2.vitesse) + "px";
				ship2.style.top = (Number(nbY2) + ship2.vitesse) + "px";
				posBateau2 = "bas";
				document.getElementById("ship2").style.width = "68px";
				document.getElementById("ship2").style.height = "158px";


	}
 }
  if (leftPressed2) {
  	
  		if(parseInt(document.getElementById("ship2").style.left) > ship2.arretg){
			
				document.getElementById("ship2").src = ship2.nom+"/ship_g.png";
				document.getElementById("ship2").style.left = (Number(nbX2) - ship2.vitesse) + "px";
				ship2.style.left = (Number(nbX2) - ship2.vitesse) + "px";
				posBateau2 = "gauche";
				document.getElementById("ship2").style.width = "158px";
				document.getElementById("ship2").style.height = "68px";


		}
  	
  }
  	}
 if (rightPressed2) {
  	
  	if(parseInt(document.getElementById("ship2").style.left) < ship2.arretd){
	
			document.getElementById("ship2").src = ship2.nom+"/ship_d.png";
			document.getElementById("ship2").style.left = (Number(nbX2) + ship2.vitesse) + "px";
			ship2.style.left = (Number(nbX2) + ship2.vitesse) + "px";
			posBateau2 = "droite";
			document.getElementById("ship2").style.width = "158px";
			document.getElementById("ship2").style.height = "68px";

	}
  
  }
  	
    if(posBateau2 == "droite"){
    		
    		if (upPressed2) {		
	
		if(parseInt(document.getElementById("ship2").style.top) > ship2.arreth){
			
			document.getElementById("ship2").src = ship2.nom+"/ship_h.png";
			document.getElementById("ship2").style.top = (Number(nbY2) - ship2.vitesse) + "px";
			ship2.style.top = (Number(nbY2) - ship2.vitesse) + "px";
			posBateau2 = "haut";
			document.getElementById("ship2").style.width = "68px";
			document.getElementById("ship2").style.height = "158px";

		}
		
	}
	
  if (downPressed2) {
  	
  		if(parseInt(document.getElementById("ship2").style.top) < ship2.arretb){
			
				document.getElementById("ship2").src = ship2.nom+"/ship_b.png";
				document.getElementById("ship2").style.top = (Number(nbY2) + ship2.vitesse) + "px";
				ship2.style.top = (Number(nbY2) + ship2.vitesse) + "px";
				posBateau2 = "bas";
				document.getElementById("ship2").style.width = "68px";
				document.getElementById("ship2").style.height = "158px";


	}
 }
  if (leftPressed2) {
  	
  		if(parseInt(document.getElementById("ship2").style.left) > ship2.arretg){
			
				document.getElementById("ship2").src = ship2.nom+"/ship_g.png";
				document.getElementById("ship2").style.left = (Number(nbX2) - ship2.vitesse) + "px";
				ship2.style.left = (Number(nbX2) - ship2.vitesse) + "px";
				posBateau2 = "gauche";
				document.getElementById("ship2").style.width = "158px";
				document.getElementById("ship2").style.height = "68px";


		}
  	
  }
 }
  	
  if(posBateau2 == "gauche"){
  	
  	
  	if (upPressed2) {		
	
		if(parseInt(document.getElementById("ship2").style.top) > ship2.arreth){
			
			document.getElementById("ship2").src = ship2.nom+"/ship_h.png";
			document.getElementById("ship2").style.top = (Number(nbY2) - ship2.vitesse) + "px";
			ship2.style.top = (Number(nbY2) - ship2.vitesse) + "px";
			posBateau2 = "haut";
			document.getElementById("ship2").style.width = "68px";
			document.getElementById("ship2").style.height = "158px";

		}
		
	}
	
 if (downPressed2) {
  	
  		if(parseInt(document.getElementById("ship2").style.top) < ship2.arretb){
			
				document.getElementById("ship2").src = ship2.nom+"/ship_b.png";
				document.getElementById("ship2").style.top = (Number(nbY2) + ship2.vitesse) + "px";
				ship2.style.top = (Number(nbY2) + ship2.vitesse) + "px";
				posBateau2 = "bas";
				document.getElementById("ship2").style.width = "68px";
				document.getElementById("ship2").style.height = "158px";


	}
 }
  
  if (rightPressed2) {
  	
  	if(parseInt(document.getElementById("ship2").style.left) < ship2.arretd){
	
			document.getElementById("ship2").src = ship2.nom+"/ship_d.png";
			document.getElementById("ship2").style.left = (Number(nbX2) + ship2.vitesse) + "px";
			ship2.style.left = (Number(nbX2) + ship2.vitesse) + "px";
			posBateau2 = "droite";
			document.getElementById("ship2").style.width = "158px";
			document.getElementById("ship2").style.height = "68px";

	}
  
  }
  	
  }
  	
  	
  }
  
}
