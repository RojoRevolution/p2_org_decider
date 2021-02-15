
document.addEventListener("DOMContentLoaded", () => {
    const addNewBtn = document.getElementById('addBtn');
    const closeCatBtn = document.getElementById('closeBtn');
    const newCatDiv = document.getElementById('newCatDiv')
    const newCatForm = document.getElementById('addNewForm')
    const newCatInput = document.getElementById('newCategory')

    addNewBtn.addEventListener('click', (event) => {
        event.preventDefault()
        console.log("click Add Button")
        newCatDiv.classList.remove('hide');
        addNewBtn.classList.add('hide')
        closeCatBtn.classList.remove('hide')
    });

    closeCatBtn.addEventListener('click', (event) => {
        event.preventDefault()
        console.log("click Add Button")
        newCatDiv.classList.add('hide');
        closeCatBtn.classList.add('hide')
        addNewBtn.classList.remove('hide')
    });

    newCatForm.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log(newCatInput.value);
    })

    // modal.addEventListener('submit', (event) => {
    //     event.preventDefault();
    //     console.log('Save Button Clicked')
    // })

    // const addNew = () => {
    //     addNewModal.addEventListener('submit', (event) => {
    //         event.preventDefault();
    //         console.log('Click Form Submit')
    //     });
    // }


})