counter = 0;
roadposition = -15400;
player = document.getElementById('owncar');
player.style.left = 150 + "px";
playerpos = 1;
iscrashed = false;
score = 0;
roadspeed = 1;
startgamevar = false;
opponentlist = document.getElementsByClassName("opponent");
bulletlist = document.getElementsByClassName("bullet");
maincontainer = document.getElementById("maincontainer");
isbulletonfire = false;
//setCookie(0);
checkCookie();
highscore = getCookie();


document.getElementById('scoreid').style.display = "block";
var previousScore = getcurrentscoreCookie();
if (previousScore != "") {
    document.getElementById('scoreid').style.display = "block";
    document.getElementById('scoreid').innerHTML = "Your Score :- " + previousScore;
   
    deleteScore();
} else {
    document.getElementById('scoreid').style.display = "none";
   
}
document.getElementById('highscoreID').innerHTML = "HIGHSCORE :- " + highscore;
document.getElementById('highscoreID').style.display = "block";

document.getElementById("maincontainer").style.display = "none";

startgame = function () {
   

   

    opponentlist1 = document.getElementsByClassName("opponent");
    for (var k = 0; k < opponentlist1.length; k++) {

        maincontainer.removeChild(opponentlist1[k]);
        //document.body.removeChild(opponentlist1[k]);
    }



    document.getElementById("menuscreen").style.display = "none";
    document.getElementById("maincontainer").style.display = "block";
    startgamevar = true;
    if (!iscrashed)
        e = setInterval(game, roadspeed);

    function game() {

        score++;
        var scorevar = document.getElementById('score');
        scorevar.innerHTML = score;

        var g = new Gameloop();
        roadposition += 1;
        if (roadposition < 1 && iscrashed == false) {
            g.moveroad(roadposition);
            g.moveopponent();
            g.detectCollision();

            var b = new Bullet();
            b.firebullet();

            if (counter >= 100) {
                counter = 0;
                g.makeopponent();
            }
        } else {

            if (score > highscore) {
                setCookie(score);

                document.getElementById('highscoreID').innerHTML = "HIGHSCORE :- " + getCookie();
                document.getElementById('highscoreID').style.display = "block";
            }
            document.getElementById('scoreid').innerHTML = "Your Current Score :- " + score;
            document.getElementById('scoreid').style.display = "block";
            setcurrentscoreCookie(score);

            location.reload();
           clearInterval(e);
           
        }



        counter++;


    }
};


//////////////for moving left and right position

document.onkeydown = function (e) {


    switch (e.keyCode) {
        case 37:
            {
                playerpos--;
                break;
            }

        case 39:
            {
                playerpos++;
                break;
            }
        case 38:
            {
                if (!iscrashed || isbulletonfire != false) {
                    isbulletonfire = true;
                    var bullet = new Bullet();
                    bullet.createBullet();
                    setTimeout(preventRepeatfire,1000);
                }
                break;
            }
    }

    function preventRepeatfire() {
        isbulletonfire = false;

    }

    if (playerpos <= 0) {
        playerpos = 0;
        player.style.left = 40 + "px";
    }
    else if (playerpos == 1) {

        player.style.left = 150 + "px";
    }
    else if (playerpos >= 2) {
        playerpos = 2;
        player.style.left = 245 + "px";
    }


};






