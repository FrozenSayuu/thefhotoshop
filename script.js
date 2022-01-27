const main = document.querySelector(".flex__products");
const showProductWindow = document.querySelector('.show-product-window');
const overlay = document.querySelector('.overlay');
const closeProductWindow = document.querySelector('.close-product-window');
const popupProductWindow = document.querySelector('.popup-product-window');
const imgBlock = document.querySelector('.img__block')
const cartCount = document.querySelector('.cartCount')
const sort = document.querySelector("#category__sort")
const KEYCODE = {
  ESC: 27
};
let div = document.createElement("div");

div.setAttribute("class", "shop-div");

main.append(div);
let inputSearch = document.querySelector('.input__search')
fetch("./images.json")
  .then((response) => response.json())
  .then((data) => {
    let imgData = data;
    showProducts(imgData)
    //Går igenom alla object med map loopen och skickar in dom i showProducts()

    const originalArray = [...imgData]
    sort.addEventListener('change', (e) => sortNew(e.target.value, originalArray))
    const sortNew = (value, originalArray) => {
      const option = value;
      if (option === 'price') {
        imgData.sort((a, b) => {
          return a.info.price - b.info.price
        })
        showProducts(imgData)
      } else if (option === 'size') {
        imgData.sort((a, b) => {
          return a.info.size * a.info.size1 - b.info.size * b.info.size1
        })
        showProducts(imgData)
      } else if (option === 'first') {
        showProducts(originalArray)
      }
    }

    //Function som returnerar objektet till showProducts 
    function showProducts(images) {

      document.querySelector('.shop-div').innerHTML = ''

      images.map(images => {

        document.querySelector('.shop-div').insertAdjacentHTML('beforeend', ` <div class='img__block'> <img id=${images.id} src=${images.url}><h2>${images.title}</h2> <h3>Storlek: ${images.info.size}x${images.info.size1}cm Pris: ${images.info.price}kr</h3></div>`);

        const imgBlocks = document.querySelectorAll('.img__block')

        for (let i = 0; i < imgBlocks.length; i++) {
          imgBlocks[i].addEventListener('click', (e) => productPopup(e.target.id))
        }
      })
    }

    function productPopup(id) {
      console.log(id);
      if (id != '') {
        let images = imgData.find(image => image.id === id) //INGA {} LOCKIGA HÄNGLÅS = MÅSVINGAR. Här skapar vi en variabel som innehåller all information av det objektet som matchar id:et

        //Tar bort hidden class från popupProductWindow & overlay.
        popupProductWindow.classList.remove('hidden');
        popupProductWindow.tabIndex = -1;
        overlay.classList.remove('hidden');
        //Skickar in hela object i popupProductWindow och skapar ett button element med function closeShopWindow() som stänger popupProductWindow vid klick.
        popupProductWindow.innerHTML = `<div class='popupProduct'> <img src=${images.url} id=${images.id}>
        <h2>${images.title}</h2> <h3> ${images.info.description}</h3> <h4>Storlek: ${images.info.size}x${images.info.size1}cm     Pris: ${images.info.price}kr</h4> <button class="btn-buy">Köp Produkt</button></div> <button onclick=closeShopWindow() class="close-product-window">&times;</button>`

        const buyBtn = document.querySelector('.btn-buy')
        buyBtn.addEventListener('click', () => buyProduct(images))
      }
    }
    document.querySelector('#inputSearch').addEventListener('input', (e) => findTitle(e.target.value))

    function findTitle(title) {
      if (title != undefined) {
        console.log(title)
        console.log(document.querySelector('#inputSearch').value);
        title = title.charAt(0).toUpperCase() + title.slice(1);
        console.log(title);
        const result = imgData.find(image => image.title === title)
        console.log(result);
        document.querySelector('.shop-div').innerHTML = ''

        document.querySelector('.shop-div').insertAdjacentHTML('beforeend', ` <div class='img__block'> <img id=${result.id} src=${result.url}><h2>${result.title}</h2> <h3>Storlek: ${result.info.size}x${result.info.size1}cm Pris: ${result.info.price}kr</h3></div>`);

        document.querySelector('.img__block').addEventListener('click', (e) => productPopup(e.target.id))
      } else if (document.querySelector('.input__search').value == '') {
        showProducts(imgData)
      }
    }

  });
window.onload = () => {
  const boughtProducts = JSON.parse(localStorage.getItem("products") || "[]");

  cartCount.textContent = boughtProducts.length
}
//Localstorage
const buyProduct = (image) => {
  const boughtProducts = JSON.parse(localStorage.getItem("products") || "[]");
  const newProduct = {
    title: image.title,
    price: image.info.price,
    imgUrl: image.url,
    id: Math.floor(Math.random() * 1000)
  }
  boughtProducts.push(newProduct)
  localStorage.setItem('products', JSON.stringify(boughtProducts))
  cartCount.textContent = boughtProducts.length
}
//Function som lägger till hidden till popupProductWindow & overlay.
const closeShopWindow = () => {
  popupProductWindow.classList.add('hidden');
  overlay.classList.add('hidden');
};
//Gör en Eventlistener att om du klickar på Esc på försvinner popupProductWindow
// document.querySelector('.popup-product-window').addEventListener('keydown', (e) => {
//   if (e.key === 'Escape' && !popupProductWindow.classList.contains('hidden')) {
//     closeShopWindow();
//     return
//   }
// });
document.addEventListener("keydown", checkCloseDialog)

function checkCloseDialog(press) {
  if (press.keyCode === KEYCODE.ESC) closeShopWindow();
}