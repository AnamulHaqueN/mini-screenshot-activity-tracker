import { DateTime } from 'luxon'

function randomTimeFromLastSevenDays() {
   const days = Math.floor(Math.random() * 7)
   const hours = 9 + Math.floor(Math.random() * 9) // 9 am to 6 pm
   const minutes = Math.floor(Math.random() * 60)

   return DateTime.now().minus({ days, hours, minutes }).toJSDate()
}

console.log(randomTimeFromLastSevenDays())
