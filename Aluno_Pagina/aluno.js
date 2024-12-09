/* aluno.js */
// **Estrutura de Dados Globais**
const aluno = {
    nome: '',
    email: '',
    metaSemanal: '', // Meta em horas
    horasTreinadasSemana: '',
    historicoSemanal: '', // Segunda a Domingo
    meusTreinos: [],
    treinoAtual: null, // Treino em andamento
    entradaAcademia: null // Hora de entrada na academia
};

document.addEventListener('DOMContentLoaded', async () => {
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('id');
    const UserMessage = document.getElementById("UserGoal")
    const UserHoursMessage = document.getElementById("UserHours")

    if (!token || !userId) {
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
                if (response.ok) {
                    try {
                        return await response.json()
                    }
                    catch (err) {
                        console.error('Usuário não possui meta definida.')
                        return null
                    }
                }
                else console.error('Erro ao buscar usuário.')
            })
            .then(data => {
                if (data != null) {
                    aluno.metaSemanal = data.weeklyHours;
                    UserMessage.innerHTML = data.weeklyHours + " horas";
                } else {
                    UserMessage.innerHTML = 0 + " horas";
                }
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

                if (response.ok) {
                    try {
                        return await response.json()
                    }
                    catch (err) {
                        console.error('Usuário não possui treinos realizados.')
                        return null
                    }
                }
                else console.error('Erro ao buscar usuário.')
            })
            .then((data) => {
                
                if (data != null) {
                    aluno.horasTreinadasSemana = calculateTotalHours(data);
                    UserHoursMessage.innerHTML = aluno.horasTreinadasSemana + " horas"
                } else {
                    UserHoursMessage.innerHTML = 0 + " horas"
                }
            })
    }
    catch (err) {
        console.log(err);
        UserHoursMessage.innerHTML = 0 + " horas"
    }

    LoadPage()
})

