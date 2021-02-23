
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

        // Call funcion below once we have API routes
        addNewCategory(category);

        newCatInput.value = "";

    })

    const getAllCategories = () => {
        fetch
    }

    //Need to confirm which routes we are using for this.....
    const addNewCategory = (category) => {
        console.log({ category });

        //Need API category for this post. I thnk it might be idea-api-route.js?
        fetch(`/api/:${category}`, {
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

    //Need to confirm which routes we are using for this.....
    // const getCategory = (category) => {
    //     fetch(`/api/:${category}`, {
    //         method: 'GET',
    //         body: JSON.stringify({
    //             category: `${category}`,
    //         }),
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //         .then((response) => {
    //             response.json()
    //         })
    //         .then((data) => {
    //             window.location.replace(`dashboard/${category}`);
    //         })
    //         .catch(handleLoginErr);
    // }

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
    });





    // =============================//
    // Vote Block
    // =============================//
    const newVoteBtn = document.getElementById('newVoteBtn')
    const voteBlock = document.getElementById('upForVote')
    const voteSettingsBlock = document.getElementById('voteSettings')
    const voteSettingsForm = document.getElementById('voteSettingsForm')
    const cancelVoteBtn = document.getElementById('canceVote')

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


});



