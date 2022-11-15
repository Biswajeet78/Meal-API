//Acesssing elements to use
var searchButton = document.querySelector("button");
var input = document.querySelector("input");
var main = document.querySelector("main");
var searchResultContainer = document.querySelector(".search-results-container");
var searchSuggestions = document.querySelector(".search-suggestions");
var favouritesBtn = document.querySelector('.fa-heart');

//stores the result from fetch request to display on home page
var res = [];

//fvaourites array to store and maintain the favourite meals in session storage to further 
//use by favourites.html page
var favourites = [];

//if some value in session storage then put it in favourites array;
if (JSON.parse(sessionStorage.getItem('favourites') != null)) {
    favourites = [...JSON.parse(sessionStorage.getItem("favourites"))];
}

//On Clicking Search Bar 
searchButton.addEventListener('click', function (e) {
    searchResultContainer.innerHTML = '';
    var value = input.value;

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${value[0].toUpperCase()}`)
        .then(response => response.json())
        .then(data => {
            res = [...data.meals];
            for (var i = 0; i < res.length; i++) {
                if (res[i].strMeal.startsWith(value[0].toUpperCase() + value.slice(1))) {
                    // console.log(res[i].strmeal)
                    searchResultContainer.innerHTML += str(res[i].strMealThumb, res[i].strMeal, res[i].idMeal);
                }
            }
        })
        .catch(err => console.log(err));
})

//On Typing Input value call for api with first letter of typed word
input.addEventListener('input', function (e) {
    var value = e.target.value;
    if (value.length == 0) {
        searchSuggestions.innerHTML = "";
        return;
    }
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${value[0].toUpperCase()}`)
        .then(response => response.json())
        .then(data => {
            searchSuggestions.innerHTML = "";
            searchResultContainer.innerHTML = "";
            if (data.meals == null) {
                searchSuggestions.innerHTML += `<h5 style="background-color:tomato; padding:.8rem;transition:all .5s linear;">No Matches  Found!!!</h5>`;
                return;
            }
            res = [...data.meals];
            // console.log(res);
            var c = 0;
            value = value.toLowerCase();
            for (var i = 0; i < res.length; i++) {
                if (res[i].strMeal.toLowerCase().startsWith(value)) {
                    var url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${res[i].strMeal}`;
                    searchSuggestions.innerHTML += ` <h6><a href="https://www.themealdb.com/api/json/v1/1/lookup.php?s=${res[i].idMeal}"></a>${res[i].strMeal}</h6>`
                    searchResultContainer.innerHTML += str(res[i].strMealThumb, res[i].strMeal, res[i].idMeal);
                    c = 1;
                }
            }
            if (c == 0) {
                searchSuggestions.innerHTML += `<h5 style="background-color:red; padding:.5rem">No Matches  Found!!!</h5>`;
                return;
            }
        })
})

//Onclicking from the suggestions display
searchSuggestions.addEventListener('click', function (e) {
    var id = e.target.childNodes[0].getAttribute('href').slice(53);
    searchResultContainer.innerHTML = "";
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(response => response.json())
        .then(data => {
            searchResultContainer.innerHTML = str(data.meals[0].strMealThumb, data.meals[0].strMeal, data.meals[0].idMeal);
        })
})


//searchResultsContainer Img Click redirect to that meal details page;
searchResultContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains("search-results-img")) {
        var value = e.target.parentElement.children[0].innerText;
        sessionStorage.setItem('id', value);
        location.href = 'mealDetailPage.html';
    }
})


//search Suggestion disappear
main.addEventListener('mouseover', function (e) {
    searchSuggestions.classList.add('hide-suggestions');
})

//Search suggestion appears
main.addEventListener('mouseout', function (e) {
    searchSuggestions.classList.remove('hide-suggestions');
})

//function to add string in searchResultContainer.innerHtml;
function str(img, name, id) {

    if (favourites != null) {
        for (var i = 0; i < favourites.length; i++) {
            if (favourites[i].id == id) {
                return `<li class="search-results-li">
                <div style="display:none;">${id}</div>
                <img class="search-results-img" height=100 width=100 src="${img}">
                <h2>${name}</h2>
               <i class="fa fa-heart fa-3x red-heart"></i>
                </li>`
            }
        }

    }
    return `<li class="search-results-li">
    <div style="display:none;">${id}</div>
    <img class="search-results-img" height=100 width=100 src="${img}">
                <h2>${name}</h2>
               <i class="fa fa-heart fa-3x fa-light"></i>
                </li>`
}


//Convert Black heart to red heart i.e. add to favourites and remove
//Accordingly also add element to favourites array;
searchResultContainer.addEventListener('click', function (e) {
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
        sessionStorage.setItem('favourites', JSON.stringify(favourites));
    }

})