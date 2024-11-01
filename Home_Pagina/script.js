// Execute after the DOM has loaded
document.addEventListener("DOMContentLoaded", function() {
    // Selectors for login and signup buttons
    var btnSignin = document.querySelector("#signin");
    var btnSignup = document.querySelector("#signup");
    var body = document.querySelector("body");

    // Toggle between login and signup screens
    btnSignin.addEventListener("click", function () {
        body.className = "sign-in-js"; 
    });

    btnSignup.addEventListener("click", function () {
        body.className = "sign-up-js";
    });

    // Function for user login
    async function LoginUser() {
        const errorMessage = document.getElementById('loginMessage');
        const email = document.getElementById('emailLogin').value;
        const password = document.getElementById('passwordLogin').value;

        const payload = { Email: email, Senha: password };
        const url = "http://localhost:3000/login";

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const json = await response.json();
                sessionStorage.setItem("token", json.token);
                window.location.href = '../Aluno_Pagina/aluno.html';
            } else {
                errorMessage.innerHTML = 'Credenciais inválidas. Tente novamente.';
            }
        } catch (err) {
            console.error(err);
            errorMessage.innerHTML = 'Ops! Tivemos um problema em nossos servidores. Tente mais tarde.';
        }
    }

    // Function for user registration
    async function Cadastro_User() {
        const errorMessage = document.getElementById('error-message');
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

    // Input field masks
    new Cleave('#cpf', {
        delimiters: ['.', '.', '-'],
        blocks: [3, 3, 3, 2],
        numericOnly: true
    });

    new Cleave('#telefone', {
        delimiters: ['(', ') ', '-'],
        blocks: [0, 2, 5, 4],
        numericOnly: true
    });

    // Expose the login function for the login button
    window.LoginUser = LoginUser;
    window.Cadastro_User = Cadastro_User; // Make Cadastro_User available globally
});

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

function mostrarsenha(){
    var inputPass = document.getElementById('password')
    var btnShowPass = document.getElementById('btn-senha')

    if(inputPass.type === 'password'){
        inputPass.setAttribute('type','text')
        btnShowPass.classList.replace('bi-eye-fill','bi-eye-slash-fill')
    }else{
        inputPass.setAttribute('type','password')
        btnShowPass.classList.replace('bi-eye-slash-fill','bi-eye-fill')
    }
    }
