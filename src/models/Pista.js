// https://www.base64-image.de/

class Pista {

    constructor() {

        this.carsOnStart = 0
        this.addCarsDynamically = true
        this.maxMutations = 2;
        this.waveFronted = false;
        this.startRoad = { i: 0, j: 0, value: 0 };
        this.corDaPista = { r: 224, g: 225, b: 243 };
        this.walls = [];
        this.showWalls = true;
        this.ranhuras = [];
        this.selectedPista = 4;
        this.spritesheet = null;
        this.spriteRip = null;
        this.localNascimento = createVector(0, 0);
        this.anguloNascimento = radians(180);
        this.carMajorDistance = 0;
        this.recordCar = new Car({})
        this.recordFlag = new Flag();
        this.population = 25;
        this.timeOutStopped = 100;
        this.backcolor = [68, 170, 0];

        this.lapSensors = [];
        this.lapSensors.push(new LapSensor('startend', 0, 0, this.onHitSensor))
        this.getSpriteFundo();
        this.pistaTimeOut = 20000;
        this.mutationCounter = 0;
        this.trackSize = 0;

        this.textBackColor = [255, 255, 255];
        this.spriteLoaded = false;

        this.make();

    }

    addCar(car, comment = '') {

        if (!car.isParent()) {
            const crc = crc32(car.showWeights(true))
            if (carsCrcHistory.includes(crc)) {
                // console.log(`Carro marca ${car.marca} CRC ${crc} já correu! ${comment}`);
                return
            } else {
                carsCrcHistory.push(crc);
            }
        }
        car.setColor()
        cars.unshift(car);
        vivos = cars.reduce((a, c) => a += c.batido ? 0 : 1, 0)


        // console.log('Car já existe, CRC: ', crc32(car.showWeights(true)), ' Comment: ', comment, 'Marca: ', car.marca);

    }

    existCar(car) {

        const weight = car.showWeights(true);
        const filtered = cars.filter(e => e.showWeights(true) == weight)
        return filtered.length > 0
        // return cars.map((e) => { return e.showWeights(true) }).includes(weight);

    }

    onHitSensor(car, sensor, where, entry) {

        if (entry) {
            if (where.includes('R')) {
                sensor.color = car.cor;
                car.lap++;

                console.log("RAVA 2 onGoUp ", this.marca, this.lastKm, this.km)
                noLoop()


                if (world.endsWhenFinishLine) {
                    genetic.nextGeneration();
                } else {
                    const newTimeOut = pista.trackSize * (car.lap + 1);
                    pista.pistaTimeOut = max(pista.pistaTimeOut, newTimeOut);
                }

            } else {
                car.kill(true, car.deadWayType.crashed);
            }
        }
    }

    setPistaTimeOut() {

        this.pistaTimeOut = this.trackSize;
        this.pistaTimeOut = Number(this.pistaTimeOut.toFixed(0));

        if (this.pistaTimeOut < 100) {
            this.pistaTimeOut = 1000;
        }

    }

    setFlag(x, y, text, color) {
        this.recordFlag.setVisible(true);
        this.recordFlag.setPos(x, y);
        this.recordFlag.setText(text);
        this.recordFlag.color = color;

    }

    make() {

        let wallsPista
        this.carsSensorHitted = [];
        this.ranhuras = [];
        globalMutations = [];
        this.setPistaTimeOut();
        pg.clear();

        this.carsOnStart = 0
        this.addCarsDynamically = true
        world.endsWhenFinishLine = false
        this.killIfLate = 0


        // // Track map.
        // this.spritesheet.loadPixels();
        // while (this.spritesheet.width > 1) {}
        // console.log(this.selectedPista)
        // console.log(this.spritesheet)
        // console.log(this.spritesheet.width)
        // console.log(this.spritesheet.height)
        // console.log(this.spritesheet)
        // makeMatrixRoads();
        // waveFront();

        killSlugLessThan = 0

        if (this.selectedPista == 1) {

            world.endsWhenFinishLine = true
            this.carsOnStart = 80

            collideCars = false;
            wallsPista = getPista1();
            this.addCarsDynamically = false
            this.maxMutations = 2
            this.ranhuras = getRanhuras1();
            this.timeOutStopped = 100;
            this.localNascimento = createVector(1500, 120);
            this.anguloNascimento = radians(180);
            this.startRoad = { i: 1532, j: 135, value: 0 };
            this.corDaPista = { r: 204, g: 204, b: 204 };
            this.lapSensors[0].pos.x = this.startRoad.i - 15;
            this.lapSensors[0].pos.y = this.startRoad.j - 65;
            this.lapSensors[0].height = 135;


        } else if (this.selectedPista == 2) {

            collideCars = false;
            wallsPista = getPista2();
            this.maxMutations = 50
            this.ranhuras = getRanhuras2();
            this.timeOutStopped = 100;
            this.population = 20;
            this.localNascimento = createVector(1500, 120);
            this.anguloNascimento = radians(180);
            this.startRoad = { i: 1579, j: 140, value: 0 };
            this.corDaPista = { r: 191, g: 191, b: 191 };
            this.lapSensors[0].pos.x = this.startRoad.i - 10;
            this.lapSensors[0].pos.y = this.startRoad.j - 85;
            this.lapSensors[0].height = 170;

        } else if (this.selectedPista == 3) {

            killSlugLessThan = 50
            collideCars = false;
            wallsPista = getPista3();
            this.maxMutations = 50
            this.timeOutStopped = 100;
            this.backcolor = [154, 179, 161];
            this.startRoad = { i: 1192, j: 280, value: 0 };
            this.corDaPista = { r: 202, g: 202, b: 202 };
            this.lapSensors[0].pos.x = 1145;
            this.lapSensors[0].pos.y = 233;
            this.lapSensors[0].width = 5;
            this.lapSensors[0].height = 80;
            this.localNascimento = createVector(434, 790);
            this.localNascimento = createVector(345, 650);
            this.localNascimento = createVector(1273, 790);
            this.localNascimento = createVector(1128, 280);

            // if (nGeracao % 2 == 0 ) {                
            //     this.anguloNascimento = radians(180);
            //     this.localNascimento = createVector(1125, 285);
            // } else  {
            //     this.anguloNascimento = radians(180);
            //     this.localNascimento = createVector(1273, 790);                  
            // }

        } else if (this.selectedPista == 4) {

            collideCars = false;
            wallsPista = getPista4();
            this.maxMutations = 10
            this.ranhuras = getRanhuras4();
            this.timeOutStopped = 100;

            if (this.localNascimento.x == 0) {
                this.localNascimento = createVector(400, 65);
            }
            this.anguloNascimento = radians(180);

            this.startRoad = { i: 453, j: 66, value: 0 };
            this.corDaPista = { r: 224, g: 225, b: 243 };
            this.lapSensors[0].pos.x = this.startRoad.i - 15;
            this.lapSensors[0].pos.y = this.startRoad.j - 38;
            this.lapSensors[0].width = 10;
            this.lapSensors[0].height = 71;
            killSlugLessThan = 80

        } else if (this.selectedPista == 5) {

            collideCars = false;
            wallsPista = getPista5();
            this.maxMutations = 2
            this.ranhuras = getRanhuras5();
            this.timeOutStopped = 100;
            this.localNascimento = createVector(1530, 372);
            this.anguloNascimento = radians(90);
            this.startRoad = { i: 490, j: 259, value: 0 };
            this.corDaPista = { r: 255, g: 255, b: 255 };
            this.lapSensors[0].pos.x = this.startRoad.i;
            this.lapSensors[0].pos.y = this.startRoad.j;

        } else if (this.selectedPista == 6) {

            collideCars = false;
            wallsPista = getPista6();
            this.maxMutations = 2
            this.ranhuras = getRanhuras6();
            this.timeOutStopped = 1000;
            this.localNascimento = createVector(-1, -1);
            this.anguloNascimento = radians(-90);
            this.backcolor = [52, 126, 163];
            this.startRoad = { i: this.localNascimento.x, j: this.localNascimento.y, value: 0 };
            this.corDaPista = { r: 52, g: 126, b: 163 };
            this.lapSensors[0].pos.x = this.startRoad.i + 10;
            this.lapSensors[0].pos.y = this.startRoad.j - 10;

        } else if (this.selectedPista == 7) {

            this.killIfLate = 200
            world.endsWhenFinishLine = true
            this.carsOnStart = 800
            this.addCarsDynamically = false
            collideCars = false;
            wallsPista = getPista7();
            this.maxMutations = 20
            this.ranhuras = {}
            this.timeOutStopped = 100;
            if (this.localNascimento.x < 0) this.localNascimento = createVector(700, 288);

            // this.startRoad = { i: 59, j: 396, value: 0 };
            this.startRoad = { i: 400, j: 288, value: 0 };
            this.corDaPista = { r: 220, g: 220, b: 220 };
            this.anguloNascimento = radians(0);
            this.backcolor = [220, 220, 220];
            this.lapSensors[0].pos.x = this.startRoad.i + 10;
            this.lapSensors[0].pos.y = this.startRoad.j - 10;

        }

        this.walls = [];

        for (const w of wallsPista) {
            const wall = new Wall(createVector(w.a, w.b), createVector(w.c, w.d));
            this.walls.push(wall);
        }

        timer = 0;

        this.textBackColor = oppositeBright(this.backcolor)

    }

    getSpriteFundo() {
        if (this.selectedPista == 1) {
            this.spritesheet = getSpriteFundo1();
        } else if (this.selectedPista == 2) {
            this.spritesheet = getSpriteFundo2();
        } else if (this.selectedPista == 3) {
            this.spritesheet = getSpriteFundo3();
        } else if (this.selectedPista == 4) {
            this.spritesheet = getSpriteFundo4();
        } else if (this.selectedPista == 5) {
            this.spritesheet = getSpriteFundo5();
        } else if (this.selectedPista == 6) {
            this.spritesheet = getSpriteFundo6();
        } else if (this.selectedPista == 7) {
            this.spritesheet = getSpriteFundo7();
        }
        this.spriteRip = getSpriteRip1();
    }
    togglePista() {

        genetic.melhor = null;
        genetic.melhores = [];
        nGeracao = 0;
        this.recordCar = new Car({})
        this.spriteLoaded = false;
        this.waveFronted = false;

        if (this.selectedPista == 7) {
            this.selectedPista = 1;
        } else {
            this.selectedPista++;
        }

        this.carMajorDistance = 0;
        this.kmWheel = 0;
        this.make();
        this.getSpriteFundo();
        genetic.nextGeneration();


    }

    setMajorDistance(distance) {

        if (distance > this.carMajorDistance) {
            this.carMajorDistance = distance;
        }

    }

