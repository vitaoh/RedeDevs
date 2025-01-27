let btnSalvar = document.getElementById("salvar")
let containerCard = document.getElementById("containerCard");
let url = document.getElementById('img');
let addNews = document.getElementById('add-news');
let modal = document.getElementById("modalNoticia")
let modalFechar = document.getElementById("fechar")
let xizinho = document.getElementById("fecharX")
let editar = document.getElementById("modalAlertaEditar")
let excluir = document.getElementById("modalAlertaExcluir")

addNews.addEventListener("click", () => {
    modal.classList.remove("d-none");
    modal.classList.add("d-block");
})

modalFechar.addEventListener("click", () => {
    modal.classList.remove("d-block");
    modal.classList.add("d-none");
})

xizinho.addEventListener("click", () => {
    modal.classList.remove("d-block");
    modal.classList.add("d-none");
})

if (usuario === null) {
    addNews.style.display = "none";
}
else if (usuario.admin) {
    addNews.style.display = '';
} else {
    addNews.style.display = 'none';
}

if (localStorage.getItem("noticias") === null) {
    localStorage.setItem("noticias", JSON.stringify([]));
}

let objNoticias = JSON.parse(localStorage.getItem("noticias"));

loadNews()

document.getElementById("autor").addEventListener("input", () => mascaraNome(document.getElementById("autor").value));
function mascaraNome(nome) {

    let texto = nome;
    let textoF = "";

    for (let index = 0; index < texto.length; index++) {

        if (isNaN(texto[index]) || texto[index] === " ") {
            textoF += texto[index];
        }
    }

    document.getElementById("autor").value = textoF;

};

function mascaraurl(url) {
    let temp = "";
    let start = "https://";

    if (url.startsWith(start.slice(0, url.length))) {
        temp += url;
    } else temp = url.slice(0, url.length - 1);

    return temp;
};



url.addEventListener('input', () => {
    url.value = mascaraurl(url.value);
});

btnSalvar.addEventListener("click", () => {
    let tituloValor = document.getElementById("titulo").value
    let subtituloValor = document.getElementById("subtitulo").value
    let categoriaValor = document.getElementById("categoria").value
    let conteudoValor = document.getElementById("conteudo").value
    let autorValor = document.getElementById("autor").value
    let imgValor = document.getElementById("img").value

    console.log(categoriaValor)

    if (tituloValor.length < 3) {
        alert('O Titulo deve ter pelo menos 5 caracteres.');
    } else if (subtituloValor.length < 5) {
        alert('O Subtitulo deve ter pelo menos 5 caracteres.');
    } else if (categoriaValor === "0") {
        alert('Selecione uma categoria.');
    } else if (conteudoValor < 10) {
        alert('O Conteudo esta incompleto.');
    } else if (autorValor.length < 2) {
        alert('O nome do Autor esta incompleto.');
    } else if (imgValor.length < 8) {
        alert('A URL deve ter pelo menos 8 caracteres.');
    } else {

        data = new Date();

        let dia = String(data.getDate()).padStart(2, '0');
        let mes = String(data.getMonth() + 1).padStart(2, '0');
        let ano = data.getFullYear();
        let dataCompleta = `${dia}/${mes}/${ano}`;

        let idUnico = Date.now();


        let objNoticia = {
            id: idUnico,
            titulo: tituloValor,
            subtitulo: subtituloValor,
            conteudo: conteudoValor,
            autor: autorValor,
            img: imgValor,
            data: dataCompleta,
            views: 0,
            comentarios: []
        }

        objNoticias.push(objNoticia);

        localStorage.setItem("noticias", JSON.stringify(objNoticias));

        loadNews();
        modal.classList.add("d-none")
    }
})

