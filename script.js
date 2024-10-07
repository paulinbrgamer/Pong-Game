import { drawnRec } from "./func/drawn.js"
var canvas = document.getElementById('display')
var ctx = canvas.getContext('2d')
var velocity = 10
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
    score: 0,
    beats: 0
}
var p2 = {
    x:canvas.width-40,
    y:canvas.height-260,
    w:20,
    h:60,
    a:10,
    color:'white',
    score: 0,
    beats: 0
}
var bol = {
    x:400,
    y:canvas.height-200,
    w:20,
    h:20,
    a:0,
    dx:1,
    dy:1,
    color:'yellow',
    
}
var tail = {
    x:420,
    y:canvas.height-220,
    w:20,
    h:20,
    color:'rgba(255,255,0,0.9)',
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
    if (keys['s']&& p1.y+p1.h <=canvas.height-10 ||keys['S'] && p1.y+p1.h <=canvas.height-10){
        p1.y += p1.a
    }
    
    //colisao da bola p2
    if(bol.x== p2.x-p2.w && bol.y+bol.h >= p2.y&& bol.y <= p2.y+p2.h){
        bol.dx = -1
        bol.x += bol.a*bol.dx
        p2.beats++
        if(keys['ArrowLeft'] && p2.beats>=3){
            p2.beats = 0
            velocity *=3
            
        }
        console.log("Colidiu")
    }
    //colisao da bola p1
    if(bol.x== p1.x+p1.w && bol.y+bol.h >= p1.y&& bol.y <= p1.y+p1.h){
        //mudar direção x
        bol.dx = 1
        bol.x += bol.a*bol.dx
        p1.beats++
        if(keys['d'] && p1.beats>=3){
            p1.beats = 0
            velocity *=3
            
        }
        console.log("Colidiu")  
    }
    //colisao paredes y
    if (bol.y >=canvas.height-20){
        bol.dy = -1
    }
    if (bol.y <=0){
        bol.dy = 1
    }
    
    if(bol.x>canvas.width){
        setTimeout(()=>{
        bol.x = 400
        bol.y = 150
        
        p2.beats = 0
        },1000)
        p1.score++
    }
    if(bol.x< 0){
        setTimeout(()=>{
        bol.x = 400
        bol.y = 150
        
        p1.beats = 0

        },1000)
        p2.score++
    }
    setTimeout(()=>{
        bol.a = velocity
    },2000)
    tail.x = bol.x
    tail.y = bol.y
    bol.x += bol.a*bol.dx
    bol.y += bol.a*bol.dy
    if(velocity>10){
        velocity--
    }
   
    
}
function draw(){
    var sc = document.getElementById('score1')
    var sc2 = document.getElementById('score2')
    var bar1 = document.getElementById('bar1')
    var bar2 = document.getElementById('bar2')
    if(p1.beats<=3){
        bar1.style.width = (p1.beats*33)+'px'
    }
    if(p2.beats<=3){
        bar2.style.width = (p2.beats*33)+'px'
    }
    sc.innerText = p1.score
    sc2.innerText = p2.score
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update()
    drawnRec(bol,ctx)
    drawnRec(p1,ctx)
    drawnRec(p2,ctx)
    drawnRec(tail,ctx)
    setTimeout(()=>{
        requestAnimationFrame(draw)
    },16.666)
}
function init(){
    document.getElementById('Reset').style.display = 'block'
    document.getElementById('start-button').style.display = 'none'
    draw()
    
}
function reset(){
    p1 = {
        x:40,
        y:canvas.height-260,
        w:20,
        h:60,
        a:10,
        color:'white',
        score: 0,
        beats: 0
    }
     p2 = {
        x:canvas.width-40,
        y:canvas.height-260,
        w:20,
        h:60,
        a:10,
        color:'white',
        score: 0,
        beats: 0
    }
     bol = {
        x:400,
        y:canvas.height-200,
        w:20,
        h:20,
        a:0,
        dx:1,
        dy:1,
        color:'yellow',
        
    }
     tail = {
        x:420,
        y:canvas.height-220,
        w:20,
        h:20,
        color:'rgba(255,255,0,0.9)',
    }
}
//capiturar inputes
window.addEventListener('keyup',(event)=>{
    keys[event.key] = false
})
window.addEventListener('keydown',(event)=>{
    if (event.key == 'Enter'){
        if (document.getElementById('start-button').style.display != 'none'){
            init()
        }
    }
    keys[event.key] = true
    
    
})

