import { drawnRec } from "./func/drawn.js"
var canvas = document.getElementById('display')
var ctx = canvas.getContext('2d')
var p1 = {
    x:0,
    y:0,
    w:50,
    h:50,
    color:'#0ff'
}
var p2 = {
    x:70,
    y:70,
    w:50,
    h:50,
    color:'#ff00'
}
drawnRec(p1,ctx)
