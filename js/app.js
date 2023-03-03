const loadUniverseAi = async() =>{
    const loading = document.getElementById('loader');
    loading.style.display = 'flex';
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);

    const data = await res.json();
    console.log("data",data);
    if(data.status){
        loading.style.display = 'none';
        displayAiHubs(data.data.tools);
    }

   

}
const displayAiHubs = aiHubs =>{
    const aiContainer = document.getElementById('ai-container');
    aiHubs.forEach(aiHub =>{
        const aiHubDiv = document.createElement('div');
        aiHubDiv.classList.add('col');
        aiHubDiv.innerHTML = `
        <div class="card h-100 p-4">
            <img src="${aiHub.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Features</h5>
                forEach
            </div>
            <div class="card-footer">
            <h5 class="card-title">${aiHub.name}</h5>
                <small class="text-muted">Last updated 3 mins ago</small>
            </div>
        </div>
        `;
        aiContainer.appendChild(aiHubDiv);
        
    })

};


loadUniverseAi();