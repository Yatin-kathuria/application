const url = 'https://random-flat-colors.vercel.app/api/random?count=5';

const getColors = () => fetch(url);

(function () {
  let COLORS = [];
  async function addColorsToPallate() {
    try {
      const res = await getColors();
      const { colors } = await res.json();
      console.log(colors);
      COLORS = colors;
      const color_pallete_containers = document.querySelectorAll(
        '#color_pallete_container'
      );

      for (let color of colors) {
        for (let container of color_pallete_containers) {
          const tag = document.createElement('div');
          tag.dataset.color = color;
          tag.classList.add('color');
          tag.style.backgroundColor = color;
          container.appendChild(tag);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  function onAddButtonClick(e) {
    this.setAttribute('disabled', 'true');
    const form = document.getElementById('creation_form');
    form.style.display = 'block';
  }

  function addCreative() {
    const creation_form = document.getElementById('creation_form');
    console.log(creation_form);
    const title = creation_form.querySelector('#title').value;
    const subtitle = creation_form.querySelector('#subtitle').value;
    const loader = document.getElementById('loader');
    let totalCardExists = Number(loader.dataset.complete);
    const totalCapacity = Number(loader.dataset.space);

    if (!title || !subtitle || totalCardExists >= totalCapacity) {
      return;
    }
    totalCardExists++;
    loader.querySelector('.fill').style.width =
      (totalCardExists / totalCapacity) * 100 + '%';

    const tag = document.createElement('div');
    const titleEle = document.createElement('h1');
    const subtitleEle = document.createElement('h4');
    titleEle.textContent = title;
    subtitleEle.textContent = subtitle;
    tag.appendChild(titleEle);
    tag.appendChild(subtitleEle);
    tag.dataset.color = COLORS[0];
    tag.style.backgroundColor = COLORS[0];

    const creative_list = document.getElementById('creative_list');
    creative_list.appendChild(tag);
    console.log({ title, subtitle });
  }

  function addListeners() {
    const addButton = document.getElementById('add_btn');
    addButton.addEventListener('click', onAddButtonClick);
    const form_button = document.getElementById('form_button');
    form_button.addEventListener('click', addCreative);
  }

  function main() {
    const pallate = document.getElementById('color_pallete_container');
    addListeners();
    addColorsToPallate();
  }

  main();
})();

const throlledFunc = throtle(() => {}, 200);
