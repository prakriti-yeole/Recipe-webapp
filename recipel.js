let result = document.getElementById("result");
let searchbtn = document.getElementById("search-btn");
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

searchbtn.addEventListener("click", () => {
    let userinp = document.getElementById("user-ip").value;
    if (userinp.length == 0) {
        result.innerHTML = `<h3> Input can not be empty </h3>`;
    } else {
        fetch(url + userinp)   //fetch the url by adding query as user input 
            .then((response) => response.json()) //convert response in js
            .then((data) => {   //the js data we got will be processed


                let mymeal = data.meals[0];
                console.log(mymeal);
                console.log(mymeal.strMealThumb);
                console.log(mymeal.strMeal);
                console.log(mymeal.strArea);
                console.log(mymeal.strInstructions);

                let ingredients = [];
                let cnt = 1;

                for (let i in mymeal) {

                    let ingredient = "";
                    let measure = "";
                    if (i.startsWith("strIngredient") && mymeal[i]) {
                        ingredient = mymeal[i];
                        measure = mymeal[`strMeasure` + cnt];
                        cnt++;

                        ingredients.push(`${measure} ${ingredient}`);
                    }
                }

                console.log(ingredients);

                result.innerHTML = `
<img src= ${mymeal.strMealThumb}>
<div class="details">
<h2>${mymeal.strMeal}</h2>
<h4>${mymeal.strArea}</h4>
</div>
<div id="ingredient-con"></div>

<div id="recipe">

<pre id="instructions"> ${mymeal.strInstructions} </pre>
<button id="hiderecipe"> X </button>
</div>
<button id="showrecipe"> view recipe </button>

`;

                let ingredientcon = document.getElementById("ingredient-con");
                let showrecipe = document.getElementById("showrecipe");
                let hiderecipe = document.getElementById("hiderecipe");
                let recipe = document.getElementById("recipe");
                let parent = document.createElement("ul");

                ingredients.forEach((i) => {

                    let child = document.createElement("li");
                    child.innerText = i;
                    parent.appendChild(child);
                    ingredientcon.appendChild(parent);

                });

                showrecipe.addEventListener("click", () => {

                    recipe.style.display = "block";

                });

                hiderecipe.addEventListener("click", () => {

                    recipe.style.display = "none";

                });



            })
            .catch(() => {    //if no response comes by fetching
                result.innerHTML = `<h3> Invalid input </h3>`;
            });
    }
});