export function drawnRec(rec,ctx){
    ctx.fillStyle = rec.color
    ctx.fillRect(rec.x,rec.y,rec.w,rec.h)
}