    makeRandom() {

        for (let i = 0; i < 10; i++) {
            const wall = new Wall(createVector(random(width), random(height)), createVector(random(width), random(height)))
            this.walls.push(wall);
        }

    }
    show() {
        if (this.showWalls) {
            for (let i = 0; i < this.walls.length; i++) {
                const wall = this.walls[i];
                wall.update()
                if (showWalls) {
                    wall.show();
                    strokeWeight(1);
                    stroke(255);
                    fill(0)
                    textSize(5);
                    text(wall.a.x, wall.a.x, wall.a.y);
                }
            }

            circle(this.localNascimento.x, this.localNascimento.y, 4)
        }

        // this.lapSensors[0].show();

        if (showRanhuras) {


            for (let i = 0; i < this.ranhuras.length; i++) {

                const r = this.ranhuras[i];

                if (r.m == 0) {
                    if (r.t == 0)
                        stroke(255);
                    else
                        stroke(0, 255, 255);
                } else {
                    if (r.t == 0)
                        stroke(80, 80, 255);
                    else
                        stroke(255, 80, 80);
                }

                // if (r.m == 0) {
                //     strokeWeight(1);
                // } else {
                //     strokeWeight(4);
                // }

                if (this.ranhuras[i].w) {
                    strokeWeight(this.ranhuras[i].w);
                } else {
                    strokeWeight(1);
                }

                line(r.a, r.b, r.c, r.d);
                noStroke();
                fill(0, 0, 255);
                textSize(9);
                text(i + 1, r.a, r.b);
            }
        }

        this.recordFlag.show();
    }
}
function getPista1() {
    const points = [];

    // Parece externa da pista.
    points.push({ a: 1821, b: 362, c: 1821, d: 146 });
    points.push({ a: 1821, b: 146, c: 1809, d: 107 });
    points.push({ a: 1809, b: 107, c: 1788, d: 86 });
    points.push({ a: 1788, b: 86, c: 1762, d: 74 });
    points.push({ a: 1762, b: 74, c: 1239, d: 74 });
    points.push({ a: 1239, b: 74, c: 1216, d: 92 });
    points.push({ a: 1216, b: 92, c: 1216, d: 350 });
    points.push({ a: 1216, b: 350, c: 1208, d: 365 });
    points.push({ a: 1208, b: 365, c: 870, d: 368 });
    points.push({ a: 870, b: 368, c: 730, d: 224 });
    points.push({ a: 730, b: 224, c: 521, d: 220 });
    points.push({ a: 521, b: 220, c: 521, d: 99 });
    points.push({ a: 521, b: 99, c: 484, d: 34 });
    points.push({ a: 484, b: 34, c: 81, d: 36 });
    points.push({ a: 81, b: 36, c: 31, d: 87 });
    points.push({ a: 31, b: 87, c: 29, d: 394 });
    points.push({ a: 29, b: 394, c: 55, d: 438 });
    points.push({ a: 55, b: 438, c: 190, d: 440 });
    points.push({ a: 190, b: 440, c: 209, d: 472 });
    points.push({ a: 209, b: 472, c: 207, d: 650 });
    points.push({ a: 207, b: 650, c: 169, d: 686 });
    points.push({ a: 169, b: 686, c: 119, d: 698 });
    points.push({ a: 119, b: 698, c: 96, d: 717 });
    points.push({ a: 96, b: 717, c: 85, d: 770 });
    points.push({ a: 85, b: 770, c: 92, d: 846 });
    points.push({ a: 92, b: 846, c: 112, d: 881 });
    points.push({ a: 112, b: 881, c: 168, d: 903 });
    points.push({ a: 168, b: 903, c: 677, d: 903 });
    points.push({ a: 677, b: 903, c: 704, d: 891 });
    points.push({ a: 704, b: 891, c: 705, d: 672 });
    points.push({ a: 705, b: 672, c: 1115, d: 655 });
    points.push({ a: 1115, b: 655, c: 1127, d: 683 });
    points.push({ a: 1127, b: 683, c: 971, d: 834 });
    points.push({ a: 971, b: 834, c: 964, d: 903 });
    points.push({ a: 964, b: 903, c: 1808, d: 903 });
    points.push({ a: 1808, b: 903, c: 1849, d: 863 });
    points.push({ a: 1849, b: 863, c: 1844, d: 709 });
    points.push({ a: 1844, b: 709, c: 1723, d: 599 });
    points.push({ a: 1723, b: 599, c: 1723, d: 559 });
    points.push({ a: 1723, b: 559, c: 1822, d: 379 });
    points.push({ a: 1822, b: 379, c: 1822, d: 364 });

    // Parede interna da pista.
    points.push({ a: 1692, b: 360, c: 1690, d: 201 });
    points.push({ a: 1690, b: 201, c: 1401, d: 201 });
    points.push({ a: 1401, b: 201, c: 1377, d: 222 });
    points.push({ a: 1377, b: 222, c: 1375, d: 477 });
    points.push({ a: 1375, b: 477, c: 1366, d: 501 });
    points.push({ a: 1366, b: 501, c: 1343, d: 512 });
    points.push({ a: 1343, b: 512, c: 769, d: 512 });
    points.push({ a: 769, b: 512, c: 655, d: 390 });
    points.push({ a: 655, b: 390, c: 621, d: 376 });
    points.push({ a: 621, b: 376, c: 514, d: 379 });
    points.push({ a: 514, b: 379, c: 431, d: 358 });
    points.push({ a: 431, b: 358, c: 365, d: 294 });
    points.push({ a: 365, b: 294, c: 365, d: 207 });
    points.push({ a: 365, b: 207, c: 338, d: 171 });
    points.push({ a: 338, b: 171, c: 238, d: 163 });
    points.push({ a: 238, b: 163, c: 195, d: 174 });
    points.push({ a: 195, b: 174, c: 171, d: 202 });
    points.push({ a: 171, b: 202, c: 168, d: 284 });
    points.push({ a: 168, b: 284, c: 281, d: 291 });
    points.push({ a: 281, b: 291, c: 347, d: 353 });
    points.push({ a: 347, b: 353, c: 377, d: 438 });
    points.push({ a: 377, b: 438, c: 383, d: 725 });
    points.push({ a: 383, b: 725, c: 329, d: 771 });
    points.push({ a: 329, b: 771, c: 332, d: 787 });
    points.push({ a: 332, b: 787, c: 522, d: 786 });
    points.push({ a: 522, b: 786, c: 543, d: 756 });
    points.push({ a: 543, b: 756, c: 535, d: 602 });
    points.push({ a: 535, b: 602, c: 601, d: 545 });
    points.push({ a: 601, b: 545, c: 1209, d: 548 });
    points.push({ a: 1209, b: 548, c: 1233, d: 572 });
    points.push({ a: 1233, b: 572, c: 1315, d: 695 });
    points.push({ a: 1315, b: 695, c: 1238, d: 763 });
    points.push({ a: 1238, b: 763, c: 1230, d: 775 });
    points.push({ a: 1230, b: 775, c: 1239, d: 791 });
    points.push({ a: 1239, b: 791, c: 1627, d: 785 });
    points.push({ a: 1627, b: 785, c: 1658, d: 761 });
    points.push({ a: 1658, b: 761, c: 1451, d: 582 });
    points.push({ a: 1451, b: 582, c: 1451, d: 525 });
    points.push({ a: 1451, b: 525, c: 1691, d: 357 });

    return points;

}

function getPista2() {
    const points = [];

    // Parede exerta da pista.
    points.push({ a: 1854, b: 63, c: 1498, d: 61 }); // x
    points.push({ a: 1498, b: 61, c: 1466, d: 97 }); // x
    points.push({ a: 1466, b: 97, c: 1304, d: 100 }); // x
    points.push({ a: 1304, b: 100, c: 1284, d: 112 }); // x
    points.push({ a: 1284, b: 112, c: 1263, d: 101 }); // x
    points.push({ a: 1263, b: 101, c: 1153, d: 102 }); // x
    points.push({ a: 1153, b: 102, c: 1214, d: 157 }); // x
    points.push({ a: 1214, b: 157, c: 1268, d: 160 }); // x
    points.push({ a: 1268, b: 160, c: 1424, d: 251 }); // x
    points.push({ a: 1424, b: 251, c: 1306, d: 246 }); // x
    points.push({ a: 1306, b: 246, c: 993, d: 26 }); // x
    points.push({ a: 993, b: 26, c: 892, d: 29 }); // x
    points.push({ a: 892, b: 29, c: 893, d: 340 }); // x
    points.push({ a: 893, b: 340, c: 821, d: 370 }); // x
    points.push({ a: 821, b: 370, c: 710, d: 373 }); // x
    points.push({ a: 710, b: 373, c: 641, d: 333 }); // x
    points.push({ a: 641, b: 333, c: 632, d: 224 });
    points.push({ a: 632, b: 224, c: 412, d: 218 });
    points.push({ a: 412, b: 218, c: 421, d: 450 });
    points.push({ a: 421, b: 450, c: 473, d: 514 });
    points.push({ a: 473, b: 514, c: 728, d: 509 });
    points.push({ a: 728, b: 509, c: 815, d: 593 });
    points.push({ a: 815, b: 593, c: 856, d: 555 });
    points.push({ a: 856, b: 555, c: 806, d: 504 });
    points.push({ a: 806, b: 504, c: 1112, d: 507 });
    points.push({ a: 1112, b: 507, c: 1181, d: 441 });
    points.push({ a: 1181, b: 441, c: 1606, d: 436 });
    points.push({ a: 1606, b: 436, c: 1607, d: 506 });
    points.push({ a: 1607, b: 506, c: 1212, d: 498 });
    points.push({ a: 1212, b: 498, c: 1154, d: 557 });
    points.push({ a: 1154, b: 557, c: 914, d: 556 });
    points.push({ a: 914, b: 556, c: 915, d: 655 });
    points.push({ a: 915, b: 655, c: 730, d: 652 });
    points.push({ a: 730, b: 652, c: 724, d: 559 });
    points.push({ a: 724, b: 559, c: 417, d: 558 });
    points.push({ a: 417, b: 558, c: 361, d: 473 });
    points.push({ a: 361, b: 473, c: 349, d: 242 });
    points.push({ a: 349, b: 242, c: 416, d: 169 });
    points.push({ a: 416, b: 169, c: 854, d: 163 });
    points.push({ a: 854, b: 163, c: 795, d: 119 });
    points.push({ a: 795, b: 119, c: 794, d: 75 });
    points.push({ a: 794, b: 75, c: 857, d: 27 });
    points.push({ a: 857, b: 27, c: 20, d: 28 });
    points.push({ a: 20, b: 28, c: 106, d: 242 });
    points.push({ a: 106, b: 242, c: 25, d: 597 });
    points.push({ a: 25, b: 597, c: 27, d: 920 });
    points.push({ a: 27, b: 920, c: 1308, d: 924 });
    points.push({ a: 1308, b: 924, c: 1373, d: 782 });
    points.push({ a: 1373, b: 782, c: 1339, d: 713 });
    points.push({ a: 1339, b: 713, c: 1513, d: 710 });
    points.push({ a: 1513, b: 710, c: 1485, d: 771 });
    points.push({ a: 1485, b: 771, c: 1551, d: 866 });
    points.push({ a: 1551, b: 866, c: 1854, d: 862 });
    points.push({ a: 1854, b: 862, c: 1862, d: 590 });
    points.push({ a: 1862, b: 590, c: 1826, d: 542 });
    points.push({ a: 1826, b: 542, c: 1830, d: 437 });
    points.push({ a: 1830, b: 437, c: 1858, d: 418 }); // x
    points.push({ a: 1858, b: 418, c: 1855, d: 64 }); // x

    // Parece interna da pista.
    points.push({ a: 1756, b: 221, c: 1514, d: 219 }); // x
    points.push({ a: 1514, b: 219, c: 1461, d: 149 }); // x
    points.push({ a: 1461, b: 149, c: 1354, d: 147 }); // x
    points.push({ a: 1354, b: 147, c: 1516, d: 241 }); // x
    points.push({ a: 1516, b: 241, c: 1610, d: 245 }); // x
    points.push({ a: 1610, b: 245, c: 1615, d: 315 }); // x
    points.push({ a: 1615, b: 315, c: 1245, d: 312 }); // x
    points.push({ a: 1245, b: 312, c: 1072, d: 183 }); // x
    points.push({ a: 1072, b: 183, c: 1005, d: 181 }); // x
    points.push({ a: 1005, b: 181, c: 1004, d: 371 }); // x
    points.push({ a: 1004, b: 371, c: 832, d: 428 }); // x
    points.push({ a: 832, b: 428, c: 654, d: 424 }); // x
    points.push({ a: 654, b: 424, c: 517, d: 314 }); // x
    points.push({ a: 517, b: 314, c: 500, d: 320 });
    points.push({ a: 500, b: 320, c: 499, d: 371 });
    points.push({ a: 499, b: 371, c: 653, d: 438 });
    points.push({ a: 653, b: 438, c: 1006, d: 439 });
    points.push({ a: 1006, b: 439, c: 1111, d: 351 });
    points.push({ a: 1111, b: 351, c: 1692, d: 344 });
    points.push({ a: 1692, b: 344, c: 1714, d: 475 });
    points.push({ a: 1714, b: 475, c: 1680, d: 577 });
    points.push({ a: 1680, b: 577, c: 1263, d: 570 });
    points.push({ a: 1263, b: 570, c: 1182, d: 639 });
    points.push({ a: 1182, b: 639, c: 1017, d: 640 });
    points.push({ a: 1017, b: 640, c: 1011, d: 712 });
    points.push({ a: 1011, b: 712, c: 628, d: 705 });
    points.push({ a: 628, b: 705, c: 628, d: 649 });
    points.push({ a: 628, b: 649, c: 335, d: 629 });
    points.push({ a: 335, b: 629, c: 271, d: 513 });
    points.push({ a: 271, b: 513, c: 258, d: 237 });
    points.push({ a: 258, b: 237, c: 373, d: 108 });
    points.push({ a: 373, b: 108, c: 684, d: 103 });
    points.push({ a: 684, b: 103, c: 681, d: 95 });
    points.push({ a: 681, b: 95, c: 217, d: 97 });
    points.push({ a: 217, b: 97, c: 158, d: 564 });
    points.push({ a: 158, b: 564, c: 171, d: 773 });
    points.push({ a: 171, b: 773, c: 206, d: 809 });
    points.push({ a: 206, b: 809, c: 1117, d: 817 });
    points.push({ a: 1117, b: 817, c: 1037, d: 656 });
    points.push({ a: 1037, b: 656, c: 1198, d: 652 });
    points.push({ a: 1198, b: 652, c: 1278, d: 587 });
    points.push({ a: 1278, b: 587, c: 1674, d: 594 });
    points.push({ a: 1674, b: 594, c: 1669, d: 734 });
    points.push({ a: 1669, b: 734, c: 1717, d: 736 });
    points.push({ a: 1717, b: 736, c: 1711, d: 556 });
    points.push({ a: 1711, b: 556, c: 1733, d: 399 });
    points.push({ a: 1733, b: 399, c: 1753, d: 380 }); // x
    points.push({ a: 1753, b: 380, c: 1756, d: 221 }); // x

    return points;

}

