const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=b";
const row = document.getElementById("row1");
const select = document.getElementById("input");
const form = document.getElementById("form");
const options = [
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", 
  "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", 
  "u", "v", "w", "x", "y", "z"
];

// Populate select options
options.forEach((letter) => {
  select.innerHTML += `<option value="${letter}">${letter}</option>`;
});

// Function to fetch data based on selected letter
async function dataFetcher(letter) {
  let response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
  let { drinks } = await response.json();
  console.log(drinks);

  // Function to load drink details
  const loadDrink = (id) => {
    const drink = drinks.find((item) => item.idDrink === id);
    if (drink) {
      form.innerHTML='';
      let card = document.createElement("div");
      card.classList.add("card", "bigCard");
      card.innerHTML = `
        <img class="card-img-top" src="${drink.strDrinkThumb}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${drink.strDrink}</h5>
          <p>${drink.strInstructions}</p>
          <ul id="orderlist"></ul>
        </div>`;
      const orderlist = card.querySelector("#orderlist");
      for (let j = 1; j <= 15; j++) {
        const ingredient = drink[`strIngredient${j}`];
        const measure = drink[`strMeasure${j}`];
        if (ingredient && measure) {
          orderlist.innerHTML += `<li>${ingredient}: ${measure}</li>`;
        }
      }
      row.innerHTML = ""; // Clear existing content
      row.appendChild(card);
    }
  };

  // Render cards for each drink
  drinks.forEach((element) => {
    form.innerHTML='';
    const card = document.createElement("div");
    card.classList.add("card","smallcard");
    card.onclick = () => loadDrink(element.idDrink);
    console.log(element);
    card.innerHTML = `
      <img class="card-img-top" src="${element.strDrinkThumb}" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">${element.strDrink}</h5>
      </div>`;
    row.appendChild(card);
  });
}


// Event listener for select change
select.addEventListener("change", () => {
  console.log(select.value);
  const selectedLetter = select.value;
  // row.innerHTML = ""; // Clear existing content
  dataFetcher(selectedLetter);
});



