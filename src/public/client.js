// @ts-check

(() => {
  const socket = new WebSocket(`ws://${window.location.host}/ws`);
  const formEl = document.getElementById('form');
  const chatsEl = document.getElementById('chats');
  const inputEl = document.getElementById('input');

  /** @type {HTMLInputElement | null} */
  if (!formEl || !inputEl || !chatsEl) throw new Error('Init failed!');

  /**
   * @typedef Chat
   * @property {string} nickname
   * @property {string} message
   */
  /** @type {Chat[]} */
  const chats = [];

  const adjectives = ['멋진', '훌륭한', '친절한', '새침한'];
  const animal = ['물범', '사슴', '멧돼지', '상어', '독수리'];

  /**
   * @param {string[]} array
   * @returns {string}
   */
  function pickRandom(array) {
    const randIdx = Math.floor(Math.random() * array.length);
    return array[randIdx];
  }

  const nickname = `${pickRandom(adjectives)} ${pickRandom(animal)}`;

  formEl.addEventListener('submit', (event) => {
    event.preventDefault();

    // @ts-ignore
    socket.send(
      JSON.stringify({
        nickname,
        // @ts-ignore
        message: inputEl.value,
      })
    );

    // @ts-ignore
    inputEl.value = '';
  });

  socket.addEventListener('message', (event) => {
    chats.push(JSON.parse(event.data));

    chatsEl.innerHTML = '';

    chats.forEach(({ message, nickname }) => {
      const div = document.createElement('div');
      div.innerText = `${nickname}: ${message}`;
      chatsEl.appendChild(div);
    });
  });
})();