function getPista3() {
    const points = [];

    points.push({ a: 1159, b: 236, c: 1107, d: 246, m: 0, t: 0 });
    points.push({ a: 1107, b: 246, c: 1075, d: 272, m: 0, t: 0 });
    points.push({ a: 1075, b: 272, c: 1052, d: 315, m: 0, t: 0 });
    points.push({ a: 1052, b: 315, c: 1047, d: 324, m: 0, t: 0 });
    points.push({ a: 1047, b: 324, c: 1046, d: 468, m: 0, t: 0 });
    points.push({ a: 1046, b: 468, c: 1031, d: 490, m: 0, t: 0 });
    points.push({ a: 1031, b: 490, c: 1014, d: 494, m: 0, t: 0 });
    points.push({ a: 1014, b: 494, c: 995, d: 485, m: 0, t: 0 });
    points.push({ a: 995, b: 485, c: 987, d: 469, m: 0, t: 0 });
    points.push({ a: 987, b: 469, c: 985, d: 307, m: 0, t: 0 });
    points.push({ a: 985, b: 307, c: 963, d: 271, m: 0, t: 0 });
    points.push({ a: 963, b: 271, c: 939, d: 250, m: 0, t: 0 });
    points.push({ a: 939, b: 250, c: 888, d: 236, m: 0, t: 0 });
    points.push({ a: 888, b: 236, c: 848, d: 239, m: 0, t: 0 });
    points.push({ a: 848, b: 239, c: 805, d: 262, m: 0, t: 0 });
    points.push({ a: 805, b: 262, c: 787, d: 284, m: 0, t: 0 });
    points.push({ a: 787, b: 284, c: 770, d: 324, m: 0, t: 0 });
    points.push({ a: 770, b: 324, c: 770, d: 467, m: 0, t: 0 });
    points.push({ a: 770, b: 467, c: 755, d: 488, m: 0, t: 0 });
    points.push({ a: 755, b: 488, c: 742, d: 495, m: 0, t: 0 });
    points.push({ a: 742, b: 495, c: 718, d: 488, m: 0, t: 0 });
    points.push({ a: 718, b: 488, c: 707, d: 472, m: 0, t: 0 });
    points.push({ a: 707, b: 472, c: 707, d: 313, m: 0, t: 0 });
    points.push({ a: 707, b: 313, c: 688, d: 278, m: 0, t: 0 });
    points.push({ a: 688, b: 278, c: 660, d: 252, m: 0, t: 0 });
    points.push({ a: 660, b: 252, c: 618, d: 237, m: 0, t: 0 });
    points.push({ a: 618, b: 237, c: 581, d: 236, m: 0, t: 0 });
    points.push({ a: 581, b: 236, c: 542, d: 252, m: 0, t: 0 });
    points.push({ a: 542, b: 252, c: 519, d: 271, m: 0, t: 0 });
    points.push({ a: 519, b: 271, c: 499, d: 300, m: 0, t: 0 });
    points.push({ a: 499, b: 300, c: 491, d: 327, m: 0, t: 0 });
    points.push({ a: 491, b: 327, c: 489, d: 473, m: 0, t: 0 });
    points.push({ a: 489, b: 473, c: 474, d: 489, m: 0, t: 0 });
    points.push({ a: 474, b: 489, c: 453, d: 496, m: 0, t: 0 });
    points.push({ a: 453, b: 496, c: 436, d: 488, m: 0, t: 0 });
    points.push({ a: 436, b: 488, c: 425, d: 469, m: 0, t: 0 });
    points.push({ a: 425, b: 469, c: 424, d: 312, m: 0, t: 0 });
    points.push({ a: 424, b: 312, c: 414, d: 284, m: 0, t: 0 });
    points.push({ a: 414, b: 284, c: 389, d: 258, m: 0, t: 0 });
    points.push({ a: 389, b: 258, c: 360, d: 241, m: 0, t: 0 });
    points.push({ a: 360, b: 241, c: 321, d: 235, m: 0, t: 0 });
    points.push({ a: 321, b: 235, c: 287, d: 239, m: 0, t: 0 });
    points.push({ a: 287, b: 239, c: 255, d: 254, m: 0, t: 0 });
    points.push({ a: 255, b: 254, c: 237, d: 273, m: 0, t: 0 });
    points.push({ a: 237, b: 273, c: 220, d: 298, m: 0, t: 0 });
    points.push({ a: 220, b: 298, c: 210, d: 327, m: 0, t: 0 });
    points.push({ a: 210, b: 327, c: 208, d: 544, m: 0, t: 0 });
    points.push({ a: 208, b: 544, c: 197, d: 560, m: 0, t: 0 });
    points.push({ a: 197, b: 560, c: 178, d: 567, m: 0, t: 0 });
    points.push({ a: 178, b: 567, c: 159, d: 561, m: 0, t: 0 });
    points.push({ a: 159, b: 561, c: 146, d: 543, m: 0, t: 0 });
    points.push({ a: 146, b: 543, c: 148, d: 174, m: 0, t: 0 });
    points.push({ a: 148, b: 174, c: 156, d: 159, m: 0, t: 0 });
    points.push({ a: 156, b: 159, c: 170, d: 153, m: 0, t: 0 });
    points.push({ a: 170, b: 153, c: 1325, d: 151, m: 0, t: 0 });
    points.push({ a: 1325, b: 151, c: 1337, d: 160, m: 0, t: 0 });
    points.push({ a: 1337, b: 160, c: 1346, d: 175, m: 0, t: 0 });
    points.push({ a: 1346, b: 175, c: 1346, d: 733, m: 0, t: 0 });
    points.push({ a: 1346, b: 733, c: 1338, d: 745, m: 0, t: 0 });
    points.push({ a: 1338, b: 745, c: 1322, d: 754, m: 0, t: 0 });
    points.push({ a: 1322, b: 754, c: 327, d: 753, m: 0, t: 0 });
    points.push({ a: 327, b: 753, c: 310, d: 738, m: 0, t: 0 });
    points.push({ a: 310, b: 738, c: 307, d: 723, m: 0, t: 0 });
    points.push({ a: 307, b: 723, c: 310, d: 705, m: 0, t: 0 });
    points.push({ a: 310, b: 705, c: 330, d: 692, m: 0, t: 0 });
    points.push({ a: 330, b: 692, c: 406, d: 691, m: 0, t: 0 });
    points.push({ a: 406, b: 691, c: 426, d: 668, m: 0, t: 0 });
    points.push({ a: 426, b: 668, c: 559, d: 668, m: 0, t: 0 });
    points.push({ a: 559, b: 668, c: 578, d: 691, m: 0, t: 0 });
    points.push({ a: 578, b: 691, c: 638, d: 689, m: 0, t: 0 });
    points.push({ a: 638, b: 689, c: 659, d: 667, m: 0, t: 0 });
    points.push({ a: 659, b: 667, c: 792, d: 667, m: 0, t: 0 });
    points.push({ a: 792, b: 667, c: 809, d: 691, m: 0, t: 0 });
    points.push({ a: 809, b: 691, c: 879, d: 690, m: 0, t: 0 });
    points.push({ a: 879, b: 690, c: 898, d: 668, m: 0, t: 0 });
    points.push({ a: 898, b: 668, c: 1032, d: 667, m: 0, t: 0 });
    points.push({ a: 1032, b: 667, c: 1050, d: 689, m: 0, t: 0 });
    points.push({ a: 1050, b: 689, c: 1191, d: 690, m: 0, t: 0 });
    points.push({ a: 1191, b: 690, c: 1217, d: 675, m: 0, t: 0 });
    points.push({ a: 1217, b: 675, c: 1246, d: 649, m: 0, t: 0 });
    points.push({ a: 1246, b: 649, c: 1258, d: 626, m: 0, t: 0 });
    points.push({ a: 1258, b: 626, c: 1265, d: 603, m: 0, t: 0 });
    points.push({ a: 1265, b: 603, c: 1266, d: 309, m: 0, t: 0 });
    points.push({ a: 1266, b: 309, c: 1257, d: 292, m: 0, t: 0 });
    points.push({ a: 1257, b: 292, c: 1234, d: 262, m: 0, t: 0 });
    points.push({ a: 1234, b: 262, c: 1206, d: 244, m: 0, t: 0 });
    points.push({ a: 1206, b: 244, c: 1173, d: 237, m: 0, t: 0 });
    points.push({ a: 1173, b: 237, c: 1141, d: 236, m: 0, t: 0 });
    points.push({ a: 1141, b: 236, c: 1107, d: 247, m: 0, t: 0 });
    points.push({ a: 1160, b: 311, c: 1143, d: 314, m: 0, t: 0 });
    points.push({ a: 1143, b: 314, c: 1134, d: 322, m: 0, t: 0 });
    points.push({ a: 1134, b: 322, c: 1126, d: 336, m: 0, t: 0 });
    points.push({ a: 1126, b: 336, c: 1125, d: 492, m: 0, t: 0 });
    points.push({ a: 1125, b: 492, c: 1117, d: 511, m: 0, t: 0 });
    points.push({ a: 1117, b: 511, c: 1095, d: 535, m: 0, t: 0 });
    points.push({ a: 1095, b: 535, c: 1066, d: 557, m: 0, t: 0 });
    points.push({ a: 1066, b: 557, c: 1025, d: 566, m: 0, t: 0 });
    points.push({ a: 1025, b: 566, c: 990, d: 563, m: 0, t: 0 });
    points.push({ a: 990, b: 563, c: 953, d: 544, m: 0, t: 0 });
    points.push({ a: 953, b: 544, c: 929, d: 520, m: 0, t: 0 });
    points.push({ a: 929, b: 520, c: 917, d: 495, m: 0, t: 0 });
    points.push({ a: 917, b: 495, c: 910, d: 474, m: 0, t: 0 });
    points.push({ a: 910, b: 474, c: 910, d: 337, m: 0, t: 0 });
    points.push({ a: 910, b: 337, c: 902, d: 322, m: 0, t: 0 });
    points.push({ a: 902, b: 322, c: 889, d: 312, m: 0, t: 0 });
    points.push({ a: 889, b: 312, c: 880, d: 310, m: 0, t: 0 });
    points.push({ a: 880, b: 310, c: 865, d: 313, m: 0, t: 0 });
    points.push({ a: 865, b: 313, c: 852, d: 322, m: 0, t: 0 });
    points.push({ a: 852, b: 322, c: 846, d: 334, m: 0, t: 0 });
    points.push({ a: 846, b: 334, c: 846, d: 488, m: 0, t: 0 });
    points.push({ a: 846, b: 488, c: 828, d: 523, m: 0, t: 0 });
    points.push({ a: 828, b: 523, c: 800, d: 549, m: 0, t: 0 });
    points.push({ a: 800, b: 549, c: 774, d: 561, m: 0, t: 0 });
    points.push({ a: 774, b: 561, c: 738, d: 567, m: 0, t: 0 });
    points.push({ a: 738, b: 567, c: 695, d: 559, m: 0, t: 0 });
    points.push({ a: 695, b: 559, c: 663, d: 535, m: 0, t: 0 });
    points.push({ a: 663, b: 535, c: 644, d: 511, m: 0, t: 0 });
    points.push({ a: 644, b: 511, c: 631, d: 474, m: 0, t: 0 });
    points.push({ a: 631, b: 474, c: 629, d: 335, m: 0, t: 0 });
    points.push({ a: 629, b: 335, c: 619, d: 320, m: 0, t: 0 });
    points.push({ a: 619, b: 320, c: 608, d: 312, m: 0, t: 0 });
    points.push({ a: 608, b: 312, c: 600, d: 310, m: 0, t: 0 });
    points.push({ a: 600, b: 310, c: 581, d: 315, m: 0, t: 0 });
    points.push({ a: 581, b: 315, c: 566, d: 333, m: 0, t: 0 });
    points.push({ a: 566, b: 333, c: 565, d: 491, m: 0, t: 0 });
    points.push({ a: 565, b: 491, c: 555, d: 511, m: 0, t: 0 });
    points.push({ a: 555, b: 511, c: 539, d: 533, m: 0, t: 0 });
    points.push({ a: 539, b: 533, c: 514, d: 552, m: 0, t: 0 });
    points.push({ a: 514, b: 552, c: 488, d: 563, m: 0, t: 0 });
    points.push({ a: 488, b: 563, c: 459, d: 566, m: 0, t: 0 });
    points.push({ a: 459, b: 566, c: 429, d: 563, m: 0, t: 0 });
    points.push({ a: 429, b: 563, c: 393, d: 545, m: 0, t: 0 });
    points.push({ a: 393, b: 545, c: 367, d: 518, m: 0, t: 0 });
    points.push({ a: 367, b: 518, c: 354, d: 489, m: 0, t: 0 });
    points.push({ a: 354, b: 489, c: 350, d: 473, m: 0, t: 0 });
    points.push({ a: 350, b: 473, c: 349, d: 337, m: 0, t: 0 });
    points.push({ a: 349, b: 337, c: 344, d: 323, m: 0, t: 0 });
    points.push({ a: 344, b: 323, c: 335, d: 316, m: 0, t: 0 });
    points.push({ a: 335, b: 316, c: 320, d: 310, m: 0, t: 0 });
    points.push({ a: 320, b: 310, c: 301, d: 316, m: 0, t: 0 });
    points.push({ a: 301, b: 316, c: 285, d: 334, m: 0, t: 0 });
    points.push({ a: 285, b: 334, c: 284, d: 567, m: 0, t: 0 });
    points.push({ a: 284, b: 567, c: 275, d: 587, m: 0, t: 0 });
    points.push({ a: 275, b: 587, c: 257, d: 612, m: 0, t: 0 });
    points.push({ a: 257, b: 612, c: 229, d: 630, m: 0, t: 0 });
    points.push({ a: 229, b: 630, c: 208, d: 639, m: 0, t: 0 });
    points.push({ a: 208, b: 639, c: 180, d: 643, m: 0, t: 0 });
    points.push({ a: 180, b: 643, c: 153, d: 640, m: 0, t: 0 });
    points.push({ a: 153, b: 640, c: 122, d: 628, m: 0, t: 0 });
    points.push({ a: 122, b: 628, c: 103, d: 611, m: 0, t: 0 });
    points.push({ a: 103, b: 611, c: 85, d: 588, m: 0, t: 0 });
    points.push({ a: 85, b: 588, c: 73, d: 564, m: 0, t: 0 });
    points.push({ a: 73, b: 564, c: 70, d: 547, m: 0, t: 0 });
    points.push({ a: 70, b: 547, c: 70, d: 160, m: 0, t: 0 });
    points.push({ a: 70, b: 160, c: 74, d: 148, m: 0, t: 0 });
    points.push({ a: 74, b: 148, c: 83, d: 128, m: 0, t: 0 });
    points.push({ a: 83, b: 128, c: 95, d: 109, m: 0, t: 0 });
    points.push({ a: 95, b: 109, c: 111, d: 95, m: 0, t: 0 });
    points.push({ a: 111, b: 95, c: 129, d: 83, m: 0, t: 0 });
    points.push({ a: 129, b: 83, c: 145, d: 76, m: 0, t: 0 });
    points.push({ a: 145, b: 76, c: 1347, d: 75, m: 0, t: 0 });
    points.push({ a: 1347, b: 75, c: 1357, d: 79, m: 0, t: 0 });
    points.push({ a: 1357, b: 79, c: 1379, d: 94, m: 0, t: 0 });
    points.push({ a: 1379, b: 94, c: 1397, d: 110, m: 0, t: 0 });
    points.push({ a: 1397, b: 110, c: 1412, d: 134, m: 0, t: 0 });
    points.push({ a: 1412, b: 134, c: 1419, d: 152, m: 0, t: 0 });
    points.push({ a: 1419, b: 152, c: 1421, d: 168, m: 0, t: 0 });
    points.push({ a: 1421, b: 168, c: 1420, d: 747, m: 0, t: 0 });
    points.push({ a: 1420, b: 747, c: 1415, d: 765, m: 0, t: 0 });
    points.push({ a: 1415, b: 765, c: 1403, d: 787, m: 0, t: 0 });
    points.push({ a: 1403, b: 787, c: 1384, d: 807, m: 0, t: 0 });
    points.push({ a: 1384, b: 807, c: 1363, d: 823, m: 0, t: 0 });
    points.push({ a: 1363, b: 823, c: 1345, d: 830, m: 0, t: 0 });
    points.push({ a: 1345, b: 830, c: 318, d: 829, m: 0, t: 0 });
    points.push({ a: 318, b: 829, c: 294, d: 821, m: 0, t: 0 });
    points.push({ a: 294, b: 821, c: 272, d: 807, m: 0, t: 0 });
    points.push({ a: 272, b: 807, c: 241, d: 769, m: 0, t: 0 });
    points.push({ a: 241, b: 769, c: 231, d: 744, m: 0, t: 0 });
    points.push({ a: 231, b: 744, c: 230, d: 703, m: 0, t: 0 });
    points.push({ a: 230, b: 703, c: 239, d: 675, m: 0, t: 0 });
    points.push({ a: 239, b: 675, c: 259, d: 646, m: 0, t: 0 });
    points.push({ a: 259, b: 646, c: 284, d: 627, m: 0, t: 0 });
    points.push({ a: 284, b: 627, c: 308, d: 615, m: 0, t: 0 });
    points.push({ a: 308, b: 615, c: 405, d: 615, m: 0, t: 0 });
    points.push({ a: 405, b: 615, c: 425, d: 640, m: 0, t: 0 });
    points.push({ a: 425, b: 640, c: 557, d: 639, m: 0, t: 0 });
    points.push({ a: 557, b: 639, c: 577, d: 615, m: 0, t: 0 });
    points.push({ a: 577, b: 615, c: 638, d: 615, m: 0, t: 0 });
    points.push({ a: 638, b: 615, c: 657, d: 638, m: 0, t: 0 });
    points.push({ a: 657, b: 638, c: 790, d: 638, m: 0, t: 0 });
    points.push({ a: 790, b: 638, c: 810, d: 615, m: 0, t: 0 });
    points.push({ a: 810, b: 615, c: 879, d: 615, m: 0, t: 0 });
    points.push({ a: 879, b: 615, c: 898, d: 639, m: 0, t: 0 });
    points.push({ a: 898, b: 639, c: 1029, d: 639, m: 0, t: 0 });
    points.push({ a: 1029, b: 639, c: 1049, d: 616, m: 0, t: 0 });
    points.push({ a: 1049, b: 616, c: 1167, d: 614, m: 0, t: 0 });
    points.push({ a: 1167, b: 614, c: 1176, d: 609, m: 0, t: 0 });
    points.push({ a: 1176, b: 609, c: 1185, d: 600, m: 0, t: 0 });
    points.push({ a: 1185, b: 600, c: 1189, d: 590, m: 0, t: 0 });
    points.push({ a: 1189, b: 590, c: 1189, d: 332, m: 0, t: 0 });
    points.push({ a: 1189, b: 332, c: 1184, d: 324, m: 0, t: 0 });
    points.push({ a: 1184, b: 324, c: 1173, d: 315, m: 0, t: 0 });
    points.push({ a: 1173, b: 315, c: 1157, d: 311, m: 0, t: 0 });

    return points;
}

