const cron = require('node-cron')

function deployGuilds(){
  cron.schedule("* * * * *",()=> {
    log("logs every minute")
})
}
