// ----------------------
// MÚLTIPLA ESCOLHA – com várias perguntas
// ----------------------
const perguntasMultipla = [
  {
    pergunta: "O herói Elan ______ o dragão há 10 anos.",
    opcoes: ["derrotava", "derrotou", "derrotaria", "derrota"],
    correta: 1,
    explicacao: "O verbo 'derrotou' indica ação finalizada no passado."
  },
  {
    pergunta: "Os gatos ______ no telhado ontem.",
    opcoes: ["brincam", "brincavam", "brincaram", "brincariam"],
    correta: 2,
    explicacao: "Escolhe-se 'brincaram' pois é pretérito perfeito (ação concluída)."
  },
  {
    pergunta: "Se eu ______ mais cedo, teria visto o filme.",
    opcoes: ["chego", "chegasse", "chegaria", "chegar"],
    correta: 1,
    explicacao: "'Chegasse' é pretérito imperfeito do subjuntivo – para condição passada."
  }
];
let indiceMultipla = 0;

function carregarPerguntaMultipla() {
  const p = perguntasMultipla[indiceMultipla];
  document.getElementById("perguntaMultipla").innerText = p.pergunta;
  const btns = document.querySelectorAll("#opcoesMultiplaEscolha button");
  p.opcoes.forEach((txt, i) => btns[i].innerText = `${String.fromCharCode(97 + i)}) ${txt}`);
  document.getElementById("feedbackMultiplaEscolha").innerText = "";
  document.getElementById("explicacaoMultipla").innerText = "";
}

function verificarRespostaMultipla(i) {
  const p = perguntasMultipla[indiceMultipla];
  if (i === p.correta) {
    document.getElementById("feedbackMultiplaEscolha").innerText = "✅ Resposta correta!";
    document.getElementById("explicacaoMultipla").innerText = p.explicacao;
    indiceMultipla++;
    if (indiceMultipla < perguntasMultipla.length) {
      setTimeout(carregarPerguntaMultipla, 2000);
    } else {
      document.getElementById("feedbackMultiplaEscolha").innerText += " 🏆 Fase concluída!";
    }
  } else {
    document.getElementById("feedbackMultiplaEscolha").innerText = "❌ Resposta incorreta. Tente novamente.";
  }
}

// ----------------------
// DIGITAÇÃO – com várias perguntas
// ----------------------
const perguntasDigitacao = [
  {
    pergunta: "Se os guardiões não ______ o ritual, o céu cairá.",
    dica: "realizar – pretérito imperfeito do subjuntivo (3ª pl).",
    resposta: "realizassem",
    explicacao: "'Realizassem' expressa condição não executada no passado."
  },
  {
    pergunta: "Se eles ______ mais cedo, teriam evitado o acidente.",
    dica: "chegar – pretérito imperfeito do subjuntivo (3ª pl).",
    resposta: "chegassem",
    explicacao: "'Chegassem' indica hipótese passada não realizada."
  },
  {
    pergunta: "Era necessário que os alunos ______ a lição com atenção.",
    dica: "ler – pretérito imperfeito do subjuntivo (3ª pl).",
    resposta: "lessem",
    explicacao: "'Lessem' é usado para necessidade ou desejo no passado."
  }
];
let indiceDigitacao = 0;

function carregarPerguntaDigitacao() {
  const p = perguntasDigitacao[indiceDigitacao];
  document.getElementById("perguntaDigitacao").innerHTML = `<strong>${p.pergunta}</strong>`;
  document.getElementById("dicaDigitacao").innerText = p.dica;
  document.getElementById("respostaDigitada").value = "";
  document.getElementById("feedbackDigitacao").innerText = "";
  document.getElementById("explicacaoDigitacao").innerText = "";
}

function verificarRespostaDigitada() {
  const p = perguntasDigitacao[indiceDigitacao];
  const resposta = document.getElementById("respostaDigitada").value.trim().toLowerCase();
  if (resposta === p.resposta) {
    document.getElementById("feedbackDigitacao").innerText = "✅ Resposta correta!";
    document.getElementById("explicacaoDigitacao").innerText = p.explicacao;
    indiceDigitacao++;
    if (indiceDigitacao < perguntasDigitacao.length) {
      setTimeout(carregarPerguntaDigitacao, 2000);
    } else {
      document.getElementById("feedbackDigitacao").innerText += " 🏆 Fase concluída!";
    }
  } else {
    document.getElementById("feedbackDigitacao").innerText = "❌ Resposta incorreta. Tente novamente.";
  }
}

