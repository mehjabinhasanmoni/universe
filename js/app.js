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
  const showMore = document.getElementById("show-more");
  // Display 6 Ai Hubs only
//   aiHubs = aiHubs.slice(0, 6);

  //   Displays all Ai Hubs
  aiHubs.forEach((aiHub) => {
    const aiHubDiv = document.createElement("div");
    aiHubDiv.classList.add("col");
    aiHubDiv.innerHTML = `
          <div class="card h-100 p-4">
              <img src="${aiHub.image}" class="card-img-top" alt="...">
              <div class="card-body">
                  <h4 class="card-title">Features</h4>
                  <ol class="m-0 ps-4 text-left">
                  ${aiHub.features
                    .map((feature) => `<li class="my-2"> ${feature}</li>`)
                    .join("")}
                   </ol>
              </div>
              <div class="card-footer custom-card-footer d-flex align-items-center justify-content-between">
                  <div>
                      <h4 class="card-title ">${aiHub.name}</h4>
                      <i class="fa fa-calendar"></i> ${aiHub.published_in}
                  </div>
                  <i type="button" onclick ="loadAiHubsDetails('${
                    aiHub.id
                  }')" class="footer-right-arrow fa-solid fa-arrow-right-long" data-bs-toggle="modal" data-bs-target="#aiHubModal"></i>
              </div>
          </div>
          `;
    aiContainer.appendChild(aiHubDiv);
  });
};

// Load Show More
document
  .getElementById("btn-show-all")
  .addEventListener("click", function () {});

// For Modal Show

const loadAiHubsDetails = async (id) => {
  console.log("id", id);
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const res = await fetch(url);
  const data = await res.json();

  aiHubDetails(data.data);
};

const aiHubDetails = (aiHub) => {
  console.log(aiHub);
  console.log("Features:",Object.values(aiHub.features));
  const aiHubDetails = document.getElementById("aihub-details");
  const featuresList= Object.values(aiHub.features);
  aiHubDetails.innerHTML = `
    <div class="hub-info col-md-5">
    <div class="p-4 border-orange">
        <h3 class="description">${aiHub.description}</h3>
        <div class="hub-prices my-3 row">
        ${aiHub.pricing?aiHub.pricing.map(price=>`<div class="hub-price col-md-4 my-2 hub-price-${price.plan.toLowerCase()}"> <div class="p-4 bg-white rounded-3" >${price.price}</div></div>`).join(""):`<div class="hub-price col-md-12 my-2"> <div class="p-4 bg-white rounded-3" >FREE of Cost</div></div>`}

        </div>
        <div class="hub-lists row">
            <div class="col-md-6">
                <h3>Features</h3>
                <ul class="m-0 ps-3">
                
                ${featuresList
                    .map((feature) => `<li class="my-2 text-secondary"> ${feature.feature_name}</li>`)
                    .join("")}               
                </ul>
            </div>
            <div class="col-md-6">
                <h3>Integrations</h3>
                <ul class="text-left ps-3">
                ${aiHub.integrations?aiHub.integrations
                    .map((integration) => `<li class="my-2 text-secondary"> ${integration}</li>`)
                    .join(""):'<p class="text-secondary text-left">No Data Found</p>'}             
                </ul>
            </div>
        </div>
        </div>
    </div>

  
  <div class="hub-image col-md-5 text-center">
    <div class="p-4 border-secodary">
        <img src="${aiHub.image_link.length>0&&aiHub.image_link[0]}" alt="" class="w-100 rounded">
        <div class="qa mt-5">
        ${aiHub.input_output_examples?aiHub.input_output_examples.map(example=>`<div>${example.input&&`<h4>${example.input}</h4>`} ${example.output?`<p class="text-secondary">${example.output}</p>`:`<p  class="text-secondary">No! Not Yet! Take a break!!!</p>`} </div>`).join(""):'<div><h4>Can you give any example?</h4><p  class="text-secondary">No! Not Yet! Take a break!!!</p></div>'}
        </div>
        ${aiHub.accuracy.score?`<span class="accuracy btn btn-danger">${aiHub.accuracy.score*100}% accuracy</span>`:""}
    </div>
  </div>
   
    `;
};

loadUniverseAi();
loadAiHubsDetails("01");
