var english = require('./_locales/en.json')

class Pollbot {
  constructor (locale) {
    this.question = false
    this.answers = []
    this.results = {}
    this._locales = english // TODO: dynamically pick locale
    this._answer = this._answer.bind(this)
  }

  parse (text) {
    var match = /^pollbot:? (ask|answer|close)[\s\S]?([\s\S]+)?/.exec(text)
    if (!match) return false
    var cmd = match[1]
    return {cmd, text: match[2]}
  }

  getResponse (input) {
    var {cmd, text} = this.parse(input)
    switch (cmd) {
      case 'ask':
        var ask = /"(.+?)"([\s\S]+)?/.exec(text)
        if (!ask) return 'boo'
        var question = ask[1]
        var answers = ask[2].split('\n').filter((x) => /\w/.test(x)).map((x) => x.trim())
        return this.ask(question, answers)
      case 'answer':
        var response = text
        return this.answer(response)
      case 'close':
        return this.close()
      case 'info':
        return this.info()
      case 'help':
        return this.help()
      default:
        return false
    }
  }

  info () {
    if (!this.question) return this.help()
    var answers = this._answersString()
    return `Current poll: ${this.question}\n\n${answers}\nSay 'pollbot answer 0' or 'pollbot close'\n`
  }

  help () {
    if (this.question) return this.info()
    else return english['help']
  }

  ask (question, answers) {
    if (this.question) return new Error('question already in progress')
    this.question = question
    this.answers = answers
    answers.forEach((answer) => {
      this.results[answer] = 0
    })
    return this.info()
  }

  answer (response) {
    var res = this.answers[parseInt(response)]
    if (!res) return "I didn't understand '6', maybe that answer doesn't exist! Try 'pollbot help'"
    this.results[res] += 1
    return `got option #${response}`
  }

  _answer (answer, i) {
    // markdown *
    return `* ${i}: ${answer} (${this.results[answer]})`
  }

  _answersString () {
    return this.answers.map(this._answer.bind(this)).join('\n')
  }

  close () {
    var text = `Poll closed! Results:\n\n${this._answersString()}`
    this.question = false
    this.answers = []
    this.results = {}
    return text
  }
}

module.exports = Pollbot
