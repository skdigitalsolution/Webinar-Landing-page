import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
const keepAlive = setInterval(() => {}, 1000);
const delay = ms => new Promise(r => setTimeout(r, ms));
await mkdir('.backups/phase-one-browser', {recursive:true});
await mkdir('docs/phase-one', {recursive:true});
const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', ['--headless=new','--no-first-run','--no-default-browser-check','--remote-debugging-port=9333',`--user-data-dir=${resolve('.backups/phase-one-browser')}`,'--autoplay-policy=no-user-gesture-required','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','about:blank'],{windowsHide:true,stdio:'ignore'});
try {
let targets;
for(let i=0;i<30;i++){try{targets=await (await fetch('http://127.0.0.1:9333/json')).json();break}catch{await delay(300)}}
const ws=new WebSocket(targets.find(t=>t.type==='page').webSocketDebuggerUrl);
await new Promise((r,j)=>{const t=setTimeout(()=>j(new Error('Browser connection timed out')),10000);ws.addEventListener('open',()=>{clearTimeout(t);r()},{once:true});ws.addEventListener('error',j,{once:true})});
let serial=0;const pending=new Map();const errors=[];
ws.addEventListener('message',e=>{const m=JSON.parse(e.data);if(m.id){pending.get(m.id)?.(m);pending.delete(m.id)} if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails);if(m.method==='Log.entryAdded'&&m.params.entry.level==='error')errors.push(m.params.entry)});
const send=(method,params={})=>new Promise((res,rej)=>{const id=++serial;const timer=setTimeout(()=>rej(new Error(method+' timed out')),15000);pending.set(id,m=>{clearTimeout(timer);m.error?rej(m.error):res(m.result)});ws.send(JSON.stringify({id,method,params}))});
const evaluate=async expression=>(await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true})).result.value;
await send('Runtime.enable');await send('Log.enable');await send('Page.enable');
await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
await send('Page.navigate',{url:'http://127.0.0.1:5173/Webinar-Landing-page/'});await delay(7500);
for(let i=0;i<30;i++){if(await evaluate("document.querySelector('.hero-life-visual .circle-experience')?.dataset.renderState !== 'loading'"))break;await delay(500)}
const desktop=await evaluate(`({title:document.title,overflow:document.documentElement.scrollWidth>innerWidth,scene:document.querySelector('.hero-life-visual .circle-experience')?.dataset.renderState,heading:document.querySelector('h1')?.textContent})`);
await writeFile('docs/phase-one/desktop.png',Buffer.from((await send('Page.captureScreenshot',{format:'png'})).data,'base64'));
await evaluate(`document.querySelector('.intro-trigger').click()`);await delay(2500);
const video=await evaluate(`(async()=>{const v=document.querySelector('video');try{await v.play();await new Promise(r=>setTimeout(r,1100));const result={src:v.currentSrc,duration:v.duration,time:v.currentTime,paused:v.paused,readyState:v.readyState,error:v.error?.message};v.pause();v.muted=true;result.muted=v.muted;return result}catch(e){return {error:e.message,src:v.currentSrc,mediaError:v.error?.message}}})()`);
const assets=await evaluate(`Promise.all(['1.jpeg','2.jpeg','3.mp4','4.jpeg'].map(async f=>({file:f,status:(await fetch('/Webinar-Landing-page/assets/webinar/'+f,{method:'HEAD'})).status})))`);
await evaluate(`document.querySelector('dialog').close();document.querySelector('.phase-one-actions a').click()`);await delay(1500);
const registration=await evaluate(`({hash:location.hash,target:!!document.querySelector('#register')})`);
await evaluate(`window.scrollTo(0,0)`);await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});await delay(1500);
await writeFile('docs/phase-one/mobile.png',Buffer.from((await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:{x:0,y:0,width:390,height:await evaluate('Math.ceil(document.querySelector(".phase-one-hero").getBoundingClientRect().bottom)'),scale:1}})).data,'base64'));
await evaluate(`document.querySelector('.menu-toggle').click()`);
const mobile=await evaluate(`({overflow:document.documentElement.scrollWidth>innerWidth,menu:document.querySelector('.menu-toggle').getAttribute('aria-expanded'),scene:document.querySelector('.hero-life-visual .circle-experience').dataset.renderState})`);
await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});await delay(500);
const reduced=await evaluate(`document.querySelector('.hero-life-visual .circle-experience').dataset.renderState`);
const report={desktop,video,assets,registration,mobile,reduced,errors};console.log(JSON.stringify(report,null,2));await writeFile('docs/phase-one/browser-results.json',JSON.stringify(report,null,2));
ws.send(JSON.stringify({id:++serial,method:'Browser.close'}));ws.close();
}finally{chrome.kill();clearInterval(keepAlive)}