function getPista4() {
    const points = [];

    // Parede externa.
    points.push({ a: 1727, b: 31, c: 1127, d: 32, m: 0, t: 0 });
    points.push({ a: 1127, b: 32, c: 1100, d: 8, m: 0, t: 0 });
    points.push({ a: 1100, b: 8, c: 715, d: 13, m: 0, t: 0 });
    points.push({ a: 715, b: 13, c: 681, d: 31, m: 0, t: 0 });
    points.push({ a: 681, b: 31, c: 126, d: 35, m: 0, t: 0 });
    points.push({ a: 126, b: 35, c: 76, d: 54, m: 0, t: 0 });
    points.push({ a: 76, b: 54, c: 53, d: 91, m: 0, t: 0 });
    points.push({ a: 53, b: 91, c: 46, d: 137, m: 0, t: 0 });
    points.push({ a: 46, b: 137, c: 45, d: 799, m: 0, t: 0 });
    points.push({ a: 45, b: 799, c: 60, d: 860, m: 0, t: 0 });
    points.push({ a: 60, b: 860, c: 93, d: 889, m: 0, t: 0 });
    points.push({ a: 93, b: 889, c: 243, d: 891, m: 0, t: 0 });
    points.push({ a: 243, b: 891, c: 277, d: 880, m: 0, t: 0 });
    points.push({ a: 277, b: 880, c: 300, d: 851, m: 0, t: 0 });
    points.push({ a: 300, b: 851, c: 311, d: 807, m: 0, t: 0 });
    points.push({ a: 311, b: 807, c: 357, d: 800, m: 0, t: 0 });
    points.push({ a: 357, b: 800, c: 403, d: 774, m: 0, t: 0 });
    points.push({ a: 403, b: 774, c: 435, d: 736, m: 0, t: 0 });
    points.push({ a: 435, b: 736, c: 447, d: 703, m: 0, t: 0 });
    points.push({ a: 447, b: 703, c: 447, d: 684, m: 0, t: 0 });
    points.push({ a: 447, b: 684, c: 497, d: 647, m: 0, t: 0 });
    points.push({ a: 497, b: 647, c: 532, d: 606, m: 0, t: 0 });
    points.push({ a: 532, b: 606, c: 582, d: 625, m: 0, t: 0 });
    points.push({ a: 582, b: 625, c: 643, d: 624, m: 0, t: 0 });
    points.push({ a: 643, b: 624, c: 707, d: 596, m: 0, t: 0 });
    points.push({ a: 707, b: 596, c: 760, d: 545, m: 0, t: 0 });
    points.push({ a: 760, b: 545, c: 779, d: 472, m: 0, t: 0 });
    points.push({ a: 779, b: 472, c: 763, d: 404, m: 0, t: 0 });
    points.push({ a: 763, b: 404, c: 734, d: 362, m: 0, t: 0 });
    points.push({ a: 734, b: 362, c: 695, d: 332, m: 0, t: 0 });
    points.push({ a: 695, b: 332, c: 642, d: 312, m: 0, t: 0 });
    points.push({ a: 642, b: 312, c: 589, d: 313, m: 0, t: 0 });
    points.push({ a: 589, b: 313, c: 540, d: 325, m: 0, t: 0 });
    points.push({ a: 540, b: 325, c: 501, d: 354, m: 0, t: 0 });
    points.push({ a: 501, b: 354, c: 419, d: 340, m: 0, t: 0 });
    points.push({ a: 419, b: 340, c: 421, d: 319, m: 0, t: 0 });
    points.push({ a: 421, b: 319, c: 416, d: 290, m: 0, t: 0 });

    points.push({ a: 416, b: 290, c: 807, d: 240, m: 0, t: 0 });

    // points.push({ a: 780, b: 245, c: 788, d: 248, m: 0, t: 0 });

    points.push({ a: 807, b: 240, c: 810, d: 246, m: 0, t: 0 });
    points.push({ a: 810, b: 246, c: 791, d: 248, m: 0, t: 0 });

    points.push({ a: 788, b: 248, c: 790, d: 620, m: 0, t: 0 });

    points.push({ a: 790, b: 620, c: 671, d: 622, m: 0, t: 0 });
    points.push({ a: 671, b: 622, c: 622, d: 634, m: 0, t: 0 });
    points.push({ a: 622, b: 634, c: 593, d: 669, m: 0, t: 0 });
    points.push({ a: 593, b: 669, c: 593, d: 841, m: 0, t: 0 });
    points.push({ a: 593, b: 841, c: 602, d: 871, m: 0, t: 0 });
    points.push({ a: 602, b: 871, c: 626, d: 890, m: 0, t: 0 });
    points.push({ a: 626, b: 890, c: 1770, d: 888, m: 0, t: 0 });
    points.push({ a: 1770, b: 888, c: 1799, d: 873, m: 0, t: 0 });
    points.push({ a: 1799, b: 873, c: 1810, d: 838, m: 0, t: 0 });
    points.push({ a: 1810, b: 838, c: 1809, d: 270, m: 0, t: 0 });
    points.push({ a: 1809, b: 270, c: 1801, d: 233, m: 0, t: 0 });
    points.push({ a: 1801, b: 233, c: 1785, d: 212, m: 0, t: 0 });
    points.push({ a: 1785, b: 212, c: 1712, d: 199, m: 0, t: 0 });
    points.push({ a: 1712, b: 199, c: 1654, d: 206, m: 0, t: 0 });
    // points.push({ a: 1654, b: 206, c: 1600, d: 228, m: 0, t: 0 }); // 56 - a: 1654, b: 206, c: 1622, d: 228, m: 0, t: 0
    // points.push({ a: 1600, b: 228, c: 1590, d: 260, m: 0, t: 0 }); // 57 - a: 1622, b: 228, c: 1607, d: 260, m: 0, t: 0
    // points.push({ a: 1590, b: 260, c: 1590, d: 719, m: 0, t: 0 }); // 58 - a: 1607, b: 260, c: 1608, d: 719, m: 0, t: 0
    // points.push({ a: 1590, b: 710, c: 1524, d: 710, m: 0, t: 0 }); // 59 - a: 1608, b: 719, c: 1524, d: 720, m: 0, t: 0
    // points.push({ a: 1524, b: 710, c: 1522, d: 555, m: 0, t: 0 }); // 60 - a: 1524, b: 720, c: 1522, d: 555, m: 0, t: 0
    points.push({ a: 1654, b: 206, c: 1622, d: 228, m: 0, t: 0 }); // 56
    points.push({ a: 1622, b: 228, c: 1607, d: 260, m: 0, t: 0 }); // 57
    points.push({ a: 1607, b: 260, c: 1608, d: 719, m: 0, t: 0 }); // 58
    points.push({ a: 1608, b: 719, c: 1524, d: 720, m: 0, t: 0 }); // 59
    points.push({ a: 1524, b: 720, c: 1522, d: 555, m: 0, t: 0 }); // 60
    points.push({ a: 1522, b: 555, c: 1329, d: 555, m: 0, t: 0 });
    points.push({ a: 1329, b: 555, c: 1324, d: 483, m: 0, t: 0 });
    points.push({ a: 1324, b: 483, c: 1313, d: 460, m: 0, t: 0 });
    points.push({ a: 1313, b: 460, c: 1302, d: 448, m: 0, t: 0 });
    points.push({ a: 1302, b: 448, c: 1252, d: 430, m: 0, t: 0 });
    points.push({ a: 1252, b: 430, c: 1101, d: 229, m: 0, t: 0 });
    points.push({ a: 1101, b: 229, c: 1096, d: 212, m: 0, t: 0 });
    points.push({ a: 1096, b: 212, c: 1106, d: 194, m: 0, t: 0 });
    points.push({ a: 1106, b: 194, c: 1158, d: 204, m: 0, t: 0 });
    points.push({ a: 1158, b: 204, c: 1274, d: 336, m: 0, t: 0 });
    points.push({ a: 1274, b: 336, c: 1273, d: 374, m: 0, t: 0 });
    points.push({ a: 1273, b: 374, c: 1284, d: 409, m: 0, t: 0 });
    points.push({ a: 1284, b: 409, c: 1305, d: 444, m: 0, t: 0 });
    points.push({ a: 1305, b: 444, c: 1346, d: 479, m: 0, t: 0 });
    points.push({ a: 1346, b: 479, c: 1403, d: 493, m: 0, t: 0 });
    points.push({ a: 1403, b: 493, c: 1464, d: 484, m: 0, t: 0 });
    points.push({ a: 1464, b: 484, c: 1504, d: 461, m: 0, t: 0 });
    points.push({ a: 1504, b: 461, c: 1530, d: 430, m: 0, t: 0 });
    points.push({ a: 1530, b: 430, c: 1551, d: 386, m: 0, t: 0 });
    points.push({ a: 1551, b: 386, c: 1555, d: 336, m: 0, t: 0 });
    points.push({ a: 1555, b: 336, c: 1536, d: 290, m: 0, t: 0 });
    points.push({ a: 1536, b: 290, c: 1532, d: 272, m: 0, t: 0 });
    points.push({ a: 1532, b: 272, c: 1536, d: 252, m: 0, t: 0 });
    points.push({ a: 1536, b: 252, c: 1564, d: 197, m: 0, t: 0 });
    points.push({ a: 1564, b: 197, c: 1578, d: 186, m: 0, t: 0 });
    points.push({ a: 1578, b: 186, c: 1611, d: 184, m: 0, t: 0 });
    points.push({ a: 1611, b: 184, c: 1742, d: 183, m: 0, t: 0 });
    points.push({ a: 1742, b: 183, c: 1772, d: 162, m: 0, t: 0 });
    points.push({ a: 1772, b: 162, c: 1789, d: 146, m: 0, t: 0 });
    points.push({ a: 1789, b: 146, c: 1795, d: 117, m: 0, t: 0 });
    points.push({ a: 1795, b: 117, c: 1792, d: 79, m: 0, t: 0 });
    points.push({ a: 1792, b: 79, c: 1772, d: 50, m: 0, t: 0 });
    points.push({ a: 1772, b: 50, c: 1727, d: 30, m: 0, t: 0 });

    // Parede interna

    points.push({ a: 1699, b: 94, c: 1493, d: 94, m: 0, t: 0 });
    points.push({ a: 1493, b: 94, c: 1454, d: 135, m: 0, t: 0 });
    points.push({ a: 1454, b: 135, c: 1448, d: 160, m: 0, t: 0 });
    points.push({ a: 1448, b: 160, c: 1427, d: 192, m: 0, t: 0 });
    points.push({ a: 1427, b: 192, c: 1391, d: 211, m: 0, t: 0 });
    points.push({ a: 1391, b: 211, c: 1346, d: 211, m: 0, t: 0 });
    points.push({ a: 1346, b: 211, c: 1298, d: 192, m: 0, t: 0 });
    points.push({ a: 1298, b: 192, c: 1273, d: 165, m: 0, t: 0 });
    points.push({ a: 1273, b: 165, c: 1232, d: 94, m: 0, t: 0 });
    points.push({ a: 1232, b: 94, c: 295, d: 94, m: 0, t: 0 });
    points.push({ a: 295, b: 94, c: 256, d: 118, m: 0, t: 0 });
    points.push({ a: 256, b: 118, c: 237, d: 172, m: 0, t: 0 });
    points.push({ a: 237, b: 172, c: 198, d: 208, m: 0, t: 0 });
    points.push({ a: 198, b: 208, c: 163, d: 230, m: 0, t: 0 });
    points.push({ a: 163, b: 230, c: 116, d: 246, m: 0, t: 0 });
    points.push({ a: 116, b: 246, c: 102, d: 275, m: 0, t: 0 });
    points.push({ a: 102, b: 275, c: 101, d: 473, m: 0, t: 0 });
    points.push({ a: 101, b: 473, c: 133, d: 480, m: 0, t: 0 });
    points.push({ a: 133, b: 480, c: 147, d: 494, m: 0, t: 0 });
    points.push({ a: 147, b: 494, c: 171, d: 560, m: 0, t: 0 });
    points.push({ a: 171, b: 560, c: 172, d: 835, m: 0, t: 0 });
    points.push({ a: 172, b: 835, c: 229, d: 835, m: 0, t: 0 });
    points.push({ a: 229, b: 835, c: 244, d: 819, m: 0, t: 0 });
    points.push({ a: 244, b: 819, c: 247, d: 785, m: 0, t: 0 });
    points.push({ a: 247, b: 785, c: 221, d: 762, m: 0, t: 0 });
    points.push({ a: 221, b: 762, c: 204, d: 736, m: 0, t: 0 });
    points.push({ a: 204, b: 736, c: 189, d: 695, m: 0, t: 0 });
    points.push({ a: 189, b: 695, c: 190, d: 654, m: 0, t: 0 });
    points.push({ a: 190, b: 654, c: 205, d: 613, m: 0, t: 0 });
    points.push({ a: 205, b: 613, c: 235, d: 580, m: 0, t: 0 });
    points.push({ a: 235, b: 580, c: 286, d: 556, m: 0, t: 0 });
    points.push({ a: 286, b: 556, c: 338, d: 553, m: 0, t: 0 });
    points.push({ a: 338, b: 553, c: 381, d: 568, m: 0, t: 0 });
    points.push({ a: 381, b: 568, c: 402, d: 583, m: 0, t: 0 });
    points.push({ a: 402, b: 583, c: 424, d: 612, m: 0, t: 0 });
    points.push({ a: 424, b: 612, c: 457, d: 589, m: 0, t: 0 });
    points.push({ a: 457, b: 589, c: 479, d: 554, m: 0, t: 0 });
    points.push({ a: 479, b: 554, c: 464, d: 521, m: 0, t: 0 });
    points.push({ a: 464, b: 521, c: 452, d: 486, m: 0, t: 0 });
    points.push({ a: 452, b: 486, c: 453, d: 444, m: 0, t: 0 });
    points.push({ a: 453, b: 444, c: 461, d: 416, m: 0, t: 0 });
    points.push({ a: 461, b: 416, c: 396, d: 401, m: 0, t: 0 });
    points.push({ a: 396, b: 401, c: 369, d: 427, m: 0, t: 0 });
    points.push({ a: 369, b: 427, c: 324, d: 449, m: 0, t: 0 });
    points.push({ a: 324, b: 449, c: 265, d: 450, m: 0, t: 0 });
    points.push({ a: 265, b: 450, c: 214, d: 430, m: 0, t: 0 });
    points.push({ a: 214, b: 430, c: 177, d: 387, m: 0, t: 0 });
    points.push({ a: 177, b: 387, c: 164, d: 338, m: 0, t: 0 });
    points.push({ a: 164, b: 338, c: 169, d: 288, m: 0, t: 0 });
    points.push({ a: 169, b: 288, c: 191, d: 249, m: 0, t: 0 });
    points.push({ a: 191, b: 249, c: 222, d: 221, m: 0, t: 0 });
    points.push({ a: 222, b: 221, c: 263, d: 206, m: 0, t: 0 });
    points.push({ a: 263, b: 206, c: 283, d: 158, m: 0, t: 0 });
    points.push({ a: 283, b: 158, c: 312, d: 131, m: 0, t: 0 });
    points.push({ a: 312, b: 131, c: 363, d: 119, m: 0, t: 0 });
    points.push({ a: 363, b: 119, c: 955, d: 134, m: 0, t: 0 });
    points.push({ a: 955, b: 134, c: 997, d: 147, m: 0, t: 0 });
    points.push({ a: 997, b: 147, c: 1019, d: 182, m: 0, t: 0 });
    points.push({ a: 1019, b: 182, c: 1020, d: 247, m: 0, t: 0 });
    points.push({ a: 1020, b: 247, c: 1033, d: 247, m: 0, t: 0 });
    points.push({ a: 1033, b: 247, c: 1031, d: 697, m: 0, t: 0 });
    points.push({ a: 1031, b: 697, c: 795, d: 698, m: 0, t: 0 });
    points.push({ a: 795, b: 698, c: 793, d: 681, m: 0, t: 0 });
    points.push({ a: 793, b: 681, c: 693, d: 683, m: 0, t: 0 });
    points.push({ a: 693, b: 683, c: 660, d: 706, m: 0, t: 0 });
    points.push({ a: 660, b: 706, c: 658, d: 784, m: 0, t: 0 });
    points.push({ a: 658, b: 784, c: 667, d: 816, m: 0, t: 0 });
    points.push({ a: 667, b: 816, c: 1732, d: 814, m: 0, t: 0 });
    points.push({ a: 1732, b: 814, c: 1744, d: 793, m: 0, t: 0 });
    points.push({ a: 1744, b: 793, c: 1743, d: 480, m: 0, t: 0 });
    points.push({ a: 1743, b: 480, c: 1736, d: 457, m: 0, t: 0 });
    points.push({ a: 1736, b: 457, c: 1717, d: 447, m: 0, t: 0 });
    points.push({ a: 1717, b: 447, c: 1699, d: 450, m: 0, t: 0 });
    points.push({ a: 1699, b: 450, c: 1683, d: 457, m: 0, t: 0 });
    points.push({ a: 1683, b: 457, c: 1674, d: 481, m: 0, t: 0 });
    points.push({ a: 1674, b: 481, c: 1674, d: 739, m: 0, t: 0 });
    points.push({ a: 1674, b: 739, c: 1664, d: 763, m: 0, t: 0 });
    points.push({ a: 1664, b: 763, c: 1636, d: 779, m: 0, t: 0 });
    points.push({ a: 1636, b: 779, c: 1521, d: 781, m: 0, t: 0 });
    points.push({ a: 1521, b: 781, c: 1518, d: 799, m: 0, t: 0 });
    points.push({ a: 1518, b: 799, c: 1089, d: 797, m: 0, t: 0 });
    points.push({ a: 1089, b: 797, c: 1091, d: 555, m: 0, t: 0 });
    points.push({ a: 1091, b: 555, c: 1246, d: 554, m: 0, t: 0 });
    points.push({ a: 1246, b: 554, c: 1249, d: 497, m: 0, t: 0 });
    points.push({ a: 1249, b: 497, c: 1228, d: 494, m: 0, t: 0 });
    points.push({ a: 1228, b: 494, c: 1196, d: 476, m: 0, t: 0 });
    points.push({ a: 1196, b: 476, c: 1029, d: 229, m: 0, t: 0 });
    points.push({ a: 1029, b: 229, c: 1024, d: 197, m: 0, t: 0 });
    points.push({ a: 1024, b: 197, c: 1027, d: 157, m: 0, t: 0 });
    points.push({ a: 1027, b: 157, c: 1056, d: 133, m: 0, t: 0 });
    points.push({ a: 1056, b: 133, c: 1105, d: 124, m: 0, t: 0 });
    points.push({ a: 1105, b: 124, c: 1178, d: 135, m: 0, t: 0 });
    points.push({ a: 1178, b: 135, c: 1210, d: 152, m: 0, t: 0 });
    points.push({ a: 1210, b: 152, c: 1306, d: 268, m: 0, t: 0 });
    points.push({ a: 1306, b: 268, c: 1329, d: 243, m: 0, t: 0 });
    points.push({ a: 1329, b: 243, c: 1362, d: 227, m: 0, t: 0 });
    points.push({ a: 1362, b: 227, c: 1395, d: 220, m: 0, t: 0 });
    points.push({ a: 1395, b: 220, c: 1435, d: 218, m: 0, t: 0 });
    points.push({ a: 1435, b: 218, c: 1469, d: 231, m: 0, t: 0 });
    points.push({ a: 1469, b: 231, c: 1487, d: 221, m: 0, t: 0 });
    points.push({ a: 1487, b: 221, c: 1515, d: 168, m: 0, t: 0 });
    points.push({ a: 1515, b: 168, c: 1539, d: 137, m: 0, t: 0 });
    points.push({ a: 1539, b: 137, c: 1578, d: 126, m: 0, t: 0 });
    points.push({ a: 1578, b: 126, c: 1696, d: 123, m: 0, t: 0 });
    points.push({ a: 1696, b: 123, c: 1696, d: 94, m: 0, t: 0 });

    // Ilhas
    points.push({ a: 1402, b: 130, c: 1310, d: 127, m: 0, t: 0 });
    points.push({ a: 1310, b: 127, c: 1334, d: 156, m: 0, t: 0 });
    points.push({ a: 1334, b: 156, c: 1372, d: 165, m: 0, t: 0 });
    points.push({ a: 1372, b: 165, c: 1396, d: 152, m: 0, t: 0 });
    points.push({ a: 1396, b: 152, c: 1402, d: 131, m: 0, t: 0 });
    points.push({ a: 198, b: 105, c: 132, d: 106, m: 0, t: 0 });
    points.push({ a: 132, b: 106, c: 102, d: 127, m: 0, t: 0 });
    points.push({ a: 102, b: 127, c: 102, d: 185, m: 0, t: 0 });
    points.push({ a: 102, b: 185, c: 142, d: 166, m: 0, t: 0 });
    points.push({ a: 142, b: 166, c: 172, d: 142, m: 0, t: 0 });
    points.push({ a: 172, b: 142, c: 197, d: 106, m: 0, t: 0 });
    points.push({ a: 102, b: 542, c: 103, d: 809, m: 0, t: 0 });
    points.push({ a: 103, b: 809, c: 115, d: 826, m: 0, t: 0 });
    points.push({ a: 115, b: 826, c: 116, d: 593, m: 0, t: 0 });
    points.push({ a: 116, b: 593, c: 103, d: 547, m: 0, t: 0 });
    points.push({ a: 381, b: 243, c: 469, d: 227, m: 0, t: 0 });
    points.push({ a: 469, b: 227, c: 563, d: 217, m: 0, t: 0 });
    points.push({ a: 563, b: 217, c: 441, d: 178, m: 0, t: 0 });
    points.push({ a: 441, b: 178, c: 376, d: 183, m: 0, t: 0 });
    points.push({ a: 376, b: 183, c: 352, d: 194, m: 0, t: 0 });
    points.push({ a: 352, b: 194, c: 336, d: 213, m: 0, t: 0 });
    points.push({ a: 336, b: 213, c: 363, d: 222, m: 0, t: 0 });
    points.push({ a: 363, b: 222, c: 380, d: 242, m: 0, t: 0 });
    points.push({ a: 601, b: 174, c: 854, d: 186, m: 0, t: 0 });
    points.push({ a: 854, b: 186, c: 869, d: 199, m: 0, t: 0 });
    points.push({ a: 869, b: 199, c: 868, d: 240, m: 0, t: 0 });
    points.push({ a: 868, b: 240, c: 859, d: 239, m: 0, t: 0 });
    points.push({ a: 859, b: 239, c: 853, d: 210, m: 0, t: 0 });
    points.push({ a: 853, b: 210, c: 833, d: 198, m: 0, t: 0 });
    points.push({ a: 833, b: 198, c: 785, d: 197, m: 0, t: 0 });
    points.push({ a: 785, b: 197, c: 703, d: 204, m: 0, t: 0 });
    points.push({ a: 703, b: 204, c: 603, d: 174, m: 0, t: 0 });
    points.push({ a: 934, b: 185, c: 933, d: 241, m: 0, t: 0 });
    points.push({ a: 933, b: 241, c: 962, d: 240, m: 0, t: 0 });
    points.push({ a: 962, b: 240, c: 962, d: 204, m: 0, t: 0 });
    points.push({ a: 962, b: 204, c: 953, d: 192, m: 0, t: 0 });
    points.push({ a: 953, b: 192, c: 935, d: 188, m: 0, t: 0 });
    points.push({ a: 1745, b: 396, c: 1746, d: 279, m: 0, t: 0 });
    points.push({ a: 1746, b: 279, c: 1731, d: 264, m: 0, t: 0 });
    points.push({ a: 1731, b: 264, c: 1705, d: 260, m: 0, t: 0 });
    points.push({ a: 1705, b: 260, c: 1684, d: 266, m: 0, t: 0 });
    points.push({ a: 1684, b: 266, c: 1675, d: 289, m: 0, t: 0 });
    points.push({ a: 1675, b: 289, c: 1675, d: 397, m: 0, t: 0 });
    points.push({ a: 1675, b: 397, c: 1691, d: 382, m: 0, t: 0 });
    points.push({ a: 1691, b: 382, c: 1722, d: 382, m: 0, t: 0 });
    points.push({ a: 1722, b: 382, c: 1746, d: 396, m: 0, t: 0 });

    // Interdivisions
    // points.push({ a: 415, b: 237, c: 437, d: 290, m: 0, t: 0 });
    // points.push({ a: 520, b: 202, c: 644, d: 186, m: 0, t: 0 });
    // points.push({ a: 869, b: 218, c: 939, d: 215, m: 0, t: 0 });
    // points.push({ a: 138, b: 170, c: 167, d: 224, m: 0, t: 0 });


    return points;

}

