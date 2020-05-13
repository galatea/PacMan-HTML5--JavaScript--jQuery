
function playAudio() {
	var y = document.getElementById("halal");

	y.play();
}
var ghostMove;

var ghostMove2;
function ccontinue(){
	ghost.x = 1;
	ghost.y = 8;
	ghost2.x = 8;
	ghost2.y = 1;
	pacman.x = 1;
	pacman.y = 1;
	betoltPacMan();
	betoltSzellem();

	generalMap();

}


	map = [  //ha csak ez vak, akkor viszont pacman nem mozog, csak a szellem
		[1,1,1,1,1,1,1,1,1,1,1,1,1], 
		[1,3,2,2,2,2,1,2,2,2,2,2,1], 
		[1,2,2,1,1,2,1,2,1,1,2,2,1], 
		[1,2,1,2,2,2,2,2,2,2,1,2,1], 
		[1,2,2,2,1,1,1,1,1,2,2,2,1], 
		[1,2,1,2,2,2,2,2,2,2,1,2,1], 
		[1,2,1,1,1,2,1,2,1,1,1,2,1], 
		[1,2,2,2,1,2,1,2,2,2,2,2,1], 
		[1,2,1,2,1,2,1,2,2,1,2,2,1], 
        [1,2,2,2,2,2,1,2,2,1,2,7,1], 
		[1,1,1,1,1,1,1,1,1,1,1,1,1]
	];
	let point=0;
	var elet = 3;

	function eletminusz(){
		if(elet >1){
			playAudio();//meghalas zene
		elet--;
		document.getElementById("elet").innerHTML = elet;
		ccontinue();
		} else {
			jatekVege();
		}

	}


