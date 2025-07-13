const PRECISION = 3;

const targetSecondsInput = document.getElementById('target-seconds');
const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resultDisplay = document.getElementById('result-display');

let startTime = 0;
let timerInterval = null;
let isRunning = false;

startBtn.addEventListener('click', () => {
  const targetSeconds = parseFloat(targetSecondsInput.value);
  if (isNaN(targetSeconds) || targetSeconds <= 0) {
    resultDisplay.textContent = '有効な目標秒数を入力してください。';
    return;
  }

  isRunning = true;
  startTime = Date.now();

  // 表示を0.000で初期化（3桁）
  timerDisplay.textContent = (0).toFixed(PRECISION);
  resultDisplay.innerHTML = '';
  startBtn.disabled = true;
  stopBtn.disabled = false;
  targetSecondsInput.disabled = true;

  timerInterval = setInterval(() => {
    const elapsedTime = (Date.now() - startTime) / 1000;
    timerDisplay.textContent = elapsedTime.toFixed(PRECISION);
  }, 10); // 10msごとに更新
});

stopBtn.addEventListener('click', () => {
  if (!isRunning) return;

  clearInterval(timerInterval);
  isRunning = false;

  const elapsedTime = (Date.now() - startTime) / 1000;
  timerDisplay.textContent = elapsedTime.toFixed(PRECISION);

  const targetSeconds = parseFloat(targetSecondsInput.value);
  const diff = Math.abs(elapsedTime - targetSeconds);

  let message = '';
  if (diff <= 0.005) {
    message = '🎉 神の領域！ 🎉';
  } else if (diff <= 0.025) {
    message = '🤩 すごい！ほぼ完璧！ 🤩';
  } else if (diff <= 0.08) {
    message = '👍 おしい！あと少し！ 👍';
  } else if (diff <= 0.4) {
    message = '🙂 もうちょっと！ 🙂';
  } else {
    message = '😅 残念！再挑戦しよう！ 😅';
  }

  resultDisplay.innerHTML = `
    目標: ${targetSeconds.toFixed(PRECISION)}秒<br>
    結果: ${elapsedTime.toFixed(PRECISION)}秒<br>
    誤差: ${diff.toFixed(PRECISION)}秒<br>
    <strong>${message}</strong>
  `;

  startBtn.disabled = false;
  stopBtn.disabled = true;
  targetSecondsInput.disabled = false;
});
