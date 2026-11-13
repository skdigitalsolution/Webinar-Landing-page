import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const delay = ms => new Promise(r => setTimeout(r, ms))
const directory = 'docs/phase-four'
await mkdir(directory, { recursive: true })
const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', ['--headless=new','--no-first-run','--no-default-browser-check',`--remote-debugging-port=${process.argv.includes('--motion-only')?9347:process.argv.includes('--screenshots-only')?9349:9345}`,`--user-data-dir=${resolve(process.argv.includes('--motion-only')?'.backups/phase-four-motion-browser':process.argv.includes('--screenshots-only')?'.backups/phase-four-capture-browser':'.backups/phase-four-browser')}`,'--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','about:blank'], { windowsHide: true, stdio: 'ignore' })
const keepAlive = setInterval(() => {}, 1000)
let ws
try {
  let targets
  for (let i = 0; i < 30; i++) {
    try { targets = await (await fetch(`http://127.0.0.1:${process.argv.includes('--motion-only')?9347:process.argv.includes('--screenshots-only')?9349:9345}/json`)).json(); break } catch { await delay(300) }
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
    for(let i=0;i<50;i++) { if(await evaluate(`Boolean(${expression})`))return;await delay(200) }
    throw new Error(`Condition did not settle: ${expression}`)
  }
  const scroll = async id => {
    await evaluate(`document.getElementById('${id}').scrollIntoView({behavior:'instant',block:'start'})`)
    await delay(800)
  }
  const report={},requests=[]
  const setValues=async values=>evaluate(`(()=>{const values=${JSON.stringify(values)};for(const[id,value]of Object.entries(values)){const el=document.getElementById(id);const prototype=el.tagName==='SELECT'?HTMLSelectElement.prototype:HTMLInputElement.prototype;Object.getOwnPropertyDescriptor(prototype,'value').set.call(el,value);el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}))}})()`)
  const key=async(name,number)=>{await send('Input.dispatchKeyEvent',{type:'keyDown',key:name,code:name,windowsVirtualKeyCode:number});await send('Input.dispatchKeyEvent',{type:'keyUp',key:name,code:name,windowsVirtualKeyCode:number});await delay(200)}
  const screenshot=async(name,selector)=>{
    await evaluate("document.activeElement?.blur();window.scrollTo({top:0,behavior:'instant'})")
    const clip=await evaluate(`(()=>{const r=document.querySelector('${selector}').getBoundingClientRect();return{x:0,y:r.top+scrollY,width:innerWidth,height:Math.min(r.height,1900),scale:1}})()`)
    await writeFile(`${directory}/${name}.png`,Buffer.from((await send('Page.captureScreenshot',{format:'png',optimizeForSpeed:true,captureBeyondViewport:true,clip})).data,'base64'))
  }
  await send('Runtime.enable');await send('Log.enable');await send('Page.enable');await send('Network.enable')
  ws.addEventListener('message',event=>{const message=JSON.parse(event.data);if(message.method==='Network.requestWillBeSent')requests.push({url:message.params.request.url,method:message.params.request.method})})
  await resize(1440,1000)
  await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:process.argv.includes('--motion-only')?'no-preference':'reduce'}]})
  await send('Page.navigate',{url:'http://127.0.0.1:5180/Webinar-Landing-page/'})
  await waitFor("document.querySelector('#solution')&&document.querySelector('#planning-area')")
  if(process.argv.includes('--motion-only')) {
    await waitFor("document.querySelector('.reflection-scroll-glow') && getComputedStyle(document.querySelector('.reflection-scroll-glow')).transform!=='none'")
    await evaluate("window.scrollTo({top:document.querySelector('.future-timeline').getBoundingClientRect().top+scrollY-innerHeight*.88,behavior:'instant'})")
    await delay(1000)
    const before=await evaluate("getComputedStyle(document.querySelector('.reflection-scroll-glow')).transform")
    await evaluate("window.scrollBy({top:600,behavior:'instant'})")
    await delay(1000)
    const after=await evaluate("getComputedStyle(document.querySelector('.reflection-scroll-glow')).transform")
    assert.notEqual(before,after)
    await scroll('solution')
    await waitFor("[...document.querySelectorAll('.solution-process-card')].every(el=>Number(getComputedStyle(el).opacity)>=.999)")
    const motionReport={before,after,cardReveals:true,errors}
    await writeFile(directory+'/motion-results.json',JSON.stringify(motionReport,null,2))
    assert.equal(errors.length,0)
    console.log(JSON.stringify(motionReport,null,2))
  } else if(process.argv.includes('--screenshots-only')) {
    await resize(1440,1000)
    await setValues({'planning-area':'health','planning-priority':'Make space for a daily routine','planning-action':'Choose one small habit to explore','planning-date':'2026-11-30'})
    await screenshot('desktop-timeline','#future-reflection')
    await screenshot('desktop-solution','#solution')
    await screenshot('desktop-planner','#next-step')
    await resize(390,844,true)
    await screenshot('mobile-planner','#next-step')
    console.log('Desktop and mobile captures refreshed at their named viewport widths.')
  } else {
  report.order=await evaluate("[...document.querySelector('main').children].map(s=>s.id).filter(Boolean)")
  assert.deepEqual(report.order.slice(5,12),['assessment','future-reflection','solution','next-step','ai-planning','webinar-bridge','learning'])
  report.initial=await evaluate("({area:document.querySelector('#planning-area').value,disabled:document.querySelector('#planning-priority').disabled,focus:document.querySelector('#solution').dataset.focus,tabs:[...document.querySelectorAll('.future-timeframe-tabs button')].map(el=>el.querySelector('strong').textContent)})")
  assert.equal(report.initial.area,'');assert.equal(report.initial.disabled,true);assert.equal(report.initial.focus,'');assert.deepEqual(report.initial.tabs,['6 Months','1 Year','3 Years'])
  report.timeline=[]
  for(let i=0;i<3;i++){
    await evaluate(`document.querySelectorAll('.future-timeframe-tabs button')[${i}].click()`)
    await waitFor(`document.getElementById('future-tab-${i}').getAttribute('aria-selected')==='true'`)
    report.timeline.push(await evaluate("document.querySelector('.future-question-panel:not([hidden]) h3').textContent"))
  }
  assert.deepEqual(report.timeline,['Will the same challenges still be part of your daily routine?','Will you feel closer to the personal goals that matter to you?','Where might your current choices lead if your priorities remain unchanged?'])
  await evaluate("document.getElementById('future-tab-2').focus()")
  await key('Home',36);assert.equal(await evaluate("document.activeElement.id"),'future-tab-0')
  await key('ArrowRight',39);assert.equal(await evaluate("document.activeElement.id"),'future-tab-1')
  await key('End',35);assert.equal(await evaluate("document.activeElement.id"),'future-tab-2')
  report.timelineKeyboard=true
  await evaluate("document.querySelector('.assessment-priorities input[value=health]').click()")
  await waitFor("document.querySelector('.future-priorities input[value=health]').checked && document.querySelector('#planning-area').value==='health'")
  await evaluate("document.querySelector('.future-priorities input[value=relationships]').click()")
  await waitFor("document.querySelector('.assessment-priorities input[value=relationships]').checked")
  await setValues({'planning-area':'wealth'})
  await waitFor("document.querySelector('.assessment-priorities input[value=wealth]').checked && document.querySelector('#solution').dataset.focus.startsWith('wealth')")
  report.sharedSelection=await evaluate("({assessment:[...document.querySelectorAll('.assessment-priorities input:checked')].map(el=>el.value),future:[...document.querySelectorAll('.future-priorities input:checked')].map(el=>el.value),planner:document.querySelector('#planning-area').value,solution:document.querySelector('[data-solution-focus]').textContent,color:document.querySelector('#solution').style.getPropertyValue('--focus-color')})")
  assert.deepEqual(report.sharedSelection.assessment,['health','wealth','relationships']);assert.deepEqual(report.sharedSelection.future,report.sharedSelection.assessment);assert.ok(report.sharedSelection.solution.includes('Wealth'));assert.equal(report.sharedSelection.color,'#e4bf77')
  await setValues({'planning-priority':'Make room for a weekly budget review','planning-action':'Set aside 10 minutes on Sunday','planning-date':'2026-11-30'})
  await waitFor("document.querySelector('[data-preview-action]').textContent==='Set aside 10 minutes on Sunday'")
  report.planner=await evaluate("({area:document.querySelector('[data-preview-area]').textContent,priority:document.querySelector('[data-preview-priority]').textContent,action:document.querySelector('[data-preview-action]').textContent,date:document.querySelector('[data-preview-date]').textContent,disclosure:document.querySelector('.next-step-preview-note').textContent})")
  assert.equal(report.planner.date,'2026-11-30');assert.equal(report.planner.area,'Wealth');assert.ok(report.planner.disclosure.includes('No AI service'))
  await setValues({'planning-area':'health'})
  assert.equal(await evaluate("document.querySelector('#planning-priority').value"),'')
  await setValues({'planning-priority':'Make time for a short walk'})
  await setValues({'planning-area':'wealth'})
  assert.equal(await evaluate("document.querySelector('#planning-priority').value"),'Make room for a weekly budget review')
  report.separateAreaDrafts=true
  await evaluate("document.querySelector('.next-step-form').requestSubmit()")
  await evaluate("document.querySelector('.next-step-form button').click()")
  await waitFor("document.querySelector('#planning-priority').value==='' && document.querySelector('#planning-date').value===''")
  assert.equal(await evaluate("document.querySelectorAll('.assessment-priorities input:checked').length"),3)
  await setValues({'planning-area':'health'})
  assert.equal(await evaluate("document.querySelector('#planning-priority').value"),'')
  report.plannerReset={allDraftsCleared:true,assessmentSelectionPreserved:true}
  await setValues({'rating-health':9,'rating-wealth':2,'rating-relationships':2,'rating-spiritual-bliss':9,'desired-health':6,'desired-wealth':8,'desired-relationships':2,'desired-spiritual-bliss':10})
  await waitFor("document.querySelector('[data-total-score]').textContent==='22 / 40'")
  report.assessment=await evaluate("({total:document.querySelector('[data-total-score]').textContent,differences:[...document.querySelectorAll('[data-difference]')].map(el=>+el.dataset.difference)})")
  assert.deepEqual(report.assessment.differences,[-3,6,0,1])
  await evaluate("document.querySelector('.future-priorities input[value=spiritual-bliss]').click()")
  assert.equal(await evaluate("+document.getElementById('rating-health').value"),9)
  await evaluate("document.querySelector('.summary-actions button:last-child').click()")
  await waitFor("document.querySelectorAll('.future-priorities input:checked').length===0 && document.querySelector('#solution').dataset.focus===''")
  assert.equal(await evaluate("document.querySelector('#planning-area').value"),'')
  assert.equal(await evaluate("document.querySelector('[data-total-score]').textContent"),'20 / 40')
  report.assessmentResetSync=true
  await evaluate("document.querySelector('.assessment-bridge a').click()")
  await waitFor("location.hash==='#solution'")
  await evaluate("document.querySelector('.solution-action a').click()")
  await waitFor("location.hash==='#next-step'")
  await evaluate("document.querySelector('#webinar-bridge a').click()")
  await waitFor("location.hash==='#learning'")
  report.anchors=true
  await writeFile(`${directory}/browser-results.json`,JSON.stringify(report,null,2))
  report.layouts=[]
  for(const[width,height,columns,planColumns]of [[1440,1000,4,2],[1024,900,2,2],[768,1000,2,2],[390,844,1,1],[320,780,1,1]]){
    await resize(width,height,width<768)
    await scroll('future-reflection')
    await waitFor("document.querySelector('.future-timeframe-tabs').getAttribute('aria-orientation')==='"+(width<768?'vertical':'horizontal')+"'")
    const layout=await evaluate("({width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,processColumns:getComputedStyle(document.querySelector('.solution-process-grid')).gridTemplateColumns.split(' ').length,plannerColumns:getComputedStyle(document.querySelector('.next-step-workspace')).gridTemplateColumns.split(' ').length,timelineOrientation:document.querySelector('.future-timeframe-tabs').getAttribute('aria-orientation')})")
    assert.equal(layout.overflow,false,`No overflow at ${width}`);assert.equal(layout.processColumns,columns);assert.equal(layout.plannerColumns,planColumns);assert.equal(layout.timelineOrientation,width<768?'vertical':'horizontal');report.layouts.push(layout)
  }
  report.processCards=await evaluate("[...document.querySelectorAll('.solution-process-card h3')].map(el=>el.textContent)")
  assert.deepEqual(report.processCards,['Understand','Identify','Explore AI','Plan'])
  assert.equal(await evaluate("getComputedStyle(document.querySelector('.future-timeframe-progress')).transitionDuration"),'0s')
  report.reducedMotion=true
  await scroll('mentor-introduction')
  await waitFor("document.querySelector('#mentor-introduction video')?.readyState>=1")
  report.video=await evaluate(`(async()=>{const v=document.querySelector('#mentor-introduction video');v.muted=true;await v.play();for(let i=0;i<28&&v.currentTime<.1;i++)await new Promise(r=>setTimeout(r,200));const result={duration:v.duration,time:v.currentTime,playing:!v.paused};v.pause();return result})()`)
  assert.ok(report.video.playing&&report.video.time>0)
  await evaluate("document.querySelector('.phase-one-actions a').click()")
  await waitFor("location.hash==='#register'")
  report.registration=true
  await setValues({'planning-area':'health','planning-priority':'A temporary note'})
  await send('Page.reload')
  await waitFor("document.querySelector('#planning-priority')&&document.querySelector('#planning-area').value===''")
  report.refreshClearsPlan=await evaluate("document.querySelector('#planning-priority').value===''")
  assert.equal(report.refreshClearsPlan,true)
  report.privacy={writes:requests.filter(r=>!['GET','HEAD'].includes(r.method)),storage:await evaluate("({local:localStorage.length,session:sessionStorage.length})")}
  assert.equal(report.privacy.writes.length,0);assert.deepEqual(report.privacy.storage,{local:0,session:0})
  report.errors=errors
  await writeFile(`${directory}/browser-results.json`,JSON.stringify(report,null,2))
  assert.equal(errors.length,0,JSON.stringify(errors))
  await resize(1440,1000)
  // Illustrative, non-sensitive test notes are shown only in the local captures.
  await setValues({'planning-area':'health','planning-priority':'Make space for a daily routine','planning-action':'Choose one small habit to explore','planning-date':'2026-11-30'})
  await screenshot('desktop-timeline','#future-reflection')
  await screenshot('desktop-solution','#solution')
  await screenshot('desktop-planner','#next-step')
  await resize(390,844,true)
  await screenshot('mobile-planner','#next-step')
  console.log(JSON.stringify(report,null,2))
  }
  ws.send(JSON.stringify({id:++serial,method:'Browser.close'}));ws.close()
}finally{ws?.close();chrome.kill();clearInterval(keepAlive)}
