const express = require('express')
const path = require('path')
const request = require('request')
const PORT = process.env.PORT || 5000
const ACCESS_CODE = "amzn1.ask.account.AFGZDUOHNDDQSHWAPSB66NKL5QD5UOO3OADJ6BA6HFT452AYJMZ5SD5NKGB7Y25A3XCS66A2TYF6EN4IR5NNA7WJ7VHIVX4P7OBHLOQWODPETVXMMK2B2CFPYJVXNDDMWI2QMH3VBNZ35FM7O7QWVPPNUTCEQF5GHTNBIEKMTZ7C5O2FSGIC4JXGQRCMZC5JD2Q3UHHY2GLEQBI";
const NOTIFY_CODE = "amzn1.ask.account.AFMTXC2Y5N5GHNSPSGZW6NZVIQYZA7DF6NPNKR4J66KUQEDTBEQAUS7ZAYNUTF6UQRVT2RELMQXNE7VZEOZW4ZB7QYAYWSRGIKJVZI2UVAX4TRIXC6QTSUYUJUIFNOGUIHGTRXAY67ITTJCVSHUCV7AEDIYH546GB27G2TJ7WOVG5NSHQAXH3OTP3AJE3RWLQBXPUYIBTHRVBIQ";

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
