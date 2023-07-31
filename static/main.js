let scoreDIV = document.querySelector(".div__score");

let score = 0;
let attemps = 0;
let nMoves = 0;
let collectionBalls = [];

class Base {
  constructor(width, height, color, speed) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.speed = speed;
    this.base = document.getElementsByClassName("base")[0];

    this.baseCoordinates = this.base.getBoundingClientRect()
  }
  moveRight() {
    let coordinates = this.base.getBoundingClientRect()

    let baseWidth = parseInt((this.width).replace("px", ""))
    let HEIGHT = window.innerHeight;
    let WIDTH = window.innerWidth;

    if (coordinates.x + baseWidth < WIDTH - 20) {
        this.base.style.left = coordinates.x + this.speed + "px";
      }
  
      
    }

    moveLeft() {

        let coordinates = this.base.getBoundingClientRect()

        let baseWidth = parseInt((this.width).replace("px", ""))
        let HEIGHT = window.innerHeight;
        let WIDTH = window.innerWidth;
    
        if (coordinates.x > 20) {
            this.base.style.left = coordinates.x - this.speed + "px";
          }
      
       
        

    }
  createBase() {
    let base = document.getElementsByClassName("base")[0];
    base.style.width = this.width;
    base.style.height = this.height;
    base.style.backgroundColor = this.color;
    base.style.position = "absolute"
    base.style.bottom = "100px"

    // Agregar el elemento <div> al cuerpo del documento
    document.body.appendChild(base);


  }
}

class Ball {
  constructor(base) {
    this.element = document.createElement("DIV");

    this.element.classList.add("ball")
    this.x = 0;
    this.y = 0;
    this.hasNewBall = false;
    this.xDirection = 1;
    this.yDirection = 1;
    this.speed = 5;
    this.base = base;
    document.body.appendChild(this.element)
  }

  move() {
    this.x += this.xDirection * this.speed;
    this.y += this.yDirection * this.speed;

    const HEIGHT = window.innerHeight;
    const WIDTH = window.innerWidth;

    const ballHeight = this.element.offsetHeight;
    const ballWidth = this.element.offsetWidth;

    const baseCoordinates = this.base.base.getBoundingClientRect();

    if (this.x + ballWidth >= WIDTH || this.x <= 0) {
      this.xDirection = -this.xDirection; // Cambiar la dirección horizontal
    }

    if (this.y + ballHeight <= 50) {
      this.yDirection *= -1
    }

    if (Math.round((this.y + ballHeight)/5*5) == Math.round(baseCoordinates.y/5)*5 + 10 && this.x >= baseCoordinates.x  && (this.x + ballWidth <= baseCoordinates.x + this.base.base.offsetWidth )) {
      score += 10;
      nMoves += 1;
     
      console.log(nMoves)

      if (nMoves == 3){
    this.speed += 1
    nMoves = 0
        
      }
      console.log(this.speed)

      this.yDirection = -this.yDirection; // Cambiar la dirección vertical si la pelota toca la parte superior de la base
    }

    if (this.y + ballHeight >= HEIGHT) {

    
   
     this.speed = 5
      attemps += 1;
      score = 0;
      nMoves = 0;
      collectionBalls = [];
      this.y = 0; // Reiniciar la posición de la pelota en la parte superior
      this.yDirection = 1; // Restaurar la dirección vertical hacia abajo
      alert("Game Over")
    }

    scoreDIV.innerHTML = `Score:  ${score} <br> Attemps: ${attemps}`;

    this.element.style.left = this.x + "px";
    this.element.style.top = this.y + "px";

    requestAnimationFrame(() => this.move());
  }
}

const miBase = new Base("400px", "20px", "blue", 65);
miBase.createBase();

document.addEventListener("keydown", (k) => {

    if (k.key == "ArrowRight") {
   miBase.moveRight()
    }

    else if (k.key == "ArrowLeft") {
    miBase.moveLeft()
    }
  })

redBall = new Ball(miBase);
redBall.move();
;

