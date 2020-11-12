function desafio(trabalho1, trabalho2) {
    const ganharSorvete = trabalho1 || trabalho2
    const ganharNoteGame = trabalho1 && trabalho2
    // const ganharSmartphone = !!(trabalho1 ^ trabalho2)  // bitwise xor
    const ganharSmartphone = trabalho1 != trabalho2  // diferença simula ou exclusivo
    const manterSaudavel  = !ganharSorvete  // operador unário    
    return { ganharSorvete, ganharNoteGame,  ganharSmartphone, manterSaudavel}
}

 console.log(desafio(true, true))
 console.log(desafio(true, false))
 console.log(desafio(false, true))
 console.log(desafio(false, false))