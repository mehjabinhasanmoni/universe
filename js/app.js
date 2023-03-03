const loadUniverseAi = async () => {
  const loading = document.getElementById("loader");
  loading.style.display = "flex";
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  const res = await fetch(url);

  const data = await res.json();
  console.log("data", data);
  if (data.status) {
    loading.style.display = "none";
    displayAiHubs(data.data.tools);
  }
};
const displayAiHubs = (aiHubs) => {
  const aiContainer = document.getElementById("ai-container");
  aiHubs.forEach((aiHub) => {
    const aiHubDiv = document.createElement("div");
    aiHubDiv.classList.add("col");
    aiHubDiv.innerHTML = `
        <div class="card h-100 p-4">
            <img src="${aiHub.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h4 class="card-title">Features</h4>
                <ol class="m-0 ps-4">
                ${aiHub.features
                  .map((feature) => `<li class="my-2"> ${feature}</li>`)
                  .join("")}
                 </ol>
            </div>
            <div class="card-footer custom-card-footer d-flex align-items-center justify-content-between">
                <div>
                    <h5 class="card-title ">${aiHub.name}</h5>
                    <i class="fa fa-calendar"></i> ${aiHub.published_in}
                </div>
                <i class="footer-right-arrow fa-solid fa-arrow-right-long"></i>
            </div>
        </div>
        `;
    aiContainer.appendChild(aiHubDiv);
  });
};

loadUniverseAi();
