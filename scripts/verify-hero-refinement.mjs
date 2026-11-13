import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const delay = ms => new Promise(r => setTimeout(r, ms))
const directory = 'docs/hero-refinement'
await mkdir(directory, { recursive: true })
const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', ['--headless=new','--no-first-run','--no-default-browser-check','--remote-debugging-port=9335',`--user-data-dir=${resolve('.backups/hero-refinement-browser')}`,'--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','about:blank'], { windowsHide: true, stdio: 'ignore' })
const keepAlive = setInterval(() => {}, 1000)
let ws
try {
  let targets
  for (let i = 0; i < 30; i++) {
    try { targets = await (await fetch('http://127.0.0.1:9335/json')).json(); break } catch { await delay(300) }
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
    const id = ++serial, timeout = setTimeout(() => rej(new Error(`${method} timed out`)), 20000)
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
  const screenshot = async name => {
    const height = await evaluate('Math.ceil(document.querySelector(".phase-one-hero").getBoundingClientRect().bottom + scrollY)')
    const width = await evaluate('innerWidth')
    const result = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width, height, scale: 1 } })
    await writeFile(`${directory}/${name}.png`, Buffer.from(result.data, 'base64'))
  }
  await send('Runtime.enable'); await send('Log.enable'); await send('Page.enable')
  await resize(1440, 1000)
  await send('Page.navigate', { url: 'http://127.0.0.1:5174/Webinar-Landing-page/' })
  for (let i = 0; i < 90; i++) {
    if (await evaluate("document.querySelector('.hero-life-visual .circle-experience')?.dataset.renderState === 'ready'")) break
    await delay(350)
  }
  const scene = await evaluate("document.querySelector('.hero-life-visual .circle-experience')?.dataset.renderState")
  assert.equal(scene, 'ready')
  await evaluate("document.querySelectorAll('.life-nodes button')[2].click()")
  assert.equal(await evaluate("document.querySelector('.hero-life-visual .circle-experience').dataset.selectedDimension"), 'relationships')
  await evaluate("document.querySelector('.hero-life-visual .scene-pause').click()")
  assert.equal(await evaluate("document.querySelector('.hero-life-visual .circle-experience').dataset.motion"), 'paused')
  await evaluate("document.querySelector('.hero-life-visual .scene-pause').click(); document.activeElement.blur(); scrollTo(0,0)")
  await screenshot('desktop')
  const layout = []
  for (const [width, height] of [[1440,1000],[1100,900],[1024,900],[820,1000],[768,1000],[390,844],[320,780]]) {
    await resize(width, height, width < 768)
    await evaluate('scrollTo(0,0)')
    const result = await evaluate(`({width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,heroOverflow:document.querySelector('.phase-one-grid').scrollWidth>document.querySelector('.phase-one-grid').clientWidth,headingWidth:Math.round(document.querySelector('h1').getBoundingClientRect().width),scene:document.querySelector('.hero-life-visual .circle-experience').dataset.renderState})`)
    layout.push(result)
    assert.equal(result.overflow, false, `Page fits at ${width}px`)
    assert.equal(result.heroOverflow, false, `Hero fits at ${width}px`)
    if (width === 1024) await screenshot('tablet')
    if (width === 390) await screenshot('mobile')
  }
  await resize(390,844,true)
  await evaluate("document.querySelector('.menu-toggle').click()")
  assert.equal(await evaluate("document.querySelector('.menu-toggle').getAttribute('aria-expanded')"), 'true')
  await evaluate("document.querySelector('.menu-toggle').click(); document.querySelector('.intro-trigger').click()")
  for (let i=0;i<30;i++) { if(await evaluate("document.querySelector('video')?.readyState >= 1"))break;await delay(250) }
  const video = await evaluate(`(async()=>{const v=document.querySelector('video');window.testVideo=v;const result={src:v.currentSrc,duration:v.duration,controls:v.controls,playsInline:v.playsInline,noAutoplay:v.paused&&!v.autoplay};v.muted=true;await v.play();for(let i=0;i<24&&v.currentTime<.15;i++)await new Promise(r=>setTimeout(r,250));result.time=v.currentTime;result.playing=!v.paused;v.pause();result.pauseWorks=v.paused;await v.play();return result})()`)
  assert.ok(video.noAutoplay && video.controls && video.playsInline && video.playing && video.pauseWorks && video.time>0, JSON.stringify(video))
  assert.ok(Math.abs(video.duration-29)<1)
  await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27})
  await send('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape',windowsVirtualKeyCode:27})
  await delay(300)
  const escape = await evaluate("({closed:!document.querySelector('dialog').open,paused:window.testVideo.paused,focusReturned:document.activeElement===document.querySelector('.intro-trigger'),scrollUnlocked:document.body.style.overflow!=='hidden'})")
  assert.ok(escape.closed && escape.paused && escape.focusReturned && escape.scrollUnlocked)
  await evaluate("document.querySelector('.intro-trigger').click()")
  await delay(300)
  await evaluate("window.testVideo=document.querySelector('video');window.testVideo.muted=true;window.testVideo.play()")
  await evaluate("document.querySelector('[aria-label=\"Close introduction\"]').click()")
  assert.equal(await evaluate('window.testVideo.paused'), true)
  await evaluate("document.querySelector('.phase-one-actions a').click()")
  await delay(800)
  const registration = await evaluate("({hash:location.hash,target:!!document.querySelector('#register')})")
  assert.equal(registration.hash, '#register')
  await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]})
  for (let i=0;i<30;i++) { if(await evaluate("document.querySelector('.hero-life-visual .circle-experience').dataset.renderState === 'static'"))break;await delay(200) }
  const reduced = await evaluate("document.querySelector('.hero-life-visual .circle-experience').dataset.renderState")
  assert.equal(reduced,'static')
  const assets = await evaluate("Promise.all(['1.jpeg','2.jpeg','3.mp4','4.jpeg'].map(async file=>({file,status:(await fetch('/Webinar-Landing-page/assets/webinar/'+file,{method:'HEAD'})).status})))")
  assert.ok(assets.every(a=>a.status===200))
  const report = {scene,interaction:'dimension selection and animation pause/resume passed',layout,video,escape,closeButtonPauses:true,registration,reduced,assets,errors}
  await writeFile(`${directory}/browser-results.json`,JSON.stringify(report,null,2))
  console.log(JSON.stringify(report,null,2))
  assert.equal(errors.length,0,'No browser errors')
  ws.send(JSON.stringify({id:++serial,method:'Browser.close'}));ws.close()
} finally { ws?.close();chrome.kill();clearInterval(keepAlive) }
