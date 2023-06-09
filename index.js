// Challenge 2:
// Replace the arguments below according to your preference.

// space, scary, military, romantic, cowboy, fantasy, superhero
favouriteMovieGenre("fantasy")

// watermelon, tomato, banana, orange, avocado, blueberry
favouriteFruit("blueberry")

// light, dark
favouriteMode("light")

// sharp, soft, round
//favouriteEdgeStyle("soft")



////////////////////////////////////
// IGONE THE CODE BELOW THIS LINE //
////////////////////////////////////
function setProp(prop, value) {
    document.documentElement.style.setProperty(prop, value)
}

// function favouriteEdgeStyle(style) {
//     setProp("--image", "var(--" + style + ")");
// }

function favouriteMovieGenre(font) {
    if (font) {
        setProp("--font", "var(--" + font + ")");    
    }
}

function favouriteMode(mode) {
    if (mode === "light" || !mode) {
        setProp('--background', "var(--light)");
        setProp('--text', "var(--dark)");
    } else if (mode === "dark") {
        setProp('--background', "var(--dark)");
        setProp('--text', "var(--light)");
    }
}

function favouriteFruit(theme) {
    if (theme === "pastel") {
        setProp('--light', "#f2f6c3")
        setProp('--dark', "#68c4af")
    } else if (theme === "muted") {
        setProp('--light', "#4c5b64")
        setProp('--dark', "#45241c")
    } else if (theme === "love") {
        setProp('--light', "#f06836")
        setProp('--dark', "#ba0001")
    } else if (theme === "sky") {
        setProp('--light', "#99ccff")
        setProp('--dark', "#3366ff")
    } else if (theme === "forrest") {
        setProp('--light', "#91B247")
        setProp('--dark', "#597C2B")
    }  else if (theme === "shiny") {
        setProp('--light', "#2e9afe")
        setProp('--dark', "#02197c")
    } else if (theme === "banana") {
        setProp('--light', "#fbec5d")
        setProp('--dark', "#6b3e26")
    } else if (theme === "watermelon") {
        setProp('--light', "#75b855")
        setProp('--dark', "#ad3838")
    } else if (theme === "tomato") {
        setProp('--light', "#d62e2e")
        setProp('--dark', "#600000")
    } else if (theme === "avocado") {
        setProp('--light', "#6b8c21")
        setProp('--dark', "#704012")
    } else if (theme === "orange") {
        setProp('--light', "#ffca16")
        setProp('--dark', "#f97300")
    } else if (theme === "blueberry") {
        setProp('--light', "#41a8f9")
        setProp('--dark', "#064490")
    } else  {
        setProp('--light', "#f5f5f5")
        setProp('--dark', "#222222")
    } 


}

//adauga evenimentul de tastare
 amount.addEventListener(amount, function(){
     if (this.value > 550000) {
         this.value = 350000;
      }
   });

   period.addEventListener(period, function(){
     if (this.value > 35) {
         this.value = 35;
     } else if (this.value < 1) {
         this.value = 1;
     }
   });

   interest.addEventListener(interest, function(){
     if (this.value > 12) {
         this.value = 5.8;
     } else if (this.value < 1) {
         this.value = 5.8;
     }    
   });

// Selectați elementele necesare din formular și tabel
const form = document.getElementById("formSubmit");
const tableBody = document.getElementById("table-body");

// Adăugați evenimentul de submit la formular
form.addEventListener("submit", function(event) {
  event.preventDefault(); // Previne trimiterea formularului

  // Obțineți valorile introduse de utilizator
  const amount = parseFloat(document.getElementById("amount").value);
  const period = parseInt(document.getElementById("period").value * 12);
  const interest = parseFloat(document.getElementById("interest").value);

  // Calculați valoarea ratei lunare
  const monthlyRate = calculateMonthlyPayment(amount, period, interest);

  // Ștergeți conținutul existent din tabela "table-body"
  tableBody.innerHTML = "";

   // Adăugați rândurile pentru fiecare lună în tabela "table-body"
   for (let i = 1; i <= period; i++) {
    const newRow = tableBody.insertRow();

    const monthlyPayment = calculateMonthlyPayment(amount, period, interest);

    const monthlyCell = newRow.insertCell();
    const monthlyPaymentCell = newRow.insertCell();
    const balanceCell = newRow.insertCell();
    const principalCell = newRow.insertCell();
    const interestCell = newRow.insertCell();
    

    monthlyCell.textContent = i;
    monthlyPaymentCell.textContent = monthlyPayment.toFixed(2);
    principalCell.textContent = calculatePrincipal(amount, period, interest, i).toFixed(2);
    interestCell.textContent = calculateInterest(amount, period, interest, i).toFixed(2);
    balanceCell.textContent = calculateBalance(amount, period, interest, i).toFixed(2);
  }

  // Resetați formularul
  //form.reset();
});

// Funcția pentru calcularea ratei lunare
function calculateMonthlyPayment(amount, period, interest) {
  const monthlyInterest = interest / 100 / 12;
  const monthlyPayment = (amount * monthlyInterest) / (1 - Math.pow(1 + monthlyInterest, -period));
  return monthlyPayment;
}

// Funcția pentru calcularea principalului pentru o anumită lună
function calculatePrincipal(amount, period, interest, month) {
  const monthlyInterest = interest / 100 / 12;
  const remainingMonths = period - month + 1;
  const monthlyPayment = calculateMonthlyPayment(amount, period, interest);
  const principal = monthlyPayment / monthlyInterest * (1 - Math.pow(1 + monthlyInterest, -remainingMonths));
  return principal;
}

// Funcția pentru calcularea dobânzii pentru o anumită lună
function calculateInterest(amount, period, interest, month) {
  const monthlyInterest = interest / 100 / 12;
  const principal = calculatePrincipal(amount, period, interest, month);
  const interestPayment = principal * monthlyInterest;
  return interestPayment;
}

// Funcția pentru calcularea balanței pentru o anumită lună
function calculateBalance(amount, period, interest, month) {
  const principal = calculatePrincipal(amount, period, interest, month);
  const interestPayment = calculateInterest(amount, period, interest, month);
  const balance = principal + interestPayment;
  return balance;
}