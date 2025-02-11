document.addEventListener("DOMContentLoaded", carregarNotas);

function salvarNota() {
    let data = document.getElementById("data").value;
    let notaInput = document.getElementById("notaInput").value.trim();

    if (data === "" || notaInput === "") {
        alert("Preencha a data e a anotação antes de salvar!");
        return;
    }

    let notas = JSON.parse(localStorage.getItem("notas")) || [];
    notas.push({ data, texto: notaInput });
    localStorage.setItem("notas", JSON.stringify(notas));

    document.getElementById("data").value = "";
    document.getElementById("notaInput").value = "";
    carregarNotas();
}

function carregarNotas() {
    let listaNotas = document.getElementById("listaNotas");
    listaNotas.innerHTML = "";

    let notas = JSON.parse(localStorage.getItem("notas")) || [];
    notas.forEach((nota, index) => {
        let li = document.createElement("li");
        li.innerHTML = `<strong>${nota.data}</strong><br>${nota.texto}
                        <button class="delete-btn" onclick="deletarNota(${index})">Excluir</button>`;
        listaNotas.appendChild(li);
    });
}

function deletarNota(index) {
    let notas = JSON.parse(localStorage.getItem("notas")) || [];
    notas.splice(index, 1);
    localStorage.setItem("notas", JSON.stringify(notas));
    carregarNotas();
}