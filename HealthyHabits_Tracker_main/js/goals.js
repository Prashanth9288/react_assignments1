import { db, auth } from "./firbase-config.js";
import { ref, update } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

document.getElementById('bmi-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const feet = parseFloat(document.getElementById('feet').value);
  const inches = parseFloat(document.getElementById('inches').value);
  const weight = parseFloat(document.getElementById('weight').value);

  if (isNaN(feet) || isNaN(inches) || isNaN(weight)) {
    document.getElementById('bmi-result').innerText = "⚠️ Please enter valid inputs.";
    document.getElementById('goals-list').innerHTML = "";
    return;
  }

  const totalInches = (feet * 12) + inches;
  const heightMeters = totalInches * 0.0254;
  const bmi = weight / (heightMeters ** 2);
  const bmiRounded = bmi.toFixed(2);

  let category = "";
  let goalsHTML = "";

  if (bmi < 18.5) {
    category = "Underweight";
    goalsHTML = `
      <h3>💪 Goals for Underweight</h3>
      <ul>
        <li>🍽️ Eat more high-calorie, nutritious foods</li>
        <li>🥛 Add dairy, nuts, healthy oils</li>
        <li>🏋️‍♂️ Strength training to build muscle</li>
        <li>📅 Eat every 3–4 hours</li>
      </ul>`;
  } else if (bmi < 25) {
    category = "Normal";
    goalsHTML = `
      <h3>🌿 Goals for Normal BMI</h3>
      <ul>
        <li>🚶‍♀️ Walk 8,000+ steps/day</li>
        <li>🥗 Balanced diet + hydration</li>
        <li>🧘 Mental & sleep wellness</li>
      </ul>`;
  } else if (bmi < 30) {
    category = "Overweight";
    goalsHTML = `
      <h3>🔥 Goals for Overweight</h3>
      <ul>
        <li>🥦 Portion control & healthy swaps</li>
        <li>🏃‍♂️ 30 min/day cardio</li>
        <li>💧 2.5L water/day</li>
        <li>📉 Track weight weekly</li>
      </ul>`;
  } else {
    category = "Obese";
    goalsHTML = `
      <h3>🚨 Goals for Obesity</h3>
      <ul>
        <li>👨‍⚕️ Doctor-supervised diet</li>
        <li>🏊 Low-impact exercise (swim, walk)</li>
        <li>📋 Meal planning support</li>
        <li>💡 Behavioral changes + support group</li>
      </ul>`;
  }

  // Show on current page
  document.getElementById('bmi-result').innerText = `Your BMI: ${bmiRounded} — ${category}`;
  document.getElementById('goals-list').innerHTML = goalsHTML;

  // Save to Firebase for current user
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      const bmiRef = ref(db, `habits/${user.uid}`);
      await update(bmiRef, {
        bmi: {
          value: parseFloat(bmiRounded),
          category: category,
          lastUpdated: Date.now()
        }
      });
    }
  });
});
