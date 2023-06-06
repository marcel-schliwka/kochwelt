// Global Variables
let contentList = document.getElementById("ingredientList");
let ingredientAmountInput = document.getElementById("ingredientsAmount");
let newAmounts = [];
const recipeTitle = document.getElementById("recipe-title").innerText;
//Recipe

// Klopse
let amountKlopse = [
  0.25,
  0.25,
  0.5,
  0.6,
  150,
  0.75,
  1,
  25,
  19,
  "",
  "",
  200,
  1.75,
  1,
  12.5,
  0.25,
  0.5,
  38,
  1.5,
  0.25,
  "",
  13,
  50,
];

let ingredientsKlopse = [
  " Zwiebel",
  " Bund Petersilie",
  " Kapern",
  " EL Öl",
  "g Tofu",
  " Eier (Größe M)",
  " TL Senf",
  "g Semmelbrösel",
  "g Magerquark",
  "Salz",
  "Pfeffer",
  "g Kartoffeln",
  " EL Butter",
  " EL Mehl",
  "ml Weißwein",
  "l Gemüsebrühe",
  " Worcestershiresauce",
  "g Schlagsahne",
  " EL Zitronensaft",
  " TL Zucker",
  "etwas Muskatnuss",
  "g gemahlene Mandeln ohne Haut",
  "ml Milch",
];

// Pancakes
let amountPancakes = [25, 0.25, 0.2, 0.1, 0.2, 20, "", "", ""];

let ingredientsPancakes = [
  "g Weizenmehl (Typ 405)",
  " EL Zucker",
  "TL Backpulver",
  " Prise Salz",
  " Eier (Gr. M)",
  "ml Milch",
  "Etwas Speiseöl (z.B. Sonnenblumenöl)",
  "etwas Ahornsirup zum Garnieren",
  "einige Beeren zum Garnieren",
];

let ingredientsSuppe = [
  "n. B.	Kartoffeln, vorwiegend festkochende ca. 2 - 3",
  " Zwiebel(n)",
  " Knoblauchzehe(n)",
  " EL	Olivenöl",
  "g Erbsen, TK",
  "ml Gemüsefond",
  " Tasse(n)	Minzeblätter, gehackt",
  "Salz und Pfeffer",
  "Joghurt",
];

let amountSuppe = ["", 2, 1, 1, 500, 500, 0.5, "", ""];

let ingredientsMuffin = [
  " reife Bananen",
  " Eier",
  "ml ungesüßtes Mandelmilch",
  "ml Ahornsirup oder Honig",
  " Teelöffel Vanilleextrakt",
  "g Hafermehl",
  " g Mandelmehl",
  " Teelöffel Backpulver",
  " Teelöffel Zimt",
  "etwas Salz",
  "g Blaubeeren",
];

let amountMuffin = [0.5, 0.5, 30, 15, 0.25, 30, 20, 0.5, 0.125, "", 25];
// Erbsensuppe
function init() {
  if (recipeTitle == "Vegetarische Königsberger Klopse") {
    calculatePortions(ingredientsKlopse, amountKlopse);
  }
  if (recipeTitle == "American Pancakes") {
    calculatePortions(ingredientsPancakes, amountPancakes);
  }

  if (recipeTitle == "Erbsen-Minze-Suppe") {
    calculatePortions(ingredientsSuppe, amountSuppe);
  }
  if (recipeTitle == "Muffins") {
    calculatePortions(ingredientsMuffin, amountMuffin);
  }
}

function generateHTML(amount, ingredients) {
  contentList.innerHTML = "";
  for (let i = 0; i < ingredients.length; i++) {
    contentList.innerHTML += `
    <li>${amount[i]}${ingredients[i]}</li>
    `;
  }
}

function calculatePortions(ingredientsArr, amountArr) {
  newAmounts = [];
  let portions = ingredientAmountInput.value;
  if (portions < 1) {
    ingredientAmountInput.value = 1;
  }
  if (portions > 100) {
    ingredientAmountInput.value = 99;
  }
  portions = ingredientAmountInput.value;
  for (let i = 0; i < amountArr.length; i++) {
    if (typeof amountArr[i] == "string") {
      newAmounts.push("");
    } else {
      let calculated = amountArr[i] * portions;
      calculated = formatNumber(calculated);
      calculated = replaceDotWithComma(String(calculated));
      newAmounts.push(calculated);
    }
  }

  generateHTML(newAmounts, ingredientsArr);
}

function replaceDotWithComma(string) {
  let regex = /\./g;
  return string.replace(regex, ",");
}

ingredientAmountInput.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    init();
  }
});

function formatNumber(num) {
  let wholePart = Math.floor(num);
  let fractionPart = num - wholePart;

  fractionPart = Math.round(fractionPart * 4) / 4;

  let fractionString = "";
  switch (fractionPart) {
    case 0.25:
      fractionString = "&frac14; ";
      break;
    case 0.5:
      fractionString = "&frac12; ";
      break;
    case 0.75:
      fractionString = "&frac34; ";
      break;
    default:
      fractionString = "";
      break;
  }

  if (fractionString === "") {
    return String(wholePart);
  } else {
    return wholePart === 0 ? fractionString : `${wholePart} ${fractionString}`;
  }
}

init();
