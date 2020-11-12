function soBoaNoticia(nota) {
    if(nota >= 7) {
        console.log('Aprovado com ' + nota)
    }
}

soBoaNoticia(8.1)
soBoaNoticia(6.1)

function seForVerdadeEuFalo(valor) {
    if(valor) {
        console.log('É verdade... ' + valor)
    }
}

seForVerdadeEuFalo()
seForVerdadeEuFalo(null)
seForVerdadeEuFalo(undefined)
seForVerdadeEuFalo(' ')
seForVerdadeEuFalo('?')
seForVerdadeEuFalo([])

function teste1(num) {
    if(num > 7)
        console.log(num)
        console.log('Final')
}

// teste1(6)
// teste1(8)

function teste2(num) {
    if(num > 7); { // cuidado com o ´;´, não usar com as estruturas de controle
         console.log(num)
    }
}

teste2(6)
teste2(8)