const express = require('express')
const path = require('path')
const request = require('request')
const PORT = process.env.PORT || 5000
const ACCESS_CODE = "";
const NOTIFY_CODE = "";

var heartbeats = require('./data/heartbeat.json')

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => {
    let dataset = {
      bpm: [],
      date: [],
    };
    for (let i of heartbeats) {
      dataset["bpm"].push(i["value"]["bpm"]);
      let parsedDate = i["dateTime"].slice(10,17) + ' PM';
      dataset["date"].push(parsedDate.toString())
    }
    return res.render('pages/index', {
      heartbeats: dataset['bpm'], 
      date: JSON.stringify(dataset['date']),
      accessCode: JSON.stringify(ACCESS_CODE),
      notifyCode: JSON.stringify(NOTIFY_CODE)
    })})
  .get('/notify', (req, res) => {
    request.post(
      'https://api.notifymyecho.com/v1/NotifyMe',
      {
        json: {
          notification: 'Your heartbeat is irregular. If you continue to experience palpitations please consult a doctor.',
          accessCode: ACCESS_CODE,
          title: 'Emilys Notification'
        }
      },
      (error, res, body) => {
        if (error) {
          console.error(error)
          return
        }
        console.log(`statusCode: ${res.statusCode}`)
        console.log(body)
      }
    )
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
