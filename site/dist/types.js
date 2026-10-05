import {animals} from './data.js';
const names=['개혁가','조력가','성취가','개성가','탐구가','충실가','열정가','도전가','평화주의자'];
export function typeCarousel(){return `<section id="types" class="section type-section" aria-label="아홉 가지 유형 소개"><div class="section-heading reveal"><span class="eyebrow">NINE TYPES / 아홉 가지 시선</span><div><h2>다른 마음, 다른 강점.<br>아홉 유형을 만나보세요.</h2><p>각 유형의 특징을 동물 친구와 함께 살펴보세요.<br>동물은 이해를 돕기 위해 인사이트가 선택한 상징입니다.</p></div></div><div class="type-controls"><span class="type-playback">자동재생</span><div><button class="icon-button type-autoplay" type="button" data-type-play aria-label="슬라이드 자동재생 일시정지">Ⅱ</button><button class="icon-button" type="button" data-type-prev aria-label="이전 유형" disabled>←</button><button class="icon-button" type="button" data-type-next aria-label="다음 유형">→</button></div></div><div class="type-track" tabindex="0" role="region" aria-label="좌우로 넘기는 유형 카드">${animals.map((a,i)=>`<article class="type-card" aria-label="${a.id}번 유형 ${names[i]}"><div class="type-art" style="--type-art-bg:${a.color}"><span class="type-badge">TYPE ${String(a.id).padStart(2,'0')}</span><img src="/assets/animal-${a.id}.png" alt="${a.name} 전신 3D 클레이 이미지" width="600" height="600" loading="lazy"></div><div class="type-copy"><span class="eyebrow">${a.id}번 유형 / ${names[i]}</span><h3>${a.title}</h3><p class="type-tag">${a.tag}</p><p>${a.description}</p><div class="type-growth"><span>나를 위한 작은 연습</span><p>${a.growth}</p></div></div></article>`).join('')}</div><div class="type-progress"><div class="type-progress-rail" aria-hidden="true"><span class="type-progress-fill"></span></div><input type="range" min="1" max="9" step="1" value="1" aria-label="유형 슬라이드 이동" aria-valuetext="1번 유형 개혁가"></div></section>`;}

