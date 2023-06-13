const localStorageName = "to-do-list";

//verifica se existe alguma task igual
function validIfExistsNewTask() {
  let values = JSON.parse(localStorage.getItem(localStorageName) || "[]");
  let inputValue = document.getElementById("input-new-task").value;
  let exists = values.find((x) => x.name == inputValue);
  return !exists ? false : true;
}

//insere uma nova task
function newTask() {
  let input = document.getElementById("input-new-task");

  //validação do input realizado

  if (!input.value) {
    input.style.border = "1px solid red";
    alert("Digite algo para inserir em sua lista!");
  } else if (validIfExistsNewTask()) {
    alert("Essa tarefa já foi inserida!");
  } else {
    // increment to localStorage apartir de uma array criada pelo JSON.parse
    let values = JSON.parse(localStorage.getItem(localStorageName) || "[]");
    values.push({
      name: input.value,
    });
    localStorage.setItem(localStorageName, JSON.stringify(values));
    showValues();
  }
  input.value = "";
}

//mostra os valores inseridos
function showValues() {
  let values = JSON.parse(localStorage.getItem(localStorageName) || "[]");
  let list = document.getElementById("to-do-list");
  list.innerHTML = "";
  for (let i = 0; i < values.length; i++) {
    list.innerHTML += `<li>${values[i]["name"]}<div id="btn-content"> 
    <button id="btn-trash" onclick='removeItem("${values[i]["name"]}")'><ion-icon name="trash-bin-outline"></ion-icon></button>
    <button id="btn-edit"><ion-icon name="create-outline"></ion-icon></button> 
    <button id="btn-ok"><ion-icon name="checkmark-circle-outline"></ion-icon></button>
    </div></li>`;
  }
}

function removeItem(data) {
  let values = JSON.parse(localStorage.getItem(localStorageName) || "[]");
  let index = values.findIndex((x) => x.name == data);
  values.splice(index, 1);
  localStorage.setItem(localStorageName, JSON.stringify(values));
  showValues();
}

showValues();
