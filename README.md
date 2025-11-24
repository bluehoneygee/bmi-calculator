<div align="center">

  <h3 align="center">BMI Calculator</h3>

  <div align="center">
    A lightweight, client-side BMI tool with ideal-weight guidance and quick tips for healthier habits.
  </div>
</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)

## <a name="introduction">🤖 Introduction</a>

BMI Calculator is a single-page web app that helps you calculate Body Mass Index. Enter weight (kg) and height (cm), get a category badge, recommended range, and simple advice to move toward a healthier range.

## <a name="tech-stack">⚙️ Tech Stack</a>

- HTML5 for structure
- CSS3 (custom) for layout and responsive card UI
- Vanilla JavaScript for validation, BMI math, and DOM updates

## <a name="features">🔋 Features</a>

👉 **Form validation**: Input checks with helpful ranges for weight (20–300 kg) and height (80–250 cm).  
👉 **Category badge**: Underweight, Normal, Overweight, or Obese with color-coded chips.  
👉 **Ideal range calc**: Shows target weight range for the provided height and how far you are from it.  
👉 **Actionable tips**: Contextual messages to encourage the next step.  
👉 **Reset flow**: Quick “Calculate again” to rerun with new values.  
👉 **Responsive layout**: Mobile-friendly card design that fits small screens.

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to run the project locally.

**Prerequisites**

- A modern web browser (Chrome, Edge, Firefox, Safari)
- Optional: a simple HTTP server if you prefer not to open the HTML file directly

**Cloning the Repository**

```bash
git clone <repo-url>
cd bmi-calculator-app
```

**Run the App**

Option 1: Open `index.html` directly in your browser.  
Option 2: Serve locally (example using `npx serve`):

```bash
npx serve .
```

Open the printed URL (usually http://localhost:3000) and start calculating your BMI.
