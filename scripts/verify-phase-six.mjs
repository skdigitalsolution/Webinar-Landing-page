import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const delay = ms => new Promise(r => setTimeout(r, ms))
const directory = 'docs/phase-six'
const motionMode=process.argv.includes('--motion-only')
const browserPort=motionMode?9363:process.argv.includes('--screenshots-only')?9365:9361
await mkdir(directory, { recursive: true })
const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', ['--headless=new','--no-first-run','--no-default-browser-check',`--remote-debugging-port=${browserPort}`,`--user-data-dir=${resolve(`.backups/phase-six-${browserPort}`)}`,'--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','about:blank'], { windowsHide: true, stdio: 'ignore' })
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
  const report={},requests=[]
  const key=async(name,number)=>{await send('Input.dispatchKeyEvent',{type:'keyDown',key:name,code:name,windowsVirtualKeyCode:number,text:name==='Enter'?'\r':undefined});await send('Input.dispatchKeyEvent',{type:'keyUp',key:name,code:name,windowsVirtualKeyCode:number});await delay(150)}
  const setValues=async values=>evaluate(`(()=>{for(const[id,value]of Object.entries(${JSON.stringify(values)})){const el=document.getElementById(id);Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(el,value);el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}))}})()`)
  const screenshot=async(name,selector)=>{
    await evaluate("document.activeElement?.blur();window.scrollTo({top:0,behavior:'instant'})")
    const clip=await evaluate(`(()=>{const r=document.querySelector('${selector}').getBoundingClientRect();return{x:0,y:r.top+scrollY,width:innerWidth,height:Math.min(r.height,1900),scale:1}})()`)
    await writeFile(`${directory}/${name}.png`,Buffer.from((await send('Page.captureScreenshot',{format:'png',optimizeForSpeed:true,captureBeyondViewport:true,clip})).data,'base64'))
  }
  await send('Runtime.enable');await send('Log.enable');await send('Page.enable');await send('Network.enable')
  ws.addEventListener('message',event=>{const m=JSON.parse(event.data);if(m.method==='Network.requestWillBeSent')requests.push({method:m.params.request.method,url:m.params.request.url});if(m.method==='Runtime.consoleAPICalled'&&m.params.type==='error')errors.push({source:'console',message:m.params.args.map(a=>a.description||a.value).join(' ')})})
  await resize(1440,1000)
  await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:motionMode?'no-preference':'reduce'}]})
  await send('Page.navigate',{url:'http://127.0.0.1:5184/Webinar-Landing-page/'})
  await waitFor("document.querySelector('#registration-demo-form')&&document.querySelector('#final-cta')")
  if(motionMode){
    await scroll('register')
    await waitFor("Number(getComputedStyle(document.querySelector('.phase-six-ticket')).opacity)>=.999")
    report.ticketGlow=await evaluate("getComputedStyle(document.querySelector('.phase-six-ticket')).animationName")
    assert.equal(report.ticketGlow,'registration-ticket-glow')
    await scroll('faq')
    await waitFor("[...document.querySelectorAll('.registration-faq-item')].every(el=>Number(getComputedStyle(el).opacity)>=.999)")
    await evaluate("document.querySelector('.registration-faq-item button').click()")
    await waitFor("document.querySelector('.faq-answer').getBoundingClientRect().height>20")
    report.expand=true
    await evaluate("document.querySelector('.registration-faq-item button').click()")
    await waitFor("document.querySelector('.faq-answer').getBoundingClientRect().height<1")
    report.collapse=true
    await scroll('final-cta')
    await waitFor("Number(getComputedStyle(document.querySelector('.phase-six-final .landing-final-panel')).opacity)>=.999")
    report.finalReveal=true
    report.errors=errors
    await writeFile(directory+'/motion-results.json',JSON.stringify(report,null,2));assert.equal(errors.length,0,JSON.stringify(errors));console.log(JSON.stringify(report,null,2))
  }else if(process.argv.includes('--screenshots-only')){
    const copy=await evaluate("({description:document.querySelector('#register > .container-shell .body-copy').textContent,onlineQuestion:[...document.querySelectorAll('.registration-faq-item button')].some(button=>button.textContent==='Is the webinar online?'),paymentDisabled:document.querySelector('.payment-status button').disabled})")
    assert.ok(copy.description.startsWith('Join an expert-guided session'));assert.equal(copy.onlineQuestion,true);assert.equal(copy.paymentDisabled,true)
    await writeFile(directory+'/copy-check.json',JSON.stringify(copy,null,2))
    await screenshot('desktop-registration','#register')
    await screenshot('desktop-faq','#faq')
    await screenshot('desktop-summary','#registration-summary')
    await screenshot('desktop-footer','.phase-six-footer')
    await resize(390,844,true)
    await screenshot('mobile-registration','#register')
    console.log('Final copy, disabled payment and handoff captures verified.')
  }else{
    report.structure=await evaluate("({forms:document.querySelectorAll('#registration-demo-form').length,register:document.querySelectorAll('#register').length,faq:document.querySelectorAll('#faq').length,final:document.querySelectorAll('#final-cta').length,consent:document.querySelector('#register-consent').checked,paymentDisabled:document.querySelector('.payment-status button').disabled,paymentLabel:document.querySelector('.payment-setup-heading').textContent})")
    assert.equal(report.structure.forms,1);assert.equal(report.structure.consent,false);assert.equal(report.structure.paymentDisabled,true);assert.equal(report.structure.paymentLabel,'Payment Setup Pending')
    report.ticket=await evaluate("({price:document.querySelector('.ticket-price > span').textContent,date:document.querySelector('.pricing-event-list time').textContent,details:document.querySelector('.pricing-event-list').textContent})")
    assert.equal(report.ticket.price,'\u20b9199');assert.ok(report.ticket.date.includes('22 November 2026'));assert.ok(report.ticket.details.includes('Zoom'))
    await evaluate("document.querySelector('#registration-demo-form button[type=submit]').click()")
    await waitFor("document.querySelectorAll('#registration-demo-form [aria-invalid=true]').length===4")
    assert.equal(await evaluate('document.activeElement.id'),'register-fullName')
    report.emptyValidation={errors:4,focusFirst:true}
    await setValues({'register-email':'not-an-email','register-mobile':'12345'})
    await waitFor("document.querySelector('#register-email').getAttribute('aria-invalid')==='true'&&document.querySelector('#register-mobile').getAttribute('aria-invalid')==='true'")
    report.invalidFormatsRejected=true
    await evaluate("document.querySelector('.load-demo-button').click()")
    assert.equal(await evaluate("document.getElementById('register-consent').checked"),false)
    await evaluate("document.querySelector('#registration-demo-form button[type=submit]').click()")
    await waitFor("document.getElementById('register-consent').getAttribute('aria-invalid')==='true'")
    assert.equal(await evaluate("document.querySelectorAll('#registration-demo-form [aria-invalid=true]').length"),1)
    await setValues({'register-mobile':'+91 90000-00000'})
    await evaluate("document.getElementById('register-consent').click();document.querySelector('#registration-demo-form button[type=submit]').click()")
    await waitFor("document.querySelector('.validated-demo-note')")
    await waitFor("document.activeElement.id==='registration-summary'")
    report.summary=await evaluate("({total:document.querySelector('.checkout-total dd').textContent,lines:document.querySelector('.checkout-line-items').textContent,paymentDisabled:document.querySelector('.payment-status button').disabled,status:document.querySelector('.registration-action-notice').textContent,containsContact:/Alex Example|alex@example.com|9000000000/.test(document.querySelector('#registration-summary').textContent)})")
    assert.equal(report.summary.total,'\u20b9199');assert.equal(report.summary.paymentDisabled,true);assert.equal(report.summary.containsContact,false);assert.ok(report.summary.status.includes('No registration was created'))
    await setValues({'register-fullName':'Sample Person'})
    await waitFor("!document.querySelector('.validated-demo-note')")
    report.previewInvalidatesOnEdit=true
    await setValues({'register-email':'person@domain.test','register-mobile':'9876543210'})
    await evaluate("document.querySelector('#registration-demo-form button[type=submit]').click()")
    await waitFor("document.querySelector('#register-email').getAttribute('aria-invalid')==='true'")
    report.realContactBlockedInDemo=true
    await evaluate("document.querySelector('.registration-form-actions button:last-child').click()")
    report.clear=await evaluate("[...document.querySelectorAll('#registration-demo-form input')].every(el=>el.type==='checkbox'?!el.checked:el.value==='')")
    assert.equal(report.clear,true)
    report.faq=await evaluate("[...document.querySelectorAll('.registration-faq-item button')].map(el=>el.textContent)")
    assert.equal(report.faq.length,5);assert.ok(report.faq.some(q=>q.includes('Who is')));assert.ok(!report.faq.some(q=>/refund|joining link|four books/.test(q)))
    await evaluate("document.querySelector('.registration-faq-item button').click()")
    await waitFor("document.querySelector('.registration-faq-item button').getAttribute('aria-expanded')==='true'")
    await evaluate("document.querySelector('.registration-faq-item button').focus()")
    await key('ArrowDown',40)
    assert.equal(await evaluate("document.activeElement===document.querySelectorAll('.registration-faq-item button')[1]"),true)
    await key('Enter',13)
    await waitFor("document.querySelectorAll('.registration-faq-item button')[1].getAttribute('aria-expanded')==='true'")
    await key('Enter',13)
    await waitFor("document.querySelectorAll('.registration-faq-item button')[1].getAttribute('aria-expanded')==='false'")
    await key('End',35);assert.equal(await evaluate("document.activeElement===document.querySelectorAll('.registration-faq-item button')[4]"),true)
    report.faqKeyboard=true
    report.anchorAudit=await evaluate("[...document.querySelectorAll('a[href]')].filter(a=>new URL(a.href).hash).map(a=>({text:a.textContent.trim(),hash:new URL(a.href).hash,exists:!!document.getElementById(decodeURIComponent(new URL(a.href).hash.slice(1)))}))")
    assert.ok(report.anchorAudit.every(link=>link.exists))
    report.registrationLinks=await evaluate("[...document.querySelectorAll('a')].filter(a=>/Register Now|Join the Webinar|Reserve Your Place|^Registration$/.test(a.textContent.trim())).map(a=>({text:a.textContent.trim(),target:new URL(a.href).hash}))")
    assert.ok(report.registrationLinks.length>=6);assert.ok(report.registrationLinks.every(a=>a.target==='#register'))
    for(let i=0;i<report.registrationLinks.length;i++){
      await evaluate(`document.activeElement?.blur();scrollTo({top:0,behavior:'instant'});[...document.querySelectorAll('a')].filter(a=>/Register Now|Join the Webinar|Reserve Your Place|^Registration$/.test(a.textContent.trim()))[${i}].click()`)
      await waitFor("location.hash==='#register'&&document.getElementById('register').getBoundingClientRect().top>=document.querySelector('.site-header').getBoundingClientRect().bottom-1&&document.getElementById('register').getBoundingClientRect().top<180")
    }
    report.allRegistrationLinksWork=true
    await evaluate("document.querySelector('.phase-six-ticket button').click()")
    await waitFor("document.activeElement.id==='register-fullName'")
    report.ticketFormLink=true
    report.footer=await evaluate("({tagline:document.querySelector('.footer-tagline').textContent,links:document.querySelectorAll('.footer-nav a').length,legalLinks:document.querySelectorAll('.footer-legal a').length,duplicateDestinations:[...document.querySelectorAll('.footer-nav a')].length-new Set([...document.querySelectorAll('.footer-nav a')].map(a=>a.href)).size})")
    assert.equal(report.footer.legalLinks,0);assert.equal(report.footer.duplicateDestinations,0)
    report.layouts=[]
    for(const[width,height,columns]of [[1440,1000,2],[1024,900,2],[768,1000,2],[390,844,1],[320,780,1]]){
      await resize(width,height,width<768)
      const layout=await evaluate("({width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,columns:getComputedStyle(document.querySelector('.registration-workspace')).gridTemplateColumns.split(' ').length})")
      assert.equal(layout.overflow,false,`No overflow at ${width}`);assert.equal(layout.columns,columns);report.layouts.push(layout)
    }
    await resize(390,844,true)
    await evaluate("document.activeElement?.blur();scrollTo({top:0,behavior:'instant'})")
    await waitFor("document.querySelector('.phase-six-mobile-bar')")
    await evaluate("document.querySelector('.phase-six-mobile-bar a').click()")
    await waitFor("location.hash==='#register'&&document.getElementById('register').getBoundingClientRect().top<150")
    await scroll('registration-demo-form')
    await waitFor("!document.querySelector('.phase-six-mobile-bar')")
    report.sticky={visibleAtTop:true,navigates:true,hiddenAtForm:true}
    await scroll('registration-summary')
    await waitFor("!document.querySelector('.phase-six-mobile-bar')")
    report.sticky.hiddenAtSummary=true
    await scroll('final-cta')
    await waitFor("!document.querySelector('.phase-six-mobile-bar')")
    report.sticky.hiddenAtFinalCTA=true
    await evaluate("document.querySelector('.assessment-priorities input[value=health]').click()")
    await waitFor("document.getElementById('planning-area').value==='health'")
    await evaluate("document.getElementById('planning-priority').focus()")
    await waitFor("document.activeElement.id==='planning-priority'&&!document.querySelector('.phase-six-mobile-bar')")
    report.sticky.hiddenWhileTyping=true
    await evaluate("document.activeElement.blur();document.getElementById('rating-health').focus()")
    await key('ArrowRight',39)
    await waitFor("+document.getElementById('rating-health').value===6")
    report.assessment=true
    await scroll('mentor-introduction')
    await waitFor("document.querySelector('#mentor-introduction video')?.readyState>=1")
    report.video=await evaluate(`(async()=>{const v=document.querySelector('#mentor-introduction video');v.muted=true;await v.play();for(let i=0;i<28&&v.currentTime<.1;i++)await new Promise(r=>setTimeout(r,200));const result={duration:v.duration,time:v.currentTime,playing:!v.paused};v.pause();return result})()`)
    assert.ok(report.video.playing&&report.video.time>0)
    report.privacy={writes:requests.filter(r=>!['GET','HEAD'].includes(r.method)),storage:await evaluate("({local:localStorage.length,session:sessionStorage.length})")}
    assert.equal(report.privacy.writes.length,0);assert.deepEqual(report.privacy.storage,{local:0,session:0})
    await send('Page.reload')
    await waitFor("document.querySelector('#register-consent')&&!document.getElementById('register-consent').checked")
    report.refreshClearsForm=await evaluate("[...document.querySelectorAll('#registration-demo-form input')].every(el=>el.type==='checkbox'?!el.checked:el.value==='')")
    assert.equal(report.refreshClearsForm,true)
    report.errors=errors
    await writeFile(directory+'/browser-results.json',JSON.stringify(report,null,2));assert.equal(errors.length,0,JSON.stringify(errors))
    await resize(1440,1000)
    await screenshot('desktop-registration','#register')
    await screenshot('desktop-faq','#faq')
    await screenshot('desktop-final','#final-cta')
    await resize(390,844,true)
    await screenshot('mobile-registration','#register')
    console.log(JSON.stringify(report,null,2))
  }
  ws.send(JSON.stringify({id:++serial,method:'Browser.close'}));ws.close()
}finally{ws?.close();chrome.kill();clearInterval(keepAlive)}
