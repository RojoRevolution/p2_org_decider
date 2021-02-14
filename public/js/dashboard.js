
document.addEventListener("DOMContentLoaded", () => {
    const addNewBtn = document.getElementById('addBtn');
    const categoryForm = document.getElementById('newCategoryForm');
    const categoryInput = document.getElementById('categoryName');

    addNewBtn.addEventListener('click', (event) => {
        event.preventDefault()
        console.log("click Add Button")

        // categoryForm.addEventListener('submit', (event) => {
        //     event.preventDefault();
        //     console.log('Click Form Submit')
        // });

    });



})