import './style.css'


document.getElementById('generate').addEventListener('click', async () => {
  const userInfo = document.getElementById('userInfo');
  const jokeText = document.getElementById('joke');
  const catFactText = document.getElementById('catFact');

  // Fetch random user
  fetch('https://randomuser.me/api/')
      .then(response => response.json())
      .then(data => {
          const user = data.results[0];
          userInfo.textContent = `Random User: ${user.name.first} ${user.name.last}`;
      });

  // Fetch random joke
  fetch('https://icanhazdadjoke.com/', {
      headers: {
          Accept: 'application/json'
      }
  })
      .then(response => response.json())
      .then(data => {
          jokeText.textContent = `Joke: ${data.joke}`;
      });

  // Fetch random cat fact
  fetch('https://catfact.ninja/fact')
      .then(response => response.json())
      .then(data => {
          catFactText.textContent = `Cat Fact: ${data.fact}`;
      });
});
