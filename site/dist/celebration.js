let cleanup=()=>{};
export function clearCelebration(){cleanup();cleanup=()=>{}}

// Short fireworks and confetti burst on arrival at a valid result.
// The layer lives outside the report, so PNG/PDF exports contain only the result.
export function celebrateResult(){
 clearCelebration();
 if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const canvas=document.createElement('canvas');
 canvas.className='result-fireworks';canvas.setAttribute('aria-hidden','true');
 document.body.append(canvas);
 const ctx=canvas.getContext('2d');
 if(!ctx){canvas.remove();return}
 const colors=['#fc6b26','#ffbb42','#8ebba8','#aa91cf','#f18baa'];
 const bursts=[{at:.06,x:.18,y:.27},{at:.22,x:.82,y:.26},{at:.62,x:.35,y:.15},{at:.85,x:.68,y:.17},{at:1.1,x:.5,y:.23}];
 let width,height,frame,elapsed=0,last=0,particles=[],stopped=false;
 const resize=()=>{width=document.documentElement.clientWidth;height=innerHeight;const dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0)};
 const stop=()=>{if(stopped)return;stopped=true;cancelAnimationFrame(frame);removeEventListener('resize',resize);document.removeEventListener('visibilitychange',hide);canvas.remove();particles=[]};
 const hide=()=>{if(document.hidden)stop()};
 const burst=({x,y})=>{
  const count=width<600?34:56;
  for(let i=0;i<count;i++){
   const angle=i/count*Math.PI*2,speed=100+Math.random()*220;
   particles.push({x:x*width,y:y*height,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed-45,age:0,life:1.5+Math.random()*1.1,size:2+Math.random()*4,rotation:Math.random()*Math.PI,spin:(Math.random()-.5)*8,color:colors[i%colors.length],kind:i%3});
  }
 };
 const tick=time=>{
  if(stopped)return;
  const dt=last?Math.min((time-last)/1000,.04):0;last=time;elapsed+=dt;
  for(const b of bursts)if(!b.fired&&elapsed>=b.at){b.fired=true;burst(b)}
  ctx.clearRect(0,0,width,height);
  particles=particles.filter(p=>p.age<p.life);
  for(const p of particles){
   const prevX=p.x,prevY=p.y;
   p.age+=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vx*=Math.exp(-1.15*dt);p.vy=p.vy*Math.exp(-.55*dt)+125*dt;p.rotation+=p.spin*dt;
   ctx.globalAlpha=Math.max(0,1-p.age/p.life);ctx.fillStyle=p.color;ctx.strokeStyle=p.color;
   if(p.kind===0){ctx.lineWidth=1.8;ctx.beginPath();ctx.moveTo(prevX-p.vx*.018,prevY-p.vy*.018);ctx.lineTo(p.x,p.y);ctx.stroke();ctx.beginPath();ctx.arc(p.x,p.y,1.7,0,Math.PI*2);ctx.fill()}
   else{ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rotation);if(p.kind===1)ctx.fillRect(-p.size/2,-p.size/2,p.size,p.size*1.6);else{ctx.beginPath();ctx.arc(0,0,p.size/2,0,Math.PI*2);ctx.fill()}ctx.restore()}
  }
  ctx.globalAlpha=1;
  if(elapsed>=4||elapsed>1.2&&!particles.length){stop();return}
  frame=requestAnimationFrame(tick);
 };
 cleanup=stop;resize();addEventListener('resize',resize);document.addEventListener('visibilitychange',hide);frame=requestAnimationFrame(tick);
}
