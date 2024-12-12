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

                // Guardar el id_client en localStorage para usarlo en otra página
                localStorage.setItem('id_client', data.id_client);

                // Redirigir al usuario a calls.html
                window.location.href = 'calls.html';  // Cambia la URL según sea necesario

            } catch (error) {
                console.error('Error en la autenticación:', error);
                errorMessage.style.display = 'block';  // Muestra el mensaje de error
            }
        });
    }
});
