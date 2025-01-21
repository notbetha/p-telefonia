const idClient = localStorage.getItem('idClient');

if (!idClient) {
    alert('No se encontró el ID del cliente. Por favor, inicie sesión.');
    window.location.href = 'login.html';
}

let currentPage = 1;
const tableBody = document.getElementById('callsTableBody');
const paginationInfo = document.getElementById('paginationInfo');
const prevButton = document.getElementById('prevPage');
const nextButton = document.getElementById('nextPage');

const startDateInput = document.getElementById('startDate');
const endDateInput = document.getElementById('endDate');
const filterButton = document.getElementById('filterButton');

const fetchCalls = async (page, startDate = '', endDate = '') => {
    try {
        let url = `http://localhost:3000/api/calls/${idClient}?page=${page}`;

        if (startDate && endDate) {
            url += `&startDate=${startDate}&endDate=${endDate}`;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error('Error al obtener las llamadas');

        const data = await response.json();

        tableBody.innerHTML = '';

        data.calls.forEach((call) => {
            const row = `
                <tr>
                    <td>${call.call_start}</td>
                    <td>${call.called_number}</td>
                    <td>${call.effective_duration}</td>
                </tr>
            `;
            tableBody.insertAdjacentHTML('beforeend', row);
        });

        currentPage = data.currentPage;
        paginationInfo.textContent = `Página ${currentPage} de ${data.totalPages}`;

        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === data.totalPages;
    } catch (error) {
        console.error('Error al obtener las llamadas:', error);
        alert('Error al cargar los datos. Intente nuevamente.');
    }
};

prevButton.addEventListener('click', () => {
    if (currentPage > 1) fetchCalls(currentPage - 1, startDateInput.value, endDateInput.value);
});

nextButton.addEventListener('click', () => {
    fetchCalls(currentPage + 1, startDateInput.value, endDateInput.value);
});

filterButton.addEventListener('click', () => {
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;

    if (!startDate || !endDate) {
        alert('Por favor, seleccione ambas fechas.');
        return;
    }

    fetchCalls(1, startDate, endDate);
});

fetchCalls(currentPage);
