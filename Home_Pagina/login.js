async function LoginUser(){
    const errorMessage = document.getElementById('loginMessage');
    const email = document.getElementById('emailLogin').value;
    const password = document.getElementById('passwordLogin').value;

    const payload = { Email: email, Senha: password };
    const url = "http://localhost:3000/login";

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { 'Content-Type': 'application/json',
             },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            const json = await response.json();
            sessionStorage.setItem("token", json.token);
            sessionStorage.setItem("id", json.userId);
            sessionStorage.setItem("Tipo", json.type);
            window.location.href = '../Aluno_Pagina/aluno.html';
        } else {
            errorMessage.innerHTML = 'Credenciais inválidas. Tente novamente.';
        }
    } catch (err) {
        console.error(err);
        errorMessage.innerHTML = 'Ops! Tivemos um problema em nossos servidores. Tente mais tarde.';
    }
}

window.LoginUser = LoginUser;