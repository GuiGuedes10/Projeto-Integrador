async function Cadastro_User() {
    const StorageUser = document.getElementById('storageBrowser').value;
    const errorMessage = document.getElementById('error-message');
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const cpf = document.getElementById('cpf').value;
    const telefone = document.getElementById('telefone').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    const usuario = { nome, email, cpf, telefone, password, confirmPassword }

    if (!validarCampos(usuario, errorMessage)) {
        return
    }
    if (StorageUser){
        localStorage.setItem('email', usuario.email)
    }

    const payload = {
        Name: nome,
        Email: email,
        telefone: telefone,
        CPF: cpf,
        Senha: password
    }

    const url = "http://localhost:3000/cadastro_usuario";

    fetch(url,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
    )
        .then(async (response) => {

            
            if (response.ok) {
                response.json()
                    .then((json) => {
                        sessionStorage.setItem("token", json.token);
                        console.log('cadastrado')
                        window.location.href = '../Aluno_Pagina/aluno.html';
                    })
            }
        })
        .catch((err) => {
            console.log(err)
            errorMessage.innerHTML = 'Erro ao cadastrar. Tente novamente mais tarde!';
        })
}

function validarCampos(usuario, errorMessage) {
    const { password, cpf, confirmPassword } = usuario

    errorMessage.innerHTML = ''; // Limpa mensagens de erro anteriores

    if (usuario.nome === ''){
        errorMessage.innerHTML = 'Nome não preenchido';
        return false;
    }

    if (usuario.email === ''){
        errorMessage.innerHTML = 'Email não preenchido';
        return false;
    }

    if (usuario.password === ''){
        errorMessage.innerHTML = 'Senha não preenchido';
        return false;
    }

    if (usuario.telefone === ''){
        errorMessage.innerHTML = 'Telefone não preenchido';
        return false;
    }

    if (usuario.cpf === ''){
        errorMessage.innerHTML = 'Cpf não preenchido';
        return false;
    }

    if (password !== confirmPassword || password == '' || confirmPassword == '') {
        errorMessage.innerHTML = 'As senhas não coincidem!';
        return false;
    }

    if (!validarCPF(cpf)) {
        errorMessage.innerHTML = 'CPF inválido!';
        return false;
    }

    return true;
}

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