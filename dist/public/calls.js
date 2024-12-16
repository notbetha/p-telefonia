document.addEventListener('DOMContentLoaded', function () {
    const idClient = localStorage.getItem('idClient');  // Obtener idClient desde localStorage
    const callsTable = document.getElementById('callsTable');
    const prevButton = document.getElementById('prevPage');
    const nextButton = document.getElementById('nextPage');
    const errorMessage = document.getElementById('error-message');
    
    if (!idClient) {
        // Si no hay idClient en el almacenamiento local, redirige al login
        window.location.href = 'login.html';
    } else {
        let currentPage = 1;  // Página inicial
        let totalPages = 1; // Inicializamos la variable totalPages
        
        // Función para mostrar las llamadas en la tabla
        function displayCalls(calls) {
            const tbody = callsTable.querySelector('tbody');
            tbody.innerHTML = '';  // Limpiar tabla

            if (calls.length > 0) {
                calls.forEach(call => {
                    const row = document.createElement('tr');
                    const callStart = new Date(call.call_start).toLocaleString();
                    const calledNumber = call.called_number;
                    const effectiveDuration = call.effective_duration;

                    row.innerHTML = `
                        <td>${callStart}</td>
                        <td>${calledNumber}</td>
                        <td>${effectiveDuration}</td>
                    `;
                    tbody.appendChild(row);
                });
            } else {
                displayErrorMessage("No se encontraron llamadas.");
            }
        }

        // Función para mostrar un mensaje de error
        function displayErrorMessage(message) {
            if (errorMessage) {
                errorMessage.textContent = message;
                errorMessage.style.display = 'block';
            } else {
                console.error('El contenedor de error no se encuentra en el DOM');
            }
        }

        // Función para obtener las llamadas desde el backend
        async function fetchCalls(page) {
            try {
                const response = await fetch(`http://localhost:3000/api/calls/${idClient}?page=${page}`);

                if (!response.ok) {
                    throw new Error('No se pudo obtener la respuesta del servidor');
                }

                const data = await response.json();
                console.log('Respuesta completa del backend:', data);  // Ver la respuesta completa

                // Verificar si la respuesta es un array directo
                if (Array.isArray(data)) {
                    totalPages = Math.ceil(data.length / 10); // Ajusta el cálculo de páginas basado en el tamaño de los datos
                    displayCalls(data); // Mostrar las llamadas
                } else {
                    console.error('Error: "calls" no es un array válido.');
                    displayErrorMessage("Error al procesar las llamadas.");
                }
            } catch (error) {
                console.error("Error al obtener las llamadas:", error);
                displayErrorMessage("Hubo un error al conectar con el servidor.");
            }
        }

        // Inicializar las llamadas al cargar la página
        fetchCalls(currentPage);

        // Funcionalidad de paginación
        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                fetchCalls(currentPage);
            }
        });

        nextButton.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                fetchCalls(currentPage);
            }
        });
    }
});
