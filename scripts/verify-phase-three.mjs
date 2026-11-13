import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const delay = ms => new Promise(r => setTimeout(r, ms))
const directory = 'docs/phase-three'
await mkdir(directory, { recursive: true })
const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', ['--headless=new','--no-first-run','--no-default-browser-check',`--remote-debugging-port=${process.argv.includes('--visual-only')?9343:9341}`,`--user-data-dir=${resolve(process.argv.includes('--visual-only')?'.backups/phase-three-final-browser':'.backups/phase-three-browser')}`,'--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','about:blank'], { windowsHide: true, stdio: 'ignore' })
const keepAlive = setInterval(() => {}, 1000)
let ws
try {
  let targets
  for (let i = 0; i < 30; i++) {
    try { targets = await (await fetch(`http://127.0.0.1:${process.argv.includes('--visual-only')?9343:9341}/json`)).json(); break } catch { await delay(300) }
  }
  assert.ok(targets, 'Chrome debugging endpoint available')
  ws = new WebSocket(targets.find(t => t.type === 'page').webSocketDebuggerUrl)
  await new Promise((res, rej) => { const timeout = setTimeout(() => rej(new Error('Browser connection timed out')), 10000); ws.addEventListener('open', () => { clearTimeout(timeout); res() }, { once: true }); ws.addEventListener('error', rej, { once: true }) })
  let serial = 0
  const pending = new Map(), errors = []
  ws.addEventListener('message', event => {
    const message = JSON.parse(event.data)
    if (message.id) { pending.get(message.id)?.(message); pending.delete(message.id) }
    if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails)
    if (message.method === 'Log.entryAdded' && message.params.entry.level === 'error') errors.push(message.params.entry)
  })
  const send = (method, params = {}) => new Promise((res, rej) => {
    const id = ++serial, timeout = setTimeout(() => rej(new Error(`${method} timed out`)), method === 'Page.captureScreenshot' ? 60000 : 20000)
    pending.set(id, message => { clearTimeout(timeout); message.error ? rej(message.error) : res(message.result) })
    ws.send(JSON.stringify({ id, method, params }))
  })
  const evaluate = async expression => {
    const result = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.text)
    await delay(120)
    return result.result.value
  }
  const resize = async (width, height, mobile = false) => {
    await send('Emulation.setDeviceMetricsOverride', { width, height, mobile, deviceScaleFactor: 1 })
    await send('Emulation.setTouchEmulationEnabled', { enabled: mobile })
    await delay(800)
  }
  const waitFor = async expression => {
    for(let i=0;i<50;i++) { if(await evaluate(expression))return;await delay(200) }
    throw new Error(`Condition did not settle: ${expression}`)
  }
  const scroll = async id => {
    await evaluate(`document.getElementById('${id}').scrollIntoView({behavior:'instant',block:'start'})`)
    await delay(800)
  }
  const report={}
  const requests=[]
  const screenshot = async(name,selector)=>{
    await evaluate("document.activeElement?.blur();window.scrollTo({top:0,behavior:'instant'})")
    const clip=await evaluate(`(()=>{const r=document.querySelector('${selector}').getBoundingClientRect();return{x:0,y:r.top+scrollY,width:innerWidth,height:Math.min(r.height,1900),scale:1}})()`)
    await writeFile(`${directory}/${name}.png`,Buffer.from((await send('Page.captureScreenshot',{format:'png',optimizeForSpeed:true,captureBeyondViewport:true,clip})).data,'base64'))
  }
  const key = async(key,code,n)=>{
    await send('Input.dispatchKeyEvent',{type:'keyDown',key,code,windowsVirtualKeyCode:n})
    await send('Input.dispatchKeyEvent',{type:'keyUp',key,code,windowsVirtualKeyCode:n})
    await delay(200)
  }
  await send('Runtime.enable');await send('Log.enable');await send('Page.enable');await send('Network.enable')
  ws.addEventListener('message',e=>{const m=JSON.parse(e.data);if(m.method==='Network.requestWillBeSent')requests.push({url:m.params.request.url,method:m.params.request.method})})
  await resize(1440,1000)
  if(process.argv.includes('--visual-only'))await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]})
  await send('Page.navigate',{url:'http://127.0.0.1:5178/Webinar-Landing-page/'})
  if(process.argv.includes('--visual-only')) {
    await waitFor("document.querySelector('.pillar-growth') && document.querySelector('.summary-score-row .eyebrow').textContent==='OVERALL SELF-RATING'")
    await scroll('circle-of-life')
    await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]})
    await delay(1200)
    const hover=await evaluate("(()=>{const r=document.querySelector('.phase-three-pillar').getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+70}})()")
    await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:hover.x,y:hover.y})
    await waitFor("getComputedStyle(document.querySelector('.phase-three-pillar')).transform.startsWith('matrix3d')")
    await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:0,y:0})
    await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]})
    await delay(600)
    await screenshot('desktop-pillars','#circle-of-life')
    await screenshot('desktop-comparison','#assessment-comparison')
    await resize(390,844,true)
    await screenshot('mobile-summary','#assessment-results')
    await writeFile(directory+'/visual-check.json',JSON.stringify({growthMotif:true,overallRatingLabel:true,pillarHoverTilt:true,errors},null,2))
    assert.equal(errors.length,0)
    console.log('Final growth motif, rating label, hover tilt and screenshots verified.')
  } else {
  await waitFor("document.querySelector('.hero-life-visual .circle-experience')?.dataset.renderState === 'ready'")
  report.order=await evaluate("[...document.querySelector('main').children].map(s=>s.id).filter(Boolean)")
  assert.deepEqual(report.order.slice(0,6),['home','problems','mentor-introduction','mentor','circle-of-life','assessment'])
  report.assessmentOrder=await evaluate("[...document.querySelector('.embedded-assessment').children].map(el=>el.id||el.className)")
  assert.ok(report.assessmentOrder.indexOf('assessment-comparison')<report.assessmentOrder.indexOf('assessment-results'))
  assert.equal(await evaluate("document.querySelectorAll('.phase-three-pillar').length"),4)
  await scroll('circle-of-life')
  await waitFor("[...document.querySelectorAll('.phase-three-pillar')].every(el=>Number(getComputedStyle(el).opacity)>.999)")
  await evaluate("document.querySelectorAll('.phase-three-pillar button')[3].click()")
  await waitFor("document.querySelector('#life-dimension-detail').dataset.dimension==='spiritual-bliss'")
  report.pillarInteraction=true
  const hover=await evaluate("(()=>{const r=document.querySelector('.phase-three-pillar').getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+70}})()")
  await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:hover.x,y:hover.y})
  await waitFor("getComputedStyle(document.querySelector('.phase-three-pillar')).transform.startsWith('matrix3d')")
  report.pillarHoverTilt=true
  await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:0,y:0})
  await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]})
  await waitFor("document.querySelector('.hero-life-visual .circle-experience').dataset.renderState === 'static'")
  report.initial=await evaluate("({current:[...document.querySelectorAll('#assessment-form input[type=range]')].map(el=>+el.value),desired:[...document.querySelectorAll('#assessment-comparison input[type=range]')].map(el=>+el.value),total:document.querySelector('[data-total-score]').textContent,defaults:[...document.querySelectorAll('#assessment .rating-status')].every(el=>el.textContent.includes('Default: 5'))})")
  assert.deepEqual(report.initial.current,[5,5,5,5]);assert.deepEqual(report.initial.desired,[5,5,5,5]);assert.equal(report.initial.defaults,true)
  await evaluate("document.querySelector('#rating-health').focus()")
  await key('ArrowRight','ArrowRight',39)
  assert.equal(await evaluate("+document.querySelector('#rating-health').value"),6)
  await key('Home','Home',36);assert.equal(await evaluate("+document.querySelector('#rating-health').value"),1)
  await key('End','End',35);assert.equal(await evaluate("+document.querySelector('#rating-health').value"),10)
  report.keyboard={arrow:true,home:true,end:true}
  const initialPoints=await evaluate("document.querySelector('#assessment-form + aside .radar-shape')?.dataset.points || document.querySelector('.assessment-form-section .radar-shape').dataset.points")
  await evaluate(`(()=>{const setter=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set;for(const [prefix,values] of [['rating',[9,2,2,9]],['desired',[6,8,2,10]]]){['health','wealth','relationships','spiritual-bliss'].forEach((id,i)=>{const el=document.getElementById(prefix+'-'+id);setter.call(el,values[i]);el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}))})}})()`)
  await waitFor("document.querySelector('[data-total-score]').textContent==='22 / 40'")
  report.calculation=await evaluate("({total:document.querySelector('[data-total-score]').textContent,percentage:document.querySelector('.score-ring-label strong').textContent,highest:document.querySelector('[data-highest]').textContent,lowest:document.querySelector('[data-lowest]').textContent,differences:[...document.querySelectorAll('[data-difference]')].map(el=>+el.dataset.difference),currentPoints:document.querySelector('.assessment-form-section .radar-shape').dataset.points,desiredPoints:document.querySelector('.radar-desired-shape').dataset.points})")
  assert.equal(report.calculation.percentage,'55%')
  assert.ok(report.calculation.highest.includes('Health')&&report.calculation.highest.includes('Spiritual Bliss'))
  assert.ok(report.calculation.lowest.includes('Wealth')&&report.calculation.lowest.includes('Relationships'))
  assert.deepEqual(report.calculation.differences,[-3,6,0,1]);assert.notEqual(report.calculation.currentPoints,initialPoints)
  await evaluate("document.querySelector('.assessment-priorities input[value=health]').click();document.querySelector('.assessment-priorities input[value=relationships]').click()")
  await waitFor("document.querySelector('[data-selected-priorities]').textContent === 'Health, Relationships'")
  report.priorities=await evaluate("document.querySelector('[data-selected-priorities]').textContent")
  await evaluate("document.querySelector('.comparison-review button').click()")
  await waitFor("document.activeElement.id==='assessment-results'")
  await evaluate("document.querySelector('.summary-actions button').click()")
  await waitFor("document.activeElement.id==='rating-health'")
  report.edit=true
  await evaluate("document.querySelector('.summary-actions button:last-child').click()")
  await waitFor("[...document.querySelectorAll('#assessment input[type=range]')].every(el=>+el.value===5)")
  report.reset=await evaluate("({ratings:[...document.querySelectorAll('#assessment input[type=range]')].map(el=>+el.value),selected:document.querySelectorAll('.assessment-priorities input:checked').length,total:document.querySelector('[data-total-score]').textContent,highest:document.querySelector('[data-highest]').textContent,lowest:document.querySelector('[data-lowest]').textContent,defaults:[...document.querySelectorAll('#assessment .rating-status')].every(el=>el.textContent.includes('Default: 5'))})")
  assert.equal(report.reset.selected,0);assert.equal(report.reset.total,'20 / 40');assert.equal(report.reset.defaults,true)
  assert.ok(report.reset.highest.includes('Health, Wealth, Relationships, Spiritual Bliss'))
  await evaluate("document.querySelector('.assessment-bridge a').click()")
  await waitFor("location.hash==='#learning'")
  report.bridge=true
  report.layouts=[]
  for(const [width,height,columns]of [[1440,1000,4],[1024,900,2],[768,1000,2],[390,844,1],[320,780,1]]){
    await resize(width,height,width<768)
    await scroll('assessment-comparison')
    const result=await evaluate("({width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,pillarColumns:getComputedStyle(document.querySelector('.phase-three-pillar-grid')).gridTemplateColumns.split(' ').length})")
    assert.equal(result.overflow,false,`No overflow at ${width}`);assert.equal(result.pillarColumns,columns);report.layouts.push(result)
  }
  await evaluate("document.getElementById('desired-health').scrollIntoView({behavior:'instant',block:'center'})")
  const touch=await evaluate("(()=>{const el=document.getElementById('desired-health'),r=el.getBoundingClientRect();return{x:r.left+r.width*.8,y:r.top+r.height/2,before:+el.value}})()")
  await send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:touch.x,y:touch.y}]})
  await send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]})
  await waitFor("+document.getElementById('desired-health').value!==5")
  report.touch={before:touch.before,after:await evaluate("+document.getElementById('desired-health').value")}
  assert.notEqual(report.touch.before,report.touch.after)
  await evaluate("document.querySelector('.current-desired-comparison .chart-text-alternative button').click()")
  await waitFor("document.activeElement.id==='desired-health'")
  report.interactiveChartLabels=true
  await scroll('mentor-introduction')
  await waitFor("document.querySelector('#mentor-introduction video')?.readyState>=1")
  report.video=await evaluate(`(async()=>{const v=document.querySelector('#mentor-introduction video');v.muted=true;await v.play();for(let i=0;i<28&&v.currentTime<.1;i++)await new Promise(r=>setTimeout(r,200));const result={duration:v.duration,time:v.currentTime,playing:!v.paused};v.pause();return result})()`)
  assert.ok(report.video.playing&&report.video.time>0)
  report.mentorImage=await evaluate("document.querySelector('.rapport-mentor-artwork img').complete&&document.querySelector('.rapport-mentor-artwork img').naturalWidth>0")
  assert.equal(report.mentorImage,true)
  await evaluate("document.querySelector('.phase-one-actions a').click()")
  await waitFor("location.hash==='#register'")
  report.registration=true
  report.privacy={assessmentWrites:requests.filter(r=>!['GET','HEAD'].includes(r.method)),storage:await evaluate("({local:localStorage.length,session:sessionStorage.length})")}
  assert.equal(report.privacy.assessmentWrites.length,0)
  assert.deepEqual(report.privacy.storage,{local:0,session:0})
  report.errors=errors
  await writeFile(`${directory}/browser-results.json`,JSON.stringify(report,null,2))
  assert.equal(errors.length,0,JSON.stringify(errors))
  await resize(1440,1000)
  await screenshot('desktop-pillars','#circle-of-life')
  await screenshot('desktop-comparison','#assessment-comparison')
  await resize(390,844,true)
  await screenshot('mobile-summary','#assessment-results')
  console.log(JSON.stringify(report,null,2))
  }
  ws.send(JSON.stringify({id:++serial,method:'Browser.close'}));ws.close()
}finally{ws?.close();chrome.kill();clearInterval(keepAlive)}
