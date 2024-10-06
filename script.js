import { drawnRec } from "./func/drawn.js"
var canvas = document.getElementById('display')
var ctx = canvas.getContext('2d')
window.init = init
window.reset =reset
var keys = {}

var p1 = {
    x:40,
    y:canvas.height-260,
    w:20,
    h:60,
    a:10,
    color:'white',
    score: 0
}
var p2 = {
    x:canvas.width-40,
    y:canvas.height-370,
    w:20,
    h:60,
    a:10,
    color:'white',
    score: 0
}
var bol = {
    x:70,
    y:canvas.height-210,
    w:20,
    h:20,
    a:10,
    dx:1,
    dy:1,
    color:'yellow',
    beats: 0
}
function update(){
    
    if (keys['ArrowUp'] && p2.y >=10){
        p2.y -= p2.a
    }
    if (keys['ArrowDown']&& p2.y+p2.h <= canvas.height-10){
        p2.y += p2.a
    }
    if (keys['w'] && p1.y >=10  ||keys['W'] && p1.y >=10 ){
        p1.y -= p1.a
    }
    if (keys['s']&& p1.y+p1.h <=canvas.height-10 ||keys['S'] && p1.y+p1.h <=canvas.heigh-10){
        p1.y += p1.a
    }
    
    //colisao da bola p2
    if(bol.x+bol.w  >= (p2.x) && bol.y<= p2.y+p2.h+20&& bol.y>= p2.y-20){
        bol.dx = -1
        bol.x += bol.a*bol.dx
        bol.beats++
        if(bol.beats==5){
            bol.a = 15
            p1.a = 20
            p2.a = 20
        }
    }
    //colisao da bola p1
    if(bol.x+bol.w <= (p1.x+p1.w)&& bol.y<= p1.y+p1.h+20&& bol.y>= p1.y-20){
        //mudar direção x
        bol.dx = 1
        bol.x += bol.a*bol.dx
        bol.beats++
        if(bol.beats==5){
            bol.a = 15
            p1.a = 20
            p2.a = 20
        }
    }
    //colisao paredes
    if (bol.y >=canvas.height-20){
        bol.dy = -1
    }
    if (bol.y <=20){
        bol.dy = 1
    }
    if(bol.x>canvas.width){
        bol.a = 0
        p1.score++
        bol.x = 400
        bol.y = 150
        bol.beats = 0
        p1.a = 10
        p2.a = 10
        setTimeout(()=>{
            bol.a = 10
        },1000)
        
    }
    if(bol.x< 0){
        bol.a = 0
        p2.score++
        bol.x = 400
        bol.y = 150
        bol.beats = 0
        p1.a = 10
        p2.a = 10
        setTimeout(()=>{
            bol.a = 10
        },1000)
    }
    bol.x += bol.a*bol.dx
    bol.y += bol.a*bol.dy
}
function draw(){
    var sc = document.getElementById('score1')
    var sc2 = document.getElementById('score2')
    sc.innerText = p1.score
    sc2.innerText = p2.score
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update()
    drawnRec(bol,ctx)
    drawnRec(p1,ctx)
    drawnRec(p2,ctx)
    setTimeout(()=>{
        requestAnimationFrame(draw)
    },16,666)
}
window.addEventListener('keyup',(event)=>{
    keys[event.key] = false
})
window.addEventListener('keydown',(event)=>{
    if (event.key == 'Enter'){
        init()
    }
    keys[event.key] = true
    
})
function init(){
    document.getElementById('Reset').style.display = 'block'
    document.getElementById('start-button').style.display = 'none'
    draw()
}
function reset(){
    p1.score = 0 
    p2.score = 0
}

