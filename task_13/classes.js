// 13) Классы

class Shape {                                    // Классы объявляются с помощью ключевого слова class
    constructor() {
        this.type = 'Shape';                     // Статичное свойство присваивается в конструкторе
    }

    getArea() {
        return 0;
    }

    getPerimeter() {
        return 0;
    }
}

class Rectangle extends Shape {                  // Классы могут наследовать друг от друга с помощью ключевого слова extends
    constructor(width, height) {                 // Для создания прямоугольника можно передать в конструктор его ширину и высоту (либо эти значения можно задать внутри конструктора)
        super();                                 // При помощи super() вызывается конструктор родительского класса
        this.name = 'Rectangle';
        this.width = width;
        this.height = height;
    }

    getPerimeter() {
        const perimeter = 2 * (this.width + this.height); 
        return perimeter;
    }

    getArea() {
        const area = this.width * this.height;   // стандартная формула для вычисления площади прямоугольника
        return area;                            
    }
}
                                                 // То же самое можно сделать для других фигур
class Circle extends Shape {
    constructor(radius) {
        super();
        this.name = 'Circle';
        this.radius = radius;
    }

    getPerimeter() {
        return 2 * Math.PI * this.radius;
    }

    getArea() {
        return Math.PI * this.radius ** 2;
    }
}

class Triangle extends Shape {
    constructor(a, b, c) {
        super();
        this.name = 'Triangle';
        this.a = a;
        this.b = b;
        this.c = c;
    }

    getPerimeter() {
        return this.a + this.b + this.c;
    }

    getArea() {
        const p = this.getPerimeter() / 2;
        return Math.sqrt(p * (p - this.a) * (p - this.b) * (p - this.c));
    }
}

// Создание экземпляра классов с помощью ключевого слова new и передачей в конструктор необходимых значений
const rectangle = new Rectangle(10, 20);          
const circle = new Circle(10);                    
const triangle = new Triangle(10, 20, 30);

console.log(rectangle.type) // Наследует тип 'Shape'
console.log(rectangle.name) // Статичное свойство
console.log(rectangle.getArea()) // Метод