// ----------------------
// JOGO DA FORCA – seu código original
// ----------------------
let palavraForca = "proceder";
let palavraExibidaForca = Array(palavraForca.length).fill("_");
let tentativasRestantes = 6;
let letrasUsadas = [];

const canvasForca = document.getElementById("efeitoForca");
const contextoForca = canvasForca.getContext("2d");

function desenharForcaBase() {
  contextoForca.lineWidth = 2;
  contextoForca.strokeStyle = '#333';
  contextoForca.clearRect(0, 0, canvasForca.width, canvasForca.height);
  const escala = 0.3;
  const offsetX = 130;
  const offsetY = 29;
  contextoForca.beginPath();
  contextoForca.moveTo((10*escala)+offsetX, (190*escala)+offsetY);
  contextoForca.lineTo((100*escala)+offsetX, (190*escala)+offsetY);
  contextoForca.stroke();
  contextoForca.beginPath();
  contextoForca.moveTo((50*escala)+offsetX, (190*escala)+offsetY);
  contextoForca.lineTo((50*escala)+offsetX, (10*escala)+offsetY);
  contextoForca.stroke();
  contextoForca.beginPath();
  contextoForca.moveTo((50*escala)+offsetX, (10*escala)+offsetY);
  contextoForca.lineTo((100*escala)+offsetX, (10*escala)+offsetY);
  contextoForca.stroke();
  contextoForca.beginPath();
  contextoForca.moveTo((100*escala)+offsetX, (10*escala)+offsetY);
  contextoForca.lineTo((100*escala)+offsetX, (30*escala)+offsetY);
  contextoForca.stroke();
}

function desenharParteForca(etapa) {
  contextoForca.lineWidth = 2;
  contextoForca.strokeStyle = '#333';
  const escala = 0.3;
  const offsetX = 130;
  const offsetY = 29;
  const bonecoCentroX = (100 * escala) + offsetX;
  const bonecoTopoY = (50 * escala) + offsetY;
  contextoForca.beginPath();
  switch (etapa) {
    case 5:
      contextoForca.arc(bonecoCentroX, bonecoTopoY, (20 * escala), 0, Math.PI * 2);
      break;
    case 4:
      contextoForca.moveTo(bonecoCentroX, bonecoTopoY + (20 * escala));
      contextoForca.lineTo(bonecoCentroX, bonecoTopoY + (80 * escala));
      break;
    case 3:
      contextoForca.moveTo(bonecoCentroX, bonecoTopoY + (30 * escala));
      contextoForca.lineTo(bonecoCentroX - (30 * escala), bonecoTopoY + (60 * escala));
      break;
    case 2:
      contextoForca.moveTo(bonecoCentroX, bonecoTopoY + (30 * escala));
      contextoForca.lineTo(bonecoCentroX + (30 * escala), bonecoTopoY + (60 * escala));
      break;
    case 1:
      contextoForca.moveTo(bonecoCentroX, bonecoTopoY + (80 * escala));
      contextoForca.lineTo(bonecoCentroX - (20 * escala), bonecoTopoY + (130 * escala));
      break;
    case 0:
      contextoForca.moveTo(bonecoCentroX, bonecoTopoY + (80 * escala));
      contextoForca.lineTo(bonecoCentroX + (20 * escala), bonecoTopoY + (130 * escala));
      break;
  }
  contextoForca.stroke();
}

function iniciarJogoForca() {
  palavraExibidaForca = Array(palavraForca.length).fill("_");
  tentativasRestantes = 6;
  letrasUsadas = [];
  document.getElementById("palavraForca").textContent = palavraExibidaForca.join(" ");
  document.getElementById("letrasUsadas").textContent = "-";
  document.getElementById("tentativasRestantes").textContent = tentativasRestantes;
  document.getElementById("feedbackForca").textContent = "";
  desenharForcaBase();
}

