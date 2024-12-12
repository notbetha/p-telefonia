function loginUser() {
    const loginData = {
        login: 'forweb',  // Datos del usuario
        password: 'forweb'  // Contraseña
    };

    fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',  // El cuerpo de la solicitud será JSON
        },
        body: JSON.stringify(loginData),  // Envia los datos como JSON
    })
    .then(response => {
        if (!response.ok) {
            return Promise.reject('Error en la autenticación');  // Si la respuesta no es ok, muestra el mensaje de error
        }
        return response.json();  // Si la respuesta es ok, procesa los datos JSON
    })
    .then(data => {
        console.log('Datos recibidos:', data);
        alert('¡Bienvenido!');
    })
    .catch(error => {
        console.log('Error al conectar con el servidor:', error);
        alert('Login o contraseña incorrectos');
    });
}
