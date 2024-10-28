document.addEventListener('DOMContentLoaded', function () {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Função para validar CPF
    function validarCPF(cpf) {
        cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
        if (cpf.length !== 11) return false;

        let soma = 0;
        let resto;

        for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        resto = (soma * 10) % 11;
        if ((resto === 10) || (resto === 11)) resto = 0;
        if (resto !== parseInt(cpf.substring(9, 10))) return false;

        soma = 0;
        for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        resto = (soma * 10) % 11;
        if ((resto === 10) || (resto === 11)) resto = 0;
        if (resto !== parseInt(cpf.substring(10, 11))) return false;

        return true;
    }

    // Cadastro de Usuário
    const cadastroForm = document.getElementById('cadastroForm');
    if (cadastroForm) {
        cadastroForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const cpf = document.getElementById('cpf').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const errorMessage = document.getElementById('error-message');

            errorMessage.innerHTML = ''; // Limpa mensagens de erro anteriores

            if (password !== confirmPassword) {
                errorMessage.innerHTML = 'As senhas não coincidem!';
                return;
            }

            if (!validarCPF(cpf)) {
                errorMessage.innerHTML = 'CPF inválido!';
                return;
            }

            if (usuarios.some(u => u.email === email)) {
                errorMessage.innerHTML = 'Email já cadastrado!';
                return;
            }

            if (usuarios.some(u => u.cpf === cpf)) {
                errorMessage.innerHTML = 'CPF já cadastrado!';
                return;
            }

            const novoUsuario = { nome, email, cpf, login: password };
            usuarios.push(novoUsuario);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));

            alert('Cadastro realizado com sucesso!');
            window.location.href = 'index.html'; // Redireciona para a página de login
        });
    }

    // Login de Usuário
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const usuario = usuarios.find(u => u.email === email && u.login === password);

            if (usuario) {
                localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
                window.location.href = 'aluno.html';
            } else {
                alert('Email ou senha incorretos!');
            }
        });
    }

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
            window.location.href = 'index.html';
        });
    }
});
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

