(()=>{
const overlay=document.createElement('div');
overlay.className='invitation-overlay';overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.setAttribute('aria-labelledby','invite-title');
overlay.innerHTML=`<button class="skip-invite" type="button">略過動畫 ↗</button><div class="invite-heading"><p>A LETTER FOR YOU</p><h2 id="invite-title">光之戰士，你有一封邀請函</h2></div><div class="envelope-stage"><div class="envelope-lid-back"></div><div class="envelope-back"></div><div class="letter-sheet"><div class="letter-content"><div class="letter-kicker">一周年・星夜邀請函</div><div class="letter-title"><h3>星夜謎旅</h3><span>一周年猜謎祭</span></div><p class="letter-greeting">親愛的光之戰士：<br>邀請你，與我們共赴一場星夜之約。</p><div class="letter-date">11 月 27 日　晚上 9:30</div><div class="letter-guilds"><span>貓咪咖啡館</span><span>晨曦茶會</span><span>T Grove</span><span>莫古力樂園</span></div><div class="letter-signature">四個公會・聯合敬邀</div></div></div><div class="envelope-front"></div><div class="envelope-flap"></div><button class="wax-seal" type="button" aria-label="打開信封，閱讀活動邀請函"><img src="assets/gold-star-seal.png" alt="" draggable="false"></button></div><p class="invite-prompt" aria-live="polite">輕觸封蠟，開啟屬於你的邀請</p>`;
const page=[document.querySelector('header'),document.querySelector('main'),document.querySelector('footer')];
const replay=document.createElement('button');replay.type='button';replay.className='replay-invite';replay.textContent='✉ 重看邀請函';document.querySelector('footer').append(replay);
const $=selector=>overlay.querySelector(selector);
let animations=[],running=false,previousFocus,generation=0;
function animate(el,frames,duration,options={}){const animation=el.animate(frames,{duration,easing:'cubic-bezier(.22,.61,.36,1)',fill:'forwards',...options});animations.push(animation);return animation.finished.catch(()=>{});}
function finish(){generation++;animations.forEach(a=>a.cancel());animations=[];overlay.remove();document.body.classList.remove('invite-loading');page.forEach(el=>el.inert=false);running=false;(previousFocus?.isConnected?previousFocus:document.querySelector('.logo')).focus({preventScroll:true});}
function cameraFrames(rect,vw,vh){
 const cx=vw/2-(rect.left+rect.width/2),cy=vh/2-(rect.top+rect.height/2);
 const cover=Math.max(vw/rect.width,vh/rect.height)*1.3;
 const samples=Array.from({length:1001},(_,i)=>{const t=i/1000,u=1-t;return{x:cx*t*t*(3-2*t),y:3*u*u*t*(-rect.height*1.25)+3*u*t*t*(cy-rect.height*.15)+t*t*t*cy,s:Math.exp(Math.log(cover)*t*t),distance:0};});
 // Reparameterize by the average distance of the four paper corners.
 // Translation and zoom share one uniform visual speed, without easing resets.
 for(let i=1;i<samples.length;i++){const a=samples[i-1],b=samples[i],dx=b.x-a.x,dy=b.y-a.y,dw=(b.s-a.s)*rect.width/2,dh=(b.s-a.s)*rect.height/2;let distance=0;for(const sx of [-1,1])for(const sy of [-1,1])distance+=Math.hypot(dx+sx*dw,dy+sy*dh)/4;b.distance=a.distance+distance;}
 const total=samples.at(-1).distance;let cursor=1;
 return Array.from({length:181},(_,i)=>{const offset=i/180,target=offset*total;while(cursor<samples.length-1&&samples[cursor].distance<target)cursor++;const a=samples[cursor-1],b=samples[cursor],mix=(target-a.distance)/(b.distance-a.distance||1);const x=a.x+(b.x-a.x)*mix,y=a.y+(b.y-a.y)*mix,s=a.s+(b.s-a.s)*mix;return{offset,transform:`translate3d(${x}px,${y}px,0) scale(${s})`};});
}

async function open(){
 if(running)return;running=true;const current=++generation;try{overlay.classList.add('motion-enabled');$('.invite-prompt').textContent='邀請函正在展開…';
 const sheet=$('.letter-sheet'),flap=$('.envelope-flap'),rect=sheet.getBoundingClientRect();
 const frames=cameraFrames(rect,innerWidth,innerHeight);
 const envelopeTop=$('.envelope-front').getBoundingClientRect().top;
 const travel=Math.min(innerHeight*.55,440);
 // Keep the envelope opaque until the paper has physically cleared its opening.
 const clearFrame=frames.find(frame=>{
  const time=220+frame.offset*3600;
  const paperY=Number.parseFloat(frame.transform.split(',')[1]);
  const paperScale=Number.parseFloat(frame.transform.split('scale(')[1]);
  const paperBottom=rect.top+paperY+rect.height*(1+paperScale)/2;
  const openingTop=envelopeTop+travel*Math.max(0,Math.min(1,(time-450)/1300));
  return time>=750&&paperBottom<=openingTop-10;
 });
 const release=clearFrame?220+clearFrame.offset*3600:2200;
 overlay.dataset.releaseMs=String(release);
 animate($('.wax-seal'),[{opacity:1,transform:'translate(-50%,-50%) scale(1)'},{opacity:0,transform:'translate(-50%,-50%) scale(1.18)'}],280,{easing:'linear'});
 animate($('.invite-heading'),[{opacity:1},{opacity:0}],400);animate($('.invite-prompt'),[{opacity:1},{opacity:0}],280,{easing:'linear'});
 animate(flap,[{transform:'rotateX(0deg)'},{transform:'rotateX(180deg)'}],750,{easing:'linear'});
 animate($('.envelope-lid-back'),[{opacity:0},{opacity:1}],300,{delay:230,easing:'linear'});
 animate(sheet,frames,3600,{delay:220,easing:'linear'});
 animate(sheet,[{zIndex:2,offset:0},{zIndex:2,offset:release/3950},{zIndex:7,offset:(release+1)/3950},{zIndex:7,offset:1}],3950,{easing:'linear'});

 for(const selector of ['.envelope-front','.envelope-back','.envelope-lid-back']){
  animate($(selector),[{transform:'translateY(0)'},{transform:`translateY(${travel}px)`}],1300,{delay:450,easing:'linear'});
 }
 for(const selector of ['.envelope-front','.envelope-back','.envelope-lid-back','.envelope-flap']){
  animate($(selector),[{opacity:1},{opacity:0}],600,{delay:release,easing:'linear'});
 }
 animate($('.letter-content'),[{opacity:1},{opacity:0}],1000,{delay:2200,easing:'linear'});
 await animate(overlay,[{opacity:1,offset:0},{opacity:1,offset:.72},{opacity:0,offset:1}],3950,{easing:'linear'});
 if(current!==generation)return;finish();
 }catch(error){console.error('Invitation animation could not complete',error);if(current===generation)finish();}
}
function show(){previousFocus=document.activeElement;running=false;overlay.className='invitation-overlay';overlay.querySelectorAll('[style]').forEach(el=>el.removeAttribute('style'));$('.invite-prompt').textContent='輕觸封蠟，開啟屬於你的邀請';document.body.append(overlay);document.body.classList.add('invite-loading');page.forEach(el=>el.inert=true);$('.wax-seal').focus({preventScroll:true});}
$('.wax-seal').addEventListener('click',open);$('.skip-invite').addEventListener('click',finish);
overlay.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();finish();}if(event.key==='Tab'){const seal=$('.wax-seal'),skip=$('.skip-invite');event.preventDefault();(document.activeElement===skip&&!running?seal:skip).focus();}});
replay.addEventListener('click',show);show();
})();










