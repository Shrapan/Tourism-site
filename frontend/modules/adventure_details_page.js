import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  
  
  // var foo = search.get('adventure')
  // console.log(foo)

  const params = new URL(`https://example.com${search}`).searchParams;
 
  return  params.get('adventure')


  
  // search=search.slice(1);
  // search=search.replace(/=/g,'":"');
  // search='{"'+search+'"}';
  // var obj=JSON.parse(search);
  // // console.log(obj.adventure);

  // return obj.adventure;



 
}




  // Place holder for functionality to work in the Stubs

//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
let url=config.backendEndpoint+"/adventures/detail?adventure="+adventureId;
try{  
let detail=await fetch(url).then(res=>res.json());
  // console.log(adventureId)

  // Place holder for functionality to work in the Stubs
  return detail;
}catch(e)
{
  return null;
}
}


  // Place holder for functionality to work in the Stubs

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  console.log(adventure)
 document.getElementById("adventure-name").innerHTML=adventure.name;
document.getElementById("adventure-subtitle").innerHTML=adventure.subtitle;

let photo_gallery=document.getElementById("photo-gallery");
adventure.images.map(ele=>{
  let div=document.createElement("div");
  div.innerHTML=`<img src="${ele}" class="activity-card-image" style="width: 100%">`;
photo_gallery.append(div);

})

document.getElementById("adventure-content").innerHTML=adventure.content;


}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images







document.getElementById("photo-gallery").innerHTML=`<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
<ol class="carousel-indicators">
  <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
  <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
  <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
</ol>
<div class="carousel-inner">
  
</div>
<a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="sr-only">Previous</span>
</a>
<a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
  <span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="sr-only">Next</span>
</a>
</div>`


let carousel_inner=document.querySelector("#carouselExampleIndicators > div");

{/* <div class="carousel-item active">
<img class="d-block w-100" src="..." alt="First slide">
</div> */}

// let image=images.length;

let count=0;
images.forEach(e=>{
let div=document.createElement("div");
if(count==0)
{
  div.className="carousel-item active";
}
else{
  div.className="carousel-item";
}



// updated here
div.innerHTML=`<img class="d-block w-100" src="${e}" style="height:40rem" alt="${count}"></img>`;
carousel_inner.append(div);
count++;
})





}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.

  if(adventure.available==true)
{
document.getElementById("reservation-panel-sold-out").style.display="none";
document.getElementById("reservation-panel-available").style.display="block";
document.getElementById("reservation-person-cost").innerHTML=adventure.costPerHead;

}
else{
  document.getElementById("reservation-panel-sold-out").style.display="block";
  document.getElementById("reservation-panel-available").style.display="none";
 
  

}


}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let cost=adventure.costPerHead*persons;
  document.getElementById("reservation-cost").innerHTML=cost;

}

//Implementation of reservation form submission using JQuery
function captureFormSubmitUsingJQuery(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using JQuery to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  $( "#myForm" ).submit(function( event ) {
    event.preventDefault();
    let formData=$(this).serialize();

    $.ajax({
      method:"POST",
      url:config.backendEndpoint+"/reservations/new",
      data:formData+`&adventure=${adventure.id}`,
      success:function(data)
      {
        
      alert("Success!");
      location.reload()
      }
    ,
      error:function()
      {
        alert("Failed!");
       }
      
    });
  });



  
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved)
  {
    document.getElementById("reserved-banner").style.display="block";
  }
  else{
    document.getElementById("reserved-banner").style.display="none";
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmitUsingJQuery,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
}

