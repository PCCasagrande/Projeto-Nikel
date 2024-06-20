const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");


checklogged();

//logar no sistema

document.getElementById("login-form").addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById ("email-input").value;
    const senha = document.getElementById ("password-input").value;
    const session = document.getElementById ("session-check").checked;

    const conta = getAccount(email);

    if(!conta) {

        alert("Opss ! Verifique o usuario ou senha");
        return;
    }

    if(conta) {
        if(conta.senha !==  senha) {
            alert("Opss ! Verifique o usuario ou senha.");
            return;
        }

        saveSession(email, session);

        window.location.href = "home.html";
    }
    

    

});




//criar conta
document.getElementById("create-form").addEventListener("submit", function(e){
    e.preventDefault();


    //alert("Conta Criada")
    
    const email = document.getElementById ("email-create-inuput").value;
    const senha = document.getElementById ("password-create-input").value;
    const senhaconfere = document.getElementById("password-confirm-input").value;


    if(email.length <5){
        alert("Email Invalido");
        return;
    }


    if(senha.length <4 ){
        alert("Preencha a senha com no minimo 4 digitos");
        return;
    }

    if (senha !== senhaconfere) {
        alert("As senhas não coincidem");
        return;
    }

    saveAccount({
        login: email,
        senha: senha,
        transactios: []

    });

    myModal.hide();

    alert("Conta Criada com Sucesso");
});

function checklogged() {
    if(session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(logged) {
        saveSession(logged, session);

        window.location.href = "home.html"; 

  
    }

}


function saveAccount(data) {
  localStorage.setItem(data.login, JSON.stringify(data));

}


function saveSession(data, saveSession) {
    if(saveSession) {
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logged", data); 

}

function getAccount(key) {
    const conta = localStorage.getItem(key);

    if(conta) {
        return JSON.parse(conta);
    }

    return "";
}

