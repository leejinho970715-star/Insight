export function brandStory() {
 return `<section id="brand-story" class="brand-story" aria-label="인사이트 브랜드 이야기"><div class="brand-stage"><span class="eyebrow brand-stage-label">NINE PERSPECTIVES. ONE INSIGHT.</span><div class="brand-logo-wrap"><div class="brand-halo" aria-hidden="true"></div><img class="brand-stage-logo" src="/assets/logo-3d.png" alt="아홉 가지 시선이 만나는 3D 클레이 인사이트 로고" width="600" height="600"></div><div class="brand-story-content"><span class="association-label">애니어그램 인사이트 · 애니어그램 협의회</span><h2>서로 다른 아홉 시선,<br>하나의 새로운 인사이트.</h2><p>작은 발견이 나를 이해하는 마음으로,<br>그리고 서로를 연결하는 변화로 이어집니다.</p><a href="#about" class="button">우리의 이야기 만나기</a></div><div class="brand-scroll-cue" aria-hidden="true"><span>SCROLL TO DISCOVER</span><div class="brand-progress"><i></i></div></div></div></section>`;
}

export function runMotion() {
 if (!window.gsap || !window.ScrollTrigger) return;
 const {gsap,ScrollTrigger}=window;
 gsap.registerPlugin(ScrollTrigger);
 if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
 // Establish pin spacing before measuring the sections that follow it.
 const story=document.querySelector('.brand-story');
 if(story){
  const headerHeight=()=>document.querySelector('.header').offsetHeight;
  const timeline=gsap.timeline({scrollTrigger:{trigger:story,start:()=>`top top+=${headerHeight()}`,end:()=>'+='+Math.round(innerHeight*2.1),pin:'.brand-stage',scrub:.65,anticipatePin:1,invalidateOnRefresh:true,refreshPriority:1}});
  timeline.fromTo('.brand-stage-logo',{scale:.18,y:45,rotation:-28,autoAlpha:.7},{scale:1,y:0,rotation:0,autoAlpha:1,duration:.48,ease:'power2.out'},0)
   .fromTo('.brand-halo',{scale:.2,autoAlpha:0},{scale:1,autoAlpha:1,duration:.4},.12)
   .fromTo('.brand-story-content',{y:38,autoAlpha:0},{y:0,autoAlpha:1,duration:.22},.53)
   .fromTo('.brand-story-content h2',{y:18,clipPath:'inset(100% 0% 0% 0%)'},{y:0,clipPath:'inset(0% 0% 0% 0%)',duration:.2},.56)
   .fromTo('.brand-progress i',{scaleX:0},{scaleX:1,duration:1,ease:'none'},0)
   .to('.brand-scroll-cue',{autoAlpha:.3,duration:.15},.85);
 }
 const reveal=(el,from,duration=.8)=>gsap.from(el,{...from,autoAlpha:0,duration,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 91%',end:'bottom top',toggleActions:'play reverse play reverse'}});
 const shapes=[{y:42,rotation:1.5},{y:28,scale:.94},{x:-24,y:16},{x:24,y:16}];
 document.querySelectorAll('.reveal,.contact-method,.contact-person-row,.contact-brand-row').forEach((el,i)=>reveal(el,shapes[i%shapes.length],.8+(i%3)*.12));
 document.querySelectorAll('main h1,main h2,main h3,main p,main .eyebrow,main .faq details').forEach((el,i)=>{
  if(el.closest('.brand-story,.question-list,.result-card,.test-guide'))return;
  reveal(el,i%3===0?{y:25,rotationX:-12,transformPerspective:700}:i%3===1?{y:20,clipPath:'inset(100% 0% 0% 0%)'}:{x:-16,y:10},.7);
 });
 const hero=document.querySelector('.hero-art');
 if(hero){gsap.from(hero,{autoAlpha:0,y:35,scale:.96,duration:1.1,ease:'power3.out'});gsap.to('.hero-image',{y:35,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}});gsap.to('.hero-image',{rotation:1.3,duration:3.8,repeat:-1,yoyo:true,ease:'sine.inOut'});}
 document.querySelectorAll('img[src*="animal-"],.clay-icon').forEach((el,i)=>{
  const tween=gsap.to(el,{y:-8-(i%3)*2,rotation:i%2?2:-2,duration:2.5+(i%4)*.35,repeat:-1,yoyo:true,ease:'sine.inOut',paused:true});
  ScrollTrigger.create({trigger:el,start:'top bottom',end:'bottom top',onEnter:()=>tween.play(),onEnterBack:()=>tween.play(),onLeave:()=>tween.pause(),onLeaveBack:()=>tween.pause()});
 });
 document.querySelectorAll('.animal-tile').forEach(el=>{
  el.addEventListener('pointerenter',()=>gsap.to(el,{scale:1.03,duration:.3,ease:'back.out(1.5)'}));
  el.addEventListener('pointerleave',()=>gsap.to(el,{scale:1,duration:.4,ease:'power2.out'}));
 });
 requestAnimationFrame(()=>ScrollTrigger.refresh());
}
