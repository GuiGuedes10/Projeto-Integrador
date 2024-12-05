let elementos

document.addEventListener('DOMContentLoaded', () => {

    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('id');

    if (!token || !userId) {
        window.location.href = '../Home_Pagina/Home.html';
    }

    elementos = {
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

})

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

async function obterDados() {

    const token = sessionStorage.getItem('token');

    try {

        const url = "http://localhost:3000/get_usuarios";
        const data = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            },
            body: JSON.stringify({ token: token })
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
                return data;
            })

        return data;
    }
    catch (err) {
        console.log(err);
    }
}

async function ObterHorasAluno(userId) {
    const token = sessionStorage.getItem('token');

    try {

        const url = "http://localhost:3000/get_Week_Of_User";
        const data = await fetch(url, {
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
                return data
            })

        return calculateTotalHours(data)
    }
    catch (err) {
        console.log(err);
    }
}

function calculateTotalHours(data) {
    if (data.length > 0) {

        var totalMilliseconds = data[0].duration;
        const h = Math.floor(totalMilliseconds / 1000 / 60 / 60);

        return h
    }else{
        return 0;
    }
}

async function gerarRelatorio() {
    const geris = document.getElementById("geris")
    geris.style.display = 'block';
    geris.setAttribute('aria-hidden', 'false');
    const tabela = document.getElementById("tabela_relatorio");
    const tbody = tabela.querySelector("tbody");

    // Limpa a tabela antes de gerar um novo relatório
    tbody.innerHTML = "";


    try {
        // Obtém os dados do backend
        const alunos = await obterDados();

        for (let index = 0; index < alunos.length; index++) {
            const totalHoras = await ObterHorasAluno(alunos[index].id);
            alunos[index].horas = totalHoras;
        }

        // Adiciona os dados na tabela
        alunos.forEach(aluno => {

            const classificacao = calcularClassificacao(aluno.horas);
            if(aluno.Ativo===true){aluno.Ativo="verdadeiro"}
            else{aluno.Ativo="falso"}
            const linha = `
            <tr>
                <th>${aluno.Name}</th>
                <th>${classificacao}</th>
                <th>${aluno.horas}</th>
                <th>${aluno.Ativo}</th>
            </tr>
        `;
            tbody.innerHTML += linha;

        });

        // Mostra a tabela ao gerar o relatório
        tabela.classList.remove("hidden");
    }

    // Adiciona o evento de clique ao card
    catch (erro) {
        console.error("Erro ao gerar relatório:", erro);
    }
}

function abrirModal() {
    const modal = document.getElementById("modalTreino")
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Evita scroll na página principal
}

// **Função para Fechar Modal**
function fecharModal() {
    const modal = document.getElementById("modalTreino")
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto'; // Habilita scroll na página principal
}



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
    fecharModal();
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


// **Função para Adicionar Exercício Ao Treino**
function adicionarExercicioAoTreino(exercicio) {
    // Verificar se o exercício já foi adicionado
    const existe = Array.from(elementos.meuTreino.children).some(li => li.querySelector('.exercicio-nome').textContent === exercicio.nome);
    if (existe) {
        mostrarNotificacao('Exercício já adicionado ao treino.');
        return;
    }

    const li = document.createElement('li');

    const nomeDiv = document.createElement('div');
    nomeDiv.classList.add('exercicio-nome');
    nomeDiv.textContent = exercicio.nome;

    const detalhesDiv = document.createElement('div');
    detalhesDiv.classList.add('exercicio-detalhes');

    detalhesDiv.innerHTML = `
        <label>Séries:
            <input type="number" min="1" value="${exercicio.series}" aria-label="Séries">
        </label>
        <label>Repetições:
            <input type="number" min="1" value="${exercicio.repeticoes}" aria-label="Repetições">
        </label>
        <label>Peso (kg):
            <input type="number" min="0" value="0" aria-label="Peso">
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

async function salvarexercicio(){
    const token = sessionStorage.getItem('token');
    const NameExercise = document.getElementById("exercicioid").value;
    const ReptExercise = document.getElementById("repeticoesid").value;
    const SeriesExercise = document.getElementById("seriesid").value;
    const WeightExercise = document.getElementById("cargaid").value; 

    defaultExercise = {
        Name: NameExercise,
        Default_Repetitions: ReptExercise,
        Default_Series: SeriesExercise,
        Default_Weight: WeightExercise
    }

    try {

        const url = "http://localhost:3000/create-exercise";
        const data = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            },
            body: JSON.stringify(defaultExercise)
        })
            .then(async (response) => {

                if (response.ok) {
                    console.log("ok")
                    fecharModal()
                }
                else console.error('Not ok')
            })
    }
    catch (err) {
        console.log(err);
    }
}

//abre e fecha tabela

function abrirtabela() {
    const modal = document.getElementById("modalTreino")
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Evita scroll na página principal
}

// **Função para Fechar Modal**
function fecharModal() {
    const modal = document.getElementById("modalTreino")
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto'; // Habilita scroll na página principal
}

function mostrarNotificacao(mensagem) {
    elementos.notificacao.textContent = mensagem;
    elementos.notificacao.classList.add('show');
    elementos.notificacao.setAttribute('aria-live', 'assertive');
    setTimeout(() => {
        elementos.notificacao.classList.remove('show');
        elementos.notificacao.removeAttribute('aria-live');
    }, 5000); // 5 segundos
}