function getRanhuras1() {

    const points = [];

    // points.push({ a: 1237, b: 284, c: 1364, d: 284, m: 0, t: 0 });
    // points.push({ a: 253, b: 63, c: 253, d: 143, m: 0, t: 0 });
    // points.push({ a: 440, b: 801, c: 440, d: 885, m: 0, t: 0 });
    // points.push({ a: 890, b: 570, c: 890, d: 648, m: 0, t: 0 });
    // points.push({ a: 1447, b: 809, c: 1447, d: 881, m: 0, t: 0 });
    // points.push({ a: 1708, b: 331, c: 1807, d: 331, m: 0, t: 0 });
    return points;

}
function getRanhuras2() {

    const points = [];

    // points.push({ a: 1497, b: 101, c: 1498, d: 148, m: 0, t: 0 });
    // points.push({ a: 1462, b: 110, c: 1463, d: 136, m: 0, t: 0 });
    // points.push({ a: 1417, b: 113, c: 1417, d: 135, m: 0, t: 0 });
    // points.push({ a: 1375, b: 113, c: 1376, d: 133, m: 0, t: 0 });
    // points.push({ a: 1334, b: 113, c: 1334, d: 134, m: 0, t: 0 });
    // points.push({ a: 1300, b: 113, c: 1300, d: 160, m: 0, t: 0 });

    // points.push({ a: 1359, b: 165, c: 1348, d: 180, m: 0, t: 0 });
    // points.push({ a: 1368, b: 172, c: 1358, d: 184, m: 0, t: 0 });
    // points.push({ a: 1378, b: 177, c: 1366, d: 192, m: 0, t: 0 });
    // points.push({ a: 1387, b: 181, c: 1374, d: 198, m: 0, t: 0 });

    // points.push({ a: 1402, b: 187, c: 1383, d: 205, m: 0, t: 0 });
    // points.push({ a: 1410, b: 193, c: 1394, d: 212, m: 0, t: 0 });
    // points.push({ a: 1424, b: 201, c: 1408, d: 220, m: 0, t: 0 });
    // points.push({ a: 1436, b: 209, c: 1420, d: 228, m: 0, t: 0 });
    // points.push({ a: 1450, b: 218, c: 1430, d: 235, m: 0, t: 0 });
    // points.push({ a: 1458, b: 219, c: 1432, d: 242, m: 0, t: 0 });
    // points.push({ a: 1468, b: 223, c: 1447, d: 245, m: 0, t: 0 });
    // points.push({ a: 1478, b: 231, c: 1463, d: 250, m: 0, t: 0 });
    // points.push({ a: 1489, b: 238, c: 1476, d: 255, m: 0, t: 0 });
    // points.push({ a: 1503, b: 247, c: 1503, d: 274, m: 0, t: 0 });
    // points.push({ a: 1518, b: 250, c: 1519, d: 284, m: 0, t: 0 });
    // points.push({ a: 1536, b: 252, c: 1537, d: 293, m: 0, t: 0 });
    // points.push({ a: 1554, b: 249, c: 1555, d: 300, m: 0, t: 0 });
    // points.push({ a: 1352, b: 265, c: 1352, d: 294, m: 0, t: 0 });
    // points.push({ a: 1328, b: 266, c: 1325, d: 292, m: 0, t: 0 });
    // points.push({ a: 1298, b: 260, c: 1270, d: 289, m: 0, t: 0 });
    points.push({ a: 1304, b: 160, c: 1335, d: 153, m: 0, t: -1 });
    // points.push({ a: 1345, b: 161, c: 1335, d: 174, m: 0, t: -1 });

    // points.push({ a: 991, b: 152, c: 953, d: 142, m: 0, t: 0 });
    // points.push({ a: 990, b: 153, c: 952, d: 143, m: 0, t: 0 });
    // points.push({ a: 989, b: 154, c: 951, d: 144, m: 0, t: 0 });
    // points.push({ a: 988, b: 155, c: 950, d: 145, m: 0, t: 0 });
    // points.push({ a: 987, b: 156, c: 949, d: 146, m: 0, t: 0 });
    // points.push({ a: 986, b: 157, c: 948, d: 147, m: 0, t: 0 });
    // points.push({ a: 985, b: 158, c: 947, d: 148, m: 0, t: 0 });
    // points.push({ a: 984, b: 159, c: 946, d: 149, m: 0, t: 0 });
    // points.push({ a: 983, b: 160, c: 945, d: 150, m: 0, t: 0 });
    // points.push({ a: 982, b: 161, c: 944, d: 151, m: 0, t: 0 });
    // points.push({ a: 981, b: 162, c: 943, d: 152, m: 0, t: 0 });
    // points.push({ a: 980, b: 163, c: 942, d: 153, m: 0, t: 0 });
    // points.push({ a: 979, b: 164, c: 941, d: 154, m: 0, t: 0 }); // 40
    // points.push({ a: 978, b: 165, c: 940, d: 155, m: 0, t: 0 });
    // points.push({ a: 977, b: 166, c: 939, d: 156, m: 0, t: 0 });
    // points.push({ a: 976, b: 167, c: 938, d: 157, m: 0, t: 0 });
    // points.push({ a: 975, b: 168, c: 937, d: 158, m: 0, t: 0 });
    // points.push({ a: 974, b: 169, c: 936, d: 159, m: 0, t: 0 });
    // points.push({ a: 973, b: 170, c: 935, d: 160, m: 0, t: 0 });

    // points.push({ a: 972, b: 171, c: 934, d: 161, m: 0, t: 0 });
    // points.push({ a: 971, b: 172, c: 933, d: 162, m: 0, t: 0 });
    // points.push({ a: 970, b: 173, c: 932, d: 163, m: 0, t: 0 });
    // points.push({ a: 969, b: 174, c: 931, d: 164, m: 0, t: 0 });
    // points.push({ a: 968, b: 175, c: 930, d: 165, m: 0, t: 0 });
    // points.push({ a: 967, b: 176, c: 929, d: 166, m: 0, t: 0 });
    // points.push({ a: 966, b: 177, c: 928, d: 167, m: 0, t: 0 });
    // points.push({ a: 965, b: 178, c: 927, d: 168, m: 0, t: 0 });
    // points.push({ a: 964, b: 179, c: 926, d: 169, m: 0, t: 0 });
    // points.push({ a: 963, b: 180, c: 925, d: 170, m: 0, t: 0 });


    // points.push({ a: 990, b: 184, c: 939, d: 184, m: 0, t: 0 });
    // points.push({ a: 990, b: 185, c: 939, d: 185, m: 0, t: 0 });
    // points.push({ a: 990, b: 186, c: 939, d: 186, m: 0, t: 0 });
    // points.push({ a: 990, b: 187, c: 939, d: 187, m: 0, t: 0 });
    // points.push({ a: 990, b: 188, c: 939, d: 188, m: 0, t: 0 }); // 28    
    // points.push({ a: 990, b: 189, c: 939, d: 189, m: 0, t: 0 });
    // points.push({ a: 990, b: 190, c: 939, d: 190, m: 0, t: 0 });
    // points.push({ a: 990, b: 191, c: 939, d: 191, m: 0, t: 0 });
    // points.push({ a: 990, b: 192, c: 939, d: 192, m: 0, t: 0 });

    // points.push({ a: 990, b: 194, c: 939, d: 194, m: 0, t: 0 });
    // points.push({ a: 990, b: 196, c: 939, d: 196, m: 0, t: 0 });
    // points.push({ a: 990, b: 198, c: 939, d: 198, m: 0, t: 0 });
    // points.push({ a: 990, b: 200, c: 939, d: 200, m: 0, t: 0 });

    // points.push({ a: 990, b: 205, c: 939, d: 205, m: 0, t: 0 });
    // points.push({ a: 990, b: 210, c: 939, d: 210, m: 0, t: 0 });
    // points.push({ a: 990, b: 215, c: 939, d: 215, m: 0, t: 0 });
    // points.push({ a: 990, b: 220, c: 939, d: 220, m: 0, t: 0 });
    // points.push({ a: 990, b: 225, c: 939, d: 225, m: 0, t: 0 });



    // points.push({ a: 437, b: 337, c: 482, d: 337, m: 0, t: 0 });
    // points.push({ a: 835, b: 455, c: 835, d: 490, m: 0, t: 0 });


    return points;
}

