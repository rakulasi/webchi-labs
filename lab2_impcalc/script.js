window.onload = function () {
 
  let a = '';
  let b = '';
  let selectedOperation = null;
  let expressionResult = '';
  let justCalculated = false;
 
  const outputElement = document.getElementById('result');
  const device = document.querySelector('.device');
  const modeSelect = document.querySelector('.mode-select');
 
  const ledColors = ['#93ab7c', '#e8a33d', '#e0533d'];
  let ledIndex = 0;
 
  function show(value) {
    let text = String(value);
    if (text.length > 14 && Number.isFinite(+text)) {
      text = (+text).toPrecision(8);
    }
    outputElement.innerHTML = text;
    outputElement.style.fontSize = text.length > 10 ? '1.6rem' : '';
  }
 
  function getCurrent() {
    return selectedOperation ? b : a;
  }
 
  function setCurrent(value) {
    if (selectedOperation) {
      b = value;
    } else {
      a = value;
    }
    show(value || 0);
  }
 
  function showError() {
    a = '';
    b = '';
    selectedOperation = null;
    justCalculated = false;
    show('ERROR');
  }
 
  function onDigitButtonClicked(digit) {
    if (justCalculated && !selectedOperation) {
      a = '';
      justCalculated = false;
    }
 
    let current = getCurrent();
 
    if (digit === '.') {
      if (current.includes('.')) return;
      if (current === '') current = '0';
    } else {
      if (current === '0') current = '';
      if (digit === '000' && current === '') return;
    }
 
    if ((current + digit).length > 14) return;
 
    setCurrent(current + digit);
  }
 
  function calculate() {
    if (a === '' || b === '' || !selectedOperation) return;
 
    switch (selectedOperation) {
      case '+':
        expressionResult = (+a) + (+b);
        break;
      case '-':
        expressionResult = (+a) - (+b);
        break;
      case 'x':
        expressionResult = (+a) * (+b);
        break;
      case '/':
        if (+b === 0) {
          showError();
          return;
        }
        expressionResult = (+a) / (+b);
        break;
    }
 
    expressionResult = parseFloat(expressionResult.toFixed(10));
    a = expressionResult.toString();
    b = '';
    selectedOperation = null;
    show(a);
    justCalculated = true;
  }
 
  function chooseOperation(operation) {
    if (a === '') return;
    if (b !== '' && selectedOperation) {
      calculate();
      if (a === '') return;
    }
    selectedOperation = operation;
  }
 
  function applyUnary(operation) {
    const current = getCurrent();
    if (current === '') return;
 
    const result = operation(+current);
 
    if (!Number.isFinite(result)) {
      showError();
      return;
    }
 
    setCurrent(String(parseFloat(result.toFixed(10))));
    if (!selectedOperation) justCalculated = true;
  }
 
  function factorial(n) {
    if (n < 0 || !Number.isInteger(n)) return NaN;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  }
 
  document.querySelector('.theme-toggle').onclick = function () {
    document.body.classList.toggle('dark');
  };
 
  modeSelect.onchange = function () {
    if (modeSelect.value === 'SCI') {
      device.classList.add('sci');
    } else {
      device.classList.remove('sci');
    }
  };
 
  document.querySelectorAll('[id ^= "btn_digit_"]').forEach(button => {
    button.onclick = function () {
      onDigitButtonClicked(button.innerHTML);
    };
  });
 
  document.getElementById('btn_op_plus').onclick = function () { chooseOperation('+'); };
  document.getElementById('btn_op_minus').onclick = function () { chooseOperation('-'); };
  document.getElementById('btn_op_mult').onclick = function () { chooseOperation('x'); };
  document.getElementById('btn_op_div').onclick = function () { chooseOperation('/'); };
 
  document.getElementById('btn_op_equal').onclick = calculate;
 
  document.getElementById('btn_op_clear').onclick = function () {
    a = '';
    b = '';
    selectedOperation = null;
    expressionResult = '';
    justCalculated = false;
    show(0);
  };
 
  document.getElementById('btn_op_percent').onclick = function () {
    applyUnary(x => x / 100);
  };
 
  document.getElementById('btn_op_sqrt').onclick = function () {
    applyUnary(Math.sqrt);
  };
 
  document.getElementById('btn_op_square').onclick = function () {
    applyUnary(x => x * x);
  };
 
  document.getElementById('btn_op_fact').onclick = function () {
    applyUnary(factorial);
  };
 
  document.getElementById('btn_op_sign').onclick = function () {
    const current = getCurrent();
    if (current === '' || +current === 0) return;
    if (current.startsWith('-')) {
      setCurrent(current.slice(1));
    } else {
      setCurrent('-' + current);
    }
  };
 
  document.getElementById('btn_op_back').onclick = function () {
    let shorter = getCurrent().slice(0, -1);
    if (shorter === '-') shorter = '';
    setCurrent(shorter);
  };
 
  document.getElementById('btn_op_rnd').onclick = function () {
    setCurrent(String(Math.floor(Math.random() * 1000)));
    if (!selectedOperation) justCalculated = true;
  };
 
  document.getElementById('btn_op_led').onclick = function () {
    ledIndex = (ledIndex + 1) % ledColors.length;
    outputElement.style.color = ledColors[ledIndex];
    outputElement.style.textShadow = '0 0 6px ' + ledColors[ledIndex];
  };
 
};
