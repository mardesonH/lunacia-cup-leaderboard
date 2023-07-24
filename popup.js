function fetchLeaderboardData() {
  const statusUrl = 'https://lunacia-cup-back.herokuapp.com/status';
  const leaderboardUrl = 'https://lunacia-cup-back.herokuapp.com/leaderboard';

  fetch(statusUrl)
    .then(response => {
      if (response.status === 200) {
        console.log('Server on')
      } else {
        throw new Error('Erro ao obter status');
      }
    })
    .then(data => {
      // Status está OK, podemos buscar os dados da leaderboard
      fetch(leaderboardUrl)
        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error('Erro ao obter leaderboard');
          }
        })
        .then(data => {
          const leaderboardContainer = document.getElementById('leaderboard');
          leaderboardContainer.innerHTML = '';

          data.leaderboard.forEach((player, index) => {
            const item = document.createElement('div');
            item.classList.add('leaderboard-item');

            const position = document.createElement('div');
            position.classList.add('position');
            position.innerText = `#${index + 1}`;

            const name = document.createElement('div');
            name.classList.add('name');
            name.innerText = player.DisplayName;

            const score = document.createElement('div');
            score.classList.add('score');
            score.innerText = player.StatValue + 'pts.';

            item.appendChild(position);
            item.appendChild(name);
            item.appendChild(score);

            leaderboardContainer.appendChild(item);
          });

          // Remover a imagem de carregamento
          const loadingElement = document.getElementById('loading');
          if (loadingElement) {
            loadingElement.remove();
          }
        })
        .catch(error => {
          console.error('Erro ao obter leaderboard:', error);
        });
    })
    .catch(error => {
      console.error('Erro ao obter status:', error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  fetchLeaderboardData();
});