function getRanhuras4() {

    const points = [];

    // points.push({ a: 316, b: 39, c: 310, d: 80, m: 0, t: 0 });
    // points.push({ a: 52, b: 270, c: 93, d: 276, m: 0, t: 0 });
    // points.push({ a: 56, b: 346, c: 89, d: 346, m: 0, t: 0 });
    // points.push({ a: 52, b: 403, c: 89, d: 402, m: 0, t: 0 });
    // points.push({ a: 53, b: 469, c: 92, d: 471, m: 0, t: 0 });
    // points.push({ a: 184, b: 843, c: 182, d: 880, m: 0, t: 0 });
    // points.push({ a: 237, b: 837, c: 268, d: 867, m: 0, t: 0 });
    // points.push({ a: 257, b: 792, c: 296, d: 807, m: 0, t: 0 });
    // points.push({ a: 431, b: 622, c: 442, d: 667, m: 0, t: 0 });
    // points.push({ a: 490, b: 565, c: 520, d: 599, m: 0, t: 0 });
    // points.push({ a: 489, b: 554, c: 531, d: 559, m: 0, t: 0 });
    // points.push({ a: 480, b: 412, c: 515, d: 394, m: 0, t: 0 });
    // points.push({ a: 489, b: 446, c: 524, d: 436, m: 0, t: 0 });
    // points.push({ a: 490, b: 485, c: 522, d: 486, m: 0, t: 0 });        

    // points.push({ a: 500, b: 366, c: 460, d: 407, m: 0, t: 0 });
    // points.push({ a: 414, b: 351, c: 401, d: 389, m: 0, t: 0 });

    // points.push({ a: 394, b: 323, c: 353, d: 332, m: 0, t: 0 });
    // points.push({ a: 320, b: 260, c: 351, d: 232, m: 0, t: 0 });
    // points.push({ a: 277, b: 207, c: 327, d: 209, m: 0, t: 0 });

    // points.push({ a: 391, b: 252, c: 406, d: 275, m: 0, t: 0 });
    // points.push({ a: 815, b: 248, c: 854, d: 242, m: 0, t: 0 });
    // points.push({ a: 876, b: 242, c: 925, d: 243, m: 0, t: 0 });
    // points.push({ a: 972, b: 246, c: 1010, d: 247, m: 0, t: 0 });
    // points.push({ a: 791, b: 630, c: 794, d: 674, m: 0, t: 0 });
    // points.push({ a: 690, b: 634, c: 691, d: 666, m: 0, t: 0 });
    // points.push({ a: 607, b: 691, c: 650, d: 695, m: 0, t: 0 });
    // points.push({ a: 603, b: 831, c: 652, d: 806, m: 0, t: 0 });
    // points.push({ a: 695, b: 833, c: 690, d: 876, m: 0, t: 0 });
    // points.push({ a: 807, b: 839, c: 800, d: 874, m: 0, t: 0 });
    // points.push({ a: 896, b: 828, c: 898, d: 875, m: 0, t: 0 });
    // points.push({ a: 1022, b: 829, c: 1018, d: 871, m: 0, t: 0 });
    // points.push({ a: 1164, b: 832, c: 1162, d: 870, m: 0, t: 0 });
    // points.push({ a: 1290, b: 836, c: 1292, d: 878, m: 0, t: 0 });
    // points.push({ a: 1420, b: 840, c: 1421, d: 870, m: 0, t: 0 });
    // points.push({ a: 1541, b: 830, c: 1546, d: 871, m: 0, t: 0 });
    // points.push({ a: 1661, b: 833, c: 1660, d: 871, m: 0, t: 0 });
    // points.push({ a: 1746, b: 824, c: 1788, d: 854, m: 0, t: 0 });
    // points.push({ a: 1753, b: 752, c: 1802, d: 752, m: 0, t: 0 });
    // points.push({ a: 1757, b: 678, c: 1794, d: 676, m: 0, t: 0 });
    // points.push({ a: 1752, b: 599, c: 1802, d: 600, m: 0, t: 0 });
    // points.push({ a: 1752, b: 528, c: 1801, d: 527, m: 0, t: 0 });
    // points.push({ a: 1748, b: 475, c: 1798, d: 475, m: 0, t: 0 });
    // points.push({ a: 1619, b: 482, c: 1667, d: 481, m: 0, t: 0 });
    // points.push({ a: 1625, b: 536, c: 1665, d: 535, m: 0, t: 0 });
    // points.push({ a: 1619, b: 605, c: 1662, d: 608, m: 0, t: 0 });
    // points.push({ a: 1614, b: 670, c: 1668, d: 679, m: 0, t: 0 });
    // points.push({ a: 1616, b: 728, c: 1633, d: 760, m: 0, t: 0 });
    // points.push({ a: 1525, b: 731, c: 1524, d: 765, m: 0, t: 0 });
    // points.push({ a: 1255, b: 552, c: 1320, d: 553, m: 0, t: 0 });
    // points.push({ a: 1257, b: 507, c: 1316, d: 504, m: 0, t: 0 });
    // points.push({ a: 1254, b: 485, c: 1276, d: 450, m: 0, t: 0 });
    // points.push({ a: 1188, b: 435, c: 1220, d: 405, m: 0, t: 0 });
    // points.push({ a: 1082, b: 283, c: 1112, d: 260, m: 0, t: 0 });
    // points.push({ a: 1031, b: 181, c: 1084, d: 205, m: 0, t: 0 });
    // points.push({ a: 1121, b: 136, c: 1119, d: 189, m: 0, t: 0 });
    // points.push({ a: 1196, b: 153, c: 1161, d: 195, m: 0, t: 0 });
    // points.push({ a: 1279, b: 320, c: 1301, d: 281, m: 0, t: 0 });
    // points.push({ a: 1481, b: 238, c: 1522, d: 260, m: 0, t: 0 });
    // points.push({ a: 1533, b: 175, c: 1553, d: 195, m: 0, t: 0 });
    // points.push({ a: 1579, b: 139, c: 1582, d: 176, m: 0, t: 0 });
    // points.push({ a: 1662, b: 134, c: 1660, d: 175, m: 0, t: 0 });
    // points.push({ a: 1703, b: 132, c: 1747, d: 172, m: 0, t: 0 });
    // points.push({ a: 1709, b: 106, c: 1785, d: 105, m: 0, t: 0 });
    // points.push({ a: 1710, b: 81, c: 1728, d: 41, m: 0, t: 0 });
    // points.push({ a: 1603, b: 80, c: 1603, d: 36, m: 0, t: 0 });
    // points.push({ a: 1501, b: 86, c: 1501, d: 40, m: 0, t: 0 });
    // points.push({ a: 1229, b: 85, c: 1229, d: 40, m: 0, t: 0 });
    // points.push({ a: 1058, b: 85, c: 1061, d: 31, m: 0, t: 0 });
    // points.push({ a: 883, b: 81, c: 880, d: 25, m: 0, t: 0 });
    // points.push({ a: 726, b: 83, c: 732, d: 37, m: 0, t: 0 });
    // points.push({ a: 595, b: 80, c: 589, d: 43, m: 0, t: 0 });

    return points;

}

