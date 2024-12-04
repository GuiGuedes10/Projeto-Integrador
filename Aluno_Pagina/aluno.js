/* aluno.js */
// **Estrutura de Dados Globais**
const aluno = {
    nome: '',
    email: '',
    metaSemanal: '', // Meta em horas
    horasTreinadasSemana: '',
    historicoSemanal: '', // Segunda a Domingo
    meusTreinos: [
        {
            nome: 'Treino A',
            exercicios: [
                { nome: 'Supino Reto', series: 3, repeticoes: 12, peso: 50 },
                { nome: 'Agachamento Livre', series: 4, repeticoes: 10, peso: 60 },
                { nome: 'Rosca Direta', series: 3, repeticoes: 15, peso: 20 }
            ]
        },
        {
            nome: 'Treino B',
            exercicios: [
                { nome: 'Leg Press', series: 4, repeticoes: 10, peso: 80 },
                { nome: 'Desenvolvimento Militar', series: 3, repeticoes: 12, peso: 30 },
                { nome: 'Flexão de Braço', series: 3, repeticoes: 15, peso: 0 }
            ]
        }
        // ... outros treinos
    ],
    treinoAtual: null, // Treino em andamento
    entradaAcademia: null // Hora de entrada na academia
};

document.addEventListener('DOMContentLoaded', async () => {


    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('id');
    const UserMessage = document.getElementById("UserGoal")
    const UserHoursMessage = document.getElementById("UserHours")

    if(!token || !userId){
    window.location.href = '../Home_Pagina/Home.html'; 
    }

    try {
        const url = "http://localhost:3000/Get_user";
        await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            },
            body: JSON.stringify({ UserId: userId })
        })
            .then(async (response) => {
                if (response.ok) return await response.json()
                else console.error('Erro ao buscar usuário.')
            })
            .then(data => {
                aluno.nome = data.Name;
                aluno.email = data.Email;


            })
    }
    catch (err) {
        console.log(err);
    }

    try {

        const url = "http://localhost:3000/get_goal_of_user";
        await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            },
            body: JSON.stringify({ Userid: userId })
        })
            .then(async (response) => {
                if (response.ok) return await response.json()
                else console.error('Erro ao buscar usuário.')
            })
            .then(data => {
                aluno.metaSemanal = data.weeklyHours;
                UserMessage.innerHTML = data.weeklyHours + " horas";
            })
    }
    catch (err) {
        console.log(err);
        aluno.metaSemanal = 4;
        UserMessage.innerHTML = aluno.metaSemanal + " horas";
    }

    try {

        const url = "http://localhost:3000/get_Week_Of_User";
        await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            },
            body: JSON.stringify({ userId: userId })
        })
            .then(async (response) => {
                if (response.ok) return await response.json()
                else console.error('Erro ao buscar usuário.')
            })
            .then((data) => {
                aluno.horasTreinadasSemana = calculateTotalHours(data);
                UserHoursMessage.innerHTML = aluno.horasTreinadasSemana + " horas"
            })
    }
    catch (err) {
        console.log(err);
        UserHoursMessage.innerHTML = 0 + " horas"
    }

    LoadPage()
})

function calculateTotalHours(data) {
    var totalMilliseconds = 0;

    for (let index = 0; index < data.length; index++) {
        totalMilliseconds += data[index].duration;
    }

    const h = Math.floor(totalMilliseconds/1000/60/60);

    return h
}


