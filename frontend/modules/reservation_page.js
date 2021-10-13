import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{

    let part=await fetch(config.backendEndpoint+"/reservations/").then(data=>data.json());
   
    return part;
  }
  catch(e)
  {
    return null;
  }

  // Place holder for functionality to work in the Stubs

}







//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS

  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format DD/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

if(reservations.length>0){
  document.getElementById("no-reservation-banner").style.display="none";
  document.getElementById("reservation-table-parent").style.display="block";
  let reservation_table=document.getElementById("reservation-table");

  reservations.map(ele=>{
  let tr=document.createElement("tr");
  tr.className="table";

 
  tr.innerHTML=`
  <td scope="col"> ${ele.id}</td>
  <td scope="col">${ele.name}</td>
  <td scope="col">${ele.adventureName}</td>
  <td scope="col">${ele.person}</td>
  
  <td scope="col">${new Date(ele.date).toLocaleDateString('en-IN')}</td>

  <td scope="col">${ele.price}</td>
  <td scope="col">${new Date(ele.time).toLocaleString("en-IN", {
    year: "numeric",
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true})}</td>
  
  
  
<td><div class="reservation-visit-button" id="${ele.id}"> 
<a href="../detail/?adventure=${ele.adventure}">
    Visit Advenutre
   </a>
   </div>
</td>`
// <button class="reservation-visit-button" >
  //   <a href="../detail/?adventure=${ele.adventure}&id=${ele.id}">
  //     Visit Advenutre
  //    </a>
  // </button>`

 
  document.getElementById("reservation-table").appendChild(tr);
  })

 
}


else{
  document.getElementById("no-reservation-banner").style.display="block";
  document.getElementById("reservation-table-parent").style.display="none";
}



}

export { fetchReservations, addReservationToTable };
