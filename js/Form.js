class Form {
  constructor() {
      this.heading = createElement("h1");
      this.greeting = createElement("h2");
      this.box = createInput("Name");
      this.button = createButton("play");
      this.directions1 = createElement("h2");
      this.directions2 = createElement("h2");
  }

  hide() {
      this.heading.hide();
      this.greeting.hide();
      this.box.hide();
      this.button.hide();
      this.directions1.hide();
      this.directions2.hide();
  }


  display() {
     // background(img);

      this.heading.html("Road Rush");
      //this.heading.colour(30, 0, 0);
      this.heading.position(displayWidth / 2, 0);
      this.directions1.html("press 'UP' and 'DOWN' arrow keys to move forward and backward");
      //this.heading.position(displayWidth / 2 - 40, 0);
      this.directions2.html("press 'LEFT' and 'RIGHT' arrow keys to move sideways");
      //this.heading.position(displayWidth / 2 , 10);
      
      this.box.position(displayWidth / 2 - 40, displayHeight / 2 - 200);
      this.button.position(displayWidth / 2 + 30, displayHeight / 2 - 100);

      this.button.mousePressed(() => {
          this.box.hide();
          this.button.hide();

          player.name = this.box.value();
          playerCount += 1;

          player.index = playerCount;

          player.updatePlayerRecord();

          player.updateCount(playerCount);

          this.greeting.html("Greetings, " + player.name);
          this.greeting.position(displayWidth / 2 - 70, displayHeight / 4)

      })

  }
}