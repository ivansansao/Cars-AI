/* 
  https://github.com/davenewt/p5-asteroids/blob/master/ship.js

  https://docs.pipz.com/central-de-ajuda/learning-center/guia-basico-de-markdown#open

  Colisão Line Line: https://editor.p5js.org/simontiger/sketches/S1kfupErZ

  Collide2D Methods: https://github.com/bmoren/p5.collide2D

  // To show some demo.
    car.update();
    cars.demo();
    car.show();   

    https://www.base64-image.de/

    [.WebGL-0x337c0274e300] GL_CONTEXT_LOST_KHR: Context has been lost.
    index.html:1 WebGL: CONTEXT_LOST_WEBGL: loseContext: context lost

    Rode um servidor facilmente com: python3 -m http.server
*/
let api = null;
let showDeadCars = false;
let showFunctionalities = false;
let roads = [];
// const startRoad = { i: 500, j: 65, value: 0 }; // linha, coluna, valor
let world = new World();
let crc32 = function (r) { for (var a, o = [], c = 0; c < 256; c++) { a = c; for (var f = 0; f < 8; f++)a = 1 & a ? 3988292384 ^ a >>> 1 : a >>> 1; o[c] = a } for (var n = -1, t = 0; t < r.length; t++)n = n >>> 8 ^ o[255 & (n ^ r.charCodeAt(t))]; return (-1 ^ n) >>> 0 };
let quantidade = 8;
let maxCar = 999;
let genetic = null;
let vivos = 0;
let runDemo = false;
let cars = [];
let carsCrcHistory = [];
let walls = [];
let ray;
let pista;
let colocacao = [];
let evolucao = [];
let nGeracao = 0;
let foo;
let showBackground = true;
let showWalls = false;
let showCarsDetais = true;
let showRanhuras = false;
let record = 0;
let carregarCarroSalvo = true;
let salvarMelhorCarro = true;
let timer = 0;
let timerOn = true;
let collideCars = false;
let showMousePoint = false;
let elitism = true;
let running = true;
let showInfoCar = false;
let showFlag = false;
let luzes = true;
let carId = 0;
let scoreboard = null;
let soundBrake;
let audio;
let engine;
let pg;
let globalMutations = [];

function preload() {
    // soundFormats('mp3', 'ogg');
    // soundBrake = loadSound('sound/crow.wav');
    // audio = new Audio('sound/sounds_engine.wav');
    engine = new EngineSound();

}

function setup() {

    createCanvas(windowWidth, windowHeight);

    pg = createGraphics(windowWidth, windowHeight);

    tf.setBackend('cpu');

    api = new Api();

    foo = new p5.Speech();
    foo.setVoice('Google português do Brasil');

    genetic = new Genetic();

    pista = new Pista();
    scoreboard = new Scoreboard();

    for (let i = 0; i < 8; i++) {
        walls.push(new Wall());
    }

    genetic.nextGeneration();

    clear()

}