function LoadPage() {
    // **Elementos do DOM**
    const elementos = {
        // **Perfil e Meta**
        nomeAluno: document.getElementById('nomeAluno'),
        perfilNome: document.getElementById('perfilNome'),
        perfilEmail: document.getElementById('perfilEmail'),
        horasSemana: document.getElementById('horasSemana'),
        metaProgresso: document.getElementById('metaProgresso'),
        barraProgresso: document.getElementById('barraProgresso'),
        // **Timer e Treino**
        tempoTreino: document.getElementById('tempoTreino'),
        botaoIniciarTreino: document.getElementById('botaoIniciarTreino'),
        // **Modal de Montar Treino**
        btnMontarTreino: document.getElementById('btnMontarTreino'),
        notificacao: document.getElementById('notificacao'),
        // **Modais**
        modais: {
            meta: document.getElementById('modalMeta'),
            perfil: document.getElementById('modalPerfil'),
            treino: document.getElementById('modalTreino'),
            meusTreinos: document.getElementById('modalMeusTreinos'),
            historicoTreinos: document.getElementById('modalHistoricoTreinos'),
            dicasTreino: document.getElementById('modalDicasTreino'),
            escolherTreino: document.getElementById('modalEscolherTreino'),
            confirmarInicio: document.getElementById('modalConfirmarInicio'),
            countdown: document.getElementById('modalCountdown'),
            exercicios: document.getElementById('modalExercicios'),
            entrada: document.getElementById('modalEntrada'),
            saida: document.getElementById('modalSaida')
        },
        // **Botões de Fechamento dos Modais**
        fecharModais: {
            meta: document.getElementById('fecharModalMeta'),
            perfil: document.getElementById('fecharModalPerfil'),
            treino: document.getElementById('fecharModalTreino'),
            meusTreinos: document.getElementById('fecharModalMeusTreinos'),
            historicoTreinos: document.getElementById('fecharModalHistoricoTreinos'),
            dicasTreino: document.getElementById('fecharModalDicasTreino'),
            escolherTreino: document.getElementById('fecharModalEscolherTreino'),
            confirmarInicio: document.getElementById('fecharModalConfirmarInicio'),
            exercicios: document.getElementById('fecharModalExercicios'),
            entrada: document.getElementById('fecharModalEntrada'),
            saida: document.getElementById('fecharModalSaida')
        },
        // **Campos e Botões nos Modais**
        metaSlider: document.getElementById('metaSlider'),
        valorMeta: document.getElementById('valorMeta'),
        salvarMeta: document.getElementById('salvarMeta'),
        salvarPerfil: document.getElementById('salvarPerfil'),
        uploadFoto: document.getElementById('uploadFoto'),
        imgPerfil: document.getElementById('imgPerfil'),
        nomeTreino: document.getElementById('nomeTreino'),
        exerciciosDisponiveis: document.getElementById('exerciciosDisponiveis'),
        meuTreino: document.getElementById('meuTreino'),
        salvarTreinoBtn: document.getElementById('salvarTreino'),
        listaMeusTreinos: document.getElementById('listaMeusTreinos'),
        listaHistoricoTreinos: document.getElementById('listaHistoricoTreinos'),
        conteudoDicasTreino: document.getElementById('conteudoDicasTreino'),
        listaTreinosParaEscolher: document.getElementById('listaTreinosParaEscolher'),
        confirmarInicioBtn: document.getElementById('confirmarInicio'),
        cancelarInicio: document.getElementById('cancelarInicio'),
        nomeTreinoConfirmacao: document.getElementById('nomeTreinoConfirmacao'),
        contadorCountdown: document.getElementById('countdownNumber'),
        nomeTreinoAtual: document.getElementById('nomeTreinoAtual'),
        barraProgressoExercicios: document.getElementById('barraProgressoExercicios'),
        percentualProgressoExercicios: document.getElementById('percentualProgressoExercicios'),
        listaExerciciosTreino: document.getElementById('listaExerciciosTreino'),
        classificacaoAluno: document.getElementById('classificacaoAluno')
    };

    function GetDefaultExercise(data){
        elementos.exerciciosDisponiveis.innerHTML = '';
        
        
        for(let index = 0; index < data.length; index++){
            const li = document.createElement('li');
    
            const nomeExercicio = document.createElement('span');
            nomeExercicio.textContent = data[index].Name;
            
            console.log(nomeExercicio);
    
            // Botão "Adicionar"
            const btnAdicionar = document.createElement('button');
            btnAdicionar.textContent = 'Adicionar';
            btnAdicionar.classList.add('btn-acao');
            btnAdicionar.setAttribute('aria-label', `Adicionar ${data[index].Name} ao treino`);
            btnAdicionar.addEventListener('click', () => {
                adicionarExercicioAoTreino(data, data[index].Default_Series,data[index].Default_Repetitions ,data[index].Default_Weight);
            });
    
            li.appendChild(nomeExercicio);
            li.appendChild(btnAdicionar);
            elementos.exerciciosDisponiveis.appendChild(li);
        }
        
    }
    
    // **Variáveis de Controle**
    let treinoIniciado = false;
    let startTime;
    let timerInterval;
    let countdownInterval;
    const tempoInicioExercicios = new Map();

    // **Função para Mostrar Notificações**
    function mostrarNotificacao(mensagem) {
        elementos.notificacao.textContent = mensagem;
        elementos.notificacao.classList.add('show');
        elementos.notificacao.setAttribute('aria-live', 'assertive');
        setTimeout(() => {
            elementos.notificacao.classList.remove('show');
            elementos.notificacao.removeAttribute('aria-live');
        }, 5000); // 5 segundos
    }

    // **Função para Salvar Meta Semanal**
    function salvarNovaMeta() {
        const novaMeta = document.getElementById("inputMeta").value;
        console.log(novaMeta);
        if (isNaN(novaMeta) || novaMeta < 1) {
            mostrarNotificacao('Por favor, insira um valor válido para a meta.');
            return;
        }
        mostrarNotificacao('Meta semanal atualizada com sucesso!');
        fecharModal(elementos.modais.meta);
        salvarMetaNoBackEnd(novaMeta);
        atualizarDados();
    }

    // **Função para Salvar Meta no localStorage**
    async function salvarMetaNoBackEnd(novaMeta) {
        console.log(novaMeta);
        const token = sessionStorage.getItem('token');
        const userId = sessionStorage.getItem('id');

        const UserMessage = document.getElementById("UserGoal")
        try {
            const url = "http://localhost:3000/define-user-goal";
            await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token
                },
                body: JSON.stringify({ Userid: userId, Hours: novaMeta })
            })
                .then(async (response) => {
                    if (response.ok) return await response.json()
                    else console.error('Erro ao buscar usuário.')
                })
                .then(data => {
                    aluno.metaSemanal = data.weeklyHours;
                    UserMessage.innerHTML = data.weeklyHours + " horas";
                    location.reload();
                })
        }
        catch (err) {
            console.log(err);
            console.log(userId);
        }
    }

    // **Função para Calcular Classificação**
    function calcularClassificacao(horas) {
        if (horas <= 5) {
            return 'Iniciante';
        } else if (horas <= 10) {
            return 'Intermediário';
        } else if (horas <= 20) {
            return 'Avançado';
        } else {
            return 'Extremamente Avançado';
        }
    }

    // **Função para Atualizar Dados Iniciais**
    function atualizarDados() {
        // Atualizar Horas treinadas na semana

        // Atualizar Progresso da Meta
        const progressoMeta = (aluno.horasTreinadasSemana / aluno.metaSemanal) * 100;
        elementos.metaProgresso.textContent = `${Math.round(progressoMeta)}%`;
        elementos.barraProgresso.style.width = `${progressoMeta}%`;

        // Atualizar Classificação
        const classificacao = calcularClassificacao(aluno.horasTreinadasSemana);
        elementos.classificacaoAluno.textContent = classificacao;
    }

    // **Inicialização do Gráfico de Progresso**

    // **Atualizar informações iniciais**
    elementos.nomeAluno.textContent = aluno.nome;
    elementos.perfilNome.value = aluno.nome;
    elementos.perfilEmail.value = aluno.email;
    atualizarDados();

    // **Função para Salvar Perfil**
    function salvarPerfil() {
        const novoNome = elementos.perfilNome.value.trim();
        const novoEmail = elementos.perfilEmail.value.trim();

        if (novoNome === '' || novoEmail === '') {
            mostrarNotificacao('Por favor, preencha todos os campos do perfil.');
            return;
        }

        aluno.nome = novoNome;
        aluno.email = novoEmail;
        elementos.nomeAluno.textContent = aluno.nome;
        fecharModal(elementos.modais.perfil);
        mostrarNotificacao('Perfil atualizado com sucesso!');

        // Salvar no localStorage
        localStorage.setItem('perfilNome', novoNome);
        localStorage.setItem('perfilEmail', novoEmail);
    }

    // **Upload de Foto de Perfil**
    function uploadFotoPerfil(e) {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => {
                elementos.imgPerfil.src = reader.result;
                mostrarNotificacao('Foto de perfil atualizada!');
                // Salvar foto no localStorage
                localStorage.setItem('perfilFoto', reader.result);
            }
            reader.readAsDataURL(file);
        } else {
            mostrarNotificacao('Por favor, selecione uma imagem válida.');
        }
    }

    // **Função para Salvar Treinos no localStorage**
    function salvarTreinos() {
        localStorage.setItem('meusTreinos', JSON.stringify(aluno.meusTreinos));
    }

    // **Função para Salvar Histórico no localStorage**
    function salvarHistorico() {
        localStorage.setItem('historicoSemanal', JSON.stringify(aluno.historicoSemanal));
    }

    // **Função para Abrir Modal**
    function abrirModal(modal) {
        modal.style.display = 'block';
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Evita scroll na página principal
    }

    // **Função para Fechar Modal**
    function fecharModal(modal) {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto'; // Habilita scroll na página principal
    }

    // **Adicionar Eventos de Fechamento nos Modais**
    Object.keys(elementos.fecharModais).forEach(key => {
        const fecharBtn = elementos.fecharModais[key];
        if (fecharBtn) {
            fecharBtn.addEventListener('click', () => {
                fecharModal(elementos.modais[key]);
            });
        }
    });

    // **Fechar Modais ao Clicar Fora do Conteúdo**
    window.addEventListener('click', (e) => {
        Object.keys(elementos.modais).forEach(key => {
            const modal = elementos.modais[key];
            if (e.target === modal) {
                fecharModal(modal);
            }
        });
    });

    // **Event Listener para Salvar Meta Semanal**
    elementos.salvarMeta.addEventListener('click', salvarNovaMeta);

    // **Event Listener para Salvar Perfil**
    elementos.salvarPerfil.addEventListener('click', salvarPerfil);

    // **Event Listener para Upload de Foto de Perfil**
    elementos.uploadFoto.addEventListener('change', uploadFotoPerfil);

    // **Event Listener para Abrir Modal de Perfil**
    document.getElementById('perfilBtn').addEventListener('click', () => {
        abrirModal(elementos.modais.perfil);
    });

    // **Event Listener para Logout (Sair)**
    document.getElementById('sair').addEventListener('click', (e) => {
        e.preventDefault();
        // Implementar lógica de logout, redirecionamento, etc.
        mostrarNotificacao('Logout realizado com sucesso!');
        // Exemplo: redirecionar para página de login após 1.5 segundos
        setTimeout(() => {
            window.location.href = '../Home_Pagina/Home.html'; // Atualize para a URL correta
        }, 1500);
    });

    // **Função para Renderizar Exercícios Disponíveis no Modal de Montar Treino**
    // **Função para Adicionar Exercício Ao Treino**
    function adicionarExercicioAoTreino(exercicio, series, Weight, Repetitions) {
       
        const li = document.createElement('li');

        const nomeDiv = document.createElement('div');
        nomeDiv.classList.add('exercicio-nome');
        nomeDiv.textContent = exercicio.nome;

        const detalhesDiv = document.createElement('div');
        detalhesDiv.classList.add('exercicio-detalhes');

        detalhesDiv.innerHTML = `
            <label>Séries:
                <input type="number" min="1" value="${series}" aria-label="Séries">
            </label>
            <label>Repetições:
                <input type="number" min="1" value="${Weight}" aria-label="Peso">
            </label>
            <label>Peso (kg):
                <input type="number" min="0" value="${Repetitions}" aria-label="Repetições">
            </label>
        `;

        const acoesDiv = document.createElement('div');
        acoesDiv.classList.add('exercicio-acoes');

        const btnRemover = document.createElement('button');
        btnRemover.textContent = 'Remover';
        btnRemover.classList.add('btn-acao');
        btnRemover.setAttribute('aria-label', `Remover ${exercicio.nome}`);
        btnRemover.addEventListener('click', () => {
            li.remove();
        });

        acoesDiv.appendChild(btnRemover);

        li.appendChild(nomeDiv);
        li.appendChild(detalhesDiv);
        li.appendChild(acoesDiv);

        elementos.meuTreino.appendChild(li);
    }

    // **Função para Configurar Drag and Drop no Modal de Montar Treino**
    function configurarDragAndDropModalTreino() {
        // Configurar drag and drop para "Meu Treino"
        elementos.meuTreino.addEventListener('dragover', (e) => {
            e.preventDefault();
            elementos.meuTreino.classList.add('drag-over');
            e.dataTransfer.dropEffect = 'copy';
        });

        elementos.meuTreino.addEventListener('dragleave', () => {
            elementos.meuTreino.classList.remove('drag-over');
        });

        elementos.meuTreino.addEventListener('drop', (e) => {
            e.preventDefault();
            elementos.meuTreino.classList.remove('drag-over');
            const data = e.dataTransfer.getData('text/plain');
            const exercicio = JSON.parse(data);
            adicionarExercicioAoTreino(exercicio);
        });
    }

    // **Função para Salvar Treino Personalizado**
    function salvarTreinoPersonalizado() {
        const nomeTreinoInput = elementos.nomeTreino.value.trim();
        if (nomeTreinoInput === '') {
            mostrarNotificacao('Por favor, insira um nome para o treino.');
            return;
        }

        const exercicios = [];
        elementos.meuTreino.querySelectorAll('li').forEach(li => {
            const nome = li.querySelector('.exercicio-nome').textContent;
            const inputs = li.querySelectorAll('.exercicio-detalhes input');
            const series = parseInt(inputs[0].value);
            const repeticoes = parseInt(inputs[1].value);
            const peso = parseFloat(inputs[2].value);

            // Validação simples
            if (isNaN(series) || isNaN(repeticoes) || isNaN(peso)) {
                mostrarNotificacao(`Por favor, preencha corretamente os campos do exercício "${nome}".`);
                return;
            }

            exercicios.push({
                nome: nome,
                series: series,
                repeticoes: repeticoes,
                peso: peso
            });
        });

        if (exercicios.length === 0) {
            mostrarNotificacao('Por favor, adicione exercícios ao treino.');
            return;
        }

        // Verificar se já existe um treino com o mesmo nome
        const existe = aluno.meusTreinos.some(treino => treino.nome.toLowerCase() === nomeTreinoInput.toLowerCase());
        if (existe) {
            mostrarNotificacao('Já existe um treino com este nome. Por favor, escolha outro nome.');
            return;
        }

        const novoTreino = {
            nome: nomeTreinoInput,
            exercicios: exercicios
        };

        aluno.meusTreinos.push(novoTreino);
        mostrarNotificacao('Treino salvo com sucesso!');
        fecharModal(elementos.modais.treino);
        elementos.nomeTreino.value = '';
        elementos.meuTreino.innerHTML = '';

        // Salvar dados atualizados
        salvarTreinos();
        carregarMeusTreinos(); // Atualiza a lista de treinos salvos
    }

    // **Função para Carregar Meus Treinos no Modal**
    function carregarMeusTreinos() {
        elementos.listaMeusTreinos.innerHTML = '';

        if (aluno.meusTreinos.length === 0) {
            elementos.listaMeusTreinos.innerHTML = '<p>Você ainda não montou nenhum treino.</p>';
            return;
        }

        aluno.meusTreinos.forEach((treino, index) => {
            const treinoDiv = document.createElement('div');
            treinoDiv.classList.add('treino-salvo');

            const tituloTreino = document.createElement('h3');
            tituloTreino.textContent = treino.nome;

            const listaExercicios = document.createElement('ul');

            treino.exercicios.forEach(exercicio => {
                const li = document.createElement('li');
                li.textContent = `${exercicio.nome} - ${exercicio.series} séries x ${exercicio.repeticoes} reps (${exercicio.peso} kg)`;
                listaExercicios.appendChild(li);
            });

            const acoesDiv = document.createElement('div');
            acoesDiv.classList.add('acoes-treino');

            const btnEditar = document.createElement('button');
            btnEditar.textContent = 'Editar';
            btnEditar.classList.add('btn-acao');
            btnEditar.setAttribute('aria-label', `Editar ${treino.nome}`);
            btnEditar.addEventListener('click', () => {
                editarTreino(index);
            });

            const btnExcluir = document.createElement('button');
            btnExcluir.textContent = 'Excluir';
            btnExcluir.classList.add('btn-acao');
            btnExcluir.setAttribute('aria-label', `Excluir ${treino.nome}`);
            btnExcluir.addEventListener('click', () => {
                excluirTreino(index);
            });

            acoesDiv.appendChild(btnEditar);
            acoesDiv.appendChild(btnExcluir);

            treinoDiv.appendChild(tituloTreino);
            treinoDiv.appendChild(listaExercicios);
            treinoDiv.appendChild(acoesDiv);

            elementos.listaMeusTreinos.appendChild(treinoDiv);
        });
    }

    // **Função para Editar Treino**
    function editarTreino(index) {
        const treinoParaEditar = aluno.meusTreinos[index];
        elementos.nomeTreino.value = treinoParaEditar.nome;

        // Limpar a lista de treino atual
        elementos.meuTreino.innerHTML = '';

        // Adicionar os exercícios do treino selecionado
        treinoParaEditar.exercicios.forEach(exercicio => {
            adicionarExercicioAoTreino(exercicio);
        });

        // Remover o treino da lista antes de editar para evitar duplicação
        aluno.meusTreinos.splice(index, 1);
        salvarTreinos();
        carregarMeusTreinos();

        abrirModal(elementos.modais.treino);
    }

    // **Função para Excluir Treino**
    function excluirTreino(index) {
        if (confirm('Tem certeza que deseja excluir este treino?')) {
            aluno.meusTreinos.splice(index, 1);
            carregarMeusTreinos();
            mostrarNotificacao('Treino excluído com sucesso.');
            salvarTreinos();
        }
    }
    // **Função para Carregar Dicas de Treino**
    function carregarDicasTreino() {
        elementos.conteudoDicasTreino.innerHTML = '';

        const dicas = [
            'Mantenha-se hidratado durante os treinos.',
            'Faça alongamentos antes e depois dos exercícios.',
            'Aumente gradualmente a intensidade dos treinos.',
            'Varie os exercícios para evitar platôs.',
            'Descanse adequadamente entre as séries.',
            'Alimente-se bem para otimizar os resultados.'
        ];

        dicas.forEach(dica => {
            const p = document.createElement('p');
            p.textContent = dica;
            elementos.conteudoDicasTreino.appendChild(p);
        });
    }

    // **Função para Carregar Treinos Disponíveis no Modal de Escolha**
    function carregarTreinosDisponiveis() {
        elementos.listaTreinosParaEscolher.innerHTML = '';

        if (aluno.meusTreinos.length === 0) {
            elementos.listaTreinosParaEscolher.innerHTML = '<p>Você ainda não montou nenhum treino.</p>';
            return;
        }

        aluno.meusTreinos.forEach((treino, index) => {
            const treinoDiv = document.createElement('div');
            treinoDiv.classList.add('treino-salvo');

            const tituloTreino = document.createElement('h3');
            tituloTreino.textContent = treino.nome;

            const listaExercicios = document.createElement('ul');

            treino.exercicios.forEach(exercicio => {
                const li = document.createElement('li');
                li.textContent = `${exercicio.nome} - ${exercicio.series} séries x ${exercicio.repeticoes} reps (${exercicio.peso} kg)`;
                listaExercicios.appendChild(li);
            });

            const btnSelecionar = document.createElement('button');
            btnSelecionar.textContent = 'Selecionar';
            btnSelecionar.classList.add('btn-acao');
            btnSelecionar.setAttribute('aria-label', `Selecionar ${treino.nome}`);
            btnSelecionar.addEventListener('click', () => {
                aluno.treinoAtual = JSON.parse(JSON.stringify(treino)); // Clonar o treino
                fecharModal(elementos.modais.escolherTreino);
                confirmarInicioTreino();
            });

            treinoDiv.appendChild(tituloTreino);
            treinoDiv.appendChild(listaExercicios);
            treinoDiv.appendChild(btnSelecionar);

            elementos.listaTreinosParaEscolher.appendChild(treinoDiv);
        });
    }

    // **Função para Confirmar Início de Treino**
    function confirmarInicioTreino() {
        elementos.nomeTreinoConfirmacao.textContent = aluno.treinoAtual.nome;
        abrirModal(elementos.modais.confirmarInicio);
    }

    // **Função para Iniciar Contagem Regressiva**
    function iniciarContagemRegressiva() {
        fecharModal(elementos.modais.confirmarInicio);
        abrirModal(elementos.modais.countdown);
        elementos.contadorCountdown.textContent = '5';

        let tempo = 5; // segundos

        countdownInterval = setInterval(() => {
            tempo--;
            elementos.contadorCountdown.textContent = tempo;
            if (tempo <= 0) {
                clearInterval(countdownInterval);
                fecharModal(elementos.modais.countdown);
                iniciarTreino();
            }
        }, 1000);
    }

    // **Função para Iniciar Treino**
    function iniciarTreino() {
        treinoIniciado = true;
        elementos.botaoIniciarTreino.textContent = 'Encerrar Treino';
        startTime = new Date();
        timerInterval = setInterval(atualizarContador, 1000);
        mostrarNotificacao('Treino iniciado! Bom treino!');
        abrirModalExercicios();
    }

    // **Função para Atualizar Contador**
    function atualizarContador() {
        if (!elementos.tempoTreino) {
            console.error('Elemento com id "tempoTreino" não encontrado no DOM.');
            return;
        }
        const now = new Date();
        const elapsedTimeMs = now - startTime;
        const horas = String(Math.floor(elapsedTimeMs / 3600000)).padStart(2, '0');
        const minutos = String(Math.floor((elapsedTimeMs % 3600000) / 60000)).padStart(2, '0');
        const segundos = String(Math.floor((elapsedTimeMs % 60000) / 1000)).padStart(2, '0');
        elementos.tempoTreino.textContent = `${horas}:${minutos}:${segundos}`;
    }

    // **Função para Abrir o Modal de Exercícios em Andamento**
    function abrirModalExercicios() {
        abrirModal(elementos.modais.exercicios);
        renderExerciciosParaConcluir();
        elementos.nomeTreinoAtual.textContent = aluno.treinoAtual.nome;
        elementos.barraProgressoExercicios.style.width = '0%';
        elementos.percentualProgressoExercicios.textContent = '0% Concluído';
        elementos.contadorCountdown.textContent = '00:00:00';
        timerInterval = setInterval(atualizarContadorModal, 1000);
    }

    // **Função para Renderizar Exercícios no Modal de Exercícios**
    function renderExerciciosParaConcluir() {
        elementos.listaExerciciosTreino.innerHTML = '';

        aluno.treinoAtual.exercicios.forEach((exercicio, index) => {
            const li = document.createElement('li');
            li.classList.add('exercicio-item');

            const checkboxContainer = document.createElement('div');
            checkboxContainer.classList.add('checkbox-container');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `exercicio-${index}`;
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    li.classList.add('exercicio-concluido');
                    atualizarBarraProgressoExercicios();
                    verificarTreinoConcluido();

                    // Calcular e Exibir Tempo para Concluir
                    const tempoInicio = tempoInicioExercicios.get(index);
                    const tempoFim = new Date();
                    const tempoTotalMs = tempoFim - tempoInicio; // em milissegundos

                    const horas = String(Math.floor(tempoTotalMs / 3600000)).padStart(2, '0');
                    const minutos = String(Math.floor((tempoTotalMs % 3600000) / 60000)).padStart(2, '0');
                    const segundos = String(Math.floor((tempoTotalMs % 60000) / 1000)).padStart(2, '0');

                    mostrarNotificacao(`Você levou ${horas}:${minutos}:${segundos} para concluir ${exercicio.nome}.`);
                } else {
                    li.classList.remove('exercicio-concluido');
                    atualizarBarraProgressoExercicios();

                    // Resetar o tempo de início caso a checkbox seja desmarcada
                    tempoInicioExercicios.delete(index);
                }
            });

            const nomeExercicio = document.createElement('p');
            nomeExercicio.textContent = `${exercicio.nome} - ${exercicio.series} séries x ${exercicio.repeticoes} reps (${exercicio.peso} kg)`;

            checkboxContainer.appendChild(checkbox);

            li.appendChild(checkboxContainer);
            li.appendChild(nomeExercicio);

            elementos.listaExerciciosTreino.appendChild(li);

            // Registrar o tempo de início do exercício
            tempoInicioExercicios.set(index, new Date());
        });

        atualizarBarraProgressoExercicios();
    }

    // **Função para Atualizar Barra de Progresso dos Exercícios**
    function atualizarBarraProgressoExercicios() {
        const exerciciosConcluidos = document.querySelectorAll('#listaExerciciosTreino li.exercicio-concluido').length;
        const totalExercicios = aluno.treinoAtual.exercicios.length;
        const percentual = totalExercicios === 0 ? 0 : (exerciciosConcluidos / totalExercicios) * 100;

        elementos.barraProgressoExercicios.style.width = `${percentual}%`;
        elementos.percentualProgressoExercicios.textContent = `${Math.round(percentual)}% Concluído`;
    }

    // **Função para Verificar se o Treino foi Concluído**
    function verificarTreinoConcluido() {
        const exerciciosRestantes = document.querySelectorAll('#listaExerciciosTreino li:not(.exercicio-concluido)');
        if (exerciciosRestantes.length === 0) {
            mostrarNotificacao('Parabéns! Você concluiu todos os exercícios do treino.');
            encerrarTreino();
        }
    }

    // **Função para Atualizar Contador no Modal de Exercícios**
    function atualizarContadorModal() {
        const now = new Date();
        const elapsedTimeMs = now - startTime;
        const horas = String(Math.floor(elapsedTimeMs / 3600000)).padStart(2, '0');
        const minutos = String(Math.floor((elapsedTimeMs % 3600000) / 60000)).padStart(2, '0');
        const segundos = String(Math.floor((elapsedTimeMs % 60000) / 1000)).padStart(2, '0');
        elementos.contadorCountdown.textContent = `${horas}:${minutos}:${segundos}`;
    }

    // **Função para Encerrar Treino**
    function encerrarTreino() {
        treinoIniciado = false;
        elementos.botaoIniciarTreino.textContent = 'Iniciar Treino';
        clearInterval(timerInterval);
        clearInterval(countdownInterval);
        const now = new Date();
        const elapsedTime = (now - startTime) / (1000 * 60 * 60); // em horas
        aluno.horasTreinadasSemana += elapsedTime;

        // Atualizar histórico
        const diaSemanaHoje = new Date().getDay(); // 0 (Dom) a 6 (Sáb)
        const indexDia = diaSemanaHoje === 0 ? 6 : diaSemanaHoje - 1;
        aluno.historicoSemanal[indexDia] += elapsedTime;

        // Remover modal de exercícios
        fecharModal(elementos.modais.exercicios);

        atualizarDados();
        mostrarNotificacao('Treino concluído! Bom trabalho!');
        aluno.treinoAtual = null;

        // Salvar dados atualizados
        salvarTreinos();
        salvarHistorico();
    }

    // **Função para Iniciar o Fluxo de Treino**
    function iniciarFluxoTreino() {
        abrirModal(elementos.modais.escolherTreino);
        carregarTreinosDisponiveis();
    }

    // **Função para Salvar Treino Personalizado**
    function salvarTreinoPersonalizadoFinal() {
        salvarTreinoPersonalizado();
    }

    // **Event Listener para Salvar Treino Personalizado**
    elementos.salvarTreinoBtn.addEventListener('click', salvarTreinoPersonalizadoFinal);

    // **Função para Carregar Meus Treinos no Modal**
    function carregarMeusTreinosFinal() {
        carregarMeusTreinos();
    }

    // **Função para Encerrar Treino Finalizado**
    function encerrarTreinoFinalizado() {
        encerrarTreino();
        carregarHistoricoTreinos();
    }

    // **Função para Confirmar Início de Treino Atualizado**
    function confirmarInicioTreinoAtualizado() {
        elementos.nomeTreinoConfirmacao.textContent = aluno.treinoAtual.nome;
        abrirModal(elementos.modais.confirmarInicio);
    }

    // **Adicionar Evento de Clique para Iniciar ou Encerrar Treino**
    elementos.botaoIniciarTreino.addEventListener('click', () => {
        if (treinoIniciado) {
            abrirModal(elementos.modais.saida);
        } else {
            abrirModal(elementos.modais.entrada);
        }
    });

    // **Confirmar Entrada**
    document.getElementById('confirmarEntrada').addEventListener('click', () => {
        const entradaID = document.getElementById('entradaID').value.trim();
        if (entradaID === '') {
            mostrarNotificacao('Por favor, insira seu ID.');
            return;
        }
        // Record entry time
        aluno.entradaAcademia = new Date();
        fecharModal(elementos.modais.entrada);
        iniciarFluxoTreino();
    });

    // **Confirmar Saída**
    document.getElementById('confirmarSaida').addEventListener('click', () => {
        const saidaID = document.getElementById('saidaID').value.trim();
        if (saidaID === '') {
            mostrarNotificacao('Por favor, insira seu ID.');
            return;
        }
        // Record exit time and calculate total time spent
        const saidaAcademia = new Date();
        const tempoTreinoHoras = (saidaAcademia - aluno.entradaAcademia) / (1000 * 60 * 60);
        aluno.horasTreinadasSemana += tempoTreinoHoras;
        treinoIniciado = false;

        // Atualizar histórico
        const diaSemanaHoje = new Date().getDay(); // 0 (Dom) a 6 (Sáb)
        const indexDia = diaSemanaHoje === 0 ? 6 : diaSemanaHoje - 1;
        aluno.historicoSemanal[indexDia] += tempoTreinoHoras;

        atualizarDados();
        fecharModal(elementos.modais.saida);
        mostrarNotificacao('Saída registrada com sucesso!');

        // Salvar dados atualizados
        salvarTreinos();
        salvarHistorico();
    });

    // **Adicionar Evento de Clique para Confirmar Início de Treino**
    elementos.confirmarInicioBtn.addEventListener('click', iniciarContagemRegressiva);

    // **Adicionar Evento de Clique para Cancelar Início de Treino**
    elementos.cancelarInicio.addEventListener('click', () => {
        fecharModal(elementos.modais.confirmarInicio);
    });


    // **Configurar Drag and Drop no Modal de Montar Treino**
    configurarDragAndDropModalTreino();

    // **Adicionar Evento de Clique para Abrir o Modal de Montar Treino**
    elementos.btnMontarTreino.addEventListener('click', () => {
        abrirModal(elementos.modais.treino);
        renderExerciciosDisponiveis();
    });

    // **Adicionar Eventos de Clique para os Cards**
    document.getElementById('card-criar-treino').addEventListener('click', () => {
        const token = sessionStorage.getItem('token');
        
        abrirModal(elementos.modais.treino);
        Get_Exercise(token);
        async function Get_Exercise(token){
            try {
                const url = "http://localhost:3000/get_all_default_exercise";
                await fetch(url, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': token
                    }
                })
                    .then(async (response) => {
                        if (response.ok) return await response.json()
                        else console.error('Erro ao buscar exerciceos.')
                    })
                    .then((data) => {
                        console.log(data)
                        GetDefaultExercise(data);
                    })
            }
            catch (err) {
                console.log(err);
            }
        
        }
    });

    document.getElementById('card-dicas-treino').addEventListener('click', () => {
        abrirModal(elementos.modais.dicasTreino);
        carregarDicasTreino();
    });

    document.getElementById('definirMeta').addEventListener('click', () => {
        abrirModal(elementos.modais.meta);
    });

    // **Função para Carregar Todos os Dados**
    function carregarDadosCompletos() {
        carregarDicasTreino();
    }

    // **Inicialização Geral**
    carregarDadosCompletos();

    // **Finalização e Salvamento ao Sair ou Recarregar**
    window.addEventListener('beforeunload', () => {
        salvarTreinos();
        salvarHistorico();
    });
}
