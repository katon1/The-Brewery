
// I didn't want to set up a server for the JSON stuff :p, change console.log once the table is done
// need a lot of styling to be done to this kekw design workk later

let potionsData = [];
let potionsRecipe = [];
let cart = [];

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
            addPotionAnimation();
            break;
        case 'recipes':
            content.innerHTML = '<h2>Learn to Brew</h2><p>Explore our detailed potion recipes and craft your own concoctions.</p>';
            if (potionsRecipe.length > 0 && 'ingredients' in potionsRecipe[0] && 'instruction' in potionsRecipe[0]) {
                createPotionTable(potionsRecipe, 'recipes');
            } else {
                content.innerHTML += '<p>Error: Potion recipe data is incomplete or incorrectly formatted.</p>';
            }
            break;
        case 'catalogue':
            content.innerHTML = '<h2>Shop Potions</h2><p>Discover and purchase from our extensive catalogue of magical potions.</p>';
            createPotionTable(potionsData, 'catalogue');
            break;
        case 'contact':
            content.innerHTML = '<h2>Contact Us</h2><p>For feedback and inquiries, please reach out to us!</p>';
            createContact();
            break;
    }
}

function addPotionAnimation() {
    const animationContainer = document.createElement('div');
    animationContainer.id = 'potionAnimation';
   
    const potionImage = document.createElement('img');
    potionImage.src = '../images/Potion.jpg'; 
    potionImage.alt = 'Floating Potion';
    potionImage.className = 'floating';

    animationContainer.appendChild(potionImage);
    const content = document.getElementById('content');
    content.appendChild(animationContainer);
}

//Add maybe a slide animation for store page to display potions. 

// Debug stuff, Get rid after

function createPotionTable(potions, type) {
    const tableContainer = document.createElement('div');
    tableContainer.id = 'recipeTableContainer';
    const table = document.createElement('table');
    table.className = 'potion-table';
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    let headers = type === 'recipes' ? ['Name', 'Ingredients', 'Instruction'] : ['Name', 'Description', 'Type', 'Cart'];

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
        headers.forEach(key => {
            const cell = document.createElement('td');
            if (key === 'Cart') {
                const addButton = document.createElement('button');
                addButton.textContent = 'Add to Cart';
                addButton.onclick = function() {addToCart(potion);};
                cell.appendChild(addButton);
            } else {
                let value = potion[key.toLowerCase()];
                if (key === 'Ingredients' && type === 'recipes') {
                    value = potion[key.toLowerCase()].join(', ');
                }
                cell.textContent = value ? value : 'Data missing';
            }
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    });
    table.appendChild(tbody);

    tableContainer.appendChild(table);
    const content = document.getElementById('content');
    content.appendChild(tableContainer);
}

function addToCart(potion) {
    const existingItem = cart.find(item => item.id === potion.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...potion, quantity: 1 });
    }
    console.log('Cart:', cart); // Debug stuffs
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartDisplay = document.getElementById('cartDisplay') || document.createElement('div');
    cartDisplay.id = 'cartDisplay';
    cartDisplay.innerHTML = '';
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.textContent = `${item.name} - Quantity: ${item.quantity}`;
        cartDisplay.appendChild(itemElement);
    });
    const content = document.getElementById('content');
    content.appendChild(cartDisplay);
}

function createContact(){
    // Contact us form
}

// Load the home section by default
window.onload = () => {
    showSection('home');
};


