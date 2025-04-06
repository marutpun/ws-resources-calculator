const meatInput = document.querySelector('input[name="meat"]');
const meatRatio = document.querySelector('#meatRatio');

const woodInput = document.querySelector('input[name="wood"]');
const woodRatio = document.querySelector('#woodRatio');

const coalInput = document.querySelector('input[name="coal"]');
const coalRatio = document.querySelector('#coalRatio');

const ironInput = document.querySelector('input[name="iron"]');
const ironRatio = document.querySelector('#ironRatio');

const pointTotal = document.querySelector('input[name="pointTotal"]');
const currentPoint = document.querySelector('input[name="currentPoint"]');
const pointLeft = document.querySelector('#pointLeft');
const pointPerMin = document.querySelector('#pointPerMin');

const spending60min = document.querySelector('#spending60min');
const spending5min = document.querySelector('#spending5min');
const spending1min = document.querySelector('#spending1min');

const goal = 1000;

meatInput?.addEventListener('input', function (event) {
  const { value } = event.target;
  const ratio = (Number(value) * 100) / goal;
  if (meatRatio) {
    meatRatio.innerText = ratio.toFixed(2);
  }
});

woodInput?.addEventListener('input', function (event) {
  const { value } = event.target;
  const ratio = (Number(value) * 100) / goal;
  if (woodRatio) {
    woodRatio.innerText = ratio.toFixed(2); // or just `String(ratio)` if you don't want formatting
  }
});

coalInput?.addEventListener('input', function (event) {
  const { value } = event.target;
  const ratio = (Number(value) * 100) / (goal / 5);
  if (coalRatio) {
    coalRatio.innerText = ratio.toFixed(2); // or just `String(ratio)` if you don't want formatting
  }
});

ironInput?.addEventListener('input', function (event) {
  const { value } = event.target;
  const ratio = (Number(value) * 100) / (goal / 20);
  if (ironRatio) {
    ironRatio.innerText = ratio.toFixed(2); // or just `String(ratio)` if you don't want formatting
  }
});

let remainingPoint = 0;
const denominations = [60, 5, 1];

function payout(total) {
  let result = {};
  let remaining = total;

  for (let value of denominations) {
    let count = Math.floor(remaining / value);
    if (count > 0) {
      result[value] = count;
      remaining -= count * value;
    }
  }

  spending60min.textContent = result[60] || 0;
  spending5min.textContent = result[5] || 0;
  spending1min.textContent = result[1] || 0;
}

function updateRemaining() {
  const goalPoint = Number(pointTotal.value) || 0;
  const currentPts = Number(currentPoint.value) || 0;
  const total = goalPoint - currentPts;

  remainingPoint = total > 0 ? total : 0;
  pointLeft.textContent = remainingPoint;

  payout(remainingPoint / Number(pointPerMin.value));
}

// Attach event listeners to update automatically
pointTotal.addEventListener('input', updateRemaining);
currentPoint.addEventListener('input', updateRemaining);
pointPerMin.addEventListener('input', updateRemaining);
