class User {
  constructor(name) {
    this.name = name

    setTimeout(this.greetNormal, 3000)
    setTimeout(this.greetArrow, 3000)
  }

  greetNormal() {
    console.log('hello ' + this.name)
  }

  greetArrow = () => {
    console.log('hello ' + this.name)
  };
}
