export default function goods() {
  function insertBooks(books) {
    let str = ``;
    for (let i = 0; i < books.length; i++) {
      str += `<div class="bookWrap col-sm-4 col-12">`;
      str += `<div class="card text-center my-5 p-3">`;

      str += `<div class="card-title"><h5>${books[i].title}</h5></div>`;

      str += `<div class="image card-body"><img src="${books[i].imageCover}" /></div>`;
      str += `<div class="card-text"><p>${books[i].author}</p></div>`;
      str += `</div>`;
      str += `</div>`;
    }
    // str += `</div>`;
    document.getElementById("books").innerHTML = str;
  }
  async function loadBooks() {
    let url = "books.json";
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    insertBooks(data);
  }
  //loadBooks();
  document.getElementById("load").addEventListener("click", loadBooks);

  window.addEventListener("load", loadBooks);
}
