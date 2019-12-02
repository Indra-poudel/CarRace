function Game(parentElement) {
  var ObstaclesArr = [];
  this.posx = 0;
  this.score = 0;
  this.posy = 350;
  this.timer = 0;
  this.lane = 3;
  this.carIndex = 0;
  this.control = 0;
  this.repeat;
  this.dx = 1;
  this.element = null;
  this.ScoreElement = null;
  this.GameOverScreen = null;
  this.startScreen = null;
  this.restartbtn = null;
  this.startbtn = null;
  this.parentElement = parentElement;
  var that = this;
  // this.blastimg=null;
  // this.blastgif=null;
  this.init = function() {
    var PoliceCar = document.createElement("div");
    //   this.blastimg = document.createElement("img");
    //   this.blastimg.src = "./Images/after.gif";
    //   this.blastimg.classList.add("firebefor");
    this.ScoreElement = document.getElementById("score");
    this.GameOverScreen = document.getElementById("after-game-Over");
    this.startScreen = document.getElementById("starGame");
    this.restartbtn = document.getElementById("btn");
    this.startbtn = document.getElementById("btn-start");
    this.restartbtn.onclick = this.restart.bind(this);
    PoliceCar.classList.add("police-car");
    PoliceCar.style.top = this.posy + "px";
    PoliceCar.style.left = this.posx + "px";
    this.parentElement.appendChild(PoliceCar);
    // this.parentElement.appendChild(this.blastimg);
    this.element = PoliceCar;
    window.addEventListener("keydown", function(e) {
      this.key = e.keyCode;
      Game.control = this.key;
    });
    this.repeat = setInterval(this.update.bind(this), 1);
    return this;
  };
  this.start = function() {};
  this.restart = function() {
    this.reset();

  };
  this.blast = function() {};
  this.reset = function() {
    console.log("click");
    this.posx = 0;
    this.score = 0;
    this.posy = 350;
    this.timer = 0;
    this.lane = 3;
    this.carIndex = 0;
    this.control = 0;
    this.repeat;
    this.dx = 1;
    this.GameOverScreen.style.top = 600 + "px";
    this.element.style.top = this.posy + "px";
    this.element.style.left = this.posx + "px";
    this.ScoreElement.innerHTML = this.score;
    for (var i = 0; i < ObstaclesArr.length; i++) {
      document.getElementById(ObstaclesArr[i].uniqueId).remove();
    }
    this.element.remove();
    ObstaclesArr = [];
    new Game(Road).init();
  };
  this.update = function() {
    this.backgroundScroll();
    this.obstractionspwan();
    this.controller();
    this.draw();
    //  this.scoreUpdate();
  };

  this.obstractionspwan = function() {
    if (parseInt(this.timer) / 185 === 1) {
      var ob1 = new Obstacles(this.parentElement);
      ob1.Create();
      ObstaclesArr.push(ob1);
      this.timer = 0;
    }
    this.timer++;
  };
  this.draw = function() {
    for (var i = 0; i < ObstaclesArr.length; i++) {
      ObstaclesArr[i].move();

      if (ObstaclesArr[i].checkCollision(this) == true) {
        clearInterval(this.repeat);
        // this.blastimg.style.top=ObstaclesArr[i].y;
        // this.blastimg.style.left=ObstaclesArr[i].x;

        this.repeat = null;
        this.element.style.transform = " rotate(-80deg)";
        this.GameOverScreen.style.top = 0 + "px";
      }
      // this.GameOverScreen.style.left=0+'px';

      if (ObstaclesArr[i].scoreUpdate() == true) {
        this.score++;
        console.log("score", this.score);
        this.ScoreElement.innerHTML = this.score;
        document.getElementById("score2").innerHTML = this.score;
      }
      ObstaclesArr[i].delete();
    }
  };
  this.backgroundScroll = function() {
    this.parentElement.style["background-position-y"] = this.dx + "px";
    this.dx = this.dx + 1.5;
  };
  this.controller = function() {
    if (Game.control == 39 || Game.control == 68) {
      this.carIndex++;
      this.posx = this.getIndex() * 150;
      this.element.style.left = this.posx + "px";
    }
    if (Game.control == 37 || Game.control == 65) {
      this.carIndex--;
      this.posx = this.getIndex() * 150;
      this.element.style.left = this.posx + "px";
    }
    Game.control = 0;
  };

  this.getIndex = function() {
    var index = Math.abs(this.carIndex) % this.lane;
    return index;
  };

  function Obstacles(parentElement) {
    this.uniqueId = Math.abs(Math.random() * 1000).toString();
    this.y = -450;
    this.dx=0.01;
    this.parentElement = parentElement;
    this.x = Math.floor(Math.random() * 3) * 150;
    this.element = null;
    this.carimageindex = Math.abs(Math.floor(Math.random() * 6) + 1);

    this.Create = function() {
      var Obstacles = document.createElement("img");
      Obstacles.classList.add("car");
      Obstacles.id = this.uniqueId;
      Obstacles.src = "./Images/" + this.carimageindex + ".png";
      this.parentElement.appendChild(Obstacles);
      Obstacles.style.left = this.x + "px";
      this.element = Obstacles;
    };
    this.move = function() {
      console.log(this.dx);
      this.y = this.y+Math.exp(this.dx);
      this.dx=this.dx+0.005;
      this.element.style.top = this.y + "px";
    };
    this.delete = function() {
      if (this.y > 700) {
        document.getElementById(this.uniqueId).remove();
        ObstaclesArr.shift();
      }
    };
    this.checkCollision = function(PoliceCar) {
      var a = this.x - PoliceCar.posx;
      var b = PoliceCar.posy - this.y;
      var dis = Math.sqrt(a * a + b * b);
      if (dis < 150) {
        return true;
      } else {
        return false;
      }
    };
    this.scoreUpdate = function() {
      if (this.y>700) {
        return true;
      } else {
        return false;
      }
    };
  }
}
var Road = document.getElementById("road");
new Game(Road).init();
