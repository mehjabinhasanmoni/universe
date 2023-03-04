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
                  <ol class="m-0 ps-4">
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
  const aiHubDetails = document.getElementById("aihub-details");
  const featuresList=
  aiHubDetails.innerHTML = `
    <div class="hub-info col-md-5">
        <h3>${aiHub.description}</h3>
        <div class="hub-price-info row">
            <div class="hub-price col-md-4 hub-price-green"> <div >$10/Month basic</div></div>
            <div class="hub-price col-md-4 hub-price-orange"> <div >$10/Month basic</div></div>
            <div class="hub-price col-md-4 hub-price-red"> <div >$10/Month basic</div></div>
        </div>
        <div class="hub-lists row">
            <div class="col-md-6">
                <h2>Features</h2>
                <ul>
                    <li>Item One</li>                
                    <li>Item Two</li>                
                </ul>
            </div>
            <div class="col-md-6">
            <h2>Integrations</h2>
            <ul>
                <li>Item One</li>                
                <li>Item Two</li>                
            </ul>
        </div>
        </div>
    </div>

  
  <div class="hub-image col-md-5">
    <img src="${aiHub.image_link.length>0&&aiHub.image_link[0]}" alt="" class="w-100 rounded">
  </div>
    `;
};

loadUniverseAi();
loadAiHubsDetails("01");
