function incluirAposta() {
  // cria referência aos elementos de entrada de dados da página
  var inNome = document.getElementById("inNome");
  var inPeso = document.getElementById("inPeso");

  var nome = inNome.value;          // conteúdo do campo nome
  var peso = Number(inPeso.value);  // conteúdo do campo peso (em número)

  // se vazios ou Not-a-Number
  if (nome == "" || peso == 0 || isNaN(peso)) {
    alert("Informe nome e peso da aposta");  // exibe alerta
    inNome.focus();                          // joga cursor em nome
    return;                                  // abandona execução da funtion
  }

  // chama function que verifica se peso já foi apostado
  if (verApostaExiste(peso)) {
    alert("Alguém já apostou este peso, informe outro...");
    inPeso.focus();
    return;
  }

  if (localStorage.getItem("melanciaNome")){
    var melanciaNome = localStorage.getItem("melanciaNome") + ";" + nome
    var melanciaPeso = localStorage.getItem("melanciaPeso") + ";" + peso

    localStorage.setItem("melanciaNome", melanciaNome)
    localStorage.setItem("melanciaPeso", melanciaPeso)
  } else {
    localStorage.setItem("melanciaNome", nome)
    localStorage.setItem("melanciaPeso", peso)
  }

  mostrarApostas();    // chama function que mostra as apostas já salvas

  inNome.value = "";   // limpa os campos de formulário
  inPeso.value = "";
  inNome.focus();      // joga o foco (cursor) no campo inNome
}
// cria referência ao botão e associa a ocorrência do evento click à function
var btApostar = document.getElementById("btApostar");
btApostar.addEventListener("click", incluirAposta);

function verApostaExiste(peso) {

  var existe = false;     // valor inicial é false

  if(localStorage.getItem("melanciaPeso")){
    var pesos = localStorage.getItem("melanciaPeso").split(";")

    if(pesos.indexOf(peso.toString()) >= 0){
      existe = true
    }
  }

  return existe;    // retorna true ou false
}

function mostrarApostas() {

  // cria referência ao elemento que exibe as apostas
  var outApostas = document.getElementById("outApostas");

  // se não há apostas armazenadas em localStorage
  if (!localStorage.getItem("melanciaNome")) {
    // limpa o espaço de exibição das apostas (para quando "Limpar Apostas")
    outApostas.textContent = "";
    return;                      // retorna (não executa os comandos abaixo)
  }

  // obtém o conteúdo das variáveis salvas no localStorage, separando-as
  // em elementos de vetor a cada ocorrência do ";"
  var nomes = localStorage.getItem("melanciaNome").split(";");
  var pesos = localStorage.getItem("melanciaPeso").split(";");

  var linhas = "";   // irá acumular as linhas a serem exibidas

  // repetição para percorrer todos os elementos do vetor
  for (var i = 0; i < nomes.length; i++) {
    // concatena em linhas os nomes dos apostadores e suas apostas
    linhas += nomes[i] + " - " + pesos[i] + "gr \n";
  }

  // exibe as linhas (altera o conteúdo do elemento outApostas)
  outApostas.textContent = linhas;
}
// chama a function quando a página é carregada, para mostrar apostas salvas
mostrarApostas();

function verificarVencedor() {

  // se não há apostas armazenadas em localStorage
  if (!localStorage.getItem("melanciaNome")) {
    alert("Não há apostas cadastradas");
    return;                      // retorna (não executa os comandos abaixo)
  }

  // solicita o peso correto da melancia
  var pesoCorreto = Number(prompt("Qual o peso correto da melancia?"));

  // se não informou, retorna
  if (pesoCorreto == 0 || isNaN(pesoCorreto)) {
    return;
  }

  // obtém os dados armazenados, separando-os em elementos de vetor  
  var nomes = localStorage.getItem("melanciaNome").split(";");
  var pesos = localStorage.getItem("melanciaPeso").split(";");

  // valor inicial para vencedor é o da primeira aposta
  var vencedorNome = nomes[0];
  var vencedorPeso = Number(pesos[0]);

  // percorre as apostas
  for (var i = 1; i < nomes.length; i++) {

    // calcula a diferença de peso do "vencedor" e da aposta atual
    difVencedor = Math.abs(vencedorPeso - pesoCorreto);    
    difAposta = Math.abs(Number(pesos[i]) - pesoCorreto);

    // se a diferença da aposta atual (no for) for menor que a do "vencedor"
    if (difAposta < difVencedor) {
      vencedorNome = nomes[i];            // troca o "vencedor" 
      vencedorPeso = Number(pesos[i]);    // para este elemento
    }

  }

  // monta mensagem com dados do vencedor
  var mensagem = "Resultado - Peso Correto: " + pesoCorreto + "gr";
  mensagem += "\n----------------------------------------------";
  mensagem += "\nVencedor: " + vencedorNome;
  mensagem += "\nAposta: " + vencedorPeso + "gr";
  alert(mensagem);
}
var btVencedor = document.getElementById("btVencedor");
btVencedor.addEventListener("click", verificarVencedor);

function limparApostas() {
  if(confirm("Confirma exclusão de todas as apostas?")){
    localStorage.removeItem("melanciaNome")
    localStorage.removeItem("melanciaPeso")
    mostrarApostas()
  }
}
var btLimpar = document.getElementById("btLimpar");
btLimpar.addEventListener("click", limparApostas);