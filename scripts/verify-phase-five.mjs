import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const delay = ms => new Promise(r => setTimeout(r, ms))
const directory = 'docs/phase-five'
const motionMode=process.argv.includes('--motion-only')
const browserPort=motionMode?9353:9351
await mkdir(directory, { recursive: true })
const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', ['--headless=new','--no-first-run','--no-default-browser-check',`--remote-debugging-port=${browserPort}`,`--user-data-dir=${resolve(`.backups/phase-five-${browserPort}`)}`,'--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','about:blank'], { windowsHide: true, stdio: 'ignore' })
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
  const report={}
  const screenshot=async(name,selector)=>{
    await evaluate("document.activeElement?.blur();window.scrollTo({top:0,behavior:'instant'})")
    const clip=await evaluate(`(()=>{const r=document.querySelector('${selector}').getBoundingClientRect();return{x:0,y:r.top+scrollY,width:innerWidth,height:Math.min(r.height,1900),scale:1}})()`)
    await writeFile(`${directory}/${name}.png`,Buffer.from((await send('Page.captureScreenshot',{format:'png',optimizeForSpeed:true,captureBeyondViewport:true,clip})).data,'base64'))
  }
  await send('Runtime.enable');await send('Log.enable');await send('Page.enable')
  await resize(1440,1000)
  await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:motionMode?'no-preference':'reduce'}]})
  await send('Page.navigate',{url:'http://127.0.0.1:5182/Webinar-Landing-page/'})
  await waitFor("document.querySelector('#learning-registration')")
  if(motionMode){
    await waitFor("getComputedStyle(document.querySelector('.agenda-progress')).transform!=='none'")
    await evaluate("window.scrollTo({top:document.querySelector('.agenda-timeline').getBoundingClientRect().top+scrollY-innerHeight*.79,behavior:'instant'})")
    await delay(900)
    report.timelineBefore=await evaluate("getComputedStyle(document.querySelector('.agenda-progress')).transform")
    await evaluate("window.scrollBy({top:600,behavior:'instant'})")
    await delay(900)
    report.timelineAfter=await evaluate("getComputedStyle(document.querySelector('.agenda-progress')).transform")
    assert.notEqual(report.timelineBefore,report.timelineAfter)
    await evaluate("document.querySelector('.agenda-timeline li:last-child').scrollIntoView({behavior:'instant',block:'center'})")
    await waitFor("[...document.querySelectorAll('.agenda-module')].every(el=>Number(getComputedStyle(el).opacity)>=.999)")
    report.timelineReveals=true
    await scroll('benefit-books')
    await waitFor("[...document.querySelectorAll('.bonus-book-card')].every(el=>Number(getComputedStyle(el).opacity)>=.999)")
    report.bookAnimation=await evaluate("({name:getComputedStyle(document.querySelector('.book-float')).animationName,state:getComputedStyle(document.querySelector('.book-float')).animationPlayState})")
    assert.equal(report.bookAnimation.name,'benefit-book-float');assert.equal(report.bookAnimation.state,'running')
    const before=await evaluate("getComputedStyle(document.querySelector('.book-object')).transform")
    const box=await evaluate("(()=>{const r=document.querySelector('.bonus-book-card').getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+100}})()")
    await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:box.x,y:box.y})
    await delay(700)
    const after=await evaluate("getComputedStyle(document.querySelector('.book-object')).transform")
    assert.notEqual(before,after)
    report.bookHover={before,after}
    await scroll('whatsapp-learning')
    await evaluate("document.querySelectorAll('.phone-category-controls button')[1].click()")
    await waitFor("document.querySelector('.phone-sample-card h3').textContent==='Wealth'")
    await waitFor("[...document.querySelectorAll('.learning-day-plan li')].every(el=>Number(getComputedStyle(el).opacity)>=.999)")
    report.messageReveal=true;report.dayMarkersReveal=true
    await scroll('telegram-community')
    await waitFor("Number(getComputedStyle(document.querySelector('.community-concept')).opacity)>=.999")
    report.communityAnimation=await evaluate("getComputedStyle(document.querySelector('.community-floating-label')).animationName")
    assert.equal(report.communityAnimation,'benefit-label-float')
    report.errors=errors
    await writeFile(`${directory}/motion-results.json`,JSON.stringify(report,null,2))
    assert.equal(errors.length,0,JSON.stringify(errors))
    console.log(JSON.stringify(report,null,2))
  }else{
    report.sectionOrder=await evaluate("[...document.querySelector('#learning').children].map(el=>el.id||el.className).concat([...document.querySelector('#benefits').children].map(el=>el.id||el.className))")
    assert.equal(report.sectionOrder.length,8)
    assert.deepEqual(report.sectionOrder.slice(1),['learning-dimensions','webinar-agenda','webinar-difference','benefit-books','whatsapp-learning','telegram-community','learning-registration'])
    report.uniqueSections=await evaluate("['learning','learning-dimensions','webinar-agenda','webinar-difference','benefits','benefit-books','whatsapp-learning','telegram-community','learning-registration','register'].every(id=>document.querySelectorAll('[id=\"'+id+'\"]').length===1)")
    assert.equal(report.uniqueSections,true)
    report.outcomes=await evaluate("[...document.querySelectorAll('.phase-five-learning .learning-outcome-list h3')].map(el=>el.textContent)")
    assert.deepEqual(report.outcomes,['Discover','Understand','Explore AI','Plan'])
    report.dimensions=await evaluate("[...document.querySelectorAll('#learning-dimensions .learning-dimension-card')].map(el=>({title:el.querySelector('h3').textContent,examples:[...el.querySelectorAll('li')].map(li=>li.textContent)}))")
    assert.equal(report.dimensions.length,4);assert.ok(report.dimensions.every(d=>d.examples.length===3))
    report.agenda=await evaluate("({titles:[...document.querySelectorAll('.agenda-module h3')].map(el=>el.textContent),status:document.querySelector('#webinar-agenda .badge').textContent,hasDurations:/\\b\\d+\\s*(min|minutes)\\b/i.test(document.querySelector('#webinar-agenda').textContent)})")
    assert.equal(report.agenda.titles.length,7);assert.ok(report.agenda.status.includes('Indicative'));assert.equal(report.agenda.hasDurations,false)
    report.differenceHighlights=await evaluate("[...document.querySelectorAll('#webinar-difference .learning-approach-panel h3')].map(el=>el.textContent)")
    assert.equal(report.differenceHighlights.length,6)
    report.books=await evaluate("[...document.querySelectorAll('.bonus-book-card')].map(el=>({title:el.querySelector('h3').textContent,caption:el.querySelector('figcaption').textContent,coverLabel:el.querySelector('.book-cover-label')?.textContent}))")
    assert.deepEqual(report.books.map(book=>book.title),['Circle of Life','Health','Wealth','Relationship'])
    assert.ok(report.books.every(book=>book.caption.includes('Illustrative')&&book.coverLabel==='ILLUSTRATIVE COVER'))
    report.bookConditions=await evaluate("document.querySelector('#benefit-books .bonus-condition-note').textContent")
    assert.ok(report.bookConditions.includes('subject to confirmation'))
    report.whatsapp=await evaluate("({days:document.querySelectorAll('.learning-day-plan li').length,sampleLabel:document.querySelector('.sample-phone .badge').textContent,caption:document.querySelector('.phone-preview-caption').textContent,inputs:document.querySelectorAll('#whatsapp-learning input').length})")
    assert.equal(report.whatsapp.days,30);assert.ok(report.whatsapp.sampleLabel.includes('ILLUSTRATIVE'));assert.equal(report.whatsapp.inputs,0)
    report.sampleCategories=[]
    for(let i=0;i<4;i++){
      await evaluate(`document.querySelectorAll('.phone-category-controls button')[${i}].click()`)
      await waitFor(`document.querySelectorAll('.phone-category-controls button')[${i}].getAttribute('aria-pressed')==='true'`)
      report.sampleCategories.push(await evaluate("document.querySelector('.phone-sample-card h3').textContent"))
    }
    assert.deepEqual(report.sampleCategories,['Health','Wealth','Relationships','Spiritual Bliss'])
    report.telegram=await evaluate("({links:document.querySelectorAll('#telegram-community a[href]').length,status:document.querySelector('#telegram-community .badge').textContent,caption:document.querySelector('.community-concept > .small-copy').textContent})")
    assert.equal(report.telegram.links,0);assert.ok(report.telegram.status.includes('pending'))
    report.cta=await evaluate("({text:document.querySelector('#learning-registration .button').textContent,note:document.querySelector('.learning-registration-status').textContent})")
    assert.ok(report.cta.text.includes('\u20b9199'));assert.ok(report.cta.note.includes('payments are not open'))
    await evaluate("document.querySelector('#learning-registration .button').click()")
    await waitFor("location.hash==='#register'")
    report.registration=true
    await evaluate("document.getElementById('rating-health').focus()")
    await send('Input.dispatchKeyEvent',{type:'keyDown',key:'ArrowRight',code:'ArrowRight',windowsVirtualKeyCode:39})
    await send('Input.dispatchKeyEvent',{type:'keyUp',key:'ArrowRight',code:'ArrowRight',windowsVirtualKeyCode:39})
    await waitFor("+document.getElementById('rating-health').value===6")
    report.assessment=await evaluate("({current:document.getElementById('rating-health').value,total:document.querySelector('[data-total-score]').textContent})")
    assert.equal(report.assessment.total,'21 / 40')
    await evaluate("document.querySelector('.assessment-priorities input[value=health]').click()")
    await waitFor("document.querySelector('#planning-area').value==='health'")
    report.sharedPlanningPreserved=true
    report.layouts=[]
    for(const[width,height,columns]of [[1440,1000,4],[1024,900,2],[768,1000,2],[390,844,1],[320,780,1]]){
      await resize(width,height,width<768)
      await scroll('learning')
      const layout=await evaluate("({width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,outcomeColumns:getComputedStyle(document.querySelector('.learning-outcome-list')).gridTemplateColumns.split(' ').length,dimensionColumns:getComputedStyle(document.querySelector('.learning-dimension-grid')).gridTemplateColumns.split(' ').length,bookColumns:getComputedStyle(document.querySelector('.bonus-book-grid')).gridTemplateColumns.split(' ').length})")
      assert.equal(layout.overflow,false,`No overflow at ${width}`);assert.equal(layout.outcomeColumns,columns);assert.equal(layout.dimensionColumns,columns);assert.equal(layout.bookColumns,columns);report.layouts.push(layout)
    }
    report.reduced=await evaluate("({books:getComputedStyle(document.querySelector('.book-float')).animationName,community:getComputedStyle(document.querySelector('.community-floating-label')).animationName,transition:getComputedStyle(document.querySelector('.book-object')).transitionDuration})")
    assert.equal(report.reduced.books,'none');assert.equal(report.reduced.community,'none');assert.equal(report.reduced.transition,'0s')
    await scroll('mentor-introduction')
    await waitFor("document.querySelector('#mentor-introduction video')?.readyState>=1")
    report.video=await evaluate(`(async()=>{const v=document.querySelector('#mentor-introduction video');v.muted=true;await v.play();for(let i=0;i<28&&v.currentTime<.1;i++)await new Promise(r=>setTimeout(r,200));const result={duration:v.duration,time:v.currentTime,playing:!v.paused};v.pause();return result})()`)
    assert.ok(report.video.playing&&report.video.time>0)
    report.assets=await evaluate("Promise.all(['1.jpeg','2.jpeg','3.mp4','4.jpeg'].map(async file=>({file,status:(await fetch('/Webinar-Landing-page/assets/webinar/'+file,{method:'HEAD'})).status})))")
    assert.ok(report.assets.every(asset=>asset.status===200))
    report.errors=errors
    await writeFile(`${directory}/browser-results.json`,JSON.stringify(report,null,2))
    assert.equal(errors.length,0,JSON.stringify(errors))
    await resize(1440,1000)
    await screenshot('desktop-learning','.learning-outcomes')
    await screenshot('desktop-books','#benefit-books')
    await screenshot('desktop-whatsapp','#whatsapp-learning')
    await resize(390,844,true)
    await screenshot('mobile-learning','.learning-outcomes')
    await screenshot('mobile-support','#whatsapp-learning')
    console.log(JSON.stringify(report,null,2))
  }
  ws.send(JSON.stringify({id:++serial,method:'Browser.close'}));ws.close()
}finally{ws?.close();chrome.kill();clearInterval(keepAlive)}