function adivinharLetra() {
  const letra = document.getElementById("entradaLetra").value.trim().toLowerCase();
  const feedback = document.getElementById("feedbackForca");
  if (!letra || letra.length !== 1 || !/[a-zçáéíóúâêôãõ]/i.test(letra)) {
    feedback.textContent = "⚠️ Digite uma letra válida.";
    return;
  }
  if (letrasUsadas.includes(letra)) {
    feedback.textContent = `❗ A letra "${letra}" já foi usada!`;
    return;
  }
  letrasUsadas.push(letra);
  let encontrado = false;
  for (let i = 0; i < palavraForca.length; i++) {
    if (palavraForca[i] === letra) {
      palavraExibidaForca[i] = letra;
      encontrado = true;
    }
  }
  document.getElementById("letrasUsadas").innerHTML = letrasUsadas.map(l =>
    palavraForca.includes(l)
      ? `<span style="color: green;">${l}</span>`
      : `<span style="color: red;">${l}</span>`
  ).join(", ");
  document.getElementById("palavraForca").textContent = palavraExibidaForca.join(" ");
  document.getElementById("entradaLetra").value = "";
  if (!encontrado) {
    tentativasRestantes--;
    desenharParteForca(tentativasRestantes);
  }
  document.getElementById("tentativasRestantes").textContent = tentativasRestantes;
  if (palavraExibidaForca.join("") === palavraForca) {
    feedback.textContent = "🎉 Vitória! Dominou a conjugação perfeita!";
    confetti({ particleCount: 200, spread: 80, origin: { y: 0.6 } });
  } else if (tentativasRestantes <= 0) {
    feedback.textContent = "💀 Perdeu! A palavra era: " + palavraForca.toUpperCase();
  }
}

// ----------------------
// MODO 4x4 – seu código original
// ----------------------
const pares = [
  ["chegara", "Quando ele ______, todos já tinham partido."],
  ["teria falado", "Ela ______ se tivesse tido coragem."],
  ["havíamos vencido", "Nós ______ a batalha antes do reforço chegar."],
  ["fossem", "Era necessário que eles ______ mais cuidadosos."]
];
let verboSelecionado = null, pareados = 0;

function configurarJogoAssociacao() {
  const grade = document.getElementById("gradeAssociacao");
  const feedback = document.getElementById("feedbackAssociacao");
  grade.innerHTML = "";
  feedback.textContent = "";
  verboSelecionado = null;
  pareados = 0;

  const itens = [
    ...pares.map(p => ({type: "verb", text: p[0]})),
    ...pares.map(p => ({type: "phrase", text: p[1]}))
  ].sort(() => Math.random() - 0.5);

  itens.forEach(item => {
    const div = document.createElement("div");
    div.className = "caixa-associacao";
    div.textContent = item.text;
    div.dataset.type = item.type;
    div.dataset.text = item.text;
    div.addEventListener("click", lidarCliqueAssociacao);
    grade.appendChild(div);
  });
}

function lidarCliqueAssociacao(e) {
  const c = e.currentTarget;
  const feedback = document.getElementById("feedbackAssociacao");
  if (c.classList.contains("correta")) return;
  if (c.dataset.type === "verb") {
    document.querySelectorAll(".caixa-associacao").forEach(x => x.classList.remove("selecionada"));
    c.classList.add("selecionada");
    verboSelecionado = c;
  } else if (verboSelecionado) {
    const acertou = pares.some(p => p[0] === verboSelecionado.dataset.text && p[1] === c.dataset.text);
    if (acertou) {
      verboSelecionado.classList.add("correta");
      c.classList.add("correta");
      verboSelecionado.classList.remove("selecionada");
      verboSelecionado = null;
      pareados++;
      if (pareados === pares.length) {
        feedback.textContent = "🎉 Todos os pares corretos! Parabéns!";
        confetti({ particleCount: 180, spread: 70, origin: { y: 0.6 } });
      }
    } else {
      feedback.textContent = "❌ Esses dois não combinam. Tente de novo.";
    }
  }
}

// ----------------------
// CONTROLE DE TELAS
// ----------------------
function iniciarModo(fase, titulo) {
  document.querySelectorAll(".secao").forEach(s => s.classList.remove("ativa"));
  document.getElementById(fase).classList.add("ativa");
  document.getElementById("tituloJogo").textContent = "Semântica Verbal";
  document.getElementById("subtituloJogo").textContent = titulo;

  if (fase === "faseMultiplaEscolha") {
    indiceMultipla = 0;
    carregarPerguntaMultipla();
  }

  if (fase === "faseDigitacao") {
    indiceDigitacao = 0;
    carregarPerguntaDigitacao();
  }

  if (fase === "faseForca") {
    iniciarJogoForca();
  }

  if (fase === "faseAssociacao") {
    configurarJogoAssociacao();
  }
}

function voltarMenu(fase) {
  document.getElementById(fase).classList.remove("ativa");
  document.getElementById("menuPrincipal").classList.add("ativa");
}