function getRanhuras5() {

    const points = [];

    points.push({ a: 378, b: 203, c: 430, d: 203, m: 0, t: 0, w: 1 });
    points.push({ a: 570, b: 204, c: 636, d: 204, m: 1, t: 0, w: 1 });
    points.push({ a: 773, b: 209, c: 813, d: 209, m: 0, t: 0, w: 1 });
    points.push({ a: 949, b: 208, c: 983, d: 208, m: 0, t: 0, w: 1 });
    points.push({ a: 1127, b: 205, c: 1164, d: 205, m: 0, t: 0, w: 1 });
    points.push({ a: 1311, b: 207, c: 1353, d: 207, m: 0, t: 0, w: 1 });
    points.push({ a: 1513, b: 201, c: 1555, d: 201, m: 0, t: 0, w: 1 });
    points.push({ a: 1510, b: 364, c: 1559, d: 364, m: 0, t: 0, w: 1 });
    points.push({ a: 1502, b: 531, c: 1558, d: 531, m: 0, t: 0, w: 1 });
    points.push({ a: 1502, b: 698, c: 1548, d: 698, m: 0, t: 0, w: 1 });
    points.push({ a: 1309, b: 691, c: 1359, d: 691, m: 0, t: 0, w: 1 });
    points.push({ a: 1130, b: 704, c: 1169, d: 704, m: 0, t: 0, w: 1 });
    points.push({ a: 938, b: 696, c: 990, d: 696, m: 0, t: 0, w: 1 });
    points.push({ a: 803, b: 696, c: 759, d: 696, m: 0, t: 0, w: 1 });
    points.push({ a: 617, b: 693, c: 569, d: 693, m: 0, t: 0, w: 1 });
    points.push({ a: 430, b: 696, c: 383, d: 696, m: 0, t: 0, w: 1 });
    points.push({ a: 304, b: 630, c: 304, d: 595, m: 0, t: 0, w: 1 });
    points.push({ a: 307, b: 471, c: 307, d: 430, m: 0, t: 0, w: 1 });
    points.push({ a: 306, b: 300, c: 306, d: 263, m: 0, t: 0, w: 1 });
    points.push({ a: 505, b: 270, c: 505, d: 304, m: 0, t: 0, w: 1 });
    points.push({ a: 500, b: 431, c: 500, d: 463, m: 0, t: 0, w: 1 });
    points.push({ a: 492, b: 596, c: 492, d: 628, m: 0, t: 0, w: 1 });
    points.push({ a: 1436, b: 635, c: 1436, d: 598, m: 0, t: 0, w: 1 });
    points.push({ a: 1436, b: 467, c: 1436, d: 428, m: 0, t: 0, w: 1 });
    points.push({ a: 1438, b: 304, c: 1438, d: 265, m: 0, t: 0, w: 1 });
    points.push({ a: 1631, b: 260, c: 1631, d: 301, m: 0, t: 0, w: 1 });
    points.push({ a: 1632, b: 432, c: 1632, d: 466, m: 0, t: 0, w: 1 });
    points.push({ a: 1632, b: 593, c: 1632, d: 634, m: 0, t: 0, w: 1 });
    points.push({ a: 374, b: 535, c: 425, d: 535, m: 0, t: 0, w: 1 });
    points.push({ a: 380, b: 368, c: 428, d: 368, m: 0, t: 0, w: 1 });
    points.push({ a: 1074, b: 443, c: 1136, d: 443, m: 0, t: 0, w: 1 });
    points.push({ a: 1295, b: 384, c: 1361, d: 384, m: 0, t: 0, w: 1 });
    points.push({ a: 1294, b: 510, c: 1363, d: 510, m: 0, t: 0, w: 1 });
    points.push({ a: 1239, b: 571, c: 1239, d: 612, m: 0, t: 0, w: 1 });
    points.push({ a: 1225, b: 280, c: 1225, d: 322, m: 0, t: 0, w: 1 });
    points.push({ a: 901, b: 270, c: 901, d: 317, m: 0, t: 0, w: 1 });
    points.push({ a: 881, b: 570, c: 881, d: 619, m: 0, t: 0, w: 1 });

    return points;

}

function getPista5() {

    const points = [];

    points.push({ a: 1773, b: 72, c: 97, d: 72, m: 0, t: 0 });
    points.push({ a: 97, b: 72, c: 97, d: 824, m: 0, t: 0 });
    points.push({ a: 97, b: 824, c: 1773, d: 823, m: 0, t: 0 });
    points.push({ a: 1773, b: 823, c: 1772, d: 72, m: 0, t: 0 });
    points.push({ a: 565, b: 145, c: 447, d: 144, m: 0, t: 0 });
    points.push({ a: 447, b: 144, c: 446, d: 260, m: 0, t: 0 });
    points.push({ a: 446, b: 260, c: 564, d: 260, m: 0, t: 0 });
    points.push({ a: 564, b: 260, c: 564, d: 146, m: 0, t: 0 });
    points.push({ a: 371, b: 145, c: 255, d: 145, m: 0, t: 0 });
    points.push({ a: 255, b: 145, c: 254, d: 259, m: 0, t: 0 });
    points.push({ a: 254, b: 259, c: 371, d: 259, m: 0, t: 0 });
    points.push({ a: 371, b: 259, c: 370, d: 147, m: 0, t: 0 });
    points.push({ a: 560, b: 311, c: 445, d: 311, m: 0, t: 0 });
    points.push({ a: 445, b: 311, c: 444, d: 424, m: 0, t: 0 });
    points.push({ a: 444, b: 424, c: 562, d: 425, m: 0, t: 0 });
    points.push({ a: 562, b: 425, c: 561, d: 312, m: 0, t: 0 });
    points.push({ a: 369, b: 311, c: 253, d: 311, m: 0, t: 0 });
    points.push({ a: 253, b: 311, c: 252, d: 423, m: 0, t: 0 });
    points.push({ a: 252, b: 423, c: 369, d: 424, m: 0, t: 0 });
    points.push({ a: 369, b: 424, c: 369, d: 312, m: 0, t: 0 });
    points.push({ a: 559, b: 475, c: 443, d: 476, m: 0, t: 0 });
    points.push({ a: 443, b: 476, c: 443, d: 590, m: 0, t: 0 });
    points.push({ a: 443, b: 590, c: 560, d: 590, m: 0, t: 0 });
    points.push({ a: 560, b: 590, c: 559, d: 475, m: 0, t: 0 });
    points.push({ a: 367, b: 475, c: 252, d: 477, m: 0, t: 0 });
    points.push({ a: 252, b: 477, c: 250, d: 591, m: 0, t: 0 });
    points.push({ a: 250, b: 591, c: 367, d: 590, m: 0, t: 0 });
    points.push({ a: 367, b: 590, c: 367, d: 478, m: 0, t: 0 });
    points.push({ a: 557, b: 640, c: 441, d: 641, m: 0, t: 0 });
    points.push({ a: 441, b: 641, c: 440, d: 755, m: 0, t: 0 });
    points.push({ a: 440, b: 755, c: 558, d: 756, m: 0, t: 0 });
    points.push({ a: 558, b: 756, c: 557, d: 642, m: 0, t: 0 });
    points.push({ a: 365, b: 641, c: 249, d: 642, m: 0, t: 0 });
    points.push({ a: 249, b: 642, c: 247, d: 754, m: 0, t: 0 });
    points.push({ a: 247, b: 754, c: 365, d: 755, m: 0, t: 0 });
    points.push({ a: 365, b: 755, c: 364, d: 641, m: 0, t: 0 });

    points.push({ a: 648, b: 144, c: 760, d: 144, m: 0, t: 0 });
    points.push({ a: 760, b: 144, c: 763, d: 260, m: 0, t: 0 });
    points.push({ a: 763, b: 260, c: 648, d: 261, m: 0, t: 0 });
    points.push({ a: 648, b: 261, c: 646, d: 145, m: 0, t: 0 });
    points.push({ a: 828, b: 145, c: 942, d: 144, m: 0, t: 0 });
    points.push({ a: 942, b: 144, c: 941, d: 262, m: 0, t: 0 });
    points.push({ a: 941, b: 262, c: 829, d: 264, m: 0, t: 0 });
    points.push({ a: 829, b: 264, c: 828, d: 145, m: 0, t: 0 });
    points.push({ a: 999, b: 144, c: 1113, d: 143, m: 0, t: 0 });
    points.push({ a: 1113, b: 143, c: 1114, d: 262, m: 0, t: 0 });
    points.push({ a: 1114, b: 262, c: 1000, d: 262, m: 0, t: 0 });
    points.push({ a: 1000, b: 262, c: 998, d: 145, m: 0, t: 0 });
    points.push({ a: 1184, b: 146, c: 1297, d: 144, m: 0, t: 0 });
    points.push({ a: 1297, b: 144, c: 1298, d: 261, m: 0, t: 0 });
    points.push({ a: 1298, b: 261, c: 1183, d: 263, m: 0, t: 0 });
    points.push({ a: 1183, b: 263, c: 1183, d: 144, m: 0, t: 0 });
    points.push({ a: 1383, b: 144, c: 1499, d: 144, m: 0, t: 0 });
    points.push({ a: 1499, b: 144, c: 1499, d: 258, m: 0, t: 0 });
    points.push({ a: 1499, b: 258, c: 1382, d: 259, m: 0, t: 0 });
    points.push({ a: 1382, b: 259, c: 1383, d: 147, m: 0, t: 0 });
    points.push({ a: 1575, b: 145, c: 1692, d: 144, m: 0, t: 0 });
    points.push({ a: 1692, b: 144, c: 1692, d: 258, m: 0, t: 0 });
    points.push({ a: 1692, b: 258, c: 1575, d: 259, m: 0, t: 0 });
    points.push({ a: 1575, b: 259, c: 1576, d: 144, m: 0, t: 0 });
    points.push({ a: 686, b: 339, c: 1068, d: 339, m: 0, t: 0 });
    points.push({ a: 1068, b: 339, c: 1069, d: 560, m: 0, t: 0 });
    points.push({ a: 1069, b: 560, c: 686, d: 557, m: 0, t: 0 });
    points.push({ a: 686, b: 557, c: 687, d: 339, m: 0, t: 0 });
    points.push({ a: 1147, b: 342, c: 1281, d: 343, m: 0, t: 0 });
    points.push({ a: 1281, b: 343, c: 1280, d: 556, m: 0, t: 0 });
    points.push({ a: 1280, b: 556, c: 1147, d: 557, m: 0, t: 0 });
    points.push({ a: 1147, b: 557, c: 1147, d: 343, m: 0, t: 0 });
    points.push({ a: 1381, b: 310, c: 1497, d: 312, m: 0, t: 0 });
    points.push({ a: 1497, b: 312, c: 1497, d: 423, m: 0, t: 0 });
    points.push({ a: 1497, b: 423, c: 1380, d: 422, m: 0, t: 0 });
    points.push({ a: 1380, b: 422, c: 1381, d: 311, m: 0, t: 0 });
    points.push({ a: 1572, b: 310, c: 1689, d: 310, m: 0, t: 0 });
    points.push({ a: 1689, b: 310, c: 1689, d: 423, m: 0, t: 0 });
    points.push({ a: 1689, b: 423, c: 1572, d: 422, m: 0, t: 0 });
    points.push({ a: 1572, b: 422, c: 1574, d: 312, m: 0, t: 0 });
    points.push({ a: 1379, b: 477, c: 1495, d: 476, m: 0, t: 0 });
    points.push({ a: 1495, b: 476, c: 1494, d: 588, m: 0, t: 0 });
    points.push({ a: 1494, b: 588, c: 1377, d: 588, m: 0, t: 0 });
    points.push({ a: 1377, b: 588, c: 1378, d: 477, m: 0, t: 0 });
    points.push({ a: 1571, b: 475, c: 1688, d: 477, m: 0, t: 0 });
    points.push({ a: 1688, b: 477, c: 1688, d: 590, m: 0, t: 0 });
    points.push({ a: 1688, b: 590, c: 1571, d: 589, m: 0, t: 0 });
    points.push({ a: 1571, b: 589, c: 1572, d: 477, m: 0, t: 0 });
    points.push({ a: 635, b: 637, c: 749, d: 636, m: 0, t: 0 });
    points.push({ a: 749, b: 636, c: 750, d: 750, m: 0, t: 0 });
    points.push({ a: 750, b: 750, c: 637, d: 752, m: 0, t: 0 });
    points.push({ a: 637, b: 752, c: 634, d: 637, m: 0, t: 0 });
    points.push({ a: 814, b: 635, c: 928, d: 634, m: 0, t: 0 });
    points.push({ a: 928, b: 634, c: 929, d: 752, m: 0, t: 0 });
    points.push({ a: 929, b: 752, c: 815, d: 753, m: 0, t: 0 });
    points.push({ a: 815, b: 753, c: 813, d: 637, m: 0, t: 0 });
    points.push({ a: 1009, b: 636, c: 1123, d: 636, m: 0, t: 0 });
    points.push({ a: 1123, b: 636, c: 1122, d: 752, m: 0, t: 0 });
    points.push({ a: 1122, b: 752, c: 1010, d: 753, m: 0, t: 0 });
    points.push({ a: 1010, b: 753, c: 1008, d: 635, m: 0, t: 0 });
    points.push({ a: 1186, b: 637, c: 1300, d: 635, m: 0, t: 0 });
    points.push({ a: 1300, b: 635, c: 1301, d: 752, m: 0, t: 0 });
    points.push({ a: 1301, b: 752, c: 1188, d: 753, m: 0, t: 0 });
    points.push({ a: 1188, b: 753, c: 1186, d: 634, m: 0, t: 0 });
    points.push({ a: 1377, b: 642, c: 1493, d: 642, m: 0, t: 0 });
    points.push({ a: 1493, b: 642, c: 1492, d: 755, m: 0, t: 0 });
    points.push({ a: 1492, b: 755, c: 1376, d: 754, m: 0, t: 0 });
    points.push({ a: 1376, b: 754, c: 1377, d: 642, m: 0, t: 0 });
    points.push({ a: 1569, b: 642, c: 1683, d: 641, m: 0, t: 0 });
    points.push({ a: 1683, b: 641, c: 1685, d: 755, m: 0, t: 0 });
    points.push({ a: 1685, b: 755, c: 1569, d: 755, m: 0, t: 0 });
    points.push({ a: 1569, b: 755, c: 1570, d: 642, m: 0, t: 0 });

    return points;

}

