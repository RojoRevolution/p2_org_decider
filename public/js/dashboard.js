document.addEventListener("DOMContentLoaded", () => {


    // Sidebar Variables
    const addNewBtn = document.getElementById('addBtn');
    const newCatDiv = document.getElementById('newCatDiv');
    const newCatForm = document.getElementById('addNewForm');
    const newCatInput = document.getElementById('newCategory');


    // Add / Plus button Event Listener
    addNewBtn.addEventListener('click', (event) => {
        event.preventDefault()
        // Show the form 
        if (addNewBtn.classList.contains('rotate')) {
            newCatDiv.classList.add('hide');
            addNewBtn.classList.remove('rotate')
        } else {
            newCatDiv.classList.remove('hide');
            addNewBtn.classList.add('rotate')
        }

    });

    // Event Listener to Submit the Add new Form
    newCatForm.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log('New Category', newCatInput.value);
        let category = newCatInput.value.trim();

        if (!category) {
            return;
        }

        // Call function below once we have API routes
        addNewCategory(category);

        newCatInput.value = "";

    })

    //Need to confirm which routes we are using for this.....
    const addNewCategory = (category) => {
        console.log({ category });

        //Need API category for this post. I thnk it might be idea-api-route.js?
        fetch(`/api/categories/`, {
            method: 'POST',
            body: JSON.stringify({
                category: `${category}`,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                response.json()
            })
            .then((data) => {
                // This is the HTMl route
                window.location.replace(`/dashboard/${category}`);
            })
            .catch(handleLoginErr);
    }
    handleLoginErr = (err) => {
        alert(text(responseJSON))
        console.log(err)
    }

    // =============================//
    // Category / Idea / Poll Screen
    // =============================//

    const newSuggestBtn = document.getElementById('AddNewSuggest')
    const newSuggestBlock = document.getElementById('newSuggestBlock')
    const closeSuggest = document.getElementById('suggestionClose')
    const suggestForm = document.getElementById('suggestForm')
    const suggestionCardsDiv = document.getElementById('suggestionCardBlock')



    newSuggestBtn.addEventListener('click', (event) => {
        event.preventDefault(event)
        console.log("Click New Suggest")
        newSuggestBlock.classList.remove('hide');
    });

    closeSuggest.addEventListener('click', (event) => {
        event.preventDefault(event)
        console.log("Click Close")
        newSuggestBlock.classList.add('hide');
    });

    suggestForm.addEventListener('submit', (event) => {
        event.preventDefault(event)
        console.log('Submit!')
        // newSuggestBlock.classList.add('hide');
        let title = newTitle.value.trim();
        let description = newDescript.value.trim();
        let categoryId = parseInt(newTitle.getAttribute('data-attribute'));


        if (!title || !description) {
            return;
        }
        addNewSuggestion(title, description, categoryId);
        location.reload();
    });
    // Fetch Function to POST to ideas DB
    const addNewSuggestion = (title, description, categoryId) => {
        fetch(`/api/ideas/`, {
            method: 'POST',
            body: JSON.stringify({
                name: `${title}`,
                description: `${description}`,
                categoryId: `${categoryId}`,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                console.log(response)
                response.json()
            })
            .catch((err) => {
                console.log(err);
            })
    }

    // Event Listener for the Move Up To A Vote Buttons
    suggestionCardsDiv.addEventListener('click', (event) => {
        event.preventDefault(event)
        // btnID will target the row by ID
        let btnID = event.target.getAttribute('data-attribute')
        console.log(`Button ID is: ${btnID}`)

        toggleActive(btnID);
        // Reload the page so we can change the render location 
        location.reload();
    });





    // =============================//
    // Vote Block
    // =============================//
    const newVoteBtn = document.getElementById('newVoteBtn')
    const voteBlock = document.getElementById('upForVote')
    const voteSettingsBlock = document.getElementById('voteSettings')
    const voteSettingsForm = document.getElementById('voteSettingsForm')
    const cancelVoteBtn = document.getElementById('cancelVote')
    const inActiveVoteBlock = document.getElementById('inActiveVoteBlock')
    const activeVoteBlock = document.getElementById('activeVoteBlock')
    const activeCardsEl = document.getElementById('activeCardsDiv')
    const voteUpBtn = document.querySelectorAll('.voteUp')
    const voteDownBtn = document.querySelectorAll('voteDown')
    const timerEl = document.getElementById('timer');

    // TimeLeft
    let timeLeft = 60;

    newVoteBtn.addEventListener('click', (event) => {
        event.preventDefault(event)
        console.log("Click New Suggest")
        voteBlock.classList.add('hide');
        voteSettingsBlock.classList.remove('hide');
    });

    cancelVoteBtn.addEventListener('click', (event) => {
        event.preventDefault(event)
        console.log("Click New Suggest")
        voteBlock.classList.remove('hide');
        voteSettingsBlock.classList.add('hide');
    });

    // Event Listener for Vote Timer Form
    voteSettingsForm.addEventListener('submit', (event) => {
        event.preventDefault();
        // Select Radio Butons
        const radioBtns = document.querySelectorAll('input[name="time"]');
        // Empty variable that will temporarily store the radio btn value
        let radioValue;
        // search for the radio that is check, pass to the radiovValue variables
        for (const radioBtn of radioBtns) {
            if (radioBtn.checked) {
                radioValue = radioBtn.value;
                break;
            };
        };

        // Adjust the timeLeft variable based on the radio value
        switch (radioValue) {
            case '1':
                timeLeft = 60;
                console.log(timeLeft)
                break;
            case '5':
                timeLeft = 300;
                console.log(timeLeft)
                break;
            case '10':
                timeLeft = 600;
                console.log(timeLeft)
                break;
        }
        setTimer()
        activeVoteBlock.classList.remove('hide');
        voteSettingsBlock.classList.add('hide');

    });

    // Event Listener for the Move Up To A Vote Buttons
    inActiveVoteBlock.addEventListener('click', (event) => {
        event.preventDefault(event)
        // btnID will target the row by ID
        let closeBtnID = event.target.getAttribute('data-attribute')
        console.log(`Close Button ID is: ${closeBtnID}`)

        toggleActive(closeBtnID);
        // Reload the page so we can change the render location 
        location.reload();
    });

    activeCardsEl.addEventListener('click', (event) => {
        event.preventDefault(event)
        // btnID will target the row by ID
        // let voteUpId;
        // let voteDownId;
        const voteUpBtns = document.querySelectorAll('voteUp');

        let voteUpId = voteUpBtns.getAttribute('data-attribute');;
        // search for the radio that is check, pass to the radiovValue variables
        console.log(voteUpId)



    });

    const setTimer = () => {
        var timerInterval = setInterval(function () {
            //time limit descreses every second by 1
            timeLeft--;
            //renders the time to the page
            timerEl.textContent = `${timeLeft}`;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                timeLeft = 60
                console.log('RENDER RESULTS HERE')
                // results();
            }
        }, 1000);
    };

    // FETCH used to toggle the boolean in the suggestion / vote cards
    const toggleActive = (rowId) => {
        fetch(`/api/ideas/${rowId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                response.json()
            })
            .catch((err) => {
                console.log(err);
            })
    }



});



