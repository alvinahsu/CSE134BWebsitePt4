
window.onload = () => {
    class RatingWidget extends HTMLElement {
        constructor(){
            super();
            this.attachShadow( {mode: 'open'} );
            this.shadowRoot.innerHTML = `
                <style>                    
                    #rating-wrapper{
                        display: flex;
                        font-size: 2em;
                        width: fit-content;
                    }
                    
                    /* make all stars red */
                    #rating-wrapper:hover div{
                        color: red;
                        cursor: pointer;
                    }
                    
                    /* make successor stars black (all stars on and before will be red) */
                    #rating-wrapper div:hover ~ div {
                        color: black;
                    }
                </style>
                `
            this.ratingWrapper = document.createElement('span');
            this.ratingWrapper.id = "rating-wrapper"
			this.shadowRoot.appendChild(this.ratingWrapper);
        }

        connectedCallback(){
            this.maxStars = document.querySelector("#rating").max;
            for (let i = 1; i <= this.maxStars; i++){
                let newChild = document.createElement("div");
                newChild.innerHTML = "&#9733;"
                newChild.setAttribute("value", i);
                this.ratingWrapper.appendChild(newChild);
            }
            this.ratingWrapper.addEventListener("click", e => this.handleFormSubmit(e));
        }

        handleFormSubmit(e){
            let ratingChosen = e.target.getAttribute("value");
            let form_data = new FormData();
            form_data.append('question', 'How satisfied are you?');
            form_data.append('rating', ratingChosen);
            form_data.append('sentBy', 'JS');
            fetch('https://httpbin.org/post', {
                method: 'POST',
                body: form_data,
                headers: {'X-Sent-By': 'JS'}
            }).then(response => response.json()).then(data => {
                console.log(data);
                this.handleSubmit(data);
            })
        }

        disconnectedCallback(){
            this.ratingWrapper.removeEventListener("click", e => this.handleFormSubmit(e));
        }

        handleSubmit(data){
            this.shadowRoot.removeChild(this.ratingWrapper);
            let selectedRating = parseInt(data.form.rating);
            let ratingStringText = document.createElement("p");
            ratingStringText.innerText = this.getRatingString(selectedRating);
            this.shadowRoot.appendChild(ratingStringText);
        }

        getRatingString(rating){
            if (rating >= 0.8 * this.maxStars){
                return `Thanks for ${rating} stars rating!`;
            }
            else {
                return `Thanks for you feedback of ${rating} stars. We'll try to do better!`
            }
        }
    }
    customElements.define('rating-widget', RatingWidget);
}