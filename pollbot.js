class Pollbot {
  constructor () {
    this.question = false
    this.answers = []
    this.results = {}
  }

  parse (text) {
    var match = /^pollbot:? (ask|answer|close) "(.+?)"([\s\S]+)/.exec(text)
    if (!match) return false
    var cmd = match[1]
    switch (cmd) {
      case 'ask':
        var question = match[2]
        var answers = match[3].split('\n').filter((x) => /\w/.test(x)).map((x) => x.trim())
        return this.ask(question, answers)
        break
      case 'answer':
        var response = match[2]
        return this.answer(response)
        break
      case 'close':
        return this.close()
        break
      default:
        return false
    }
    if (!answers) return false
    return {
      cmd: cmd,
      match: match
    }
  }

  ask (question, answers) {
    if (this.question) return new Error('question already in progress')
    this.question = question
    this.answers = answers
    answers.forEach((answer) => {
      this.results[answer] = 0
    })
    return 'answers'
  }

  answer (response) {
    var res = this.answers[parseInt(response)]
    if (!res) return new Error(`cant find answer with id ${response}`)
    this.results[res] += 1
    return 'answered!'
  }

  close () {
    return Object.keys(this.results).map((answer) => `${answer}: ${this.results[answer]}`).join('\n')
  }
}

module.exports = Pollbot
