function Game(parentElement) {
  //  this.angle=0;
  var ObstaclesArr = [];
  var missleArr=[];
  this.ammo=10;
  this.posx = 0;
  this.score = 0;
  this.posy = 350;
  this.timer = 0;
  this.lane = 3;
  this.carIndex = 0;
  this.control = 0;
  this.repeat;
  this.dx = 1;
  this.speed = 1;
  this.element = null;
  this.ScoreElement = null;
  this.GameOverScreen = null;
  this.startScreen = null;
  this.restartbtn = null;
  this.startbtn = null;
  this.parentElement = parentElement;
  var that = this;
  this.blastimg = null;
  this.blastgif = null;
  this.init = function() {
    var PoliceCar = document.createElement("div");
    this.blastimg = document.createElement("img");
  
  
    this.blastimg.src = "./Images/after.gif";
   // this.blastgif = document.createElement("img");
  //  this.blastgif.src = "./Images/before.gif";
    this.blastimg.classList.add("firebefor");
  //  this.blastgif.classList.add("firebefor");
  
    this.ScoreElement = document.getElementById("score");
    this.GameOverScreen = document.getElementById("after-game-Over");
  //  this.startScreen = document.getElementById("starGame");
    this.restartbtn = document.getElementById("btn");
   // this.startbtn = document.getElementById("btn-start");
    this.restartbtn.onclick = this.restart.bind(this);
    PoliceCar.classList.add("police-car");
    PoliceCar.style.top = this.posy + "px";
    PoliceCar.style.left = this.posx + "px";
    this.parentElement.appendChild(PoliceCar);
     this.parentElement.appendChild(this.blastimg);
    // this.parentElement.appendChild(this.missle);
    this.element = PoliceCar;
    window.addEventListener("keydown", function(e) {
      this.key = e.keyCode;
      Game.control = this.key;
      this.console.log(this.key);
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
   
    this.posx = 0;
    this.score = 0;
    this.posy = 350;
    this.timer = 0;
    this.lane = 3;
    this.carIndex = 0;
    this.control = 0;
    this.speed = 0;
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
    this.speed++;
  };

  this.obstractionspwan = function() {
    if (parseInt(this.timer) / 185 === 1) {
      //  this.element.style.transform = " rotate(0deg)";
      var ob1 = new Obstacles(this.parentElement);
      ob1.Create();
      ObstaclesArr.push(ob1);
      this.timer = 0;
    }
    this.timer++;
  };
  this.draw = function() {
    for (var i = 0; i < ObstaclesArr.length; i++) {
      ObstaclesArr[i].move(this.speed);

      if (ObstaclesArr[i].checkCollision(this) == true) {
        this.blastimg.style.top = ObstaclesArr[i].y + 50 + "px";
        this.blastimg.style.left = ObstaclesArr[i].x - 20 + "px";
        clearInterval(this.repeat);

        // this.repeat = null;
        this.element.style.transform = " rotate(-80deg)";
      var interval3=  setInterval(function()
      {
        this.GameOverScreen.style.top = 0 + "px";
        this.blastimg.remove();
        clearInterval(interval3);

      }.bind(this),1000);
         
      }
      // this.GameOverScreen.style.left=0+'px';

      if (ObstaclesArr[i].scoreUpdate() == true) {
        this.score++;
     
        this.ScoreElement.innerHTML = this.score;
        document.getElementById("score2").innerHTML = this.score;
      }
      ObstaclesArr[i].delete();
    }
  };
  this.backgroundScroll = function() {
    this.parentElement.style["background-position-y"] = this.dx + "px";
    this.dx = this.dx + 1.5;
    // if(this.dx>600)
    // {
    //   this.dx=40;
    // }
  };
  this.controller = function() {
    if (Game.control == 39 || Game.control == 68) {
      this.carIndex++;
      this.posx = this.getIndex() * 200;
      this.element.style.left = this.posx + "px";
      this.element.style.transform = " rotate(+20deg)";

      var interval1 = setInterval(
        function() {
          this.element.style.transform = " rotate(0deg)";
          clearInterval(interval1);
        }.bind(this),
        250
      );
    }
    if(Game.control==38)
    {
     var mis1=  new missile(this.parentElement);
     missleArr.push(mis1);
    // this.fire();
    }
    if (Game.control == 37 || Game.control == 65) {
      this.carIndex--;
      this.posx = this.getIndex() * 200;
      this.element.style.left = this.posx + "px";
      this.element.style.transform = " rotate(-20deg)";
      var interval2 = setInterval(
        function() {
          this.element.style.transform = " rotate(0deg)";
          clearInterval(interval2);
        }.bind(this),
        250
      );
    }
    Game.control = 0;
  };

  this.fire=function()
  {
    if(missleArr.length>0)
    {
    for(var i=0;i< missleArr.length;i++)
    {
      missleArr[i].mcreate();
      missileArr[i].move();
    }
  }
  };
  this.getIndex = function() {
    var index = Math.abs(this.carIndex) % this.lane;
    return index;
  };

  function missile(parentElement)
  {
    this.mx;
    this.my;
    this.muniqueId = Math.abs(Math.random() * 1000).toString();
    this.parentElement = parentElement;
    this.dx=0.03;
    this.element=null;

    this.mcreate=function(PoliceCar)
    {
      var missle = document.createElement("img");
      missle.classList.add("missle");
      missle.id = this.uniqueId;
      missle.src = "./Images/missile.png";
      this.parentElement.appendChild(missle);
     missle.style.left = PoliceCar.posx + "px";
     missle.style.top = PoliceCar.posy + "px";
      this.element = missle;
    }
    this.move = function(speed) {
    
      this.y = this.y - Math.exp(this.dx);
      this.dx = this.dx + 0.005;
      this.element.style.top = this.y + "px";
    };
    this.checkCollision = function(Obsct) {
      var a = this.x - Obsct.posx;
      var b = Obsct.posy - this.y;
      var dis = Math.sqrt(a * a + b * b);
      if (dis < 200) {
        return true;
      } else {
        return false;
      }
    };

  }


  function Obstacles(parentElement) {
    this.uniqueId = Math.abs(Math.random() * 1000).toString();
    this.y = -450;
    this.dx = 0.01;
    this.parentElement = parentElement;
    this.x = Math.floor(Math.random() * 3) * 200;
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
    this.move = function(speed) {
    
      this.y = this.y + Math.exp(this.dx);
      this.dx = this.dx + 0.005;
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
      if (dis < 200) {
        return true;
      } else {
        return false;
      }
    };
    this.scoreUpdate = function() {
      if (this.y > 700) {
        return true;
      } else {
        return false;
      }
    };
  }
}
var Road = document.getElementById("road");
new Game(Road).init();
