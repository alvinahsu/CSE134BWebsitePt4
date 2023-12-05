window.onload = () => {
    let textarea = document.getElementById("comments");
    let wordCount = document.getElementById("info_comments");
    let errorCount = document.getElementById("error_comments")
    const isDarkMode = localStorage.getItem("isDarkMode");
    let button = document.getElementById("toggle_button")
    button.textContent = isDarkMode && isDarkMode=="true" ? "🌝" : "🌚";
    console.log(isDarkMode);
    if (isDarkMode == "true") {
        toggleDark();
    }
    const form_error = new Set();

    let mxLength = 200
    let mnLength = 5

    let printableRegex = /[ -~]/;
    if (wordCount) wordCount.innerHTML = textarea.value.length + "/" + mxLength;
    textarea && textarea.addEventListener("input", function () {
        if (textarea.value.length > mxLength){
            textarea.value = textarea.value.substr(0, mxLength);
            textarea.value = textarea.value
            errorCount.innerHTML = "Attempted max length error";
            errorCount.classList.add("fade-out");
            form_error.add(errorCount.innerHTML);
            setTimeout(() => {
                errorCount.innerHTML = "";
                errorCount.classList.remove("fade-out");
            }, 2000);
        }

        if (textarea.value && !printableRegex.test(textarea.value)){
            textarea.value = textarea.value.replace(/[^ -~]+/g, '');
            errorCount.innerHTML = "Attempted invalid comment character";
            errorCount.classList.add("fade-out");
            form_error.add(errorCount.innerHTML);
            setTimeout(() => {
                errorCount.innerHTML = "";
                errorCount.classList.remove("fade-out");
            }, 2000);
        }

        wordCount.innerHTML = textarea.value.length + "/" + mxLength;
        wordCount.style.color = textarea.value.length > mxLength-25 ? "red" : "black"
    });

    let nameInput = document.getElementById("name");
    const nameRegex = /^[A-Za-z\s]+$/;
    let errorName = document.getElementById("error_name")
    nameInput && nameInput.addEventListener("input", function(){
        let okName = nameRegex.test(nameInput.value);
        if (!okName){
            nameInput.value = nameInput.value.replace(/[^A-Za-z\s]+/g, '');
            // errorName.innerHTML = "Attempted invalid name character";
            errorName.setCustomValidity("TEST");
            errorName.classList.add("fade-out");
            form_error.add(errorName.innerHTML);
            setTimeout(() => {
                errorName.innerHTML = "";
                errorName.classList.remove("fade-out");
            }, 2000);
        }
    });
      

    function validateForm(){
        let ok = true;
        var text = textarea.value;
        // validate end of text for comments
        if (text.length < mnLength){
            errorCount.innerHTML = "Comments length smaller than min length required";
            errorCount.classList.add("fade-out");
            form_error.add(errorCount.innerHTML);

            setTimeout(() => {
                errorCount.innerHTML = "";
                errorCount.classList.remove("fade-out");
            }, 2000);
            ok = false;
        }

        //validate email
        let email = document.getElementById("email").value;
        const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        let errorEmail = document.getElementById("error_email")
        if (!emailRegex.test(email)){
            errorEmail.innerHTML = "Invalid email";
            errorEmail.classList.add("fade-out");
            form_error.add(errorEmail.innerHTML);

            setTimeout(() => {
                errorEmail.innerHTML = "";
                errorEmail.classList.remove("fade-out");
            }, 2000);
            ok = false;
        }
        return ok;
    }

    let myForm = document.getElementById("my_form");
    myForm && myForm.addEventListener("submit", function(event){
        if (!validateForm()){
            event.preventDefault();
        }
        else {
            const newInput = document.createElement("input");
            newInput.type = "hidden";
            newInput.name = "form_error";
            newInput.value = JSON.stringify(Array.from(form_error));
            myForm.appendChild(newInput);
        }
    });
}

function toggleDark(){
    document.body.classList.toggle("dark-mode");
    document.getElementById("toc_container") && document.getElementById("toc_container").classList.toggle("dark-mode");
    let isDarkMode = document.body.classList.contains("dark-mode");
    let button = document.getElementById("toggle_button")
    button.textContent = isDarkMode ? "🌝" : "🌚";
    document.getElementsByTagName("pre").item(0) && document.getElementsByTagName("pre").item(0).classList.toggle("dark-mode")
    localStorage.setItem('isDarkMode', isDarkMode);
}
