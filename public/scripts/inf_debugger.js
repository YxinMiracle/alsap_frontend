(() => {
  function ban() {
    setInterval(() => { debugger; }, 50);
  }
  try {
    ban();
  } catch (err) { }
})();