function loadNews() {

    containerCard.innerHTML = "";

    for (let noticia of objNoticias) {

        let card = document.createElement("div");
        card.classList.add('card', 'cm-card', 'bg-dark', 'rounded', 'shadow-sm');

        let row = document.createElement("div");
        row.classList.add('row', 'g-0');

        let colImg = document.createElement("div");
        colImg.classList.add('col-md-4');

        let img = document.createElement("img");
        img.classList.add("img-fluid", "rounded-start")

        let colP = document.createElement("div");
        colP.classList.add('col-md-8');

        let colBody = document.createElement("div");
        colBody.classList.add('card-body');

        let h5 = document.createElement("h5");
        h5.classList.add('titulo-h5', 'text-light');

        let p1 = document.createElement("p");
        p1.classList.add('text-light')
        let p2 = document.createElement("p");
        let small = document.createElement("small");
        small.classList.add('text-secondary');

        let iconsDiv = document.createElement("div");
        iconsDiv.classList.add("icon-section", "ms-auto", "ms-end", "d-flex", "gap-2");

        // Ícone de edição
        let editIcon = document.createElement("i");
        editIcon.classList.add("fas", "fa-edit", "text-warning", "cursor-pointer");
        editIcon.title = "Editar"; // Tooltip para o ícone

        // Ícone de exclusão
        let deleteIcon = document.createElement("i");
        deleteIcon.classList.add("fas", "fa-trash", "text-danger", "cursor-pointer");
        deleteIcon.title = "Excluir"; // Tooltip para o ícone

        containerCard.appendChild(card);
        card.appendChild(row);
        row.appendChild(colImg);
        colImg.appendChild(img);
        row.appendChild(colP);
        colP.appendChild(colBody);
        colBody.appendChild(h5);
        colBody.appendChild(p1);
        colBody.appendChild(p2);
        p2.appendChild(small);

        colBody.appendChild(iconsDiv);
        iconsDiv.appendChild(editIcon);
        iconsDiv.appendChild(deleteIcon);

        img.src = noticia.img;
        h5.textContent = noticia.titulo;
        p1.textContent = noticia.subtitulo;
        small.textContent = noticia.views + " Views - " + noticia.autor + " - " + noticia.data;

        h5.addEventListener("click", () => {
            window.location.href = "noticia.html?id=" + noticia.id;
        })

        img.addEventListener("click", () => {
            window.location.href = "noticia.html?id=" + noticia.id;
        })
    }

    console.log(objNoticias)
    //renderizarPaginacao()
}

/*function renderizarPaginacao() {
    let totalNoticias = objNoticias.length;
    let totalPaginas = parseInt(totalNoticias / noticiasPorPagina) + (totalNoticias % noticiasPorPagina > 0 ? 1 : 0);

    let paginacaoContainer = document.createElement("div");
    paginacaoContainer.classList.add("d-flex", "justify-content-center", "mt-3");

    let anterior = document.createElement("button");
    anterior.textContent = "Anterior";
    anterior.classList.add("btn", "btn-secondary", "mx-2");
    anterior.disabled = paginaAtual === 1;
    anterior.addEventListener("click", () => {
        paginaAtual--;
        loadNews();
    });

    let proximo = document.createElement("button");
    proximo.textContent = "Próximo";
    proximo.classList.add("btn", "btn-secondary", "mx-2");
    proximo.disabled = paginaAtual === totalPaginas;
    proximo.addEventListener("click", () => {
        paginaAtual++;
        loadNews();
    });

    paginacaoContainer.appendChild(anterior);
    paginacaoContainer.appendChild(proximo);

    containerCard.appendChild(paginacaoContainer);
}*/


let pesquisar = document.getElementById('pesquisa');
let btnPesq = document.getElementById("btnPesquisa")

btnPesq.addEventListener('click', (e) => {
    e.preventDefault();
    let input = pesquisar.value.toLowerCase();
    let cards = document.querySelectorAll('.card');

    for (let card of cards) {
        let nome = card.querySelector('h5').textContent.toLowerCase();
        if (nome.includes(input)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    }
});
