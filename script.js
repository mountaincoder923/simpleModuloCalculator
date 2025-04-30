const dividendEl  = document.getElementById('dividend');
const divisorEl   = document.getElementById('divisor');
const resultEl    = document.getElementById('result');
const calcBtn     = document.getElementById('calc');
const againBtn    = document.getElementById('again');
const historyList = document.getElementById('historyList');
const clearBtn    = document.getElementById('clearHistory');

let lastQuotient = null;

function addToHistory(dividend, divisor, quotient, remainder) {
    const li = document.createElement('li');
    li.textContent =
        `${dividend} ÷ ${divisor} → q=${quotient}, r=${remainder}`;
    historyList.appendChild(li);
}

function calculate() {
    const dividend = Number(dividendEl.value);
    const divisor  = Number(divisorEl.value);

    if (!Number.isFinite(dividend) || !Number.isFinite(divisor) || divisor === 0) {
        resultEl.textContent = 'Enter a valid dividend and a non-zero divisor.';
        againBtn.disabled = true;
        return;
    }

    const quotient  = Math.trunc(dividend / divisor);
    const remainder = ((dividend % divisor) + divisor) % divisor;

    resultEl.textContent =
        `${dividend} ÷ ${divisor} = ${quotient} with remainder ${remainder}`;

    lastQuotient = quotient;
    againBtn.disabled = false;
    addToHistory(dividend, divisor, quotient, remainder);
}

function useQuotientAgain() {
    if (lastQuotient == null) return;
    dividendEl.value = lastQuotient;
    resultEl.textContent = '';
    dividendEl.focus();
    againBtn.disabled = true;
}

function resetHistory() {
    historyList.textContent = '';
}

calcBtn.addEventListener('click', calculate);
againBtn.addEventListener('click', useQuotientAgain);
clearBtn.addEventListener('click', resetHistory);

/* Enter key convenience */
[dividendEl, divisorEl].forEach(el =>
    el.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); })
);