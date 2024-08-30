export const getDataApi = async (url, options = {}) => {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        try {
            const data = await response.json();
            return data;
        } catch (jsonError) {
            throw new Error('Error al parsear la respuesta en formato JSON');
        }
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
};
