document.addEventListener("DOMContentLoaded", () => {

    // ==================================================
    // Side Bar Section
    // ==================================================

    // Sidebar Variables
    const addNewBtn = document.getElementById('addBtn');
    const newCatDiv = document.getElementById('newCatDiv');
    const newCatForm = document.getElementById('addNewForm');
    const newCatInput = document.getElementById('newCategory');

    // Add / Plus button Event Listener
    addNewBtn.addEventListener('click', (event) => {
        event.preventDefault()
        // If statement is used to trigger the correct rotate animation, and either show or hide the form
        if (addNewBtn.classList.contains('rotate')) {
            newCatDiv.classList.add('hide');
            addNewBtn.classList.remove('rotate')
        } else {
            newCatDiv.classList.remove('hide');
            addNewBtn.classList.add('rotate')
        }
    });

    // Event Listener to Submit the Add a new Category to the DB
    newCatForm.addEventListener('submit', (event) => {
        event.preventDefault();
        // Store the value from the form
        let category = newCatInput.value.trim();
        // If no category is entered, return
        if (!category) {
            return;
        }
        // Run new category function and pass in the category value form the form
        addNewCategory(category);
        // Empty the category form once entered, though the page will reload so this wont necessarily be seen
        newCatInput.value = "";
    })

    //Function uses Fetch to POST a new category to the DB
    const addNewCategory = (category) => {

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
                // redirect the user to the new "Category" page in the dashboard after creation
                window.location.replace(`/dashboard/${category}`);
            })
            .catch(handleLoginErr);
    }
    handleLoginErr = (err) => {
        alert(text(responseJSON))
        console.log(err)
    }

    // =============================//
    // Category Page / Suggestion Section
    // =============================//

    // DOM variables for suggestion area
    const newSuggestBtn = document.getElementById('AddNewSuggest')
    const newSuggestBlock = document.getElementById('newSuggestBlock')
    const closeSuggest = document.getElementById('suggestionClose')
    const suggestForm = document.getElementById('suggestForm')
    const suggestionCardsDiv = document.getElementById('suggestionCardBlock')

    // Event Listener for the "Add  new Suggestion" button
    newSuggestBtn.addEventListener('click', (event) => {
        event.preventDefault()
        // Display the Form on the screen
        newSuggestBlock.classList.remove('hide');
    });

    // Event listener for the close button on the Add Suggestions Form
    closeSuggest.addEventListener('click', (event) => {
        event.preventDefault()
        // Close / hide form 
        newSuggestBlock.classList.add('hide');
    });

    // Event Listener for the actual Suggestion Form, collects all inputs on submit
    suggestForm.addEventListener('submit', (event) => {
        event.preventDefault()
        // Store the title, description, and Category ID to variables
        let title = newTitle.value.trim();
        let description = newDescript.value.trim();
        // The Category ID is added to the title field as a data-attribute - This is needed in order to only display suggestions for the active Category page
        let categoryId = parseInt(newTitle.getAttribute('data-attribute'));
        // If title or description are not entered, return
        if (!title || !description) {
            return;
        }
        // Run the below POST function which passes the above variables
        addNewSuggestion(title, description, categoryId);
        // After function, reload the page to display the items
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

    // Event Listener for the "Put Up For Vote" Buttons using Event Delegation
    suggestionCardsDiv.addEventListener('click', (event) => {
        event.preventDefault()
        // Each button had the Row ID added to it as a data-attribute, this allows us to only UPDATE that specific row on click
        let btnID = event.target.getAttribute('data-attribute')
        // Run the toggleActive Function which runs a FETCH PUT by passing the row ID and updating a boolean. This function is further below because the Vote Block will also use it
        toggleActive(btnID);
        // Reload the page so we can change the render location 
        location.reload();
    });

    // =============================//
    // Vote Block
    // =============================//

    // Variables for Vote Block DOM elements
    const newVoteBtn = document.getElementById('newVoteBtn')
    const voteBlock = document.getElementById('upForVote')
    const voteSettingsBlock = document.getElementById('voteSettings')
    const voteSettingsForm = document.getElementById('voteSettingsForm')
    const cancelVoteBtn = document.getElementById('cancelVote')
    const inActiveVoteBlock = document.getElementById('inActiveVoteBlock')
    const activeVoteBlock = document.getElementById('activeVoteBlock')
    const activeCardsEl = document.getElementById('activeCardsDiv')
    const timerEl = document.getElementById('timer');

    // Variable will store the total amount of time when the Vote is started
    let timeLeft = 60;

    // Event Listener for the "Start a New Vote" button
    newVoteBtn.addEventListener('click', (event) => {
        event.preventDefault()
        // Show the next Vote Block which gives the time settings
        voteBlock.classList.add('hide');
        // Hide the original Vote Block
        voteSettingsBlock.classList.remove('hide');
    });

    // Event Listener for the Close Buttons using Event Delegation
    inActiveVoteBlock.addEventListener('click', (event) => {
        event.preventDefault()
        // btnID will target the row by ID
        let closeBtnID = event.target.getAttribute('data-attribute')
        console.log(`Close Button ID is: ${closeBtnID}`)

        toggleActive(closeBtnID);
        // Reload the page so we can change the render location 
        location.reload();
    });

    // Event Listener for the Cancel button when are on the time settings block
    cancelVoteBtn.addEventListener('click', (event) => {
        event.preventDefault()
        // Hide the time settings block
        voteBlock.classList.remove('hide');
        // Show the initial Vote Block
        voteSettingsBlock.classList.add('hide');
    });

    // Event Listener for Vote Timer Form
    voteSettingsForm.addEventListener('submit', (event) => {
        event.preventDefault();
        // Select Radio Butons
        const radioBtns = document.querySelectorAll('input[name="time"]');
        // Empty variable that will temporarily store the radio btn value
        let radioValue;
        // search for the radio that is checked, pass value to the radiovValue variables
        for (const radioBtn of radioBtns) {
            if (radioBtn.checked) {
                radioValue = radioBtn.value;
                break;
            };
        };
        // Switch statement will adjust the total time in the timeLeft variable based on the value of the radio button
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
        // Set The timer
        setTimer()
        // Show the next vote block
        activeVoteBlock.classList.remove('hide');
        // Hide the Time Setting Block
        voteSettingsBlock.classList.add('hide');
    });


    // Event Listener the actual Vote Buttons using Event Delegation
    activeCardsEl.addEventListener('click', (event) => {
        event.preventDefault();
        // Store the Row ID so we know which row to update
        let voteId = event.target.getAttribute('data-attribute');
        // Use Fetch PUT to update the boolean in the row matching the ID
        fetch(`/api/ideas/vote/up/${voteId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                response.json();
            })
            .catch((err) => {
                console.log(err);
            });
    });

    // Set timer function used to start vote timer
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



