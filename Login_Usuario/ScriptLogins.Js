async function LoginUser() {
    const errorMessage = document.getElementById('error-message');
    const Email = document.getElementById('email').value
    const Senha = document.getElementById('password').value

    const payload = {
        Email: Email,
        Senha: Senha
    }
    
    const url = "http://localhost:3000/login";

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
                        console.log('ok');
                        window.location.href = '../Aluno_Pagina/aluno.html';
                                        })
            }
        })
        .catch((err) => {
            console.log(err)
            errorMessage.innerHTML = 'Ops! Tivemos um problema em nossos servidores. Tente mais tarde';
        })
}