function jatekVege(){
	futMeg = false;
	console.log("VEGEZTEL")
	alert("MEGHALTÁL! Kattints az ELKÜLDÉS gombra!");
	looser="MEGHALTÁL! KATTINTS AZ ELKÜLDÉSRE!"
	clearInterval(vege);
	clearInterval(nyertel);
clearInterval(ghostMove);
clearInterval(ghostMove2);

	document.getElementById("vege").innerHTML = looser;
}

	function betoltSzellem() {
	document.getElementById('ghost').style.top = ghost.y * 50 + 'px';
	document.getElementById('ghost').style.left = ghost.x * 50 + 'px';
	}
	function betoltSzellem2() {
		document.getElementById('ghost2').style.top = ghost2.y * 50 + 'px';
		document.getElementById('ghost2').style.left = ghost2.x * 50 + 'px';
		}

	///SCOREBOARD
	

	function start() {
		point=0;
		elet=3;

		document.getElementById("elet").innerHTML = elet;
		document.getElementById("myText").innerHTML = point;

			let ujgame="Uj jatekot kezdtel!!";
			document.getElementById("vege").innerHTML = ujgame;

		

		pacman.x = 1;
		pacman.y = 1;

		ghost.x = 1;
		ghost.y = 8;
		ghost2.x = 8;
		ghost2.y = 1;
		
		futMeg = true;
		clearInterval(ghostMove);  //különben gyorsulna halálonként
		 ghostMove = setInterval(function () { //Lent le van egy AI programozva. 0.5s időközönként ez meghívodik, ekkora szellem lép, szellem betolt.

			szellemMozgas();
			szellemMozgas2();

			betoltSzellem();
			betoltSzellem2();


		}, 500);

		 vege = setInterval(function () {   //0.1s időközönként megnézi, hogy szellemek találkoztak e
			if (pacman.y == ghost.y && pacman.x == ghost.x ||pacman.y == ghost2.y && pacman.x == ghost2.x ) {
				
			eletminusz();
			}
			if (!futMeg) {
				clearInterval(ghostMove);
				clearInterval(ghostMove2);

			}
		}, 100);
		 nyertel = setInterval(function () {
			if(point==72){  //72 coin utan win :)

			//ellenőrzi 0.1s időközönként, hogy van e már 64 koinod 
			win();
				}
		}, 100);

		function win(){

			futMeg = false;
			console.log("NYERTEL")
			let looser = "NYERTEL!!!!!!";
			alert("NYERTÉL! Kattints az ELKÜLDÉS gombra!");
			document.getElementById("vege").innerHTML = looser;
			clearInterval(vege);
			clearInterval(ghostMove2);
			
			clearInterval(nyertel);
		
		
		}
		

		score = 0;

		betoltPacMan();
		betoltSzellem();
		betoltSzellem2();

	}


    function points() {
		var y = document.getElementById("kaja");

		y.loop = false;
		y.play();
        point++;
        document.getElementById("myText").innerHTML = point;
        console.log(point)
	}
	function pointsN() {
		
		var k = document.getElementById("gyumi");

		k.loop = false;
	 k.play();
        point=point+5;
        document.getElementById("myText").innerHTML = point;
        console.log(point)
    }

	var el = document.getElementById('world');
	
	document.getElementById('pacman').style.display = 'block'; //ennek sincs ertelme	

	function generalMap(){
		el.innerHTML = '';  //ha ez nincs a map vegtelen generalodikxd
		for(var y = 0; y < map.length ; y = y + 1) {
			for(var x = 0; x < map[y].length ; x = x + 1) {		
				if (map[y][x] === 1) {
					el.innerHTML += "<div class='wall'></div>";
				}
				else if (map[y][x] === 2) {
					el.innerHTML += "<div class='coin'></div>";
				}
				else if (map[y][x] === 3) {
					el.innerHTML += "<div class='ground'></div>";
				}
				else if (map[y][x] === 7) {
					el.innerHTML += "<div class='cherry'></div>";
				}

			}
			el.innerHTML += "<br>";  //ez nincs akkor nincsenek uj sorok
		}
		console.log(map)
	}
	

	generalMap(); //indíás előtt már legyen map
	var futMeg = true;

	function betoltPacMan() { 
		document.getElementById('pacman').style.top = pacman.y * 50 + 'px';
		document.getElementById('pacman').style.left = pacman.x * 50 + 'px';
	}
	document.onkeydown = function (e) {

		if (!futMeg) {
			return false;
		}

		if (e.keyCode == 37) {
			if (map[pacman.y][pacman.x - 1] !== 1) {
				pacman.x--;
			}
		} else if (e.keyCode == 38) {
			if (map[pacman.y - 1][pacman.x] !== 1) {
				pacman.y--;
			}
		} else if (e.keyCode == 39) {
			if (map[pacman.y][pacman.x + 1] !== 1) {
				pacman.x++;
			}
		} else if (e.keyCode == 40) {
			if (map[pacman.y + 1][pacman.x] !== 1) {
				pacman.y++;
			}
		}



		if (map[pacman.y][pacman.x] === 2) {
			map[pacman.y][pacman.x] = 3;
			points()
			console.log(point)
			generalMap(); //lepesenkent ujrageneral, nem csak időnkent, mikor a szellem mozog. Igy nem lesz laggos..
		}
		if (map[pacman.y][pacman.x] === 7) {
			map[pacman.y][pacman.x] = 3;
			pointsN()

			console.log(point)
			generalMap();
		}

		betoltPacMan();  //lepesenkent ujratölti az adott pozíciora pacmant... LEP (tablazat frissül) utána betölti az adott helyre.
	}


	function szellemMozgas() {
		console.log("meghivva a ghost x:"+ghost.x + " y: "+ ghost.y)

		if ( map[ghost.y - 1][ghost.x] !== 1) {
				ghost.y--;
				console.log("fel")
			} else if (map[ghost.y][ghost.x + 1] !== 1) {
				ghost.x++;
				console.log("jobbra")

			} else if (map[ghost.y + 1][ghost.x] !== 1) {
				ghost.y++;
				console.log("le")

			} else if (map[ghost.y][ghost.x - 1] !== 1) {
				ghost.x--;
				console.log("balra")

			}

	}
	function szellemMozgas2() {
		console.log("meghivva a ghost x:"+ghost2.x + " y: "+ ghost2.y)

		
		if ( map[ghost2.y - 1][ghost2.x] !== 1) {
				ghost2.y--;
				console.log("fel")
			} else if (map[ghost2.y][ghost2.x + 1] !== 1) {
				ghost2.x++;
				console.log("jobbra")
			} else if (map[ghost2.y + 1][ghost2.x] !== 1) {
				ghost2.y++;
				console.log("le")
			} else if (map[ghost2.y][ghost2.x - 1] !== 1) {
				ghost2.x--;
				console.log("balra")

			}
			console.log(map)

	}
	//Nev felvitele
	var name1;
	function othername() {
		name1 = document.getElementById("userInput").value;
		console.log(name1)
		console.log(point)
		const player = {name: name1, score: point};
		localStorage.setItem(player.name, JSON.stringify(player));
		console.log(player)

	}


//TOP10 KILISTAZAS

	function topLista() {
		$("button").click(function () {  //elakartam tüntetni, de off nem sikerült
			$("button").attr("disabled", true).delay(2000).attr("disabled", false);
		  });
        var adat = [];
        for (var i = 0; i < localStorage.length; i++) {
			var key = localStorage.key(i);

			adat[i] = JSON.parse(localStorage.getItem(key))
			console.log(adat[i].name + " " + adat[i].score)
        }
        adat.sort(function (a, b) {
            return b.score - a.score;
        });
        // a 10 legtobb pontot elert jatekost jelezzuk ki a listan
        for (let act_data of adat.keys()) {
            if (act_data < 10) {
                $('#list').append("Név: "+adat[act_data].name + ' - ' + " Pont: "+adat[act_data].score + '<br><hr>');
            }
        }
    }



