(()=>{
const overlay=document.createElement('div');
overlay.className='invitation-overlay';overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.setAttribute('aria-labelledby','invite-title');
overlay.innerHTML=`<button class="skip-invite" type="button">略過動畫 ↗</button><div class="invite-heading"><p>A LETTER FOR YOU</p><h2 id="invite-title">光之戰士，你有一封邀請函</h2></div><div class="envelope-stage"><div class="envelope-lid-back"></div><div class="envelope-back"></div><div class="letter-sheet"><div class="letter-content"><div class="letter-kicker">一周年・星夜邀請函</div><div class="letter-title"><h3>星夜謎旅</h3><span>一周年猜謎祭</span></div><p class="letter-greeting">親愛的光之戰士：<br>邀請你，與我們共赴一場星夜之約。</p><div class="letter-date">11 月 27 日　晚上 9:30</div><div class="letter-guilds"><span>貓咪咖啡館</span><span>晨曦茶會</span><span>T Grove</span><span>莫古力樂園</span></div><div class="letter-signature">四個公會・聯合敬邀</div></div></div><div class="envelope-front"></div><div class="envelope-flap"></div><button class="wax-seal" type="button" aria-label="打開信封，閱讀活動邀請函"><img src="gold-star-seal.png" alt="" draggable="false"></button></div><p class="invite-prompt" aria-live="polite">輕觸封蠟，開啟屬於你的邀請</p>`;
const page=[document.querySelector('header'),document.querySelector('main'),document.querySelector('footer')];
const replay=document.createElement('button');replay.type='button';replay.className='replay-invite';replay.textContent='✉ 重看邀請函';document.querySelector('footer').append(replay);
const $=selector=>overlay.querySelector(selector);
let animations=[],running=false,previousFocus,generation=0;
function animate(el,frames,duration,options={}){const animation=el.animate(frames,{duration,easing:'cubic-bezier(.22,.61,.36,1)',fill:'forwards',...options});animations.push(animation);return animation.finished.catch(()=>{});}
function finish(){generation++;animations.forEach(a=>a.cancel());animations=[];overlay.remove();document.body.classList.remove('invite-loading');page.forEach(el=>el.inert=false);running=false;(previousFocus?.isConnected?previousFocus:document.querySelector('.logo')).focus({preventScroll:true});}
function invitationGeometry(rect,vw,vh){
 const margin=Math.max(16,Math.min(48,vw*.045,vh*.06));
 // The readable letter uses contain sizing; viewport-cover sizing is only used after text disappears.
 const readScale=Math.min(1.8,800/rect.width,(vw-2*margin)/rect.width,(vh-2*margin)/rect.height);
 return {x:vw/2-(rect.left+rect.width/2),y:vh/2-(rect.top+rect.height/2),readScale,coverScale:Math.max(vw/rect.width,vh/rect.height)*1.12,margin};
}
function cameraFrames(rect,vw,vh){
 const geometry=invitationGeometry(rect,vw,vh);
 return Array.from({length:221},(_,i)=>{
  const time=i/220*4400,u=Math.min(time/2900,1),zoom=Math.max(0,(time-2900)/1500);
  const scale=time<=2900?1+(geometry.readScale-1)*u:geometry.readScale+(geometry.coverScale-geometry.readScale)*zoom*zoom;
  return {offset:i/220,transform:`translate3d(${geometry.x*u}px,${geometry.y*u}px,0) scale(${scale})`};
 });
}
async function open(){
 if(running)return;running=true;const current=++generation;
 try{
  overlay.classList.add('motion-enabled');$('.invite-prompt').textContent='邀請函正在展開…';
  const sheet=$('.letter-sheet'),flap=$('.envelope-flap'),rect=sheet.getBoundingClientRect();
  const frames=cameraFrames(rect,innerWidth,innerHeight);
  const travel=$('.envelope-stage').getBoundingClientRect().height+rect.height+innerHeight*.12;
  animate($('.wax-seal'),[{opacity:1,transform:'translate(-50%,-50%) scale(1)'},{opacity:0,transform:'translate(-50%,-50%) scale(1.12)'}],260,{easing:'linear'});
  animate($('.invite-heading'),[{opacity:1},{opacity:0}],300,{easing:'linear'});
  animate($('.invite-prompt'),[{opacity:1},{opacity:0}],260,{easing:'linear'});
  animate(flap,[{transform:'rotateX(0deg)'},{transform:'rotateX(180deg)'}],650,{easing:'linear'});
  animate($('.envelope-lid-back'),[{opacity:0},{opacity:1}],250,{delay:220,easing:'linear'});
  animate(sheet,frames,4400,{easing:'linear'});
  // Stable stacking order: move the opaque envelope away, then fade all parts together.
  // It is completely gone before the letter becomes a full-screen transition.
  for(const selector of ['.envelope-front','.envelope-back','.envelope-lid-back']){
   animate($(selector),[{transform:'translateY(0)'},{transform:`translateY(${travel}px)`}],1050,{delay:220,easing:'linear'});
  }
  for(const selector of ['.envelope-front','.envelope-back','.envelope-lid-back','.envelope-flap']){
   animate($(selector),[{opacity:1},{opacity:0}],300,{delay:1100,easing:'linear'});
  }
  animate($('.letter-content'),[{opacity:1},{opacity:0}],400,{delay:2400,easing:'linear'});
  await animate(overlay,[{opacity:1,offset:0},{opacity:1,offset:3200/4400},{opacity:0,offset:1}],4400,{easing:'linear'});
  if(current===generation)finish();
 }catch(error){console.error('Invitation animation could not complete',error);if(current===generation)finish();}
}
function show(){previousFocus=document.activeElement;running=false;overlay.className='invitation-overlay';overlay.querySelectorAll('[style]').forEach(el=>el.removeAttribute('style'));$('.invite-prompt').textContent='輕觸封蠟，開啟屬於你的邀請';document.body.append(overlay);document.body.classList.add('invite-loading');page.forEach(el=>el.inert=true);$('.wax-seal').focus({preventScroll:true});}
$('.wax-seal').addEventListener('click',open);$('.skip-invite').addEventListener('click',finish);
overlay.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();finish();}if(event.key==='Tab'){const seal=$('.wax-seal'),skip=$('.skip-invite');event.preventDefault();(document.activeElement===skip&&!running?seal:skip).focus();}});
window.addEventListener('resize',()=>{if(running)finish();});
replay.addEventListener('click',show);show();
})();












