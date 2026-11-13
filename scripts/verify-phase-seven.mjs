import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const delay = ms => new Promise(r => setTimeout(r, ms))
const directory = 'docs/phase-seven'
const mode=process.argv.includes('--baseline')?'baseline':process.argv.includes('--motion')?'motion':process.argv.includes('--fallback')?'fallback':'final'
const browserPort={baseline:9371,final:9383,motion:9375,fallback:9377}[mode]
await mkdir(directory, { recursive: true })
const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', ['--headless=new','--no-first-run','--no-default-browser-check',`--remote-debugging-port=${browserPort}`,`--user-data-dir=${resolve(`.backups/phase-seven-v2-${mode}`)}`,...(mode==='final'?['--disable-gpu']:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']),'about:blank'], { windowsHide: true, stdio: 'ignore' })
const keepAlive = setInterval(() => {}, 1000)
let ws
try {
  let targets
  for (let i = 0; i < 30; i++) {
    try { targets = await (await fetch(`http://127.0.0.1:${browserPort}/json`)).json(); break } catch { await delay(300) }
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
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description||result.exceptionDetails.text)
    await delay(120)
    return result.result.value
  }
  const resize = async (width, height, mobile = false) => {
    await send('Emulation.setDeviceMetricsOverride', { width, height, mobile, deviceScaleFactor: 1 })
    await send('Emulation.setTouchEmulationEnabled', { enabled: mobile })
    await delay(800)
  }
  const waitFor = async expression => {
    for(let i=0;i<50;i++) { if(await evaluate(`Boolean(${expression})`))return;await delay(200) }
    throw new Error(`Condition did not settle: ${expression}`)
  }
  const scroll = async id => {
    await evaluate(`document.getElementById('${id}').scrollIntoView({behavior:'instant',block:'start'})`)
    await delay(800)
  }
  await send('Runtime.enable');await send('Log.enable');await send('Page.enable');await send('Network.enable')
  const metricSource=`(()=>{window.reviewMetrics={lcpMs:null,cls:0,events:[]};let sessionValue=0,first=0,last=0;try{new PerformanceObserver(list=>{for(const e of list.getEntries())window.reviewMetrics.lcpMs=e.startTime}).observe({type:'largest-contentful-paint',buffered:true})}catch{}try{new PerformanceObserver(list=>{for(const e of list.getEntries()){if(e.hadRecentInput)continue;if(e.startTime-last<1000&&e.startTime-first<5000)sessionValue+=e.value;else{sessionValue=e.value;first=e.startTime}last=e.startTime;window.reviewMetrics.cls=Math.max(window.reviewMetrics.cls,sessionValue)}}).observe({type:'layout-shift',buffered:true})}catch{}try{new PerformanceObserver(list=>{for(const e of list.getEntries())if(e.interactionId)window.reviewMetrics.events.push({duration:e.duration,name:e.name})}).observe({type:'event',buffered:true,durationThreshold:16})}catch{}})()`
  await send('Page.addScriptToEvaluateOnNewDocument',{source:metricSource})
  await resize(1440,1000)
  await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:mode==='motion'||mode==='fallback'?'no-preference':'reduce'}]})
  await send('Page.navigate',{url:'http://127.0.0.1:5186/Webinar-Landing-page/'})
  await waitFor("document.querySelector('#final-cta')")
  await send('Page.bringToFront')
  await send('Page.captureScreenshot',{format:'jpeg',quality:50})
  await delay(3000)
  const audit=await evaluate(`({title:document.title,description:document.querySelector('meta[name=description]')?.content||null,og:!!document.querySelector('meta[property="og:title"]'),height:document.documentElement.scrollHeight,headings:[...document.querySelectorAll('h1,h2,h3,h4')].map(el=>({level:el.tagName,text:el.textContent})),brokenControls:[...document.querySelectorAll('[aria-controls]')].filter(el=>!document.getElementById(el.getAttribute('aria-controls'))).map(el=>el.textContent),duplicateIds:[...new Set([...document.querySelectorAll('[id]')].map(el=>el.id))].filter(id=>document.querySelectorAll('[id="'+id+'"]').length>1),visibility:document.visibilityState,supportedMetrics:PerformanceObserver.supportedEntryTypes,navigation:performance.getEntriesByType('navigation')[0]?.toJSON(),metrics:window.reviewMetrics,resources:performance.getEntriesByType('resource').filter(e=>/\\.(js|css|mp4|jpeg)/.test(e.name)).map(e=>({name:e.name,transfer:e.transferSize,encoded:e.encodedBodySize,duration:e.duration}))})`)
  if(mode==='baseline'){
    await writeFile(directory+'/baseline-browser.json',JSON.stringify(audit,null,2));console.log(JSON.stringify({height:audit.height,brokenControls:audit.brokenControls,metrics:audit.metrics},null,2))
  } else {
    assert.equal(audit.brokenControls.length,0);assert.equal(audit.duplicateIds.length,0);assert.ok(audit.description&&audit.og);
    const report={audit,responsive:[],errors};await writeFile(directory+'/'+mode+'-browser.json',JSON.stringify(report,null,2));
    if(mode==='final') {
      await evaluate("document.querySelector('.pillar-detail-toggle').click()");
      assert.equal(await evaluate("document.querySelector('.pillar-detail-toggle').getAttribute('aria-expanded')"),'true');
      await evaluate("document.querySelector('.pillar-detail-toggle').click()");
      for(const width of [360,390,768,1024,1440]) { await resize(width,900,width<768);const result=await evaluate("({width:innerWidth,document:document.documentElement.scrollWidth})");report.responsive.push(result);assert.ok(result.document<=result.width+1,JSON.stringify(result)); }
      const capture=async(name,selector,full=false)=>{await evaluate("document.activeElement?.blur();window.scrollTo({top:0,behavior:'instant'})");await delay(400);let clip;if(full){const size=await send('Page.getLayoutMetrics');clip={x:0,y:0,width:size.cssContentSize.width,height:size.cssContentSize.height,scale:1}}else if(selector){clip=await evaluate("(()=>{const r=document.querySelector("+JSON.stringify(selector)+").getBoundingClientRect();return {x:0,y:r.top+scrollY,width:innerWidth,height:r.height,scale:1}})()")}const image=await send('Page.captureScreenshot',{format:'jpeg',quality:75,captureBeyondViewport:true,...(clip?{clip}:{})});await writeFile(directory+'/'+name+'.jpg',Buffer.from(image.data,'base64'))};
      await evaluate("document.head.insertAdjacentHTML('beforeend','<style>.phase-six-mobile-bar{visibility:hidden!important}</style>')");await resize(1440,1000);await capture('desktop-hero','#home');await capture('desktop-full',null,true);await capture('registration','#register');await capture('assessment','#assessment');await resize(390,844,true);await capture('mobile-hero','#home');await capture('mobile-full',null,true);
    } else {await waitFor("document.querySelector('canvas')");report.canvas=true;if(mode==='fallback'){await evaluate("document.querySelector('canvas').dispatchEvent(new Event('webglcontextlost',{cancelable:true}))");await waitFor("!document.querySelector('canvas')");report.fallback=true;}}
    assert.equal(errors.length,0,JSON.stringify(errors));await writeFile(directory+'/'+mode+'-browser.json',JSON.stringify(report,null,2));console.log(JSON.stringify({height:audit.height,metrics:audit.metrics,responsive:report.responsive,canvas:report.canvas,fallback:report.fallback,errors},null,2))
  }
  ws.send(JSON.stringify({id:++serial,method:'Browser.close'}));ws.close()
}finally{ws?.close();chrome.kill();clearInterval(keepAlive)}

