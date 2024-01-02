const url = 'http://localhost:3000/musicInfo'

const getData = async () => {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Failed to fetch, status: ${response.status}`);
    }

    return await response.json();
}
export default getData;