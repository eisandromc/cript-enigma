// Alfabeto
const ALFABETO = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// Rotores
const ROTORES = [
  "EKMFLGDQVZNTOWYHXUSPAIBRCJ", // Rotor I
  "AJDKSIRUXBLHWTMCQGZNPYFVOE", // Rotor II
  "BDFHJLCPRTXVZNYEIWGAKMUSQO"  // Rotor III
];

// Refletor (inverte a substituição)
const REFLETOR = {
  A: "Y", B: "R", C: "U", D: "H", E: "Q", F: "S", G: "L", H: "D", I: "P",
  J: "X", K: "N", L: "G", M: "O", N: "K", O: "M", P: "I", Q: "E", R: "B",
  S: "F", T: "Z", U: "C", V: "W", W: "V", X: "J", Y: "A", Z: "T"
};

// Plugboard: define pares de troca
const PLUGBOARD = {
  A: "M", M: "A", G: "L", L: "G", E: "T", T: "E"
};

function rotateRotor(rotor, offset) {
  return rotor.slice(offset) + rotor.slice(0, offset);
}

function plugboardSwap(char) {
  return PLUGBOARD[char] || char;
}

function enigmaProcess(text, rotorPositions) {
  let result = "";
  let [r1, r2, r3] = rotorPositions;

  for (let i = 0; i < text.length; i++) {
    let char = text[i].toUpperCase();
    if (!ALFABETO.includes(char)) {
      result += char;
      continue;
    }

    // Plugboard antes dos rotores
    char = plugboardSwap(char);

    // Avança os rotores (simula a rotação)
    r1 = (r1 + 1) % 26;
    if (i % 26 === 0) r2 = (r2 + 1) % 26;
    if (i % (26 * 26) === 0) r3 = (r3 + 1) % 26;

    // Rotor passo 1
    const rotor1 = rotateRotor(ROTORES[0], r1);
    const rotor2 = rotateRotor(ROTORES[1], r2);
    const rotor3 = rotateRotor(ROTORES[2], r3);

    let index = ALFABETO.indexOf(char);
    char = rotor1[index];
    index = ALFABETO.indexOf(char);
    char = rotor2[index];
    index = ALFABETO.indexOf(char);
    char = rotor3[index];

    // Refletor
    char = REFLETOR[char];
    index = rotor3.indexOf(char);
    char = ALFABETO[index];
    index = rotor2.indexOf(char);
    char = ALFABETO[index];
    index = rotor1.indexOf(char);
    char = ALFABETO[index];

    // Plugboard após os rotores
    char = plugboardSwap(char);

    result += char;
  }

  return result;
}




const btnCriptografar = document.getElementById("btnCriptografar");
btnCriptografar.addEventListener("click", function() {
    // 
    let rotor1 = document.getElementById("rotor1").value;
    let rotor2 = document.getElementById("rotor2").value;
    let rotor3 = document.getElementById("rotor3").value;

    let posicoesIniciais = [];
    posicoesIniciais[0] = parseInt(rotor1); 
    posicoesIniciais[1] = parseInt(rotor2);
    posicoesIniciais[2] = parseInt(rotor3);
    const mensagem = document.getElementById("txaMensagem").value;

    let mensagemCifrada = enigmaProcess(mensagem, [...posicoesIniciais]);
    document.getElementById("resultado").innerHTML = mensagemCifrada;
    
});

const btnDescriptografar = document.getElementById("btnDescriptografar");
btnDescriptografar.addEventListener("click", function() {
    
    let rotor1 = document.getElementById("rotor1").value;
    let rotor2 = document.getElementById("rotor2").value;
    let rotor3 = document.getElementById("rotor3").value;
    let posicoesIniciais = [
        parseInt(rotor1),
        parseInt(rotor2),
        parseInt(rotor3)
      ];
    const mensagem = document.getElementById("txaMensagem").value;
    //
    let mensagemCifrada = enigmaProcess(mensagem, [...posicoesIniciais]);
    document.getElementById("resultado").innerHTML = mensagemCifrada;
    
});

const btnLimpar = document.getElementById("btnLimpar");
btnLimpar.addEventListener("click", function() {
    
    document.getElementById("txaMensagem").value = '';
    document.getElementById("txtCifragem").value = '';
    document.getElementById("resultado").innerHTML = '';
    
});