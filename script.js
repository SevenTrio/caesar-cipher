window.addEventListener('DOMContentLoaded', function () {
  const textInput = document.getElementById('input');
  const resultInput = document.getElementById('output');

  const encryptBtn = document.getElementById('encrypt-btn');
  const decryptBtn = document.getElementById('decrypt-btn');
  const resetBtn = document.getElementById('reset-btn');

  const stepSelect = document.getElementById('encrypt-step');
  const initialStep = Number.parseInt(stepSelect.value, 10);

  const originalAlphabet = ['а', 'б', 'в', 'г', 'д', 'е', 'є', 'ж', 'з', 'и', 'і', 'ї', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ь', 'ю', 'я', ' '];
  let encryptAlphabet = generateEncryptAlphabet(initialStep, originalAlphabet)

  stepSelect.addEventListener('change',  function (e) {
    const step = Number.parseInt(e.target.value, 10);
    encryptAlphabet = generateEncryptAlphabet(step, originalAlphabet);
  });

  function generateEncryptAlphabet(step, arr) {
    const alfCopy = arr.slice();

    for (let i = 0; i + step < alfCopy.length; i++) {
      const buff = alfCopy[i];
      alfCopy[i] = alfCopy[i + step];
      alfCopy[i + step] = buff;
    }

    return alfCopy;
  }

  function encrypt(text) {
    let encryptedText = '';
    for (let i = 0; i < text.length; i++) {
      const symbol = text[i];
      const isUpperCase = symbol.toUpperCase() === symbol;

      const index = originalAlphabet.findIndex((letter) => letter === symbol.toLowerCase());
      if (index !== -1) {
        const encryptedLetter = encryptAlphabet[index];
        encryptedText += isUpperCase ? encryptedLetter.toUpperCase() : encryptedLetter.toLowerCase();
      }
    }

    return encryptedText;
  }

  function decrypt(text) {
    let decryptedText = '';
    for (let i = 0; i < text.length; i++) {
      const symbol = text[i];
      const isUpperCase = symbol.toUpperCase() === symbol;

      const index = encryptAlphabet.findIndex((letter) => letter === symbol.toLowerCase());
      if (index !== -1) {
        const decryptedLetter = originalAlphabet[index];
        decryptedText += isUpperCase ? decryptedLetter.toUpperCase() : decryptedLetter.toLowerCase();
      }
    }

    return decryptedText;
  }

  encryptBtn.addEventListener('click', function () {
    const text = textInput.value;
    resultInput.value = encrypt(text);
  });

  decryptBtn.addEventListener('click', function () {
    const text = textInput.value;
    resultInput.value = decrypt(text);
  });

  resetBtn.addEventListener('click', function () {
    textInput.value = '';
    resultInput.value = '';
  });

});
