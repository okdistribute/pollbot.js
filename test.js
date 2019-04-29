var test = require('tape')
var Pollbot = require('./pollbot.js')

test('parse ask', function (t) {
  var bot = new Pollbot()
  var question = `pollbot: ask "question"
    answer1
answer2
 answer3
  `
  var matches = bot.parse(question)
  t.same(matches.cmd, 'ask')
  t.same(bot.question, 'question')
  t.same(bot.answers, ['answer1', 'answer2', 'answer3'])

  var answer = `pollbot: answer 0`

  var response = bot.parse(answer)
  console.log(response)
  t.end()
})

