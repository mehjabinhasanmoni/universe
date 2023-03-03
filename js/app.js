const loadUniverseAi = async() =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools `
    const res = await fetch(url);
    const data = await res.json();
    displayAiHub(data.data);

}
const displayAiHub = aiHub =>{
    console.log(aiHub);
}


loadUniverseAi();