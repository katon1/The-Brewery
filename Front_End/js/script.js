
// I didn't want to set up a server for the JSON stuff :p, change console.log once the table is done

let potionsData = [];
let potionsRecipe = [];

document.addEventListener("DOMContentLoaded", (event) => {
    fetch('../data/potions.json')
        .then((response) => response.json())
        .then((potions) => {
            potionsData = potions; // Store fetched data
        })
        .catch((error) => console.error('Error fetching potions:', error));
       
    fetch('../data/recipes.json')
        .then((response) => response.json())
        .then((recipe) => {
            potionsRecipe = recipe; // Store fetched data
        })
        .catch((error) => console.error('Error fetching potion recipe:', error));
     
});

function showSection(section) {
    const content = document.getElementById('content');
    switch (section) {
        case 'home':
            content.innerHTML = '<h2>Explore Our Potions</h2><p>Welcome to the Brewery! Discover our wide variety of potions from health elixirs to invisibility brews.</p>';
            break;
        case 'recipes':
            content.innerHTML = '<h2>Learn to Brew</h2><p>Explore our detailed potion recipes and craft your own concoctions.</p>';
            console.log('Recipes Data:', potionsRecipe); // Debug stuff, Get rid after
            if (potionsRecipe.length > 0 && 'ingredients' in potionsRecipe[0] && 'instruction' in potionsRecipe[0]) {
                createPotionTable(potionsRecipe, 'recipes');
            } else {
                console.error('Missing ingredients or instructions in potion recipes'); // Debug stuff, Get rid after
                content.innerHTML += '<p>Error: Potion recipe data is incomplete or incorrectly formatted.</p>';
            }
            break;
        case 'catalogue':
            content.innerHTML = '<h2>Shop Potions</h2><p>Discover and purchase from our extensive catalogue of magical potions.</p>';
            createPotionTable(potionsData, 'catalogue');
            break;
        case 'contact':
            content.innerHTML = '<h2>Contact Us</h2><p>For feedback and inquiries, please reach out to us!</p>';
            break;
    }
}
// Debug stuff, Get rid after
function createPotionTable(potions, type) {
    const tableContainer = document.createElement('div');
    tableContainer.id = 'recipeTableContainer';
    const table = document.createElement('table');
    table.className = 'potion-table';
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    let headers = type === 'recipes' ? ['Name', 'Ingredients', 'Instruction'] : ['Name', 'Description', 'Type'];

    headers.forEach(text => {
        const headerCell = document.createElement('th');
        headerCell.textContent = text;
        headerRow.appendChild(headerCell);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    potions.forEach(potion => {
        const row = document.createElement('tr');
        console.log('Potion Data:', potion); // Debug: Log each potion object being processed
        headers.forEach(key => {
            const cell = document.createElement('td');
            let value = potion[key.toLowerCase()];  // Fetch value using key, ensuring lower case usage matches JSON keys
            if (key === 'Ingredients' && type === 'recipes') {
                value = potion[key.toLowerCase()].join(', ');  // Join array of ingredients into a string
            }
            cell.textContent = value ? value : 'Data missing';  // Handle missing data gracefully
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    });
    table.appendChild(tbody);

    tableContainer.appendChild(table);
    const content = document.getElementById('content');
    content.appendChild(tableContainer);
}



// Load the home section by default
window.onload = () => {
    showSection('home');
};


