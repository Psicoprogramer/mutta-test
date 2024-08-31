class ApiServices {
    constructor(apiUrl) {
        this.baseUrl = apiUrl;
    }

    async fetchData(offset) {
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${20 * offset}`);
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            const data = await res.json();
            return data.results;
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    }

    async fetchSingleData(id) {
        try {
            const res = await fetch(`${this.baseUrl}/${id}`);
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            const data = await res.json();
            return data;
        } catch (error) {
            console.error('Error fetching single data:', error);
            return null;  // Podría devolver null en lugar de [] para indicar que no se encontró nada
        }
    }

    async getTotalPages() {
        try {
            const res = await fetch(this.baseUrl);
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            const data = await res.json();
            return parseInt(data.info?.pages, 10) || 1;
        } catch (error) {
            console.error('Error fetching total pages:', error);
            return 1;  // Valor por defecto en caso de error
        }
    }
}

export default ApiServices;
