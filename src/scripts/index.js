import { products, categories } from "./productsData.js";

function createAlbumCard(album) {
  const card = document.createElement("li");
  card.classList.add("album-card");

  const cardContent = `
        <img src="${album.img}" alt="${album.title}" class="album-image">
        <div class="card-info">
          <p class="album-details">${album.band} - ${album.year}</p>
          <h2 class="album-title">${album.title}</h2>
          <span class="album-price">
            <p>R$ ${album.price.toFixed(2)}</p>
            <button class="buy-button">Comprar</button>
          </span>
        </div>
    `;

  card.innerHTML = cardContent;

  return card;
}

function renderButtons(categories) {
  const buttonsContainer = document.querySelector(".genre-list");

  categories.forEach((category) => {
    const genreItem = document.createElement("li");

    const selectGenreButton = document.createElement("button");
    selectGenreButton.classList.add("select-genre-button");
    selectGenreButton.innerText = category;

    genreItem.appendChild(selectGenreButton);

    buttonsContainer.appendChild(genreItem);
  });
}

renderButtons(categories);

function renderAlbumsCards(products) {
  const albumsList = document.querySelector(".albums-list");

  albumsList.innerHTML = "";

  products.forEach((album) => {
    const card = createAlbumCard(album);
    albumsList.appendChild(card);
  });
}

renderAlbumsCards(products);

function applyCategoryFilter(products, categories) {
  const categoriesButtons = document.querySelectorAll(".genre-list > li");
  const priceInput = document.getElementById("priceInput");
  const displayedPrice = document.getElementById("princeInputValue");

  let filteredArray = products;
  let selectedCategoryIndex = 0;
  let priceInputValue = priceInput.value;

  displayedPrice.innerText = `Até R$ ${priceInputValue},00`;

  categoriesButtons.forEach((button) => {
    button.addEventListener("click", function () {
      toggleActiveFilter(button); // Tirar aqui também
      selectedCategoryIndex = categories.indexOf(button.innerText);

      if (selectedCategoryIndex == 0) {
        filteredArray = products.filter((product) => {
          return product.price <= priceInputValue;
        });
      } else {
        filteredArray = products.filter((product) => {
          return (
            product.category == selectedCategoryIndex &&
            product.price <= priceInputValue
          );
        });
      }

      return renderAlbumsCards(filteredArray);
    });
  });

  priceInput.addEventListener("input", (range) => {
    priceInputValue = range.target.value;
    displayedPrice.innerText = `Até R$ ${priceInputValue},00`;

    if (selectedCategoryIndex == 0) {
      filteredArray = products.filter((product) => {
        return product.price <= priceInputValue;
      });
    } else {
      filteredArray = products.filter((product) => {
        return (
          product.category == selectedCategoryIndex &&
          product.price <= priceInputValue
        );
      });
    }

    return renderAlbumsCards(filteredArray);
  });
}

applyCategoryFilter(products, categories);

// Remove se quiser
function toggleActiveFilter(button) {
  const activeButton = button.querySelector(".select-genre-button");
  const activeFilter = document.querySelector(".active-filter");

  if (activeFilter) {
    activeFilter.classList.remove("active-filter");
  }
  activeButton.classList.add("active-filter");
}
