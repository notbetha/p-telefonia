document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const login = document.getElementById('login').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('http://localhost:3000/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        login: login,
                        password: password,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
                console.log('Respuesta recibida:', data);

                // Verifica que id_client se recibe correctamente
                if (data && data.id_client) {
                    localStorage.setItem('idClient', data.id_client);  // Guardamos idClient en localStorage
                    window.location.href = 'calls.html';  // Redirige a calls.html
                } else {
                    errorMessage.style.display = 'block';
                    errorMessage.textContent = 'No se pudo obtener el ID del cliente.';
                }
            } catch (error) {
                console.error('Error en la autenticación:', error);
                errorMessage.style.display = 'block';  // Muestra el mensaje de error
            }
        });
    }
});
