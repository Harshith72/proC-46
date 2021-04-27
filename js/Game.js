class Game {
    constructor() {

    }

    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        });
    }

    updateState(state) {
        database.ref('/').update({
            gameState: state
        });
    }

    async start() {
        if (gameState == 0) {
            player = new Player();

            var playerCountRef = await database.ref('playerCount').once("value");
            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();

            }

            background(img);
            form = new Form();
            form.display();
        }

        car1 = createSprite(100, 200);
        car1.addImage("car1Img", car1Img);
        car2 = createSprite(300, 200);
        car2.addImage("car2Img", car2Img);
        for (var i = 0; i < 5, i++;) {
            distracter1 = createSprite(random(displayWidth - 40), random(displayHeight - 60));
            distracter1.lifetime = 100;
            distracter1.addImage("distracter1Img", distracter1Img);
            distracter2 = createSprite(100, 100);
            distracter2.lifetime = 100;
            distracter2.addImage("distracter2Img", distracter2Img);
        }

        cars = [car1, car2];
        // distracters = [distracter1, distracter2];
    }
    play() {
        form.hide();

        Player.getPlayerInfo();
        player.getCarsAtFinish();

        if (allPlayers !== undefined) {

            background(rgb(198, 135, 103));
            image(roadImg, 0, - displayHeight * 8, displayWidth, displayHeight * 10);

            var index = 0;
            var x = 800;
            var y;


            for (var plr in allPlayers) {

                index = index + 1;

                x = (x + 100) - allPlayers[plr].side;

                y = displayHeight - allPlayers[plr].distance;

                cars[index - 1].x = x;
                cars[index - 1].y = y;

                if (index === player.index) {
                    cars[index - 1].shapeColor = "red";
                    camera.position.x = displayWidth / 2;
                    camera.position.y = cars[index - 1].y;
                } else {
                    cars[index - 1].shapeColor = "black";
                }

            }
        }

        if (keyIsDown(UP_ARROW) && player.index !== null) {
            player.distance += 100;
            player.updatePlayerRecord();
        }

        if (keyIsDown(DOWN_ARROW) && player.index !== null) {
            player.distance -= 25;
            player.updatePlayerRecord();
        }

        if (keyIsDown(LEFT_ARROW) && player.index !== null) {
            player.side += 10;
            player.updatePlayerRecord();
        }

        if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
            player.side -= 10;
            player.updatePlayerRecord();
        }

        if (player.side <= -1300) {
            player.side += 10;
            player.updatePlayerRecord();
        }
        if (player.side >= 400) {
            player.side -= 10;
            player.updatePlayerRecord();
        }


        if (player.distance == 9400) {
            player.rank += 1;
            Player.updateCarsAtFinish(player.rank);
            player.updatePlayerRecord();
        }

        drawSprites();
    }

    finish() {

        form.hide();
        Player.getPlayerInfo();
        background("white");
        textSize(50);
        fill("red");
        text('LEADERBOARD', 800, 100)
        textSize(30);
        fill("green");

        var ref = database.ref('players');
        ref.on('value', gotData, errData);


    }
}