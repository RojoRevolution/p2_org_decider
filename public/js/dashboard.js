
document.addEventListener("DOMContentLoaded", () => {
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
        let category = newCatInput.value;

        if (!category) {
            return;
        }

        // Call funcion below once we have API routes
        addNewCategory(category);


        // ===== TEMPORARY UNTIL WE USE API ROUTES ==== //
        // window.location.replace(`dashboard/${category}`);
        // ========= //

        // getCategory(category);

        newCatInput.value = "";

    })

    //Need to confirm which routes we are using for this.....
    const addNewCategory = (category) => {
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

});



