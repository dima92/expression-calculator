function operation(prev, action, next) {
  switch (action) {
    case '+':
      return prev + next
    case '-':
      return prev - next
    case '*':
      return prev * next
    case '/':
      if (!next) {
        throw "TypeError: Division by zero."
      }
      return prev / next
  }
}

function verification(action, arr) {
  while (arr.indexOf(action) !== -1) {
    const index = arr.indexOf(action)
    arr[index - 1] = operation(arr[index - 1], arr[index], arr[index + 1])
    arr.splice(index, 2)
  }
  return arr
}

function forVerification(expression) {
  expression = verification('/', expression)
  expression = verification('*', expression)
  expression = verification('-', expression)
  expression = verification('+', expression)
  return expression
}

function expressionCalculator(expr) {
  expr = expr.replace(/\s/g, '')
  const brackets = {
    left: 0,
    right: 0
  }
  let expression = []
  let result = ''

  for (let i = 0; i < expr.length; i++) {
    if (Number.isNaN(+expr[i])) {
      if (!!result) {
        expression.push(+result)
        result = ''
      }
      expression.push(expr[i])
      if (expr[i] === '(') brackets.left++
      if (expr[i] === ')') brackets.right++
    } else {
      result += expr[i]
    }
  }
  !!result && expression.push(+result)

  if (brackets.left !== brackets.right) throw "ExpressionError: Brackets must be paired"

  while (brackets.left > 0) {
    let startIndex = expression.indexOf('(')
    const endIndex = expression.indexOf(')')

    for (let i = startIndex + 1; i < endIndex; i++) {
      if (expression[i] === '(') startIndex = i
    }

    const newArr = forVerification(expression.slice(startIndex + 1, endIndex))
    expression.splice(startIndex, endIndex - startIndex + 1, newArr[0])
    brackets.left--
  }

  expression = forVerification(expression)
  return expression[0]
}

module.exports = {
  expressionCalculator
}