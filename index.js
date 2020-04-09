const express = require('express')
const path = require('path')
const request = require('request')
const PORT = process.env.PORT || 5000
const ACCESS_CODE = "amzn1.ask.account.AFMTXC2Y5N5GHNSPSGZW6NZVIQYZA7DF6NPNKR4J66KUQEDTBEQAUS7ZAYNUTF6UQRVT2RELMQXNE7VZEOZW4ZB7QYAYWSRGIKJVZI2UVAX4TRIXC6QTSUYUJUIFNOGUIHGTRXAY67ITTJCVSHUCV7AEDIYH546GB27G2TJ7WOVG5NSHQAXH3OTP3AJE3RWLQBXPUYIBTHRVBIQ";

var heartbeats = require('./data/heartbeat.json')

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => {
    console.log(heartbeats[0]);
    let dataset = {
      bpm: [],
      date: [],
    };
    for (let i of heartbeats) {
      dataset["bpm"].push(i["value"]["bpm"]);
      let parsedDate = i["dateTime"].slice(9,17) + ' PM';
      dataset["date"].push(parsedDate.toString())
    }
    return res.render('pages/index', {
      heartbeats: dataset['bpm'], 
      date: JSON.stringify(dataset['date']),
      accessCode: JSON.stringify(ACCESS_CODE)
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
