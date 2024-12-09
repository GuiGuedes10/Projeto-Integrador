function TrocarBotao(){
    const BotaoAtual = document.getElementById("BotaoCadastro");

    const NovoBotao = document.createElement('button')

    NovoBotao.textContent = 'Cadastrando';
    NovoBotao.classList.add('btn', 'btn-second');
    NovoBotao.disabled = true;
    BotaoAtual.replaceWith(NovoBotao);

}

async function Cadastro_User() {
    TrocarBotao();
    
    const errorMessage = document.getElementById('UserMessage');
    const usuario = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('emailCadastro').value,
        cpf: document.getElementById('cpf').value,
        telefone: document.getElementById('telefone').value,
        password: document.getElementById('passwordCadastro').value,
        confirmPassword: document.getElementById('confirm-password').value
    };

    if (!validarCampos(usuario, errorMessage)) {
        return;
    }

    const payload = {
        Name: usuario.nome,
        Email: usuario.email,
        telefone: usuario.telefone,
        CPF: usuario.cpf,
        Senha: usuario.password
    };

    const url = "http://localhost:3000/cadastro_usuario";

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            const json = await response.json();
            sessionStorage.setItem("token", json.token);
            sessionStorage.setItem("id", json.id);
            sessionStorage.setItem("Tipo", json.type);
            console.log('Cadastrado');
            window.location.href = '../Aluno_Pagina/aluno.html';
        } else {
            errorMessage.innerHTML = 'Erro ao cadastrar. Tente novamente mais tarde!';
        }
    } catch (err) {
        console.log(err);
        errorMessage.innerHTML = 'Erro ao cadastrar. Tente novamente mais tarde!';
    }
}

// Function to validate fields
function validarCampos(usuario, errorMessage) {
const { password, cpf, confirmPassword } = usuario;


if (!usuario.nome) {
    errorMessage.innerHTML = 'Nome não preenchido';
    return false;
}

if (!usuario.email) {
    errorMessage.innerHTML = 'Email não preenchido';
    return false;
}

if (!usuario.password) {
    errorMessage.innerHTML = 'Senha não preenchido';
    return false;
}

if (!usuario.telefone) {
    errorMessage.innerHTML = 'Telefone não preenchido';
    return false;
}

if (!usuario.cpf) {
    errorMessage.innerHTML = 'Cpf não preenchido';
    return false;
}

if (password !== confirmPassword || !password || !confirmPassword) {
    errorMessage.innerHTML = 'As senhas não coincidem!';
    return false;
}

if (!validarCPF(cpf)) {
    errorMessage.innerHTML = 'CPF inválido!';
    return false;
}

return true;
}

// Function to validate CPF
function validarCPF(cpf) {
cpf = cpf.replace(/[^\d]+/g, ''); // Remove non-numeric characters
if (cpf.length !== 11) return false;

let soma = 0;
let resto;

for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
}
resto = (soma * 10) % 11;
if (resto === 10 || resto === 11) resto = 0;
if (resto !== parseInt(cpf.substring(9, 10))) return false;

soma = 0;
for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
}
resto = (soma * 10) % 11;
if (resto === 10 || resto === 11) resto = 0;
if (resto !== parseInt(cpf.substring(10, 11))) return false;

return true;
}

window.Cadastro_User = Cadastro_User;