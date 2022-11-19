const config = require('./config.json')
const mqtt = require('mqtt')

const client  = mqtt.connect(config.mqtt.url, config.mqtt.options)

console.log("starting")
console.log("connecting to", config.mqtt.url)
client.on('connect', function () {
  console.log("connected")

  client.subscribe([config.subscribe_topic+"POWER", config.subscribe_topic+"STATUS"], function (err) {
    if (err) {
      console.log("ERROR", err)
    }
  })

  setInterval(() => {
    // console.log("checking state")
    client.publish(config.topic+"STATUS", "")
  }, 3000)
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(new Date(), topic, "=", message.toString())
//   client.end()
})