let disposeCarousel=()=>{};
export function clearTypeCarousel(){disposeCarousel();disposeCarousel=()=>{};}
export function bindTypeCarousel(){
 clearTypeCarousel();
 const section=document.querySelector('.type-section');if(!section)return;
 const track=section.querySelector('.type-track'),cards=[...track.children];
 // Matching cards on both sides let the last-to-first transition travel one step.
 // Only the central nine cards participate in the accessible document.
 const copies=[];
 const copy=card=>{const el=card.cloneNode(true);el.dataset.loopClone='true';el.setAttribute('aria-hidden','true');el.setAttribute('inert','');copies.push(el);return el;};
 track.prepend(...cards.map(copy));track.append(...cards.map(copy));
 const loopCards=[...track.children],count=cards.length;
 const prev=section.querySelector('[data-type-prev]'),next=section.querySelector('[data-type-next]'),play=section.querySelector('[data-type-play]');
 const range=section.querySelector('.type-progress input'),fill=section.querySelector('.type-progress-fill'),status=section.querySelector('.type-playback');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),events=new AbortController();
 let index=0,frame=0,timer=0,interactionTimer=0,settleTimer=0,visible=false,hovered=false,focused=false,touching=false,userPaused=reduced.matches;
 let wheelSum=0,lastWheel=0,wheelLock=0;
 const listen=(el,event,fn,options={})=>el.addEventListener(event,fn,{...options,signal:events.signal});
 const labelPlayback=()=>{play.textContent=userPaused?'▶':'Ⅱ';play.setAttribute('aria-label',userPaused?'슬라이드 자동재생 시작':'슬라이드 자동재생 일시정지');status.textContent=userPaused?'일시정지':'자동재생';};
 const stop=()=>{clearTimeout(timer);timer=0;};
 const schedule=()=>{stop();if(!track.isConnected||!visible||document.hidden||userPaused||hovered||focused||touching||interactionTimer)return;timer=setTimeout(()=>{timer=0;go(index+1);schedule();},1000);};
 const leftOf=card=>card.offsetLeft-loopCards[0].offsetLeft;
 const nearest=()=>loopCards.reduce((best,card,i)=>Math.abs(leftOf(card)-track.scrollLeft)<Math.abs(leftOf(loopCards[best])-track.scrollLeft)?i:best,0);
 const logical=i=>((i-count)%count+count)%count;
 const go=(i,instant=false)=>{const target=Math.max(0,Math.min(loopCards.length-1,i+count));track.scrollTo({left:leftOf(loopCards[target]),behavior:instant||reduced.matches?'instant':'smooth'});};
 const normalize=()=>{settleTimer=0;if(!track.isConnected||touching)return;const physical=nearest();if(physical>=count&&physical<count*2)return;const central=logical(physical)+count;track.scrollTo({left:track.scrollLeft+leftOf(loopCards[central])-leftOf(loopCards[physical]),behavior:'instant'});};
 const interact=()=>{stop();clearTimeout(interactionTimer);interactionTimer=setTimeout(()=>{interactionTimer=0;schedule();},1400);};
 const update=()=>{
  frame=0;if(!track.isConnected)return;
  index=logical(nearest());
  range.value=String(index+1);range.setAttribute('aria-valuetext',`${index+1}번 유형 ${names[index]}`);
  fill.style.transform=`scaleX(${(index+1)/cards.length})`;
 };
 listen(prev,'click',()=>{interact();go(index-1);});listen(next,'click',()=>{interact();go(index+1);});
 listen(play,'click',()=>{userPaused=!userPaused;labelPlayback();schedule();});
 listen(range,'input',()=>{interact();go(Number(range.value)-1);});
 listen(track,'scroll',()=>{if(!frame)frame=requestAnimationFrame(update);clearTimeout(settleTimer);settleTimer=setTimeout(normalize,160);},{passive:true});
 listen(track,'keydown',e=>{if(e.target!==track)return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();interact();go(index+(e.key==='ArrowRight'?1:-1));}});
 listen(track,'wheel',e=>{
  if(e.ctrlKey)return;
  interact();
  // Trackpads retain native horizontal momentum and snap behavior.
  if(Math.abs(e.deltaX)>Math.abs(e.deltaY))return;
  const delta=e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?track.clientWidth:1),direction=Math.sign(delta);
  if(!direction)return;
  e.preventDefault();
  const now=performance.now();if(now<wheelLock)return;
  if(now-lastWheel>180||Math.sign(wheelSum)!==direction)wheelSum=0;
  lastWheel=now;wheelSum+=delta;
  if(Math.abs(wheelSum)>=28){go(index+direction);wheelSum=0;wheelLock=now+450;}
 },{passive:false});
 listen(section,'pointerenter',e=>{if(e.pointerType==='mouse'){hovered=true;schedule();}});
 listen(section,'pointerleave',e=>{if(e.pointerType==='mouse'){hovered=false;schedule();}});
 listen(section,'focusin',e=>{focused=e.target!==play&&e.target.matches(':focus-visible');schedule();});
 listen(section,'focusout',e=>{focused=section.contains(e.relatedTarget)&&e.relatedTarget!==play&&e.relatedTarget.matches(':focus-visible');schedule();});
 listen(track,'pointerdown',()=>{touching=true;interact();});
 listen(document,'pointerup',()=>{if(touching){touching=false;clearTimeout(settleTimer);settleTimer=setTimeout(normalize,160);schedule();}});
 listen(document,'pointercancel',()=>{touching=false;normalize();schedule();});
 listen(document,'visibilitychange',schedule);
 listen(reduced,'change',()=>{if(reduced.matches){userPaused=true;labelPlayback();}schedule();});
 const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;schedule();},{threshold:.12});observer.observe(track);
 const resize=new ResizeObserver(()=>{go(index,true);update();});resize.observe(track);
 disposeCarousel=()=>{stop();clearTimeout(interactionTimer);clearTimeout(settleTimer);cancelAnimationFrame(frame);observer.disconnect();resize.disconnect();events.abort();copies.forEach(el=>el.remove());};
 prev.disabled=false;next.disabled=false;
 go(0,true);labelPlayback();update();
}
