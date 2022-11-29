const mealShowCase = document.getElementById('show-food');

const searchAllMeals = () => {
    document.getElementById('show-selected-food').innerHTML = "";
    document.getElementById('no-food-found').innerHTML = "";

    mealShowCase.innerHTML = "";
    const meal = document.getElementById('inputMeal').value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            showAllMeals(data);
        })
        .catch(error => noFoodFound(error));
};

const noFoodFound = (error) => {
    const empty = document.getElementById('no-food-found');
    const noFood = document.createElement('div');

    noFood.innerHTML = `
        <h3 id="no-food"> Oops Sorry! Your selected item is not available.</h3>
    `
    empty.appendChild(noFood);
}

const showAllMeals = (data) => {
    data.meals.forEach(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.className = 'meal-thumb';

        mealDiv.setAttribute('onclick', `showText("${meal.strMeal}")`);
        mealDiv.innerHTML = `
            <img src=${meal.strMealThumb}>
            <h3 id="meal-name">${meal.strMeal}</h3>
        `
        mealShowCase.appendChild(mealDiv)
    });
}

const showText = (mealName) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            showSelectedItem(data.meals);
        });
};

const showSelectedItem = (selectedMeal) => {
    const item = document.getElementById('show-selected-food');
    item.innerHTML = ""

    const foodDiv = document.createElement('div');
    const foodIngredients = document.createElement('ol');

    foodDiv.innerHTML = `
        <img src=${selectedMeal[0].strMealThumb}>
        <h3 id="selected-meal-name">${selectedMeal[0].strMeal}</h3>
        <h3 id="ingredients">Ingredients</h3>
    `
    item.appendChild(foodDiv);
    item.appendChild(foodIngredients);

    ingredientsList = [];
    measuresList = [];
    for (let i = 1; i <= 20; i++) {
        let ing = "strIngredient" + i;
        let m = "strMeasure" + i;
        if (selectedMeal[0][ing] != "" && selectedMeal[0][ing] != null) {
            ingredientsList.push(selectedMeal[0][ing]);
            measuresList.push(selectedMeal[0][m]);
        }
    }
    // console.log(ingredientsList);
    // console.log(measuresList);

    for (let i = 0; i < ingredientsList.length; i++) {
        const li = document.createElement('li');
        li.innerText = `${measuresList[i]} ${ingredientsList[i]}`;
        foodIngredients.appendChild(li);
    }

    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    })
}
