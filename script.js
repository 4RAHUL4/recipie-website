let container = document.querySelector(".container");
let mainSection = document.getElementById("two"); // Add an ID "two" to the main section in HTML
let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

container.style.display = "none";

searchBtn.addEventListener("click", () => {
  let userInp = document.getElementById("user-inp").value;
  if (userInp.length == 0) {
    result.innerHTML = `<h3>Input Field Cannot Be Empty</h3>`;
    container.style.display = "none";
    mainSection.style.display = "flex"; // Show the main section again
  } else {
    fetch(url + userInp)
      .then((response) => response.json())
      .then((data) => {
        let myMeal = data.meals[0];
        if (!myMeal) {
          result.innerHTML = `<h3>No results found</h3>`;
          container.style.display = "none";
          mainSection.style.display = "flex"; // Show the main section again
          return;
        }
        let count = 1;
        let ingredients = [];
        for (let i in myMeal) {
          let ingredient = "";
          let measure = "";
          if (i.startsWith("strIngredient") && myMeal[i]) {
            ingredient = myMeal[i];
            measure = myMeal[`strMeasure` + count];
            count += 1;
            ingredients.push(`${measure} ${ingredient}`);
          }
        }

        result.innerHTML = `<img src=${myMeal.strMealThumb}><div class="details"><h2>${myMeal.strMeal}</h2><h4>${myMeal.strArea}</h4></div>
        <div id="ingredient-con"></div>
        <div id="recipe">
        <button id="hide-recipe">X</button>
        <pre id="instructions">${myMeal.strInstructions}</pre>
        </div>
        <button id="show-recipe">View Recipe</button>`;

        let ingredientCon = document.getElementById("ingredient-con");
        let parent = document.createElement("ul");
        let recipe = document.getElementById("recipe");
        let hideRecipe = document.getElementById("hide-recipe");
        let showRecipe = document.getElementById("show-recipe");

        ingredients.forEach((i) => {
          let child = document.createElement("li");
          child.innerText = i;
          parent.appendChild(child);
          ingredientCon.appendChild(parent);
        });

        hideRecipe.addEventListener("click", () => {
          recipe.style.display = "none";
          container.style.display = "none";
          mainSection.style.display = "flex"; // Show the main section again
        });
        showRecipe.addEventListener("click", () => {
          recipe.style.display = "block";
          container.style.display = "block";
          mainSection.style.display = "none"; // Hide the main section when showing the recipe
        });

        container.style.display = "block";
        mainSection.style.display = "none"; // Hide the main section when showing search results
      })
      .catch(() => {
        result.innerHTML = `<h3>Invalid Input</h3>`;
        container.style.display = "none";
        mainSection.style.display = "flex"; // Show the main section again
      });
  }
});
let appetizersLink = document.querySelector(".appetizers-link");
let mainCoursesLink = document.querySelector(".main-courses-link");
let dessertsLink = document.querySelector(".desserts-link");
let logoLink=document.querySelector(".logo-link");

appetizersLink.addEventListener("click", () => {
  hideAllRecipeContainers();
  showAppetizersRecipes();
});

mainCoursesLink.addEventListener("click", () => {
  hideAllRecipeContainers();
  showMainCoursesRecipes();
});

dessertsLink.addEventListener("click", () => {
  hideAllRecipeContainers();
  showDessertsRecipes();
});

logoLink.addEventListener("click",()=>{
  hideAllRecipeContainers();
  showAllRecipeContainers();
})

function showAllRecipeContainers(){
  document.querySelectorAll(".appetizers-recipes, .main-courses-recipes, .desserts-recipes").forEach((recipeContainer) => {
    recipeContainer.style.display = "block";
  });
}
function hideAllRecipeContainers() {
  document.querySelectorAll(".appetizers-recipes, .main-courses-recipes, .desserts-recipes").forEach((recipeContainer) => {
    recipeContainer.style.display = "none";
  });
}

function showAppetizersRecipes() {
  document.querySelectorAll(".appetizers-recipes").forEach((recipeContainer)=>{
    recipeContainer.style.display = "block";
  });
}

function showMainCoursesRecipes() {
  document.querySelectorAll(".main-courses-recipes").forEach((recipeContainer)=>{
    recipeContainer.style.display = "block";
  });
}
function showDessertsRecipes() {
  document.querySelectorAll(".desserts-recipes").forEach((recipeContainer)=>{
    recipeContainer.style.display = "block";
  });
}


function displayRecipeDetails(recipe) {
  let feedbackContainer = document.createElement("div");
  feedbackContainer.classList.add("feedback");
  result.appendChild(feedbackContainer);

  let feedbackTitle = document.createElement("h3");
  feedbackTitle.innerText = "Feedback";
  feedbackContainer.appendChild(feedbackTitle);

  let feedbackTextarea = document.createElement("textarea");
  feedbackTextarea.id = `feedback-text-${recipe.idMeal}`;
  feedbackTextarea.placeholder = "Enter your feedback here";
  feedbackContainer.appendChild(feedbackTextarea);

  let submitFeedbackBtn = document.querySelector(".submit-feedback");
  submitFeedbackBtn.classList.add("submit-feedback");
  submitFeedbackBtn.innerText = "Submit";
  feedbackContainer.appendChild(submitFeedbackBtn);

  submitFeedbackBtn.addEventListener("click", () => {
    const feedbackText = feedbackTextarea.value.trim();
    if (feedbackText !== "") {
      console.log(`Recipe ID: ${recipe.idMeal}, Feedback: ${feedbackText}`);
      feedbackTextarea.value = "";
    }
  });
}