function calculateTotalHours(data) {
    var totalMilliseconds = data[0].duration;

    const h = Math.floor(totalMilliseconds / 1000 / 60 / 60);
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

    async function LoadPrevSession() {
        try {
            const token = sessionStorage.getItem('token');
            const userId = sessionStorage.getItem('id');


            const url = "http://localhost:3000/verify_user_running_session";
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
                    const startTime = data.trainingSession.startTime;

                    const training = {
                        id: data.trainingSession.id,
                        nome: data.sessionExercises.Name,
                        exercicios: []
                    }

                    for (let index = 0; index < data.sessionExercises.Exercise_Users.length; index++) {
                        const ex = {
                            id: data.sessionExercises.Exercise_Users[index].id,
                            nome: data.sessionExercises.Exercise_Users[index].Name,
                            peso: data.sessionExercises.Exercise_Users[index].Weight,
                            repeticoes: data.sessionExercises.Exercise_Users[index].Repetitions,
                            series: data.sessionExercises.Exercise_Users[index].Series
                        }

                        training.exercicios.push(ex);
                    }


                    aluno.treinoAtual = training;

                    const startTimeDate = new Date(startTime);
                    timerInterval = setInterval(() => atualizarContador(startTimeDate), 1000);

                    treinoIniciado = true;
                    abrirModalExercicios();
                    alterarBotao()
                })
        }
        catch (err) {
            console.log(err);
        }
    }

    LoadPrevSession()

    async function ConfirmarCPF() {
        const cpf = document.getElementById("entryUserCpf").value

        const userId = sessionStorage.getItem('id');
        const token = sessionStorage.getItem('token');

        const url = "http://localhost:3000/VeryfiUser";

        try {
            await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token
                },
                body: JSON.stringify({ userId: userId, CPF: cpf })
            })
                .then(async (response) => {
                    if (response.ok) {
                        try {
                            return await response.json()
                        }
                        catch (err) {
                            console.error('Erro ao buscar Cpf do usuario.')
                            return null
                        }
                    }
                    else console.error('Erro ao buscar usuário.')
                })
                .then((data) => {
                    if (data) {
                        fecharModal(elementos.modais.entrada);
                        abrirModal(elementos.modais.escolherTreino);
                        carregarTreinosDisponiveis();
                    } else {
                        alert('CPF não encontrado')
                    }
                })
        } catch (err) {
            console.log(err);
        }
    }

    document.getElementById('ConfirmarCPFbtn').addEventListener('click', ConfirmarCPF);

    function abrirModal(modal) {
        modal.style.display = 'block';
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Evita scroll na página principal
    }

    function GetDefaultExercise(data) {
        elementos.exerciciosDisponiveis.innerHTML = '';


        for (let index = 0; index < data.length; index++) {
            const li = document.createElement('li');

            const nomeExercicio = document.createElement('span');
            nomeExercicio.textContent = data[index].Name;

            // Botão "Adicionar"
            const btnAdicionar = document.createElement('button');
            btnAdicionar.textContent = 'Adicionar';
            btnAdicionar.classList.add('btn-acao');
            btnAdicionar.setAttribute('aria-label', `Adicionar ${data[index].Name} ao treino`);
            btnAdicionar.addEventListener('click', () => {
                adicionarExercicioAoTreino(data, nomeExercicio.innerHTML, data[index].Default_Series, data[index].Default_Repetitions, data[index].Default_Weight, data[index].id);
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

    // **Função para Inicializar Modal Meta**
    function inicializarModalMeta() {
        const inputMeta = document.getElementById('inputMeta');
        const valorMeta = document.getElementById('valorMeta');
        inputMeta.value = 1;
        valorMeta.textContent = '1 horas';
    }

    // Adicionar evento para inicializar modal meta quando abrir
    document.getElementById('definirMeta').addEventListener('click', inicializarModalMeta);

    // **Função para Atualizar Valor da Meta**
    function atualizarValorMeta() {
        const inputMeta = document.getElementById('inputMeta');
        const valorMeta = document.getElementById('valorMeta');

        inputMeta.addEventListener('input', () => {
            valorMeta.textContent = inputMeta.value + ' horas';
        });
    }

    // Inicializar atualização do valor da meta
    atualizarValorMeta();

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
                    if (response.ok) {
                        try {
                            return await response.json()
                        }
                        catch (err) {
                            console.error('Erro ao salvar meta.')
                            return null
                        }
                    }
                    else console.error('Erro ao buscar usuário.')
                })
                .then(data => {
                    if (data != null) {
                        aluno.metaSemanal = data.weeklyHours;
                        UserMessage.innerHTML = data.weeklyHours + " horas";
                        location.reload();
                    }
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
        if (aluno.metaSemanal != 0 || aluno.horasTreinadasSemana != 0) {
            const progressoMeta = (aluno.horasTreinadasSemana / aluno.metaSemanal) * 100;
            elementos.metaProgresso.textContent = `${Math.round(progressoMeta)}%`;
            elementos.barraProgresso.style.width = `${progressoMeta}%`;
        }
        // Atualizar Classificação
        const classificacao = calcularClassificacao(aluno.horasTreinadasSemana);
        elementos.classificacaoAluno.textContent = classificacao;


    }


    // **Atualizar informações iniciais**
    elementos.nomeAluno.textContent = aluno.nome;
    elementos.perfilNome.value = aluno.nome;
    atualizarDados();

    // **Função para Salvar Perfil**
    async function salvarPerfil() {
        const novoNome = elementos.perfilNome.value.trim();
        const token = sessionStorage.getItem('token');
        const userId = sessionStorage.getItem('id');



        if (novoNome === '') {
            mostrarNotificacao('Por favor, preencha todos os campos do perfil.');
            return;
        }

        try {
            const url = "http://localhost:3000/edit_user_name";
            await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token
                },
                body: JSON.stringify({ UserId: userId, newName: novoNome })
            })
                .then(async (response) => {
                    if (response.ok) return await response.json()
                    else console.error('Erro ao buscar usuário.')
                })
                .then(data => {
                    fecharModal(elementos.modais.perfil);
                    mostrarNotificacao('Perfil atualizado com sucesso!');
                    location.reload();
                })
        }
        catch (err) {
            console.log(err);
        }
    }

    function createUserExercises(exerciciosArr) {
        console.log("ok, createUserExercises")
        
        const userId = sessionStorage.getItem('id');
        const token = sessionStorage.getItem('token');

        const exerciciosIds = [];

        for (let index = 0; index < exerciciosArr.exercicios.length; index++) {
            const newTraining = {
                Name: exerciciosArr.exercicios[index].nome,
                Repetitions: exerciciosArr.exercicios[index].repeticoes,
                Series: exerciciosArr.exercicios[index].series,
                Weight: exerciciosArr.exercicios[index].peso,
                Description: exerciciosArr.exercicios[index].nome,
                ExerciseId: exerciciosArr.exercicios[index].id,
                UserId: userId
            }

            fetch('http://localhost:3000/create-user-exercise', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token
                },
                body: JSON.stringify(newTraining)
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data)
                    exerciciosIds.push(data.exercise_user_id);
                })
                .catch(error => console.error('Error:', error));
        }

        createUserTraining(exerciciosIds, exerciciosArr.nome);
    }

    function createUserTraining(exerciciosIds, nomeTreino) {
        console.log("ok, createUserTraining")
        
        const userId = sessionStorage.getItem('id');
        const token = sessionStorage.getItem('token');

        const newTraining = {
            Name: nomeTreino,
            UserId: userId
        }

        fetch('http://localhost:3000/create-user-training', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            },
            body: JSON.stringify(newTraining)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data)
                addExercisesToTraining(exerciciosIds, data.trainingId);
            })
            .catch(error => console.error('Error:', error));
    }

    function addExercisesToTraining(exerciciosIds, trainingId) {
        const token = sessionStorage.getItem('token');

        for (let index = 0; index < exerciciosIds.length; index++) {
            const newTrainingExercise = {
                trainingId: trainingId,
                exerciseUserId: exerciciosIds[index]
            }

            console.log(newTrainingExercise);

            fetch('http://localhost:3000/add-user-exercise-to-training', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token
                },
                body: JSON.stringify(newTrainingExercise)
            })
                .then(response => response.json())
                .then(data => console.log('Success:', data))
                .catch(error => console.error('Error:', error));
        }
    }

    // **Função para Salvar Histórico no localStorage**
    function salvarHistorico() {
        localStorage.setItem('historicoSemanal', JSON.stringify(aluno.historicoSemanal));
    }

    // **Função para Abrir Modal**


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
    function adicionarExercicioAoTreino(exercicio, nomeExercicio, series, repeticoes, peso, idExercicio) {
        // Verificar se o exercício já foi adicionado
        const existe = Array.from(elementos.meuTreino.children).some(li => li.querySelector('.exercicio-nome').textContent === exercicio.nome);
        if (existe) {
            mostrarNotificacao('Exercício já adicionado ao treino.');
            return;
        }

        const li = document.createElement('li');

        const nomeDiv = document.createElement('div');
        nomeDiv.classList.add('exercicio-nome');
        nomeDiv.textContent = nomeExercicio;

        const detalhesDiv = document.createElement('div');
        detalhesDiv.classList.add('exercicio-detalhes');

        detalhesDiv.innerHTML = `
            <label>Séries:
                <input type="number" min="1" value="${series}" aria-label="Séries">
            </label>
            <label>Repetições:
                <input type="number" min="1" value="${repeticoes}" aria-label="Repetições">
            </label>
            <label>Peso (kg):
                <input type="number" min="0" value="${peso}" aria-label="Peso">
            </label>
            <input type="hidden" value="${idExercicio}">
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
            const idExercicio = parseInt(inputs[3].value);

            // Validação simples
            if (isNaN(series) || isNaN(repeticoes) || isNaN(peso)) {
                mostrarNotificacao(`Por favor, preencha corretamente os campos do exercício "${nome}".`);
                return;
            }

            exercicios.push({
                nome: nome,
                series: series,
                repeticoes: repeticoes,
                peso: peso,
                id: idExercicio
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
        createUserExercises(novoTreino);
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
    async function carregarTreinosDisponiveis() {
        elementos.listaTreinosParaEscolher.innerHTML = '';


        const userId = sessionStorage.getItem('id');
        const token = sessionStorage.getItem('token');

        console.log(userId);

        // Buscar treinos do usuário pelo ID
        await fetch('http://localhost:3000/get-user-training-by-user-id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `${token}`
            },
            body: JSON.stringify({ userId: userId })
        })
            .then(async response => {
                if (response.ok) {
                    return await response.json()
                } else {
                    console.error('Erro ao buscar treinos:', response.statusText);
                    return null;
                }
            })
            .then(data => {
                if (data && data.length > 0) {
                    const treinosArr = [];

                    for (let index = 0; index < data.length; index++) {
                        let treino = {
                            id: data[index].id,
                            nome: data[index].Name,
                            exercicios: []
                        }

                        for (let k = 0; k < data[index].Exercise_Users.length; k++) {

                            const exercicio = {
                                nome: data[index].Exercise_Users[k].Name,
                                series: data[index].Exercise_Users[k].Series,
                                repeticoes: data[index].Exercise_Users[k].Repetitions,
                                peso: data[index].Exercise_Users[k].Weight,
                                id: data[index].Exercise_Users[k].id
                            };

                            treino.exercicios.push(exercicio);

                        }

                        treinosArr.push(treino);
                    }

                    aluno.meusTreinos = treinosArr;
                } else {
                    if (data) {
                        console.error('Erro ao buscar treinos:', data.message);
                        aluno.meusTreinos = [];
                    }

                    else {
                        console.log("Erro ao buscar treinos")
                        aluno.meusTreinos = [];
                    }
                }
            })
            .catch(error => {
                console.error('Erro na requisição:', error);
            });


        if (aluno.meusTreinos.length === 0) {
            elementos.listaTreinosParaEscolher.innerHTML = '<p>Você ainda não montou nenhum treino.</p>';
            return;
        }

        aluno.meusTreinos.forEach((treino) => {
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
    async function iniciarTreino() {
        const userId = sessionStorage.getItem('id');
        const token = sessionStorage.getItem('token');
        try {

            const url = "http://localhost:3000/create-training-session";
            await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token
                },
                body: JSON.stringify({ UserId: userId, UserTrainingId: aluno.treinoAtual.id })
            })
                .then(async (response) => {

                    if (response.ok) {
                        try {
                            return await response.json()
                        }
                        catch (err) {
                            console.error('Usuário não possui treinos realizados.')
                            return null
                        }
                    }
                    else console.error('Erro ao buscar usuário.')
                })
                .then((data) => {
                    if (data != null) {
                        treinoIniciado = true;
                        startTime = new Date();
                        timerInterval = setInterval(() => atualizarContador(startTime), 1000);
                        mostrarNotificacao('Treino iniciado! Bom treino!');
                        abrirModalExercicios();
                        alterarBotao();
                    } else {
                        UserHoursMessage.innerHTML = 0 + " horas"
                    }
                })
        }
        catch (err) {
            console.log(err);
        }
    }

    function alterarBotao(){
        const StartBotton = document.getElementById('botaoIniciarTreino');

        const NovoBotao = document.createElement('button');
        NovoBotao.textContent = 'Encerrar Treino';
        NovoBotao.classList.add('btn-acao');
        
        StartBotton.replaceWith(NovoBotao);
        NovoBotao.onclick = () => abrirModalExercicios();
    }

    // **Função para Atualizar Contador**
    function atualizarContador(startTime) {
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
        elementos.nomeTreinoAtual.textContent = aluno.treinoAtual.Name;
        elementos.barraProgressoExercicios.style.width = '0%';
        elementos.percentualProgressoExercicios.textContent = '0% Concluído';
        timerInterval = setInterval(atualizarContadorModal, 1000);
    }

    // **Função para Renderizar Exercícios no Modal de Exercícios**
    function renderExerciciosParaConcluir() {
        elementos.listaExerciciosTreino.innerHTML = '';

        console.log(aluno.treinoAtual)



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
    async function encerrarTreino() {

        const token = sessionStorage.getItem('token');
        const userId = sessionStorage.getItem('id');
        try {

            const url = "http://localhost:3000/user_running_session";
            await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token
                },
                body: JSON.stringify({ userId: userId })
            })
                .then(async (response) => {

                    if (response.ok) {
                        try {
                            return await response.json()
                        }
                        catch (err) {
                            console.error('Usuário não possui treinos realizados.')
                            return null
                        }
                    }
                    else console.error('Erro.')
                })
                .then((data) => {
                    if (data != null) {
                        ended_session(data.id)
                    }
                })
        }
        catch (err) {
            console.log(err);
        }

    }

    async function ended_session(trainingId) {

        const token = sessionStorage.getItem('token');
        try {

            const url = "http://localhost:3000/end-user-training-session";
            await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token
                },
                body: JSON.stringify({ training_session_id: trainingId })
            })
                .then(async (response) => {

                    if (response.ok) {
                        try {
                            return await response.json()
                        }
                        catch (err) {
                            console.error('Usuário não possui treinos realizados.')
                            return null
                        }
                    }
                    else console.error('Erro.')
                })
                .then((data) => {
                    if (data != null) {
                        treinoIniciado = false;
                        elementos.botaoIniciarTreino.textContent = 'Iniciar Treino';
                        clearInterval(timerInterval);
                        clearInterval(countdownInterval);
                        const now = new Date();
                        const elapsedTime = (now - startTime) / (1000 * 60 * 60); // em horas
                        aluno.horasTreinadasSemana += elapsedTime;

                        // Remover modal de exercícios
                        fecharModal(elementos.modais.exercicios);

                        atualizarDados();
                        mostrarNotificacao('Treino concluído! Bom trabalho!');
                        aluno.treinoAtual = null;
                        location.reload()
                    }
                })
        }
        catch (err) {
            console.log(err);
        }

    }



    // **Função para Salvar Treino Personalizado**
    function salvarTreinoPersonalizadoFinal() {
        salvarTreinoPersonalizado();
    }

    // **Event Listener para Salvar Treino Personalizado**
    elementos.salvarTreinoBtn.addEventListener('click', salvarTreinoPersonalizadoFinal);

    // **Função para Carregar Meus Treinos no Modal**
    // function carregarMeusTreinosFinal() {
    //     carregarMeusTreinos();
    // }

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
        // salvarTreinos();
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
    });

    // **Adicionar Eventos de Clique para os Cards**
    document.getElementById('card-criar-treino').addEventListener('click', () => {
        
        const token = sessionStorage.getItem('token');

        abrirModal(elementos.modais.treino);
        Get_Exercise(token);
        async function Get_Exercise(token) {
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
        // salvarTreinos();
        salvarHistorico();
    });
}

async function DisableUser() {
    const ConfirmedDisable = window.confirm("Alerta! Tem certeza que deseja excluir esta conta?");
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('id');

    if (ConfirmedDisable === true) {
        try {
            const url = "http://localhost:3000/disable-user";
            await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token
                },
                body: JSON.stringify({ userId: userId })
            })
                .then(async (response) => {
                    if (response.ok) window.location.href = '../Home_Pagina/Home.html';
                    else console.error('Erro ao buscar usuário.')
                })
        }
        catch (err) {
            console.log(err);
        }
    }
}

function ChamarModalCriarTreino() {
    const card = document.getElementById('card-criar-treino');
    if (card) {
        card.click();
    } else {
        console.error('Elemento com ID "card-criar-treino" não encontrado.');
    }
}