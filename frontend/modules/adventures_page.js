
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it

  search=search.slice(1);
  search=search.replace(/=/g,'":"');
  search='{"'+search+'"}';
  var obj=JSON.parse(search);
  // console.log(obj.city);
  return obj.city;


  

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
  let data=await fetch(config.backendEndpoint+"/adventures?city="+city);
  let res = await data.json();
  let AdventureResult=[];
  res.forEach((d,a)=>{
    // console.log(d.name)
    AdventureResult[a]=d;
  })
  return AdventureResult;
}
catch (e) {
    return null;
  }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach(ele=>{
    let res=document.createElement("div");
    res.className="col-6 col-lg-3 flex mb-5";
    res.innerHTML=`<a href="detail/?adventure=${ele.id}" id=${ele.id}>
    
    <div class="activity-card">
          <img src="${ele.image}">
          <div class="category-banner">
            <h6>${ele.category}</h6>
          </div>
          <div class="d-flex mb-2">
            <div class="mr-5 p-2">
              <h6>${ele.name}</h6>
            </div>
            <div class="p-2 ml-auto">
              <h6>&#8377;${ele.costPerHead}</h6>
            </div>
          </div>
          
          <div class="d-flex mb-2">
            <div class="mr-5 p-2">
              <h6>Duration</h6>
            </div>
            <div class="p-2 ml-5">
              <h6>${ele.duration}</h6>
            </div>
         </div> 
        </div>
    </a>`
    
    
    document.getElementById('data').append(res);
    
    
  })
  


}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  
let d=list.filter(e=>{
 if(e.duration>=low && e.duration<=high)
 return e
})


  console.log(d)
  return d




}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list

let bigCities = list.filter((e)=>
   {
       let flag=false;
       categoryList.forEach(z=>
          {
            if(z==e.category)
             flag=true;
          })
          if(flag)
          {
            return e;
          }else
          {
            return null;
          }
    
        });
        // console.log(categoryList);
        return bigCities;
        
        
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  
  // Place holder for functionality to work in the Stubs

  console.log(filters);
let filterlist=list;

let d=filters.duration.split("-");

if(filters.duration.length>0 && filters.category.length>0){
  console.log("both")
  filterlist=filterByCategory(list,filters.category);
  filterlist=filterByDuration(filterlist,d[0],d[1]);
}
else if(filters.duration.length>0)
{
  // console.log(d[0],d[1]);

  console.log("only duration")
  filterlist=filterByDuration(list,d[0],d[1]);
}
else if(filters.category.length>0)
{
  console.log("only category")
  filterlist=filterByCategory(list,filters.category);
}

// console.log(filterlist)
  return filterlist;


  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters to localStorage using JSON.stringify()
// const myJson=JSON.stringify(filters)
window.localStorage.setItem("filters",JSON.stringify(filters));
  
return true;

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return in JSON format
JSON.parse(window.localStorage.getItem('filters'));


  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter and Generate Category Pills
   
let le=[];
filters.category.forEach(e=>
  {
    if(e in le==false)
    {
      le.push(e);
    }
  })
console.log(le)

 let d=document.querySelector("#category-section>#category-list");
//  div.innerHTML="";
 le.forEach(e=>
  {
    let div=document.createElement("div");
    div.className="category-filter";
    div.append(`${e}`);
    d.append(div);

  })
  
 
 
 }


 export {

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
