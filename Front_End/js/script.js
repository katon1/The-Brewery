
// I didn't want to set up a server for the JSON stuff :p, change console.log once the table is done
document.addEventListener("DOMContentLoaded", (event) => {
    fetch('../data/potions.json')
    .then((response) => response.json())
    .then((json) => console.log(json)); 

   
});

function showSection(section) {
    const content = document.getElementById('content');
    switch (section) {
        case 'home':
            content.innerHTML = '<h2>Explore Our Potions</h2><p>Welcome to the Brewery! Discover our wide variety of potions from health elixirs to invisibility brews.</p>';
            // Put animation here for potions
            break;
        case 'recipes':
            content.innerHTML = '<h2>Learn to Brew</h2><p>Explore our detailed potion recipes and craft your own concoctions.</p>';
            
            break;
        case 'catalogue':
            content.innerHTML = '<h2>Shop Potions</h2><p>Discover and purchase from our extensive catalogue of magical potions.</p>';
            break;
        case 'contact':
            content.innerHTML = '<h2>Contact Us</h2><p>For feedback and inquiries, please reach out to us!</p>';
            break;
    }
}

// Load the home section by default
window.onload = () => {
    showSection('home');
};


