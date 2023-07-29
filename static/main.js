class Base {
    constructor(width, height, color, speed) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = speed;
        this.base =  document.getElementsByClassName("base")[0];
    }

    createBase() {
        let base = document.getElementsByClassName("base")[0];
        base.style.width = this.width;
        base.style.height = this.height;
        base.style.backgroundColor = this.color;
        base.style.position = "absolute"
        base.style.bottom = "20%"
      

        // Agregar el elemento <div> al cuerpo del documento
        document.body.appendChild(base);

        
        document.addEventListener("keydown", (k) => {
            var coordinates = base.getBoundingClientRect()
        
            let baseWidth = parseInt((this.width).replace("px", ""))
            let HEIGHT = window.innerHeight;
            let width = window.innerWidth;
            if (k.key == "ArrowRight" && (coordinates.x + baseWidth) < width -50 ) {

                base.style.left = coordinates.x +  this.speed + "px"
              
            }


            if (k.key == "ArrowLeft" && (coordinates.x > 20)) {

                base.style.left = (coordinates.x - this.speed) + "px"
              
            }
        })
    }}


// JavaScript: Definir la clase Ball que representa la pelota

class Ball {
    constructor(base) {
        this.element = document.getElementById("ball");
        this.x = 0;
        this.y = 0;
        this.xDirection = 1;
        this.yDirection = 1;
        this.speed = 4;
        this.base = base;
        
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

        if (this.y + ballHeight >= baseCoordinates.y && this.y + ballHeight <= baseCoordinates.y + this.yDirection * this.speed && this.x + ballWidth >= baseCoordinates.x && this.x <= baseCoordinates.x + this.base.width) {
            this.yDirection = -this.yDirection; // Cambiar la dirección vertical si la pelota toca la parte superior de la base
        }

        // Verificar si la pelota ha sobrepasado la base (parte inferior)
        if (this.y + ballHeight >= HEIGHT) {
            alert("Has perdido el juego");
            this.y = 0; // Reiniciar la posición de la pelota en la parte superior
            this.yDirection = 1; // Restaurar la dirección vertical hacia abajo
        }

        // Actualizar la posición de la pelota
        this.element.style.left = this.x + "px";
        this.element.style.top = this.y + "px";

        // Repetir la animación con requestAnimationFrame
        requestAnimationFrame(() => this.move());
    }
}

    



// Crear una instancia de la clase Base
const miBase = new Base("200px", "50px", "blue", 50);

// Llamar al método createBase() para crear el elemento <div> y agregarlo al cuerpo del documento
miBase.createBase();


redBall= new Ball(miBase);
redBall.move()


