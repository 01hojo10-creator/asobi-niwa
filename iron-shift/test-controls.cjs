const fs=require('fs'),vm=require('vm'),assert=require('assert');const html=fs.readFileSync(require('path').join(__dirname,'index.html'),'utf8');
const core=html.slice(html.indexOf('var Kt='),html.indexOf(',rl=new WeakMap'))+';';
class V{constructor(x=0,y=0,z=0){Object.assign(this,{x,y,z})}length(){return Math.hypot(this.x,this.y,this.z)}multiplyScalar(s){this.x*=s;this.y*=s;this.z*=s;return this}dot(v){return this.x*v.x+this.y*v.y+this.z*v.z}}
const settings={touchAssist:{checked:true}};const c={console,R:V,EA:id=>settings[id],Ye:{state:{enabled:true}},Zt:true,be:false,wt:0,qt:0};vm.createContext(c);vm.runInContext(core,c);vm.runInContext(html.slice(html.indexOf('function mobileAssistanceEnabled'),html.indexOf('function gl(n)')),c);vm.runInContext('q=new lo(()=>.5);q.start();q.enemies=[];q.obstacles=[];q.machinery=()=>[];q.player={x:0,y:1.7,z:0,hp:100};Ce={getWorldDirection:()=>new R(-Math.sin(wt)*Math.cos(qt),Math.sin(qt),-Math.cos(wt)*Math.cos(qt))}',c);
function run(s){return vm.runInContext(s,c)}
run('mobileFireStep()');assert.equal(run('q.ammo[0]'),36,'empty space must not waste bullets');
run('q.enemies=[{id:1,type:"swarm",x:0,y:1.7,z:-10,hp:100}];mobileFireStep()');assert.equal(run('q.ammo[0]'),35);assert(run('q.enemies[0].hp')<100);
run('q.cooldown=0;q.obstacles=[{x:0,z:-5,w:3,d:1,h:4}];mobileFireStep()');assert.equal(run('q.ammo[0]'),35,'wall blocks firing');
run('q.ammo[0]=0;mobileFireStep()');assert(run('q.reloadLeft')>0,'empty magazine reloads without target');
run('q.reloadLeft=0;q.ammo[0]=36;q.obstacles=[];q.enemies[0].x=1;mobileAimStep(.05)');assert(run('wt')<0&&run('wt')>=-.0425,'limited assist toward nearby target');
run('wt=0;qt=0;q.enemies[0].x=10;mobileAimStep(.05)');assert.equal(run('wt'),0,'outside cone must not snap');
run('q.enemies[0].x=1;q.obstacles=[{x:0,z:-5,w:3,d:1,h:4}];mobileAimStep(.05)');assert.equal(run('wt'),0,'wall blocks assist');
run('Ye.state.enabled=false;q.obstacles=[];q.enemies=[];q.cooldown=0;mobileFireStep()');assert.equal(run('q.ammo[0]'),35,'desktop unrestricted');
run('Ye.state.enabled=true;EA("touchAssist").checked=false;q.cooldown=0;mobileFireStep()');assert.equal(run('q.ammo[0]'),34,'manual mode unrestricted');
run('EA("touchAssist").checked=true;q.enemies=[];q.boss={id:5,type:"boss",x:0,z:-10,hp:200,armor:[100,100]};wt=0;qt=0;q.cooldown=0;mobileFireStep()');assert.equal(run('q.ammo[0]'),34,'invulnerable boss body does not waste bullets');
console.log('PASS 10 mobile aim/fire regression checks using actual campaign core and ray intersections');
let now=0,fire=false,aim=false,look=[];const listeners={};function el(id){return {id,style:{},classList:{add(){},remove(){},toggle(){}},setAttribute(){},setPointerCapture(){},querySelectorAll(){return []},addEventListener(t,fn){listeners[id+':'+t]=fn},getBoundingClientRect(){return id==='touchFire'?{left:38,top:38,width:44,height:44}:{left:0,top:0,width:120,height:120}}}}
const elements=new Map;const doc={body:el('body'),getElementById(id){if(!elements.has(id))elements.set(id,el(id));return elements.get(id)},addEventListener(t,fn){listeners[t]=fn}};
const ctx={document:doc,matchMedia:()=>({matches:true}),window:{addEventListener(t,fn){listeners[t]=fn}},performance:{now:()=>now}};vm.createContext(ctx);vm.runInContext(html.slice(html.indexOf('function ff('),html.indexOf('var cf=')),ctx);const controller=ctx.ff({active:()=>true,look:(x,y)=>look=[x,y],fire:x=>fire=x,aim:x=>aim=x,reload(){},weapon(){},pause(){}});
function event(x,y,id=1){return{pointerId:id,pointerType:'touch',currentTarget:doc.getElementById('lookPad'),clientX:x,clientY:y,preventDefault(){}}}
listeners['lookPad:pointerdown'](event(60,60));assert(fire);listeners['lookPad:pointermove'](event(112,60));assert(!fire);assert(controller.state.lookX>0);listeners['lookPad:pointermove'](event(60,60));controller.update(.01);assert(!fire);now=150;controller.update(.01);assert(fire);listeners['lookPad:pointercancel'](event(60,60));assert(!fire);assert.equal(controller.state.lookX,0);listeners['lookPad:pointerdown'](event(60,60));listeners.blur();assert(!fire);assert.equal(controller.state.x,0);console.log('PASS center/ring slide, 140ms dwell, cancel and blur input regression checks');
// Exercise the actual touch rotation callback, not a duplicated speed formula.
const touchBinding=html.slice(html.indexOf('var Ye=ff('));
const touchLook=touchBinding.slice(touchBinding.indexOf('look:')+5,touchBinding.indexOf(',fire:'));
const rotation={EA:()=>({value:'1'}),wt:0,qt:0,be:false};vm.createContext(rotation);
const applyLook=vm.runInContext('('+touchLook+')',rotation);
function simulateTurn(x,y,frames,scoped=false){controller.reset();rotation.wt=rotation.qt=0;rotation.be=scoped;listeners['lookPad:pointerdown'](event(x,y));for(let frame=0;frame<frames;frame++){controller.update(1/frames);applyLook(...look)}listeners['lookPad:pointerup'](event(x,y));return [rotation.wt,rotation.qt]}
function near(actual,expected,label){assert(Math.abs(actual-expected)<1e-10,label+': '+actual+' != '+expected)}
for(const frames of [30,60,120]){let [yaw,pitch]=simulateTurn(112,60,frames);near(yaw,-.48,'horizontal radians/sec at '+frames+'fps');near(pitch,0,'no vertical drift');[yaw,pitch]=simulateTurn(60,112,frames);near(yaw,0,'no horizontal drift');near(pitch,-.384,'vertical radians/sec at '+frames+'fps');}
let [yaw,pitch]=simulateTurn(8,60,60);near(yaw,.48,'left direction');[yaw,pitch]=simulateTurn(60,8,60);near(pitch,.384,'up direction');
[yaw,pitch]=simulateTurn(112,60,60,true);near(yaw,-.2304,'scoped speed remains reduced');
[yaw,pitch]=simulateTurn(60,60,60);near(yaw,0,'center does not turn');near(pitch,0,'center does not pitch');
controller.reset();controller.update(1);near(look[0],0,'release stops horizontal turn');near(look[1],0,'release stops vertical turn');
console.log('PASS precise slower touch speed, 30/60/120fps consistency, four directions, scoped speed, center and release checks');
// Compile every embedded executable script; no runtime dependencies are needed.
let scripts=0;for(const match of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)){new vm.Script(match[1]);scripts++}assert(scripts>0);console.log('PASS syntax for '+scripts+' embedded scripts');
