/* Load All Drinks */
const loadAllDrinks = () => {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a")
        .then(res => res.json())
        .then(data => {
            displayDrinks(data.drinks);
        });
};

/* Display Drinks */
const displayDrinks = (drinks) => {
    const drinkContainer = document.getElementById("product-container");
    drinkContainer.innerHTML = "";

    drinks.forEach(drink => {
        const div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `
            <img class="card-img" src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
            <h4>${drink.strDrink}</h4>
            <p>Category: ${drink.strCategory}</p>
            <p>${drink.strInstructions.slice(0, 15)}...</p>
            <button onclick="addToGroup('${drink.strDrink}')">Add To Group</button>
            <button onclick="loadSingleDrink('${drink.idDrink}')">Details</button>
        `;

        drinkContainer.appendChild(div);
    });
};

/* Add To Group */
const addToGroup = (name) => {
    const countElement = document.getElementById("count");
    let count = parseInt(countElement.innerText);

    if (count >= 7) {
        alert("You cannot add more than 7 drinks");
        return;
    }

    countElement.innerText = count + 1;

    const cartContainer = document.getElementById("cart-main-container");

    const div = document.createElement("div");
    div.classList.add("cart-info");
    div.innerHTML = `<p>${name}</p>`;

    cartContainer.appendChild(div);
};

/* Load Single Drink Details */
const loadSingleDrink = (id) => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => {
            const drink = data.drinks[0];
            alert(
                `Name: ${drink.strDrink}
Category: ${drink.strCategory}
Glass: ${drink.strGlass}
Alcoholic: ${drink.strAlcoholic}
Instructions: ${drink.strInstructions}`
            );
        });
};

/* Search Drinks */
document.getElementById("searchBtn").addEventListener("click", () => {
    const searchText = document.getElementById("searchInput").value;

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`)
        .then(res => res.json())
        .then(data => {
            if (data.drinks) {
                displayDrinks(data.drinks);
            } else {
                document.getElementById("product-container").innerHTML = "";
                alert("No drinks found!");
            }
        });
});

/* Enter key support */
document.getElementById("searchInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        document.getElementById("searchBtn").click();
    }
});

/* Initial load */
loadAllDrinks();
