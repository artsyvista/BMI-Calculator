let bmiChart = null;

function updateChart(bmi) {
  const ctx = document.getElementById("bmi-chart").getContext("2d");

  if (bmiChart) {
    bmiChart.destroy();
  }

  bmiChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Underweight", "Normal weight", "Overweight", "Obesity"],
      datasets: [
        {
          label: "BMI",
          data: [18.5, 24.9, 29.9, bmi],
          backgroundColor: [
            "#00bfff",
            "#00ff00",
            "#ffdd57",
            "#ff6347",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 40,
        },
      },
    },
  });
}

document.getElementById("calculate-btn").addEventListener("click", function () {
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value);
  const heightUnit = document.getElementById("height-unit").value;

  const resultElement = document.getElementById("result");
  if (!weight || !height || weight <= 0 || height <= 0) {
    resultElement.innerHTML = "Please enter valid values!";
    return;
  }

  let heightM;
  if (heightUnit === "cm") {
    heightM = height / 100; // Convert cm to meters
  } else if (heightUnit === "feet") {
    heightM = height * 0.3048; // Convert feet to meters
  }

  const bmi = (weight / (heightM * heightM)).toFixed(1);

  let category = "";
  let categoryColor = "";
  if (bmi < 18.5) {
    category = "Underweight";
    categoryColor = "#00bfff";
  } else if (bmi >= 18.5 && bmi < 24.9) {
    category = "Normal weight";
    categoryColor = "#00ff00";
  } else if (bmi >= 25 && bmi < 29.9) {
    category = "Overweight";
    categoryColor = "#ffdd57";
  } else {
    category = "Obesity";
    categoryColor = "#ff6347";
  }

  resultElement.innerHTML = `Your BMI is <span style="color:${categoryColor}">${bmi}</span> (${category}).`;

  updateChart(bmi);
});

document.getElementById("reset-btn").addEventListener("click", function () {
  document.getElementById("weight").value = "";
  document.getElementById("height").value = "";
  document.getElementById("height-unit").value = "cm";
  document.getElementById("result").innerHTML = "";
  if (bmiChart) bmiChart.destroy();
});

document.getElementById("calculate-btn").addEventListener("click", function () {
    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value);
    const heightUnit = document.getElementById("height-unit").value;
  
    const resultElement = document.getElementById("result");
    if (!weight || !height || weight <= 0 || height <= 0) {
      resultElement.innerHTML = "Please enter valid values!";
      return;
    }
  
    let heightM;
    if (heightUnit === "cm") {
      heightM = height / 100; // Convert cm to meters
    } else if (heightUnit === "feet") {
      heightM = height * 0.3048; // Convert feet to meters
    }
  
    const bmi = (weight / (heightM * heightM)).toFixed(1);
  
    let category = "";
    let recommendation = "";
    let categoryColor = "";
  
    if (bmi < 18.5) {
      category = "Underweight";
      recommendation = "Consider eating nutrient-dense foods and consulting a healthcare provider for proper guidance.";
      categoryColor = "#00bfff";
    } else if (bmi >= 18.5 && bmi < 24.9) {
      category = "Normal weight";
      recommendation = "Maintain a balanced diet and regular physical activity to stay healthy.";
      categoryColor = "#00ff00";
    } else if (bmi >= 25 && bmi < 29.9) {
      category = "Overweight";
      recommendation = "Incorporate regular exercise and a healthy diet. Consulting a nutritionist may help.";
      categoryColor = "#ffdd57";
    } else {
      category = "Obesity";
      recommendation = "It’s recommended to seek medical advice to develop a weight management plan.";
      categoryColor = "#ff6347";
    }
  
    resultElement.innerHTML = `
      Your BMI is <span style="color:${categoryColor}">${bmi}</span> (${category}).
      <p><strong>Recommendation:</strong> ${recommendation}</p>
    `;
  
    updateChart(bmi);
  });
  
  