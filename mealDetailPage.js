// call the function to show detail of the meal we select
// local session is used to store api data
window.addEventListener("load", function (e) {
    var id = sessionStorage.getItem('id');
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php/?i=${id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data.meals);
            var imgContainer = document.querySelector('.meal-details');
            imgContainer.innerHTML += `
            <div class="meal-details-left">
            <h1>${data.meals[0].strMeal}</h1>
            <h2>Instructions :</h2>
            <p class="instructions">${data.meals[0].strInstructions}</p>
            <h2>Category :</h2>
            <p>${data.meals[0].strCategory}</p>
            <h2>Country :</h2>
            <p>${data.meals[0].strArea}</p>
            <h2>Youtube Tutorial :</h2>
            <p><a style="color:white;text-decoration:underline"href=${data.meals[0].strYoutube}>${data.meals[0].strYoutube}</a></p>
        </div>
        <div class="meal-details-right">
        <img  src=${data.meals[0].strMealThumb}></img>
        </div>`;

        })
        .catch(err => console.log(err));
})