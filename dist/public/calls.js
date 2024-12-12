document.addEventListener('DOMContentLoaded', async function () {
    const errorMessage = document.getElementById('error-message');
    const callsContainer = document.getElementById('calls-container');  // Elemento donde se mostrarán las llamadas

    // Recuperamos el id del cliente desde localStorage
    const idClient = localStorage.getItem('id_client');  // Recupera el id_client con la clave correcta

    if (!idClient) {
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'ID del cliente no encontrado';
        return;
    }

    try {
        // Hacemos la solicitud a la API para obtener las llamadas del cliente
        const response = await fetch(`http://localhost:3000/api/calls/${idClient}`);
        const calls = await response.json();

        if (calls.length === 0) {
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'No se encontraron llamadas para este cliente';
        } else {
            errorMessage.style.display = 'none';

            // Limpiamos cualquier contenido previo
            callsContainer.innerHTML = '';

            // Iteramos a través de las llamadas y las mostramos
            calls.forEach(call => {
                const callElement = document.createElement('div');
                callElement.classList.add('call-item');
                callElement.innerHTML = `
                    <p><strong>Llamada a:</strong> ${call.called_number}</p>
                    <p><strong>Inicio de llamada:</strong> ${call.call_start}</p>
                    <p><strong>Duración efectiva:</strong> ${call.effective_duration}</p>
                `;
                callsContainer.appendChild(callElement);
            });
        }
    } catch (error) {
        console.error('Error al obtener las llamadas:', error);
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Error al obtener las llamadas';
    }
});
