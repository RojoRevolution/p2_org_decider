document.addEventListener("DOMContentLoaded", () => {


    // Sidebar Variables
    const addNewBtn = document.getElementById('addBtn');
    const closeCatBtn = document.getElementById('closeBtn');
    const newCatDiv = document.getElementById('newCatDiv')
    const newCatForm = document.getElementById('addNewForm')
    const newCatInput = document.getElementById('newCategory')


    // Add / Plus button Event Listener
    addNewBtn.addEventListener('click', (event) => {
        event.preventDefault()
        // Show the form 
        newCatDiv.classList.remove('hide');
        // Hide the Add Button
        addNewBtn.classList.add('hide')
        // Show the Close Button
        closeCatBtn.classList.remove('hide')
    });

    // Event Listener to close the add new Form
    closeCatBtn.addEventListener('click', (event) => {
        event.preventDefault()
        console.log("click Add Button")
        newCatDiv.classList.add('hide');
        closeCatBtn.classList.add('hide')
        addNewBtn.classList.remove('hide')
    });

    // Event Listener to Submit the Add new Form
    newCatForm.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log(newCatInput.value);
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


        if (!title || !description) {
            return;
        }
        addNewSuggestion(title, description);
    });
    // Fetch Function to POST to ideas DB
    const addNewSuggestion = (title, description) => {
        fetch(`/api/ideas/`, {
            method: 'POST',
            body: JSON.stringify({
                name: `${title}`,
                description: `${description}`,
            }),
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



    // =============================//
    // Vote Block
    // =============================//
    const newVoteBtn = document.getElementById('newVoteBtn')
    const voteBlock = document.getElementById('upForVote')
    const voteSettingsBlock = document.getElementById('voteSettings')
    const voteSettingsForm = document.getElementById('voteSettingsForm')
    const cancelVoteBtn = document.getElementById('cancelVote')
    const activeVoteBlock = document.getElementById('activeVoteBlock')
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
});