function draw() {

    if (pista.spriteLoaded == false) {
        return;
    }

    if (timerOn) {
        timer++;
    }

    if (!world.trainigMode) {

        background(pista.backcolor);
        handleKeyIsDown();

        imageMode(CORNER);
        if (pista.spritesheet) {
            image(pista.spritesheet, 0, 0);
        }

        pista.show();
        image(pg, 0, 0);
        showCredits();

        if (world.showScoreboard) {
            scoreboard.update();
            scoreboard.show();
        }

    }

    const wallsAndCars = [...pista.walls];

    if (collideCars) {

        for (const car of cars) {

            if (!car.batido && abs(car.aliveTime) > 400) {

                const ptd = p5.Vector.fromAngle(car.heading + 90).mult(10).add(car.pos);
                const pte = p5.Vector.fromAngle(car.heading - 90).mult(10).add(car.pos);
                wallsAndCars.push({ a: ptd, b: pte, id: car.id });


                const pdd = p5.Vector.fromAngle(car.heading + 0.25).mult(34).add(car.pos);
                const pde = p5.Vector.fromAngle(car.heading - 0.25).mult(34).add(car.pos);
                wallsAndCars.push({ a: pdd, b: pde, id: car.id });

                wallsAndCars.push({ a: ptd, b: pdd, id: car.id });
                wallsAndCars.push({ a: pte, b: pde, id: car.id });

            }
        }
    }

    for (const car of cars) {

        if (!car.batido) {

            const carInputs = [];

            car.update();
            car.look(wallsAndCars);

            carInputs.push(car.gear);
            carInputs.push(car.speed);

            // for (let i = 0; i < 20; i++) {
            //     if (car.marca == 'c' || car.marca == 'X') {
            //         carInputs.push(car.getExternDistanceWall(i));
            //     } else {                    
            //         // carInputs.push(car.rays[i].savedDistance);
            //         carInputs.push(car.getExternDistanceWall(i));
            //     }
            // }

            carInputs.push(car.getExternDistanceWall(0));
            carInputs.push(car.getExternDistanceWall(1));
            carInputs.push(car.getExternDistanceWall(2));
            carInputs.push(car.getExternDistanceWall(3));
            carInputs.push(car.getExternDistanceWall(4));
            carInputs.push(car.getExternDistanceWall(5));

            // carInputs.push(0.0);
            // carInputs.push(0.0);
            // carInputs.push(0.0);
            // carInputs.push(0.0);
            // carInputs.push(0.0);
            // carInputs.push(0.0);
            // carInputs.push(0.0);
            // carInputs.push(0.0);
            // carInputs.push(0.0);

            carInputs.push(car.getExternDistanceWall(15));
            carInputs.push(car.getExternDistanceWall(16));
            carInputs.push(car.getExternDistanceWall(17));
            carInputs.push(car.getExternDistanceWall(18));
            carInputs.push(car.getExternDistanceWall(19));

            car.think(carInputs);
            car.verificaColisaoRanhura(pista.ranhuras);

            // pista.lapSensors[0].hit(car, car.pos.x, car.pos.y, car.ray);

            if (!world.trainigMode) {
                car.show();
            }


            // } else if (showDeadCars) {
            //     car.show();
        }

    }

    if (vivos < maxCar) {

        if (getFrameRate() > 59 || vivos < 1) {

            const perToEnd = 100 - (timer / pista.trackSize * 100)

            if (perToEnd > 50) {
                addMoreCar();
            }

        }
    }

    if (timer > pista.pistaTimeOut) {
        timer = 0;
        eliminarTodosCars();
    }

    if (vivos == 0) {
        timer = 0;
        genetic.nextGeneration();
    }

    if (genetic.melhor) {

        if (!world.trainigMode || (world.trainigMode && frameCount % 40 == 0)) {

            if (timer % 100 == 0) {
                if (showFlag) genetic.setFlag();
            }

            if (world.trainigMode) background(pista.backcolor);
            strokeWeight(1);
            stroke(50);
            fill(pista.textBackColor);
            textSize(16);
            const { f1, f2 } = cars[0].ia;
            const mapToKm = (genetic.melhor.km * 0.001).toFixed(3).replace(/\./g, ',');
            const percentComplete = 100 - (genetic.melhor.km / pista.trackSize * 100).toFixed(0);
            const txtBetter = `${genetic.melhor.lap} - ${mapToKm} km   ${genetic.melhor.lap ? '' : percentComplete + '%'}  ID: ${genetic.melhor.id}`;

            text(`Carros: ${vivos}. FC: ${frameCount} T: ${timer} / ${pista.pistaTimeOut} Pista: ${pista.selectedPista} G${nGeracao + 1} [ MEL: ${txtBetter} ] f1: ${f1} f2: ${f2}`, 10, 20);

        }

    }

    if (genetic.melhorCorrente && nGeracao > 0) {

        if (world.killOnFindBetter && genetic.melhor) {

            fill(0);
            text(`Corrente: ${genetic.melhorCorrente.km}-${genetic.melhor.ranhurasColetadas.length} Iguais ${genetic.melhorCorrente == genetic.melhor}`, 10, 35);

            if (genetic.melhorCorrente.marca != 'c') {
                text('!c', 2, 45)

                if (genetic.melhorCorrente != genetic.melhor) {
                    text('dif', 2, 55)
                    text('> 50', 2, 65)
                    if (genetic.melhorCorrente.km < genetic.melhor.km) {
                        text('C < M', 2, 75)
                        stopCreateNewCars();
                    }

                }
            }
        }

    }


    if (!world.trainigMode) {

        ShowMousePoint()

        if (world.showScoreboard) {
            scoreboard.update();
            scoreboard.show();
        }

    }


}

function ShowMousePoint() {
    if (showMousePoint) {

        const mx = Number(mouseX.toFixed(0));
        const my = Number(mouseY.toFixed(0));
        let est = undefined;
        if (roads[mx]) {
            est = roads[mx][my];
        }


        let px = mx;
        let py = my;

        px = (mx > (windowWidth / 2)) ? mx - 200 : mx + 30
        py = (my > (windowHeight / 2)) ? my - 20 : my + 30

        stroke(200)
        strokeWeight(0);
        fill(255);
        rect(px - 4, py - 20, 180, 28);
        fill(50, 50, 255);
        strokeWeight(0);
        textStyle('bold')
        text(`(${mouseX},${mouseY}) km: ${est}`, px, py);
        textStyle('normal')
        // text(`${mx}, ${my} (km: ${est})`, mx - 80, my);
    }
}

function addMoreCar() {

    if (genetic.melhor) {

        const melhor = genetic.getNextOfBetters();

        let child = new Car({ ...genetic.getData(), marca: 'm', parent: melhor.marca });
        child.ia.model.setWeights(melhor.ia.getCopiedWeights());
        if (frameCount % 5 == 0)
            child.mutate(Number(random(0.01, 0.6).toFixed(15)));
        else
            child.mutate(Number(random(0.01, 0.015).toFixed(15)), 6);

        // if (pista.selectedPista == 4) {
        //     if (random() > 0.5) {
        //         pista.localNascimento = createVector(400, 65);
        //         pista.anguloNascimento = radians(180);
        //     } else {
        //         car.marca = 'o'
        //         pista.localNascimento = createVector(1000, 847);
        //         pista.anguloNascimento = radians(0);
        //     }
        // }

        pista.addCar(child, 'Adição sob demanda');
        vivos++
    }
}


function showCredits() {

    if (pista.selectedPista == 4) {

        noStroke();
        fill(80, 80, 80);
        strokeWeight(4);
        textSize(28);
        text(`github.com/ivansansao`, 750, 62);

        fill(255);

        strokeWeight(4);
        textSize(20);
        text(`@TensorFlow`, 250, 510);

        text(`@Intelligence`, 400, 830);
        text(`@Artificial`, 750, 760);

    }

}

function zerarFrota() {
    cars = [];
}

function newCarId() {
    carId++;
    return carId;
}