
const myModal = new bootstrap.Modal("#transaction-modal");


let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");


let data = {
    transactions: []
};

document.getElementById("button-logout").addEventListener("click", logout);


document.getElementById("transactions-button").addEventListener("click", function(){
    window.location.href = "transactions.html";
});


document.getElementById("transaction-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;
    const type = document.querySelector('input[name="type-input"]:checked').value;

    if (Array.isArray(data.transactions)) {
        data.transactions.unshift({
            value: value, type: type, description: description, date: date
        });

        saveData(data);

        e.target.reset();
        myModal.hide();

        getCashIn();
        getCashOut();
        getTotal();

        alert("Lançamento adicionado com sucesso.");
    } else {
        console.error("data.transactions não é um array válido.");
    }
});

checklogged();

function checklogged() {
    if (session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if (!logged) {
        window.location.href = "index.html";
        return;
    }

    // Carrega os dados do usuário do localStorage, se disponível
    const dataUser = localStorage.getItem(logged);
    if (dataUser) {
        try {
            data = JSON.parse(dataUser);
            if (!Array.isArray(data.transactions)) {
                data.transactions = [];  // Garante que transactions seja um array
            }
        } catch (error) {
            console.error("Erro ao analisar os dados salvos do usuário:", error);
        }
    } else {
        // Se não houver dados salvos, inicializa data.transactions como um array vazio
        data.transactions = [];
    }

    getCashIn();
    getCashOut();
    getTotal();
}

function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
}

function getCashIn() {
    const transaction = data.transactions;
    if (Array.isArray(transaction)) {
        const cashIn = transaction.filter((item) => item.type === "1");

        if (cashIn.length) {
            let cashInHtml = ``;
            let limit = cashIn.length > 5 ? 5 : cashIn.length;

            for (let index = 0; index < limit; index++) {
                cashInHtml += `    
                <div class="row mb-4">
                    <div class="col-12">
                        <h3 class="fs-2">R$ ${cashIn[index].value.toFixed(2)}</h3>
                        <div class="container p-0">
                            <div class="row">
                                <div class="col-12 col-md-8">
                                    <p>${cashIn[index].description}</p>  
                                </div>
                                <div class="col-12 col-md-3 d-flex justify-content-end">
                                    ${cashIn[index].date}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `;
            }

            document.getElementById("cash-in-list").innerHTML = cashInHtml;
        }
    }
}


function getCashOut() {
    const transaction = data.transactions;
    if (Array.isArray(transaction)) {
        const cashOut = transaction.filter((item) => item.type === "2");

        if (cashOut.length) {
            let cashOutHtml = ``;
            let limit = cashOut.length > 5 ? 5 : cashOut.length;

            for (let index = 0; index < limit; index++) {
                cashOutHtml += `    
                <div class="row mb-4">
                    <div class="col-12">
                        <h3 class="fs-2">R$ ${cashOut[index].value.toFixed(2)}</h3>
                        <div class="container p-0">
                            <div class="row">
                                <div class="col-12 col-md-8">
                                    <p>${cashOut[index].description}</p>  
                                </div>
                                <div class="col-12 col-md-3 d-flex justify-content-end">
                                    ${cashOut[index].date}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `;
            }

            document.getElementById("cash-out-list").innerHTML = cashOutHtml;
        }
    }
}

function getTotal() {
    let total = 0;
    const transactions = data.transactions;

    if (Array.isArray(transactions)) {
        transactions.forEach((item) => {
            if (item.type === "1") {
                total += item.value;
            } else {
                total -= item.value;
            }
        });
    }

    document.getElementById("total").innerHTML = `R$ ${total.toFixed(2)}`;
    
    if (total < 0) {
        const confirmed = window.confirm("Seu saldo vai ficar negativo. Deseja prosseguir?");
        if (!confirmed) {
            return;
        }
    }
}

function saveData(data) {
    localStorage.setItem(logged, JSON.stringify(data));
}
