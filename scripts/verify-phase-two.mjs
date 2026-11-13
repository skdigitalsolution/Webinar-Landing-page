import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const delay = ms => new Promise(r => setTimeout(r, ms))
const directory = 'docs/phase-two'
await mkdir(directory, { recursive: true })
const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', ['--headless=new','--no-first-run','--no-default-browser-check','--remote-debugging-port=9337',`--user-data-dir=${resolve('.backups/phase-two-browser')}`,'--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','about:blank'], { windowsHide: true, stdio: 'ignore' })
const keepAlive = setInterval(() => {}, 1000)
let ws
try {
  let targets
  for (let i = 0; i < 30; i++) {
    try { targets = await (await fetch('http://127.0.0.1:9337/json')).json(); break } catch { await delay(300) }
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
  const screenshot = async name => {
    await evaluate("document.activeElement?.blur();window.scrollTo({top:0,behavior:'instant'})")
    await delay(300)
    const bounds=await evaluate(`(()=>{const a=document.getElementById('problems').getBoundingClientRect(),b=document.getElementById('mentor').getBoundingClientRect();return {x:0,y:a.top+scrollY,width:innerWidth,height:b.bottom-a.top,scale:1}})()`)
    await writeFile(`${directory}/${name}.png`,Buffer.from((await send('Page.captureScreenshot',{format:'png',optimizeForSpeed:true,captureBeyondViewport:true,clip:bounds})).data,'base64'))
  }
  await send('Runtime.enable');await send('Log.enable');await send('Page.enable')
  await resize(1440,1000)
  await send('Page.navigate',{url:'http://127.0.0.1:5176/Webinar-Landing-page/'})
  await waitFor("document.querySelector('.hero-life-visual .circle-experience')?.dataset.renderState === 'ready'")
  if(process.argv.includes('--screenshots-only')) {
    await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]})
    await scroll('mentor-introduction')
    await waitFor("document.querySelector('#mentor-introduction video')?.readyState >= 1")
    await scroll('mentor')
    await waitFor("document.querySelector('.rapport-mentor-artwork img').naturalWidth > 0")
    for(const [width,height,name]of [[1440,1000,'desktop'],[1024,900,'tablet'],[390,844,'mobile']]) {
      await resize(width,height,width<768)
      await screenshot(name)
    }
    console.log('Clean Phase 2 screenshots refreshed.')
  } else {
  const report={}
  report.order=await evaluate("[...document.querySelector('main').children].slice(0,5).map(s=>s.id)")
  assert.deepEqual(report.order,['home','problems','mentor-introduction','mentor','circle-of-life'])
  report.uniqueAnchors=await evaluate("['home','problems','mentor-introduction','mentor','circle-of-life','register'].every(id=>document.querySelectorAll('[id=\"'+id+'\"]').length===1)")
  assert.equal(report.uniqueAnchors,true)
  report.hero=await evaluate("({title:document.querySelector('#landing-title').textContent,scene:document.querySelector('.hero-life-visual .circle-experience').dataset.renderState})")
  assert.equal(report.hero.title,'Discover How AI Can Help You Build a Better Life.')
  await evaluate("document.querySelectorAll('.life-nodes button')[1].click()")
  await waitFor("document.querySelector('.hero-life-visual .circle-experience').dataset.selectedDimension === 'wealth'")
  await scroll('problems')
  await waitFor("[...document.querySelectorAll('.rapport-problem-card')].every(card=>Number(getComputedStyle(card).opacity) >= .999)")
  report.problemCards=await evaluate("[...document.querySelectorAll('.rapport-problem-card')].map(c=>({title:c.querySelector('h3').textContent,question:c.querySelector('p').textContent,opacity:Number(getComputedStyle(c).opacity)}))")
  assert.equal(report.problemCards.length,4)
  assert.ok(report.problemCards.every(card=>card.opacity===1))
  await scroll('mentor-introduction')
  await waitFor("document.querySelector('#mentor-introduction video')?.readyState >= 1")
  report.video=await evaluate(`(async()=>{const v=document.querySelector('#mentor-introduction video');window.phaseTwoVideo=v;const result={src:v.currentSrc,duration:v.duration,controls:v.controls,preload:v.preload,playsInline:v.playsInline,noAutoplay:v.paused&&!v.autoplay};v.muted=true;await v.play();for(let i=0;i<28&&v.currentTime<.1;i++)await new Promise(r=>setTimeout(r,200));result.time=v.currentTime;result.playing=!v.paused;v.pause();result.pauseWorks=v.paused;await v.play();return result})()`)
  assert.ok(report.video.playing&&report.video.pauseWorks&&report.video.time>0&&report.video.noAutoplay,JSON.stringify(report.video))
  assert.equal(report.video.preload,'metadata')
  await evaluate("document.querySelector('.intro-trigger').click()")
  await waitFor("document.querySelector('dialog video')?.readyState >= 1")
  await evaluate("document.querySelector('dialog video').muted=true;document.querySelector('dialog video').play()")
  await waitFor('window.phaseTwoVideo.paused')
  report.exclusivePlayback=true
  await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27})
  await send('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape',windowsVirtualKeyCode:27})
  await waitFor("!document.querySelector('dialog').open")
  report.heroModalPreserved=true
  await scroll('mentor')
  await waitFor("document.querySelector('.rapport-mentor-artwork img').complete && document.querySelector('.rapport-mentor-artwork img').naturalWidth > 0")
  report.mentor=await evaluate("({credentials:[...document.querySelectorAll('.rapport-credentials li')].map(el=>el.textContent),highlights:document.querySelectorAll('.rapport-authority-card').length,image:{src:document.querySelector('.rapport-mentor-artwork img').currentSrc,width:document.querySelector('.rapport-mentor-artwork img').naturalWidth,height:document.querySelector('.rapport-mentor-artwork img').naturalHeight,fit:getComputedStyle(document.querySelector('.rapport-mentor-artwork img')).objectFit},oldProfile:!!document.querySelector('.mentor-profile')})")
  assert.deepEqual(report.mentor.credentials,['Homoeopathy Doctor','Life Coach','Author of Four Books'])
  assert.equal(report.mentor.highlights,3)
  assert.equal(report.mentor.image.fit,'contain')
  assert.equal(report.mentor.oldProfile,false)
  await evaluate("document.querySelector('.rapport-bridge a').click()")
  await waitFor("location.hash === '#circle-of-life'")
  report.bridge=true
  await evaluate("document.querySelector('.rapport-register').click()")
  await waitFor("location.hash === '#register'")
  report.registration=true
  await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]})
  await waitFor("document.querySelector('.hero-life-visual .circle-experience').dataset.renderState === 'static'")
  report.reducedMotion=true
  await writeFile(`${directory}/browser-results.json`,JSON.stringify(report,null,2))
  report.layouts=[]
  for(const [width,height,columns,name] of [[1440,1000,4,'desktop'],[1024,900,2,'tablet'],[768,1000,2,null],[390,844,1,'mobile'],[320,780,1,null]]) {
    await resize(width,height,width<768)
    await scroll('problems')
    const layout=await evaluate(`({width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,problemColumns:getComputedStyle(document.querySelector('.rapport-problem-grid')).gridTemplateColumns.split(' ').length,mentorColumns:getComputedStyle(document.querySelector('.rapport-mentor-grid')).gridTemplateColumns.split(' ').length})`)
    assert.equal(layout.overflow,false,`Fits at ${width}px`)
    assert.equal(layout.problemColumns,columns)
    report.layouts.push(layout)
    if(name)await screenshot(name)
  }
  await scroll('mentor-introduction')
  report.mobileVideo=await evaluate(`(async()=>{const v=document.querySelector('#mentor-introduction video');const start=v.currentTime;v.muted=true;await v.play();for(let i=0;i<28&&v.currentTime<=start;i++)await new Promise(r=>setTimeout(r,200));const played=!v.paused&&v.currentTime>start;v.pause();return played})()`)
  assert.equal(report.mobileVideo,true)
  report.assets=await evaluate("Promise.all(['1.jpeg','2.jpeg','3.mp4','4.jpeg'].map(async file=>({file,status:(await fetch('/Webinar-Landing-page/assets/webinar/'+file,{method:'HEAD'})).status})))")
  assert.ok(report.assets.every(asset=>asset.status===200))
  report.errors=errors
  await writeFile(`${directory}/browser-results.json`,JSON.stringify(report,null,2))
  console.log(JSON.stringify(report,null,2))
  assert.equal(errors.length,0,'No browser errors')
  }
  ws.send(JSON.stringify({id:++serial,method:'Browser.close'}));ws.close()
} finally { ws?.close();chrome.kill();clearInterval(keepAlive) }
