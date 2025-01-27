let formLogin = document.getElementById('form-login');


if(localStorage.getItem("usuarios") === null) {
    localStorage.setItem("usuarios", JSON.stringify([]));
}

let objUsuarios = JSON.parse(localStorage.getItem("usuarios"));

let objUsuario = {
    id: 1,
    nome: "Cauan Mendes",
    cpf: "333",
    telefone: "555",
    email: "admin@admin.com",
    senha: "123",
    admin: true,
    log: []
}

objUsuarios.push(objUsuario);

localStorage.setItem("usuarios", JSON.stringify(objUsuarios));


formLogin.addEventListener('submit', function (e) {
    e.preventDefault();

    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;

    let objUsuarios = JSON.parse(localStorage.getItem("usuarios"));

    console.log(objUsuarios);

    let logado = false;

    for(let usuario of objUsuarios) {

        console.log(usuario);
        
        if(usuario.email === email && usuario.senha === senha) {
            logado = true;
            localStorage.setItem("usuario", JSON.stringify(usuario));
            document.getElementById("mensagem").textContent = 'Login Bem-Sucedido!'
            setInterval(() => {
                window.location.href = "index.html";
            }, 1500);
        }
    }

    if(logado == false) {
        document.getElementById("mensagem").textContent = 'Email ou senha incorretos.'
    }
});