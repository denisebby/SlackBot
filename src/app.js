require('dotenv').config();
import {RTMClient} from "@slack/rtm-api"
import {WebClient} from "@slack/web-api"


const rtm = new RTMClient(process.env.OAUTH_TOKEN)
const web = new WebClient(process.env.OAUTH_TOKEN)

const packageJson = require("../package.json")
rtm.start().catch(console.error)

rtm.on("ready",async()=>{
    console.log("The Noodle is ready to poodle.")
    sendMessage(process.env.NOODLE_CHANNEL,`Bruh, I'm a literal clown. This is Mr. Noodle ${packageJson.version} reporting for duty.`)
})

rtm.on("slack_event", async (eventType,event)=>{
    if (event && event.type === "message"){
        if (event.text === "!howslife?"){
            sendMessage(event.channel,`I'm homeless and I make my living entertaining a 3 year old, red-haired a-hole. How do YOU think my life is going, <@${event.user}>?`)
        }
    }
})


async function sendMessage(channel,message){
    await web.chat.postMessage({
        channel: channel,
        text: message
    });
}