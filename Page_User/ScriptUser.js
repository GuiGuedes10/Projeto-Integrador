
    // Página do Aluno
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (usuarioLogado && window.location.pathname.includes('aluno.html')) {
        const saudacao = document.getElementById('saudacao');
        const primeiroNome = usuarioLogado.nome.split(' ')[0];
        saudacao.innerText = `Olá, ${primeiroNome}! Bem-vindo ao seu painel`;

        const entradaBtn = document.getElementById('registrarEntrada');
        const saidaBtn = document.getElementById('registrarSaida');
        const mensagemPermanencia = document.getElementById('mensagemPermanencia');
        let horarioEntrada;

        // Função para registrar a entrada do aluno
        entradaBtn.addEventListener('click', function() {
            horarioEntrada = new Date();
            entradaBtn.style.display = 'none';
            saidaBtn.style.display = 'block';
            mensagemPermanencia.innerText = `Entrada registrada às ${horarioEntrada.toLocaleTimeString()}`;
        });

        // Função para registrar a saída do aluno
        saidaBtn.addEventListener('click', function() {
            const horarioSaida = new Date();
            const tempoAcademia = (horarioSaida - horarioEntrada) / 1000 / 60; // em minutos
            entradaBtn.style.display = 'block';
            saidaBtn.style.display = 'none';

            // Armazena o tempo de permanência
            usuarioLogado.horarioEntrada = horarioEntrada;
            usuarioLogado.horarioSaida = horarioSaida;
            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));

            mensagemPermanencia.innerText = `Você ficou ${Math.floor(tempoAcademia)} minutos na academia.`;
        });

        // Exibe mensagem se houver registro de entrada anterior
        if (usuarioLogado.horarioEntrada && usuarioLogado.horarioSaida) {
            const entradaAnterior = new Date(usuarioLogado.horarioEntrada);
            const saidaAnterior = new Date(usuarioLogado.horarioSaida);
            const tempoAnterior = (saidaAnterior - entradaAnterior) / 1000 / 60;
            mensagemPermanencia.innerText = `Na última vez, você ficou ${Math.floor(tempoAnterior)} minutos na academia.`;
        }
    }

    // Função de logout
    const sairBtn = document.getElementById('sair');
    if (sairBtn) {
        sairBtn.addEventListener('click', function () {
            localStorage.removeItem('usuarioLogado');
            window.location.href = '../Home_Pagina/Home.html';
        });
    }

document.getElementById('registrarEntrada').addEventListener('click', function() {
    let countdownContainer = document.getElementById('countdownContainer');
    let countdownElement = document.getElementById('countdown');
    countdownContainer.style.display = 'flex';
    countdownElement.textContent = '3'; // Resetando o contador para 3 a cada clique
    let countdownTime = parseInt(countdownElement.textContent, 10);

    const intervalId = setInterval(() => {
        countdownTime--;
        countdownElement.textContent = countdownTime;

        if (countdownTime <= 0) {
            clearInterval(intervalId);
            countdownContainer.style.display = 'none'; // Esconder o contador
            registrarEntrada(); // Função para tratar o registro de entrada
        }
    }, 1000);
});

function registrarEntrada() {
    const horarioEntrada = new Date();
    document.getElementById('mensagemPermanencia').textContent = `Entrada registrada às ${horarioEntrada.toLocaleTimeString()}`;
    document.getElementById('registrarSaida').style.display = 'block';
    document.getElementById('registrarEntrada').style.display = 'none';
}
document.addEventListener('DOMContentLoaded', function() {
  const startBtn = document.getElementById('registrarEntrada');
  const endBtn = document.getElementById('registrarSaida');
  const timerDisplay = document.getElementById('mensagemPermanencia');

  let timer = null;
  let startTime;

  // Função para iniciar o contador
  startBtn.addEventListener('click', function() {
    if (timer) return; // Previne reinício se já está rodando
    startTime = new Date();
    timer = setInterval(function() {
      const now = new Date();
      const elapsed = new Date(now - startTime); // Diferença entre agora e o início
      const hours = elapsed.getUTCHours();
      const minutes = elapsed.getMinutes();
      const seconds = elapsed.getSeconds();
      timerDisplay.textContent = `Você está na academia há ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000); // Atualiza a cada segundo
    startBtn.style.display = 'none';
    endBtn.style.display = 'block';
  });

  // Função para parar o contador
  endBtn.addEventListener('click', function() {
    if (timer) {
      clearInterval(timer);
      timer = null;
      startBtn.style.display = 'block';
      endBtn.style.display = 'none';
    }
  });
});

