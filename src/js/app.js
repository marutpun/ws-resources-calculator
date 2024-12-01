const inputFields = {
  inputMeat: { element: document.getElementById('inputMeat'), factor: 1 },
  inputWood: { element: document.getElementById('inputWood'), factor: 1 },
  inputCoal: { element: document.getElementById('inputCoal'), factor: 1 / 5 },
  inputIron: { element: document.getElementById('inputIron'), factor: 1 / 20 },
};

const percentageElements = {
  inputMeat: document.getElementById('percentageMeat'),
  inputWood: document.getElementById('percentageWood'),
  inputCoal: document.getElementById('percentageCoal'),
  inputIron: document.getElementById('percentageIron'),
};

const GOAL = 1000;

Object.keys(inputFields).forEach((key) => {
  inputFields[key].element.addEventListener('input', function (e) {
    const { value } = e.target;
    if (isNaN(value)) {
      percentageElements[key].textContent = 'Incorrect'; // Display 'Incorrect' if not a number
    } else {
      const percentage = ((value * 100) / (GOAL * inputFields[key].factor)).toFixed(2);
      percentageElements[key].textContent = `${percentage}%`; // Calculate and display percentage
    }
  });
});
