const nome = "Patrick Casagrande";
let nome2 = "Partick Casagrande";
let pessoadefault = {
    nome:"Patrick",
    idade:"30",
    Trabalho: "Programador"
}

let nomes = ["Maria", "Jose", "Patrick"];
let pessoas= [
    {
        nome:"Patrick",
        idade:"30",
        Trabalho: "Programador"
    },
    {
        nome:"Maria",
        idade:"10",
        Trabalho: "UX"
    }
    
];


function alterarnome(){
    nome2 = 'Pedro joaquim'
    console.log("Valor alterado");
    console.log(nome2);

}

function recebeEalteranome(novoNome) {
    nome2 = novoNome;
    console.log("Valor Alterado Recebido");
    console.log(nome2);
}

function imprimirpessoa(pessoa){
    console.log("Nome");
    console.log(pessoa.nome);
    
    
    console.log("Idade");
    console.log(pessoa.idade);
    
    console.log("Trabalho");
    console.log(pessoa.Trabalho);
}
function adicionarPessoa(pessoa){
    pessoas.push(pessoas);
}

function imprimirpessoas(){
    pessoas.forEach((item) =>{ 
        console.log("Nome:");
        console.log(item.nome);

    })
}

imprimirpessoa();

console.log(pessoas);

//adicionarPessoa({
  //  Nome: "Pedro Silva",
  ///  idade: "88",
  //  Trabalho: "Porteiro"
//});


console.log(pessoas);

//imprimirpessoa(pessoadefault);


//imprimirpessoa({

//    nome:"joao",
 //   idade:"20",
 //   Trabalho: "ux"
//});

//recebeEalteranome("Jeferson");
//recebeEalteranome("Patrick");

//alterarnome();