function Gameloop() {
    this.x = 0;
    this.y = 0;

    var that = this; /////////bubbles bhanne function ma access garna ko laagi

    this.moveroad = function (roadposition) {
        var mainroad = document.getElementById("mainroad");
        mainroad.style.top = roadposition + "px";
    };

    this.makeopponent = function () {

        that.element = document.createElement('div');
        that.element.className = 'opponent';
        document.getElementById('maincontainer').appendChild(that.element);

        that.x = getRandomArbitrary(0, 3);
        if (that.x < 1)
            that.x = 40;
        else if (that.x >= 1 && that.x < 2) {
            that.x = 150;
        } else if (that.x >= 2 && that.x < 3) {
            that.x = 245;
        }
        that.y = 0;


        that.element.style.top = that.y + "px";
        that.element.style.left = that.x + "px";

    };

    this.moveopponent = function () {


        var opponentlist = document.getElementsByClassName('opponent');

        for (var i = 0; i < opponentlist.length; i++) {
            if (parseInt(opponentlist[i].style.top) > 700 || iscrashed) {
                document.getElementById('maincontainer').removeChild(opponentlist[i]);
            } else {
                opponentlist[i].style.top = parseInt(opponentlist[i].style.top) + 1 + "px";
            }


        }
       
    };
    this.detectCollision = function () {
        var opponentlist = document.getElementsByClassName('opponent');
        var player = document.getElementsByClassName('owncar');
        //  console.log(player[0].style.left.replace('px',''));
        for (var i = 0; i < opponentlist.length; i++) {
            if (parseInt(opponentlist[i].style.top) >= 466 && parseInt(opponentlist[i].style.top)<= 545 && opponentlist[i].style.left.replace('px', '') == player[0].style.left.replace('px', '')) {
                iscrashed = true;
                playAudio("explosion.ogg", 5);
                document.getElementById("menuscreen").style.display = "block";
                //alert("Crashed GAME OVER");
            }
        }


    };
    this.attack = function () {

    };

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;

    }

}




function Bullet() {
    this.x = 0;
    this.y = 0;
    this.interverId;
    this.element;
    var that = this; /////////bubbles bhanne function ma access garna ko laagi

    this.createBullet = function () {

        that.element = document.createElement('div');
        that.element.className = 'bullet';
        document.getElementById('maincontainer').appendChild(that.element);
        // console.log(getRandomArbitrary(1, 1000));


        if (playerpos == 0)
            that.x = 55;
        else if (playerpos == 1) {
            that.x = 165;
        } else if (playerpos == 2) {
            that.x = 260;
        }

        that.y = 475;
        that.element.style.top = that.y + "px";
        that.element.style.left = that.x + "px";

       
    }

    this.firebullet = function () {


        var bulletlist = document.getElementsByClassName('bullet');

        for (var i = 0; i < bulletlist.length; i++) {
            if (parseInt(bulletlist[i].style.top) < -10 || iscrashed) {
                document.getElementById('maincontainer').removeChild(bulletlist[i]);
            } else {
                bulletlist[i].style.top = parseInt(bulletlist[i].style.top) - 1 + "px";
            }
            getcollision();

        }
    }

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;

    }


    function getcollision() {

        // alert('');
        var opponentlist = document.getElementsByClassName("opponent");
        var bullet = document.getElementsByClassName("bullet");
        for (var i = 0; i < opponentlist.length; i++) {
            for (var j = 0; j < bullet.length; j++) {
                console.log(i + " " + j);
                if (parseInt(opponentlist[i].style.top) + 54 == parseInt(bullet[j].style.top) && parseInt(opponentlist[i].style.left) + 15 == parseInt(bullet[j].style.left)) {
                    //  alert(i);
                    document.getElementById('maincontainer').removeChild(opponentlist[i]);
                    document.getElementById('maincontainer').removeChild(bullet[j]);
                    score += 1000;
                    playAudio("explosion.ogg", 5);

                }
            }
        }

    }

}


function setCookie(score) {
    var d = new Date();
    d.setTime(d.getTime() + (1000 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = "highscore = " + score + "; " + expires;
}

function getCookie() {
    var name = "highscore" + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1)
            return c.substring(name.length, c.length);
    }
    return "";
}

function checkCookie() {
    var highscore = getCookie("highscore");
    if (highscore != "") {
      return true;
    } else {
       
        setCookie("highscore", 0, 10000);
        return false;
    }

}

function setcurrentscoreCookie(currentscore) {
    var d = new Date();
    d.setTime(d.getTime() + (1000 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = "currentscore = " + score + "; " + expires;
}

function getcurrentscoreCookie() {
    var name = "currentscore" + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1)
            return c.substring(name.length, c.length);
    }
    return "";
}

function deleteScore() {
    document.cookie = "currentscore=; expires=Thu, 01 Jan 1970 00:00:00 UTC"; 
}