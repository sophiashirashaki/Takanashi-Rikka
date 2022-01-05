console.log('Starting Bot...')
console.log('Jika menemukan eror, segera hubungi owner...')

console.log('jika qr tidak muncul ketik cd settings && rm -rf session.json && cd && cd Haruka && npm start')
let { spawn } = require('child_process')
let path = require('path')
let fs = require('fs')
const CFonts  = require('cfonts')
CFonts.say('Haruka Bot', {
  font: 'chrome',
  align: 'center',
  gradient: ['red', 'magenta']
})
CFonts.say(`Bot WhatsApp Created By ZeeoneOfc`, {
  font: 'console',
  align: 'center',
  gradient: ['red', 'magenta']
})
function start(file) {
  let args = [path.join(file), ...process.argv.slice(2)]
  CFonts.say([process.argv[0], ...args].join(' '), {
    font: 'console',
    align: 'center',
    gradient: ['red', 'magenta']
  })
  let p = spawn(process.argv[0], args, {
    stdio: ['inherit', 'inherit', 'inherit', 'ipc']
  })
  .on('message', data => {
    console.log('| TRM |', data)
    switch (data) {
      case 'reset':
        p.kill()
        start.apply(this, arguments)
        break
      case 'uptime':
        p.send(process.uptime())
        break
    }
  })
  .on('error', e => {
    console.error(e)
    fs.watchFile(args[0], () => {
      start()
      fs.unwatchFile(args[0])
    })
  })
  // console.log(p)
}
start('./command/case.js')