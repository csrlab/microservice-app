/*
seneca.add({role: 'math', cmd: 'sum'}, function (msg, respond) {
  var sum = msg.left + msg.right
  respond(null, {answer: sum})
})

seneca.add({role: 'math', cmd: 'product'}, function (msg, respond) {
  var product = msg.left * msg.right
  respond(null, { answer: product })
})


seneca.act({role: 'math', cmd: 'sum', left: 1, right: 2}, console.log)
      .act({role: 'math', cmd: 'product', left: 3, right: 4}, console.log)

seneca.add({role: 'math', cmd: 'sum', integer: true}, function (msg, respond) {
  var sum = Math.floor(msg.left) + Math.floor(msg.right)
  respond(null, {answer: sum})
})

var seneca = require('seneca')()

seneca.add({role: 'math', cmd: 'sum'}, function (msg, respond) {
  var sum = msg.left + msg.right
  respond(null, {answer: sum})
})

// both these messages match role: math, cmd: sum


seneca.act({role: 'math', cmd: 'sum', left: 1.5, right: 2.5}, console.log)
seneca.act({role: 'math', cmd: 'sum', left: 1.5, right: 2.5, integer: true}, console.log)

seneca.add({role: 'math', cmd: 'sum', integer: true}, function (msg, respond) {
  var sum = Math.floor(msg.left) + Math.floor(msg.right)
  respond(null, { answer: sum })
})

// this still matches role: math, cmd: sum
seneca.act({role: 'math', cmd: 'sum', left: 1.5, right: 2.5}, console.log)

// BUT this matches role:math,cmd:sum,integer:true
// because it's more specific - more properties match
seneca.act({role: 'math', cmd: 'sum', left: 1.5, right: 2.5, integer: true}, console.log)
*/

var seneca = require('seneca')()

seneca.add('role: math, cmd: sum', function (msg, respond) {
  var sum = msg.left + msg.right
  respond(null, {answer: sum})
})

seneca.add('role: math, cmd: sum, integer: true', function (msg, respond) {
  // reuse role:math, cmd:sum
  this.act({
    role: 'math',
    cmd: 'sum',
    left: Math.floor(msg.left),
    right: Math.floor(msg.right)
  }, respond)
})

// this matches role:math,cmd:sum
seneca.act('role: math, cmd: sum, left: 1.5, right: 2.5',console.log)

// BUT this matches role:math,cmd:sum,integer:true
seneca.act('role: math, cmd: sum, left: 1.5, right: 2.5, integer: true', console.log)