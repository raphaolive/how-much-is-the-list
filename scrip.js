const listFromStorage = JSON.parse(localStorage.getItem("List"));
const form = document.getElementById("form");
const inputItem = document.getElementById("inputItem");
const inputQnt = document.getElementById("inputQnt");
const inputPrice = document.getElementById("inputPrice");
const btnAdd = document.getElementById("addBtn");
const cleanBtn = document.getElementById("cleanBtn");
const h1Total = document.getElementById("total");
let ulItems = document.getElementById("ulItems");

renderList();


let list = listFromStorage ? listFromStorage : [];
let prices = list.map((e) => {
  return Number(e.Price);
});
let total = prices.reduce((val, i) => val + i, 0)


btnAdd.addEventListener("click", () => {
  if (inputItem.value && inputQnt.value && inputPrice.value) {
    list.push({
      Amount: inputQnt.value,
      Item: inputItem.value,
      Price: (inputPrice.value * inputQnt.value).toFixed(2),
      Id: list.length + 1,
    });
    localStorage.setItem("List", JSON.stringify(list));
    showTotal();
  } else {
    window.alert("Preencha todos os campos antes de continuar.");
  }
});

cleanBtn.addEventListener("click", () => {
  localStorage.removeItem("List");
  ulItems.innerHTML = "<h2 class='titles'>Lista limpa ...</h2>";
  list = [];
  total = 0
});

function deleteItem(index) {
  let newList = list.filter((e) => e.Id != index);
  list = newList;
  localStorage.setItem("List", JSON.stringify(newList));
  window.location = "./index.html";
}

function renderList() {
  if (listFromStorage === null) {
    ulItems.innerHTML = "<h2 class='titles'>Adicione itens ...</h2>";
  } else {
    listFromStorage.forEach((e) => {
      const li = document.createElement("li");
      li.setAttribute("id", e.Id);
      li.innerHTML = `
        <p class="qntIt">${e.Amount} x ${e.Item}</p>
        <div class="priceTrash">
        <p class="itPrice">R$${e.Price}</p>
        <i class="fa-solid fa-trash" onclick="deleteItem(${e.Id})" id=${e.Id}></i>
        </div>
        `;
      ulItems.appendChild(li);
    });
  }
}

function showTotal() {
  h1Total.innerText = `R$ ${total}`
}

showTotal();
