(function() {
  // Chaîne Twitch configurée sur angryskiz
  var CHANNEL_NAME = "angryskiz"; 
  var PARENT_DOMAIN = window.location.hostname || "localhost";

  // Styles du widget (taille doublée : 640x360 px)
  var style = document.createElement('style');
  style.innerHTML = `
    .twitch-floating-widget {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      font-family: 'Outfit', sans-serif;
    }
    .twitch-floating-box {
      width: 640px;
      height: 360px;
      background: #070b16;
      border: 2px solid var(--accent-cyan, #00f2fe);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.85);
      transition: all 0.3s ease;
    }
    .twitch-floating-box.collapsed {
      display: none;
    }
    .twitch-floating-box iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
    .twitch-toggle-btn {
      background: #9146FF;
      color: #fff;
      border: none;
      padding: 10px 18px;
      border-radius: 20px;
      font-weight: 700;
      font-size: 0.95rem;
      cursor: pointer;
      margin-top: 10px;
      display: flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 4px 15px rgba(145, 70, 255, 0.5);
      transition: all 0.2s ease;
    }
    .twitch-toggle-btn:hover {
      background: #772ce8;
      transform: translateY(-2px);
    }
    /* Adaptation sur petits écrans/mobiles pour ne pas dépasser */
    @media (max-width: 768px) {
      .twitch-floating-widget {
        bottom: 10px;
        right: 10px;
        left: 10px;
        align-items: center;
      }
      .twitch-floating-box {
        width: 100%;
        height: 220px;
      }
    }
  `;
  document.head.appendChild(style);

  // Structure HTML de la fenêtre Twitch
  var container = document.createElement('div');
  container.className = 'twitch-floating-widget';

  container.innerHTML = `
    <div class="twitch-floating-box" id="twitchBox">
      <iframe
        src="https://player.twitch.tv/?channel=${CHANNEL_NAME}&parent=${PARENT_DOMAIN}&muted=true"
        allowfullscreen>
      </iframe>
    </div>
    <button class="twitch-toggle-btn" id="twitchToggle">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.571 4.714h1.715v5.143H11.571zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/>
      </svg>
      <span id="twitchBtnText">Réduire le Stream</span>
    </button>
  `;

  document.body.appendChild(container);

  // Gestion du bouton Réduire / Afficher
  var box = document.getElementById('twitchBox');
  var btnText = document.getElementById('twitchBtnText');
  var btn = document.getElementById('twitchToggle');

  btn.addEventListener('click', function() {
    box.classList.toggle('collapsed');
    if (box.classList.contains('collapsed')) {
      btnText.textContent = "Suivre AngrySkiz";
    } else {
      btnText.textContent = "Réduire le Stream";
    }
  });
})();