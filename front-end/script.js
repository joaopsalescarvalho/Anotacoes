const pesquisa = document.getElementById("pesquisa");
const btnAdicionarNota = document.getElementById("adc-nota");
const screenAdicionarNota = document.querySelector(".adc-screen");
const areaNote = document.querySelector(".anotacoes");
const btnCriar = document.querySelector(".criar");
const btnVoltar = document.querySelector(".voltar");
const inputNome = document.getElementById("nome");
const inputDescricao = document.getElementById("desc");
const inputValor = document.getElementById("valor");
let emptyArray = [];

const fetchNotes = async () => {
  const res = await fetch("http://localhost:10000/notes");
  const notes = await res.json();

  return notes;
};

const addNote = async () => {
  const note = {
    nome: inputNome.value,
    descricao: inputDescricao.value,
    valor: inputValor.value,
  };

  await fetch("http://localhost:10000/notes", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });

  loadNotes();
  screenAdicionarNota.style.display = "none";
  inputNome.value = "";
  inputDescricao.value = "";
  inputValor.value = "";
};

const deleteTask = async (id) => {
  await fetch(`http://localhost:10000/notes/${id}`, { method: "delete" });

  loadNotes();
};

const updateNote = async ({ id, descricao, valor }) => {
  await fetch(`http://localhost:10000/notes/${id}`, {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ descricao, valor }),
  });

  loadNotes();
};

const formDate = (dateUTC) => {
  const options = { dateStyle: "long", timeStyle: "short" };
  const date = new Date(dateUTC).toLocaleString("pt-br", options);
  return date;
};

const createElement = (tag, innerText = "", innerHTML = "") => {
  const element = document.createElement(tag);

  if (innerText) {
    element.innerText = innerText;
  }
  if (innerHTML) {
    element.innerHTML = innerHTML;
  }

  return element;
};

const createNote = (note) => {
  const { id, nome, descricao, valor, created_at } = note;

  /*criar elementos*/
  const div = createElement("div");
  const headerNote = createElement("section");
  const btnEdit = createElement(
    "button",
    "",
    '<span class="material-symbols-outlined">edit</span>'
  );
  const btnDelete = createElement(
    "button",
    "",
    '<span class="material-symbols-outlined">delete</span>'
  );
  const h2 = createElement("h2", nome);
  const pDesc = createElement("p", descricao);
  const footerNote = createElement("section");
  const pValue = createElement("p", `Valor: ${valor}`);
  const pCreated_at = createElement("p", formDate(created_at));

  const editDesc = createElement("textarea");
  const editValue = createElement("input");
  const btnSalvarAlteracoes = createElement("button", "Salvar");

  /*adicionar eventos */
  btnDelete.addEventListener(`click`, () => deleteTask(id));
  btnEdit.addEventListener("click", () => {
    pDesc.innerText = "";
    pDesc.appendChild(editDesc);
    pValue.innerText = "";
    pValue.appendChild(editValue);
    pValue.appendChild(btnSalvarAlteracoes);
  });
  btnSalvarAlteracoes.addEventListener("click", (event) => {
    event.prevent;

    updateNote({ id, descricao: editDesc.value, valor: editValue.value });
  });

  /*criar classes*/
  div.classList.add("nota");
  headerNote.classList.add("header-note");
  btnEdit.classList.add("btn-edit");
  btnDelete.classList.add("btn-delete");
  pDesc.classList.add("desc");
  footerNote.classList.add("footer-note");
  pValue.classList.add("value");
  pCreated_at.classList.add("created_at");

  /* colocar dentro de outra tag*/
  div.appendChild(headerNote);
  div.appendChild(h2);
  div.appendChild(pDesc);
  div.appendChild(pValue);
  div.appendChild(footerNote);
  headerNote.appendChild(btnEdit);
  headerNote.appendChild(btnDelete);
  footerNote.appendChild(pCreated_at);

  return div;
};

const loadNotes = async () => {
  const notes = await fetchNotes();

  areaNote.innerHTML = "";

  notes.forEach((note) => {
    const div = createNote(note);
    areaNote.appendChild(div);
    const { nome } = note;
    emptyArray.push(nome);
    console.log(nome)
  });
};

loadNotes();

const searchNotes = async (pesquisa) => {
    if (pesquisa == '') {
        loadNotes();
    } else {
  let result = emptyArray.filter((data) => {
    return data.toLocaleLowerCase().startsWith(pesquisa.toLocaleLowerCase());
  }).forEach((data) => {
    createSearchBody(data)
    console.log(data);
}) }
};

const createSearchBody = async (data) => {
    const notes = await fetchNotes();

    areaNote.innerHTML = "";

    notes.forEach((note) => {
        const { nome } = note
        if(nome == data){
            const div = createNote(note);
            areaNote.appendChild(div);
        }
    })

}

pesquisa.addEventListener("input", () => searchNotes(pesquisa.value));

btnAdicionarNota.addEventListener("click", () => {
  screenAdicionarNota.style = "display:block";
});

btnVoltar.addEventListener("click", () => {
  screenAdicionarNota.style = "display:none";
});

btnCriar.addEventListener("click", addNote);
