//defnining variable to access the class
var foodItem = document.querySelector('.search-results-container');

//Favourites array to put values received from sessionStorag
var favourites = [];
if (JSON.parse(sessionStorage.getItem('favourites')) != null) {
    favourites = [...JSON.parse(sessionStorage.getItem('favourites'))];
}


//Display favourites  insides favourites Container 
function displayFavourites(favourites) {
    foodItem.innerHTML = '';
    for (var i = 0; i < favourites.length; i++) {
        console.log(favourites[i]);
        foodItem.innerHTML += ` <li class="search-results-li">
        <div style="display:none;">${favourites[i].id}</div>
        <img class="search-results-img" width=100 height=100 src="${favourites[i].img}"/>
        <h2>${favourites[i].name}</h2>
        <i class="fa fa-heart fa-3x red-heart"></i>
    </li>`;
    }

}

//display favourites meal that we have saved
displayFavourites(favourites);


//Removing from favourites list on clicking on red-heart 
foodItem.addEventListener('click', function (e) {
    console.log('hellow');
    if (e.target.classList.contains('fa-heart')) {
        if (e.target.classList.contains('red-heart')) {
            e.target.classList.remove('red-heart');
            var elm = e.target.parentElement.children[0].innerText;
            favourites = favourites.filter(v => v.id != elm);
        } else {
            var __id = e.target.parentElement.children[0].innerText;
            var __img = e.target.parentElement.children[1].getAttribute('src');
            var __name = e.target.parentElement.children[2].innerText;
            var obj = {
                id: __id,
                img: __img,
                name: __name
            }
            e.target.classList.add('red-heart');
            var elm = e.target.parentElement.children[0].innerText;
            favourites.push(obj)
        }
        //Displaying the updated favourties after removal ;
        displayFavourites(favourites);

        //Storing the updated favourites;
        sessionStorage.setItem('favourites', JSON.stringify(favourites));
    }
})


//on click on the image of the elements in favourites container  redirect to meal Details page
foodItem.addEventListener('click', function (e) {
    if (e.target.classList.contains("search-results-img")) {
        var value = e.target.parentElement.children[0].innerText;
        sessionStorage.setItem('id', value);
        location.href = 'mealDetailPage.html';
    }
})