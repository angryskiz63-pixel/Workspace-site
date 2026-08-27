document.addEventListener("DOMContentLoaded", function() {
    const header = document.querySelector("header");
    if (!header) return;

    // Injecter les styles CSS nécessaires pour le dropdown
    if (!document.getElementById("navbar-styles")) {
        const style = document.createElement("style");
        style.id = "navbar-styles";
        style.textContent = `
            .user-dropdown { position: relative; display: inline-block; }
            .user-nav-pic { width: 22px; height: 22px; border-radius: 50%; border: 1.5px solid #00bcd4; object-fit: cover; vertical-align: middle; }
            .dropdown-menu {
                display: none;
                position: absolute;
                right: 0;
                top: 100%;
                background-color: #1a1a1a;
                min-width: 200px;
                box-shadow: 0px 8px 16px rgba(0,0,0,0.4);
                border-radius: 6px;
                border: 1px solid #333;
                border-top: 3px solid #00bcd4;
                z-index: 1000;
                padding: 8px 0;
                text-align: left;
            }
            .dropdown-menu a {
                color: #eee !important;
                padding: 10px 16px;
                text-decoration: none;
                display: flex;
                align-items: center;
                gap: 10px;
                font-size: 0.85em;
                text-transform: none;
                letter-spacing: 0.5px;
                margin: 0;
                transition: background-color 0.2s, color 0.2s;
            }
            .dropdown-menu a:hover { background-color: #2a2a2a; color: #00bcd4 !important; }
            .dropdown-menu hr { border: 0; border-top: 1px solid #333; margin: 6px 0; }
            .dropdown-menu a.logout-link:hover { color: #ff4d4d !important; background-color: rgba(255, 77, 77, 0.1); }
            .user-dropdown:hover .dropdown-menu.has-user { display: block; }
        `;
        document.head.appendChild(style);
    }

    const currentPage = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
    const contactHref = (currentPage === "index.html" || currentPage === "") ? "#contact" : "index.html#contact";

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

    updateNavbarAuth();
});

function updateNavbarAuth() {
    const accountLink = document.getElementById('account-link');
    const dropdownMenu = document.getElementById('dropdown-menu');

    if (!accountLink || !dropdownMenu) return;

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
        dropdownMenu.classList.add('has-user');
    } else {
        accountLink.innerHTML = `<i class="fas fa-sign-in-alt"></i> Se connecter`;
        accountLink.href = "index.html#auth-box";
        dropdownMenu.classList.remove('has-user');
    }
}

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