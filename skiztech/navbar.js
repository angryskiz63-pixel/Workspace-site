document.addEventListener("DOMContentLoaded", function() {
    const header = document.querySelector("header");
    if (!header) return;

    // Récupération de la page actuelle
    const currentPage = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
    const contactHref = (currentPage === "index.html" || currentPage === "") ? "#contact" : "index.html#contact";

    // Injection de la barre de navigation
    header.innerHTML = `
        <nav style="background-color: #1a1a1a; padding: 18px 0; text-align: center; border-bottom: 3px solid #00bcd4; box-shadow: 0 4px 10px rgba(0,0,0,0.1); width: 100%;">
            <a href="index.html" class="${currentPage === 'index.html' ? 'active' : ''}">
                <i class="fas fa-home"></i> Accueil
            </a>
            <a href="services.html" class="${currentPage === 'services.html' ? 'active' : ''}">
                <i class="fas fa-tools"></i> Services
            </a>
            <a href="panier.html" class="${currentPage === 'panier.html' ? 'active' : ''}">
                <i class="fas fa-shopping-cart"></i> Mon Panier
            </a>
            <a href="${contactHref}">
                <i class="fas fa-envelope"></i> Contact
            </a>
            
            <!-- Menu Compte / Connexion -->
            <div class="user-dropdown">
                <a href="index.html#auth-box" id="account-link">
                    <i class="fas fa-sign-in-alt"></i> Se connecter
                </a>
                <div class="dropdown-menu" id="dropdown-menu">
                    <a href="commandes.html"><i class="fas fa-box"></i> Suivre ma commande</a>
                    <a href="profil.html"><i class="fas fa-id-card"></i> Mon Profil</a>
                    <hr>
                    <a href="#" id="btn-logout" class="logout-link"><i class="fas fa-sign-out-alt"></i> Déconnexion</a>
                </div>
            </div>
        </nav>
    `;

    // Mettre à jour l'état de connexion immédiatement après l'injection
    updateNavbarAuth();
});

// Fonction autonome qui vérifie le LocalStorage et met à jour le menu
function updateNavbarAuth() {
    const accountLink = document.getElementById('account-link');
    const dropdownMenu = document.getElementById('dropdown-menu');

    if (!accountLink || !dropdownMenu) return;

    // Lecture de la clé unifiée 'auth_user' + fallbacks de secours
    const rawUser = localStorage.getItem('auth_user') || 
                    localStorage.getItem('twitch_user') || 
                    localStorage.getItem('google_user') || 
                    localStorage.getItem('discord_user') || 
                    localStorage.getItem('user_account');

    let user = null;
    if (rawUser) {
        try { user = JSON.parse(rawUser); } catch(e) { user = null; }
    }

    if (user) {
        const userAvatar = user.avatar || user.profile_image_url || user.picture;
        const userName = user.name || user.display_name || user.username || "Mon Compte";
        
        const iconHtml = userAvatar 
            ? `<img src="${userAvatar}" class="user-nav-pic" alt="Avatar">`
            : `<i class="fas fa-user-circle"></i>`;
        
        accountLink.innerHTML = `${iconHtml} ${userName} <i class="fas fa-chevron-down" style="font-size: 0.7em; margin-left: 4px;"></i>`;
        accountLink.href = "#"; 
        dropdownMenu.classList.add('active-dropdown');
    } else {
        accountLink.innerHTML = `<i class="fas fa-sign-in-alt"></i> Se connecter`;
        accountLink.href = "index.html#auth-box";
        dropdownMenu.classList.remove('active-dropdown');
    }
}

// Gestion globale du bouton de déconnexion
document.addEventListener('click', function(e) {
    if (e.target && e.target.closest('#btn-logout')) {
        e.preventDefault();
        localStorage.removeItem('auth_user');
        localStorage.removeItem('twitch_user');
        localStorage.removeItem('google_user');
        localStorage.removeItem('discord_user');
        localStorage.removeItem('user_account');
        window.location.href = "index.html";
    }
});