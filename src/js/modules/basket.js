export default function basket() {
  let itemBox = document.querySelectorAll(".item_box");
  let cartCont = document.getElementById("cart_content");

  function count() {
    let count = 0;
    if (getCartData()) {
      let cardData = getCartData();
      console.log(cardData);
      for (const key in cardData) {
        count += cardData[key][2];
        console.log(cardData[key][2]);
      }
    }
    return count;
  }
  //count();
  function removeItem(minus) {
    if (getCartData()) {
      let cardData = getCartData();
      let item = minus.target.getAttribute("data-id");
      cardData[item][2] = cardData[item][2] - 1;
      if (cardData[item][2] == 0) {
        delete cardData[item];
      }
      setCartData(cardData);
      let length = Object.getOwnPropertyNames(cardData);
      if (length == 0) {
        clearCart();
      }
      openCart();
    }
  }

  // Записываем данные в LocalStorage
  function setCartData(o) {
    localStorage.setItem("cart", JSON.stringify(o));
  }
  // Получаем данные из LocalStorage
  function getCartData() {
    return JSON.parse(localStorage.getItem("cart"));
  }

  function addToCart(e) {
    let button = e.target;
    button.disabled = true;
    let cartData = getCartData() || {};
    let parentBox = button.parentNode;
    let itemId = button.getAttribute("data-id");
    let itemTitle = parentBox.querySelector(".item_title").innerHTML;
    let itemPrice = parentBox.querySelector(".item_price").innerHTML;
    console.log(cartData);
    if (cartData.hasOwnProperty(itemId)) {
      cartData[itemId][2] += 1;
    } else {
      cartData[itemId] = [itemTitle, itemPrice, 1];
    }

    setCartData(cartData);
    button.disabled = false;
    cartCont.innerHTML = "The product has been added to the cart.";
    setTimeout(function () {
      cartCont.innerHTML = "Continue shopping...";
    }, 1000);
  }

  function openCart(e) {
    let cartData = getCartData();
    console.log(JSON.stringify(cartData));

    if (cartData !== null) {
      let cardTable = "";
      cardTable =
        '<table class="shopping_list table table-hover"><tr><th>Name</th><th>Price</th><th>Count</th><th>Remove product</th></tr>';
      for (let items in cartData) {
        cardTable += "<tr>";
        for (let i = 0; i < cartData[items].length; i++) {
          cardTable += `<td>${cartData[items][i]}</td>`;
        }
        cardTable += `<td><span class="minus" data-id="${items}">-</span></td></tr>`;
      }
      cardTable += `<tr><td>Total price</td><td></td><td>${count()}</td><td></td></tr>`;
      cardTable += "<table>";
      cartCont.innerHTML = cardTable;
      addMinusListener();
    } else {
      cartCont.innerHTML = "The shopping cart is empty!";
    }
  }

  function clearCart(e) {
    localStorage.removeItem("cart");
    cartCont.innerHTML = "The shopping cart cleared";
  }

  document.getElementById("clear_cart").addEventListener("click", clearCart);

  for (let i = 0; i < itemBox.length; i++) {
    itemBox[i].querySelector(".add_item").addEventListener("click", addToCart);
  }

  document.getElementById("checkout").addEventListener("click", openCart);
  //----------------------------
  let minusElements = document.getElementsByClassName("minus");

  for (let i = 0; i < minusElements.length; i++) {
    minusElements[i].addEventListener("click", removeItem);
  }

  function addMinusListener() {
    minusElements = document.getElementsByClassName("minus");
    for (let i = 0; i < minusElements.length; i++) {
      minusElements[i].addEventListener("click", removeItem);
    }
  }

}
