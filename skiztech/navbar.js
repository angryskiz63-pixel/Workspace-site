document.addEventListener("DOMContentLoaded", function() {
    const header = document.querySelector("header");
    if (!header) return;

    // Récupération du nom du fichier actuel (passé en minuscules)
    const currentPage = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();

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
            <a href="#contact">
                <i class="fas fa-envelope"></i> Contact
            </a>
            
            <!-- Menu Compte / Connexion -->
            <div class="user-dropdown">
                <a href="#auth-box" id="account-link">
                    <i class="fas fa-sign-in-alt"></i> Se connecter
                </a>
                <div class="dropdown-menu" id="dropdown-menu">
                    <a href="mon-compte.html"><i class="fas fa-user-cog"></i> Mon Profil &amp; Achats</a>
                    <a href="suivi-commande.html"><i class="fas fa-box"></i> Suivre ma commande</a>
                    <hr>
                    <a href="#" id="btn-logout" class="logout-link"><i class="fas fa-sign-out-alt"></i> Déconnexion</a>
                </div>
            </div>
        </nav>
    `;
});