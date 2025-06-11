    let respostaCorretaMultiplaEscolha = 1;
    let palavraCorretaDigitacao = "realizassem";
    let palavraCorretaBonus = "tivessechegado";
    let palavraForca = "tinhamosfechado";
    let palavraExibidaForca = Array(palavraForca.length).fill("_");
    let tentativasRestantes = 6;
    let letrasUsadas = [];

    const explicacoes = [
      "Essa opção está no pretérito imperfeito, indicando continuidade, não uma ação completa.",
      "Correto! Indica uma ação finalizada no passado.",
      "Condicional, não corresponde ao tempo passado afirmado.",
      "Presente do indicativo, não se encaixa com 'há 10 anos'."
    ];

    function iniciarModo(fase, titulo) {
      document.querySelectorAll(".secao").forEach(s => s.classList.remove("ativa"));
      const secao = document.getElementById(fase);
      if (secao) secao.classList.add("ativa");
      document.getElementById("tituloJogo").textContent = titulo;
      document.getElementById("subtituloJogo").textContent = "";
      if (fase === 'faseAssociacao') configurarJogoAssociacao();
      if (fase === 'faseForca') iniciarJogoForca(); 
    }

    function voltarMenu(atual) {
      document.getElementById(atual).classList.remove("ativa");
      document.getElementById("menuPrincipal").classList.add("ativa");
      document.getElementById("tituloJogo").textContent = "Semântica Verbal";
      document.getElementById("subtituloJogo").textContent = "Escolha um modo de desafio verbal:";
      if (atual === "faseForca") {
        palavraExibidaForca = Array(palavraForca.length).fill("_");
        tentativasRestantes = 6;
        letrasUsadas = [];
        document.getElementById("palavraForca").textContent = palavraExibidaForca.join(" ");
        document.getElementById("letrasUsadas").textContent = "-";
        document.getElementById("tentativasRestantes").textContent = tentativasRestantes;
        document.getElementById("feedbackForca").textContent = "";
        contextoForca.clearRect(0, 0, canvasForca.width, canvasForca.height); 
      }
    }

    function verificarRespostaMultipla(indice) {
      const feedback = document.getElementById("feedbackMultiplaEscolha");
      const aposResposta = document.getElementById("aposMultipla");
      for (let i = 0; i < 4; i++) {
        document.getElementById(`explicacao-${i}`).textContent = "";
      }
      document.getElementById(`explicacao-${indice}`).textContent = explicacoes[indice];
      if (indice === respostaCorretaMultiplaEscolha) {
        feedback.textContent = "✅ Acertou em cheio!";
        aposResposta.style.display = 'block';
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
      } else {
        feedback.textContent = "❌ Quase! Reflita sobre o tempo verbal.";
        aposResposta.style.display = 'none';
        confetti({ particleCount: 100, spread: 90, origin: { y: 0.7 }, colors: ['#ff0000', '#990000'] });
      }
    }

    function verificarRespostaDigitada() {
      const entrada = document.getElementById("respostaDigitada").value.trim().toLowerCase();
      const feedback = document.getElementById("feedbackDigitacao");
      if (entrada === palavraCorretaDigitacao) {
        feedback.textContent = "✅ Perfeito! Você entendeu o subjuntivo!";
      } else {
        feedback.textContent = "❌ Ainda não. Tente de novo!";
      }
    }

    // --- Funções do Jogo da Forca ---
        const canvasForca = document.getElementById("efeitoConfete");
    const contextoForca = canvasForca.getContext("2d");

    function desenharForcaBase() {
      contextoForca.lineWidth = 2;
      contextoForca.strokeStyle = '#333';
      contextoForca.clearRect(0, 0, canvasForca.width, canvasForca.height);

      // Nova escala e posição para o desenho caber melhor
      const escala = 0.3; // diminuiw o desenho
      const offsetX = 130; // mexi oro laod pra centralizar
      const offsetY = 29; // baixar um pouco

      // Base
      contextoForca.beginPath();
      contextoForca.moveTo( (10 * escala) + offsetX, (190 * escala) + offsetY);
      contextoForca.lineTo( (100 * escala) + offsetX, (190 * escala) + offsetY);
      contextoForca.stroke();

      // Poste vertical
      contextoForca.beginPath();
      contextoForca.moveTo( (50 * escala) + offsetX, (190 * escala) + offsetY);
      contextoForca.lineTo( (50 * escala) + offsetX, (10 * escala) + offsetY);
      contextoForca.stroke();

      // Poste horizontal
      contextoForca.beginPath();
      contextoForca.moveTo( (50 * escala) + offsetX, (10 * escala) + offsetY);
      contextoForca.lineTo( (100 * escala) + offsetX, (10 * escala) + offsetY);
      contextoForca.stroke();

      // Corda
      contextoForca.beginPath();
      contextoForca.moveTo( (100 * escala) + offsetX, (10 * escala) + offsetY);
      contextoForca.lineTo( (100 * escala) + offsetX, (30 * escala) + offsetY);
      contextoForca.stroke();
    }

    function desenharParteForca(etapa) {
      contextoForca.lineWidth = 2;
      contextoForca.strokeStyle = '#333';

      // Escala do boneco
      const escala = 0.3;
      const offsetX = 130;
      const offsetY = 29;

      // Coordenadas centrais do boneco (ajustadas pela escala e offset)
      const bonecoCentroX = (100 * escala) + offsetX;
      const bonecoTopoY = (50 * escala) + offsetY;

      switch (etapa) {
        case 5: // Cabeça
          contextoForca.beginPath();
          contextoForca.arc(bonecoCentroX, bonecoTopoY, (20 * escala), 0, Math.PI * 2);
          contextoForca.stroke();
          break;
        case 4: // Corpo
          contextoForca.beginPath();
          contextoForca.moveTo(bonecoCentroX, bonecoTopoY + (20 * escala));
          contextoForca.lineTo(bonecoCentroX, bonecoTopoY + (80 * escala));
          contextoForca.stroke();
          break;
        case 3: // Braço esquerdo
          contextoForca.beginPath();
          contextoForca.moveTo(bonecoCentroX, bonecoTopoY + (30 * escala));
          contextoForca.lineTo(bonecoCentroX - (30 * escala), bonecoTopoY + (60 * escala));
          contextoForca.stroke();
          break;
        case 2: // Braço direito
          contextoForca.beginPath();
          contextoForca.moveTo(bonecoCentroX, bonecoTopoY + (30 * escala));
          contextoForca.lineTo(bonecoCentroX + (30 * escala), bonecoTopoY + (60 * escala));
          contextoForca.stroke();
          break;
        case 1: // Perna esquerda
          contextoForca.beginPath();
          contextoForca.moveTo(bonecoCentroX, bonecoTopoY + (80 * escala));
          contextoForca.lineTo(bonecoCentroX - (20 * escala), bonecoTopoY + (130 * escala));
          contextoForca.stroke();
          break;
        case 0: // Perna direita
          contextoForca.beginPath();
          contextoForca.moveTo(bonecoCentroX, bonecoTopoY + (80 * escala));
          contextoForca.lineTo(bonecoCentroX + (20 * escala), bonecoTopoY + (130 * escala));
          contextoForca.stroke();
          break;
      }
    }


    function iniciarJogoForca() {
      
      palavraExibidaForca = Array(palavraForca.length).fill("_");
      tentativasRestantes = 6;
      letrasUsadas = [];
      document.getElementById("palavraForca").textContent = palavraExibidaForca.join(" ");
      document.getElementById("letrasUsadas").textContent = "-";
      document.getElementById("tentativasRestantes").textContent = tentativasRestantes;
      document.getElementById("feedbackForca").textContent = "";
      document.getElementById("entradaLetra").value = ""; 

      desenharForcaBase(); 
    }


    function adivinharLetra() {
      const elementoEntrada = document.getElementById("entradaLetra");
      const letra = elementoEntrada.value.toLowerCase();
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
      elementoEntrada.value = "";

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

    // --- Funções do Jogo de Associação (4x4) ---
    const pares = [
      ["chegara", "Quando ele ______, todos já tinham partido."],
      ["teria falado", "Ela ______ se tivesse tido coragem."],
      ["havíamos vencido", "Nós ______ a batalha antes do reforço chegar."],
      ["fossem", "Era necessário que eles ______ mais cuidadosos."]
    ];

    let verboSelecionado = null;
    let pareados = 0;

    function configurarJogoAssociacao() {
      const grade = document.getElementById("gradeAssociacao");
      const feedback = document.getElementById("feedbackAssociacao");
      feedback.textContent = "";
      pareados = 0;
      verboSelecionado = null;

      let verbos = pares.map(p => p[0]);
      let frases = pares.map(p => p[1]);

      const todosItens = [
        ...verbos.map(v => ({ type: "verb", text: v })),
        ...frases.map(f => ({ type: "phrase", text: f }))
      ];

      todosItens.sort(() => Math.random() - 0.5);

      grade.innerHTML = "";
      todosItens.forEach(item => {
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
      const caixa = e.currentTarget;
      if (caixa.classList.contains("correta")) return;

      if (caixa.dataset.type === "verb") {
        document.querySelectorAll(".caixa-associacao").forEach(b => b.classList.remove("selecionada"));
        caixa.classList.add("selecionada");
        verboSelecionado = caixa;
      } else if (caixa.dataset.type === "phrase" && verboSelecionado) {
        const verbo = verboSelecionado.dataset.text;
        const frase = caixa.dataset.text;
        const estaCorreto = pares.some(p => p[0] === verbo && p[1] === frase);

        if (estaCorreto) {
          verboSelecionado.classList.add("correta");
          caixa.classList.add("correta");
          verboSelecionado.classList.remove("selecionada");
          verboSelecionado = null;
          pareados++;
          if (pareados === 4) {
            document.getElementById("feedbackAssociacao").textContent = "🎉 Todos os pares corretos! Parabéns!";
            confetti({ particleCount: 180, spread: 70, origin: { y: 0.6 } });
          }
        } else {
          document.getElementById("feedbackAssociacao").textContent = "❌ Esses dois não combinam. Tente de novo.";
        }
      }
    }
