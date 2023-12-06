window.onload = () => {
    let rating = document.getElementById("rating");
    let maxStars = rating.getAttribute("max");
    let form = document.getElementById("my_form")

    //hide the html wrapper when using js
    let no_js_wrapper = document.getElementById("no_js_wrapper");
    no_js_wrapper.style.visibility = "hidden";

    //sent by JS
    let sentBy = document.getElementById("sentBy");
    sentBy.setAttribute("value", "JS");
    let js_wrapper = document.getElementById("js_wrapper");
    //add in max number of stars
    for (let i = 1; i <= maxStars; i++){
        let newChild = document.createElement("div");
        newChild.innerHTML = "&#9733;"
        newChild.setAttribute("value", i);
        js_wrapper.appendChild(newChild);
    }

    js_wrapper.addEventListener("click", function(e) {
        let ratingChosen = e.target;
        rating.setAttribute("value", ratingChosen.getAttribute("value"));
        fetch('https://httpbin.org/post', {
            method: 'POST',
            body: new FormData(form),
            headers: {'X-Sent-By': 'JS'}
        }).then(response => response.json()).then(data => {
            //log the response data
            console.log(data);
        })
    });
}