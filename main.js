document.getElementById('carCount').value = localStorage.getItem("carCount") || 1;
document.getElementById('mutationAmount').value = localStorage.getItem("mutationAmount") || '0.5';

const carCanvas=document.getElementById("carCanvas");
carCanvas.width=200;
const networkCanvas=document.getElementById("networkCanvas");
networkCanvas.width=300;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road=new Road(carCanvas.width/2,carCanvas.width*0.9);

const N=Number(document.getElementById('carCount').value);
const cars=generateCars(N);
let bestCar=cars[0];

if(!localStorage.getItem("beenHereBefore")){
    localStorage.setItem("beenHereBefore","true");
    localStorage.setItem("bestBrain",'{"levels":[{"inputs":[0.449276517347018,0,0,0,0],"outputs":[0,1,1,0,1,1],"biases":[0.11218345833031393,-0.12311793054027818,-0.21147701832017865,0.3746049632210703,-0.20692074721321546,-0.5023878340720398],"weights":[[-0.39411764307586444,-0.23331877040835625,-0.041977953557852755,-0.16669141957852834,0.07775491652142251,-0.19229091956672212],[-0.24736860112182882,-0.2929524544276023,0.06877237695952489,0.4932722999274123,0.46713815434352535,0.26972525224291394],[-0.40005843759084925,-0.2561074632602158,-0.12187689961607373,-0.09513522971188294,-0.19420072780600744,-0.25303405321182465],[-0.30367654220760876,0.45254242011495033,-0.2172170518427418,0.3022353967959706,-0.34934409145768436,0.27242011592684723],[-0.44356764388066594,-0.11149854267500024,0.03585310368018067,0.09219132372061939,-0.3951852819558729,-0.4960760676211176]]},{"inputs":[0,1,1,0,1,1],"outputs":[1,1,1,0],"biases":[-0.3867058847624537,0.06856491225428235,0.03358918393936662,-0.27052121807375745],"weights":[[0.053616420558745506,-0.5293116411016668,-0.03313420135159893,-0.13855336999140405],[-0.34223988143571016,0.4185281090852809,0.09731703832700536,-0.19862662924283497],[0.4849294118579556,0.026147913798276995,0.15427960798809554,-0.4126881852070577],[-0.06300287940586181,-0.168786396716116,0.5688648961057126,-0.5307342186097538],[0.15133269898115412,-0.2962424636287772,0.5214223919998506,0.4162308092374202],[0.21392099790314792,0.1311842858013192,-0.5164045359425236,-0.41469458870869086]]}]}');
}
if(localStorage.getItem("bestBrain")){
    for(let i=0;i<cars.length;i++){
        cars[i].brain=JSON.parse(
            localStorage.getItem("bestBrain"));
        if(i!=0){
            NeuralNetwork.mutate(cars[i].brain,Number(document.getElementById('mutationAmount').value));
        }
    }
}

const traffic=[
    new Car(road.getLaneCenter(1),-100,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-300,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-300,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-500,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-500,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-700,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-700,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-900,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-900,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-1100,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-1100,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-1300,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-1300,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-1500,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-1500,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-1700,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-1700,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-1900,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-1900,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-2100,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-2100,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-2300,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-2300,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-2500,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-2500,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-2700,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-2700,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-2900,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-2900,30,50,"DUMMY",2,getRandomColor()),
];

animate();

function bestSol(){
    document.getElementById('carCount').value = 1;
    localStorage.setItem("bestBrain",'{"levels":[{"inputs":[0.5150997995159452,0.10402125892432446,0,0,0],"outputs":[0,1,1,0,1,1],"biases":[0.05383610021159259,-0.18802443241772718,-0.16212474806921345,0.32838504872744556,-0.2972691375855308,-0.6535021143811355],"weights":[[-0.4038463841384254,-0.22590103266250533,-0.05658180249670944,-0.27148019134948576,0.08391612521082367,-0.2569591348672924],[-0.24012892843001818,-0.4179608176401858,0.048547994901820046,0.6349415378716786,0.6035367819247098,0.2599081035543314],[-0.41826661092294704,-0.21372844008374345,-0.21753873409129654,-0.042653362619576474,-0.1639843403605995,-0.38080609963100714],[-0.4038473985961179,0.39871218576972217,-0.2072296641632819,0.3532758174765731,-0.31369774344430545,0.3730130032678658],[-0.4953662542221654,-0.19278248742358475,0.0456057907531805,0.13098471609576,-0.5425569790739264,-0.4969656980773154]]},{"inputs":[0,1,1,0,1,1],"outputs":[1,1,1,0],"biases":[-0.3691287290642349,-0.009783367041205748,0.011745882536384644,-0.2941032859399172],"weights":[[0.16591384133077322,-0.5258799554938975,-0.06201907683965849,-0.085317376569681],[-0.3216568259515421,0.3914840321023466,0.12159633198249065,-0.16056321129596138],[0.5676328245905705,-0.03421666038716645,0.26260670729901314,-0.4958401392888674],[-0.15823951406558714,-0.24307859020739545,0.6764614053311746,-0.5713588174711489],[0.1762419311615134,-0.37483160128975523,0.5635985250393782,0.4298268945682956],[0.16159611534048296,0.17470061971009002,-0.536827828307758,-0.3823865494068281]]}]}');
}

function save(){
    localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));
}

function discard(){
    localStorage.removeItem("bestBrain");
}

function generateCars(N){
    const cars=[];
    for(let i=1;i<=N;i++){
        cars.push(new Car(road.getLaneCenter(1),100,30,50,"AI"));
    }
    return cars;
}

function animate(time){
    for(let i=0;i<traffic.length;i++){
        traffic[i].update(road.borders,[]);
    }
    for(let i=0;i<cars.length;i++){
        cars[i].update(road.borders,traffic);
    }
    bestCar=cars.find(
        c=>c.y==Math.min(
            ...cars.map(c=>c.y)
        ));

    carCanvas.height=window.innerHeight;
    networkCanvas.height=window.innerHeight;

    carCtx.save();
    carCtx.translate(0,-bestCar.y+carCanvas.height*0.7);

    road.draw(carCtx);
    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(carCtx);
    }
    carCtx.globalAlpha=0.2;
    for(let i=0;i<cars.length;i++){
        cars[i].draw(carCtx);
    }
    carCtx.globalAlpha=1;
    bestCar.draw(carCtx,true);

    carCtx.restore();

    networkCtx.lineDashOffset=-time/50;
    Visualizer.drawNetwork(networkCtx,bestCar.brain);
    requestAnimationFrame(animate);
}