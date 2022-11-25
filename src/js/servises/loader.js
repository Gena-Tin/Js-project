const toggleLoader = () => {
  document.body.classList.toggle('show-loader');
  document.body.classList.toggle('no-scroll');
};

export { toggleLoader };
