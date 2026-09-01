(function() {
  var CHANNEL_NAME = "aiola"; // Remplacez par votre chaîne Twitch si besoin
  var PARENT_DOMAIN = window.location.hostname || "localhost";

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
    }
    .twitch-floating-box {
      width: 320px;
      height: 200px;
      background: #000;
      border: 1px solid rgba(0, 242, 254, 0.4);
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 10px 25px rgba(0,0,0,0.8);
    }
    .twitch-floating-box.collapsed { display: none; }
    .twitch-floating-box iframe { width: 100%; height: 100%; border: none; }
    .twitch-toggle-btn {
      background: #9146FF;
      color: #fff;
      border: none;
      padding: 8px 14px;
      border-radius: 20px;
      font-weight: bold;
      cursor: pointer;
      margin-top: 8px;
    }
  `;
  document.head.appendChild(style);

  var container = document.createElement('div');
  container.className = 'twitch-floating-widget';
  container.innerHTML = `
    <div class="twitch-floating-box" id="twitchBox">
      <iframe src="https://player.twitch.tv/?channel=${CHANNEL_NAME}&parent=${PARENT_DOMAIN}&muted=true" allowfullscreen></iframe>
    </div>
    <button class="twitch-toggle-btn" id="twitchToggle">Réduire / Afficher Stream</button>
  `;
  document.body.appendChild(container);

  document.getElementById('twitchToggle').addEventListener('click', function() {
    document.getElementById('twitchBox').classList.toggle('collapsed');
  });
})();