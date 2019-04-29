var test = require('tape')
var Pollbot = require('./pollbot.js')

test('parse ask', function (t) {
  var bot = new Pollbot()
  var question = `pollbot: ask "question"
    answer0
answer1
 answer2
  `

  console.log(question)
  console.log(bot.getResponse(question))
  t.same(bot.question, 'question')
  t.same(bot.answers, ['answer0', 'answer1', 'answer2'])

  var answer = `pollbot answer 0`
  console.log(answer)
  console.log(bot.getResponse(answer))

  t.same(bot.results[bot.answers[0]], 1)
  t.same(bot.results[bot.answers[1]], 0)
  t.same(bot.results[bot.answers[2]], 0)

  var close = `pollbot close`
  console.log(close)
  console.log(bot.getResponse(close))

  t.same(bot.question, false)
  t.end()
})