function getPista6() {

    const points = [];

    points.push({ a: 1828, b: 20, c: 28, d: 20, m: 0, t: 0 });
    points.push({ a: 28, b: 20, c: 28, d: 864, m: 0, t: 0 });
    points.push({ a: 28, b: 864, c: 1828, d: 864, m: 0, t: 0 });
    points.push({ a: 1828, b: 864, c: 1828, d: 20, m: 0, t: 0 });

    return points;

}

function getPista7() {

    const points = [];

    points.push({ a: 48, b: 347, c: 48, d: 229, m: 0, t: 0 });
    points.push({ a: 48, b: 229, c: 1709, d: 229, m: 0, t: 0 });
    points.push({ a: 1709, b: 229, c: 1709, d: 453, m: 0, t: 0 });
    points.push({ a: 1709, b: 453, c: 46, d: 453, m: 0, t: 0 });
    points.push({ a: 48, b: 453, c: 48, d: 334, m: 0, t: 0 });
    points.push({ a: 138, b: 340, c: 1614, d: 340, m: 0, t: 0 });

    // Finish
    // points.push({ a: 370, b: 230, c: 370, d: 340, m: 0, t: 0 });

    // Area
    // points.push({ a: 138, b: 339, c: 1614, d: 340, m: 0, t: 0 });
    // points.push({ a: 1614, b: 340, c: 1572, d: 341, m: 0, t: 0 });
    // points.push({ a: 1572, b: 341, c: 1575, d: 329, m: 0, t: 0 });
    // points.push({ a: 1575, b: 329, c: 1602, d: 325, m: 0, t: 0 });
    // points.push({ a: 1602, b: 325, c: 1626, d: 327, m: 0, t: 0 });
    // points.push({ a: 1626, b: 327, c: 1629, d: 338, m: 0, t: 0 });
    // points.push({ a: 1629, b: 338, c: 1627, d: 349, m: 0, t: 0 });
    // points.push({ a: 1627, b: 349, c: 1609, d: 352, m: 0, t: 0 });
    // points.push({ a: 1609, b: 352, c: 1574, d: 342, m: 0, t: 0 });

    return points;

}
function getRanhuras6() {

    const points = [];

    points.push({ a: 100, b: 84, c: 1660, d: 94, m: 0, t: 0, w: 1 });
    points.push({ a: 100, b: 157, c: 1660, d: 172, m: 0, t: 0, w: 1 });
    points.push({ a: 100, b: 240, c: 1660, d: 251, m: 0, t: 0, w: 1 });
    points.push({ a: 100, b: 319, c: 1660, d: 332, m: 0, t: 0, w: 1 });
    points.push({ a: 100, b: 395, c: 1660, d: 403, m: 0, t: 0, w: 1 });
    points.push({ a: 100, b: 469, c: 1660, d: 466, m: 0, t: 0, w: 1 });
    points.push({ a: 100, b: 545, c: 1660, d: 546, m: 0, t: 0, w: 1 });
    points.push({ a: 100, b: 623, c: 1660, d: 625, m: 0, t: 0, w: 1 });
    points.push({ a: 100, b: 697, c: 1660, d: 697, m: 0, t: 0, w: 1 });
    points.push({ a: 100, b: 769, c: 1660, d: 771, m: 0, t: 0, w: 1 });

    points.push({ a: 107, b: 80, c: 102, d: 780, m: 0, t: 0, w: 1 });
    points.push({ a: 196, b: 80, c: 191, d: 780, m: 0, t: 0, w: 1 });
    points.push({ a: 275, b: 80, c: 276, d: 780, m: 0, t: 0, w: 1 });
    points.push({ a: 351, b: 80, c: 361, d: 780, m: 0, t: 0, w: 1 });
    points.push({ a: 439, b: 80, c: 447, d: 780, m: 0, t: 0, w: 1 });
    points.push({ a: 530, b: 80, c: 534, d: 780, m: 0, t: 0, w: 1 });
    points.push({ a: 624, b: 80, c: 626, d: 780, m: 0, t: 0, w: 1 });
    points.push({ a: 733, b: 80, c: 718, d: 780, m: 0, t: 0, w: 1 });
    points.push({ a: 829, b: 80, c: 813, d: 780, m: 0, t: 0, w: 1 });
    points.push({ a: 931, b: 80, c: 926, d: 780, m: 0, t: 0, w: 1 });
    points.push({ a: 1027, b: 80, c: 1025, d: 780, m: 0, t: 0, w: 1 });
    points.push({ a: 1127, b: 80, c: 1131, d: 780, m: 0, t: 0, w: 1 });
    points.push({ a: 1242, b: 80, c: 1234, d: 780, m: 0, t: 0, w: 1 });
    points.push({ a: 1332, b: 80, c: 1332, d: 780, m: 0, t: 0, w: 1 });
    points.push({ a: 1421, b: 80, c: 1430, d: 780, m: 0, t: 0, w: 1 });
    points.push({ a: 1515, b: 80, c: 1524, d: 780, m: 0, t: 0, w: 1 });
    points.push({ a: 1629, b: 80, c: 1643, d: 780, m: 0, t: 0, w: 1 });

    return points;

}
/**
 * When loadImage is done it trigger this function below.
 */
function spriteLoaded() {

    if (typeof pista !== 'undefined') {

        if (pista.spritesheet !== undefined) {
            pista.spritesheet.loadPixels();
            makeMatrixRoads();
            waveFront();
            setFinishLineNumber(pista.trackSize)
            clearLostsZeros()
            // showRoads(funShowRoads);        
        }

        pista.waveFronted = true;
        pista.spriteLoaded = true;

    }

}

/**
 * After the waveFront transforms the track's 0 pixels into increasing numbers,
 * there might still be 0 pixels off the track where the Wave Front couldn't reach.
 * These zeros need to be eliminated because if they are close to the track,
 * it could return the car's position as Zero, which would be a final km.
 */

function clearLostsZeros() {
    for (let i = 0; i < roads.length; i++) {
        for (let j = 0; j < roads[i].length; j++) {
            if (roads[i][j] === 0) {
                roads[i][j] = -1
            }
        }
    }
}

function funShowRoads(i, j, e) {

    if (e > 0) {

        // const mapX = map(roads[i][j], pista.trackSize, 0, 0, 255);
        const mapX = Math.floor(map(roads[i][j], pista.trackSize, 0, 250, 0));
        const cor = 'hsla(' + mapX + ',100%,50%,0.8)';

        pg.fill(cor)
        pg.circle(i, j, 1);

    }

    if (e == 0) {
        pg.fill(255, 0, 0)
        pg.circle(i, j, 18);
        pg.text(`(${i},${j})`, i, j + 8)
        console.log('AXAZERO', i, j, e)
    }


}

function setFinishLineNumber(sizeOfTrack) {

    for (let i = 0; i < roads.length; i++) {
        const line = roads[i];
        for (let j = 0; j < line.length; j++) {
            if (roads[i][j] == -2) {
                roads[i][j] = sizeOfTrack
            }

        }

    }

}
function isFinalStripColor(r, g, b, a) {

    if (a == 255) {

        // Warning: Png transparency means rgb 0,0,0
        if (r == 0 && g == 0 && b == 0) {
            return true
        } else if (r == 105 && g == 105 && b == 105) {
            return true
        }
    }

    return false

}

function makeMatrixRoads() {

    let pixelIndex, r, g, b, a;
    roads = [];

    for (let i = 0; i < pista.spritesheet.width; i++) {

        roads[i] = [];
        for (let j = 0; j < pista.spritesheet.height; j++) {

            pixelIndex = (i + j * pista.spritesheet.width) * 4;
            r = pista.spritesheet.pixels[pixelIndex + 0];
            g = pista.spritesheet.pixels[pixelIndex + 1];
            b = pista.spritesheet.pixels[pixelIndex + 2];
            a = pista.spritesheet.pixels[pixelIndex + 3];

            if (r == pista.corDaPista.r && g == pista.corDaPista.g && b == pista.corDaPista.b) {
                roads[i][j] = 0; // Zero é a pista e será processada no wavefront!
            } else if (isFinalStripColor(r, g, b, a)) {
                roads[i][j] = -2; // max pista
            } else {
                roads[i][j] = -1;
            }

        }

    }

}

function waveFront() {

    let a = [pista.startRoad];
    let b = [];

    let value;
    let i;
    let j;

    while (a.length > 0) {

        for (let x = 0; x < a.length; x++) {

            value = a[x].value + 1;

            i = a[x].i;
            j = a[x].j + 1;
            if (roads[i] !== undefined && roads[i][j] == 0) {
                // Discovery new node.
                roads[i][j] = value;
                b.push({ i: i, j: j, value: value });
            }

            i = a[x].i + 1;
            j = a[x].j;

            if (roads[i] !== undefined && roads[i][j] == 0) {
                // Discovery new node.
                roads[i][j] = value;
                b.push({ i: i, j: j, value: value });
            }

            i = a[x].i;
            j = a[x].j - 1;
            if (roads[i] !== undefined && roads[i][j] == 0) {
                // Discovery new node.
                roads[i][j] = value;
                b.push({ i: i, j: j, value: value });
            }

            i = a[x].i - 1;
            j = a[x].j;
            if (roads[i] !== undefined && roads[i][j] == 0) {
                // Discovery new node.
                roads[i][j] = value;
                b.push({ i: i, j: j, value: value });
            }

        }

        a = [...b];
        b = [];

    }

    pista.trackSize = value;
    pista.setPistaTimeOut();

}


function showRoads(myFunc) {

    // Esta função é lenta.

    console.log("Showing track thermal map...")

    pg.noStroke();

    roads.forEach((subArray, i) => {
        subArray.forEach((e, j) => {
            myFunc(i, j, e)
        })
    });

    console.log("done")
}
