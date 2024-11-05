let titleInput = document.querySelector(".titleInput")
let priceInput = document.querySelector(".priceTitle")
let taxInput = document.querySelector(".taxTiltle")
let adsInput = document.querySelector(".adsTitle")
let disscountInput = document.querySelector(".disscountTitle")
let tootalPrice = document.querySelector(".total")
let deleteAll = document.querySelector(".delete-all")
let countInput = document.querySelector(".countInput")
let categoryInput = document.querySelector(".categoryInput")
let submit = document.querySelector(".submit")
let countDelete = document.querySelector(".count-delete")
let searchTitle = document.querySelector(".Search-By-Title")
let searchCategory = document.querySelector(".Search-By-Category")
let mySearch = document.querySelector(".my-search")
let mood = "create"
let updateIndex
let searchBy = "title"


// getTotal

function getTotal() {
    if (priceInput.value !== "") {
        total = +priceInput.value + +taxInput.value + +adsInput.value - (+disscountInput.value)
        tootalPrice.innerHTML = `Total : ${total} `
        tootalPrice.classList.add("bg-green-700")
    } else {
        tootalPrice.innerHTML = `Total : `
        tootalPrice.classList.remove("bg-green-700") 
    }
}

// createProduct
let Productlist 
if (localStorage.getItem("listOfProduct")) {
    Productlist = JSON.parse(localStorage.getItem("listOfProduct"))
    } else {
        Productlist = []
    }

submit.addEventListener("click",()=>{
   
        let newProduct = {
            title:titleInput.value,
            price:priceInput.value,
            tax:taxInput.value,
            ads:adsInput.value,
            discount:disscountInput.value,
            totalP:+priceInput.value + +taxInput.value + +adsInput.value - (+disscountInput.value),
            category:categoryInput.value
        }
    
    if (titleInput.value!== "" && priceInput.value !== "" && categoryInput.value !== "") {

                if (mood=== "create") {
                        if (+countInput.value < 100 || countInput.value === "") {
                            if(countInput.value !== "" ) {
                                for ( let i=0;i<countInput.value;i++) {
                                    Productlist.push(newProduct)
                                }
                        }
                     else {
                        Productlist.push(newProduct)
                    }
                        }
                } else {
                    Productlist [updateIndex] = newProduct
                    submit.innerHTML = "Create"
                    mood ="create"
                    countInput.style.display = "block"
                }
                clearData()
}

localStorage.setItem("listOfProduct",JSON.stringify(Productlist))
     
console.log(Productlist)
showData()

})


// showData
let tBody = document.querySelector(".tableBody")
function showData() {
    tBody.innerHTML = ""
for (let i=0 ; i<Productlist.length; i++) {
    tBody.innerHTML += `<tr class=" mb-5 ">
    <th class="px-3 py-2">${i+1}</th>
    <th class="px-3 py-2">${Productlist[i].title}</th>
    <th class="px-3 py-2">${Productlist[i].price}</th>
    <th class="px-3 py-2">${Productlist[i].tax}</th>
    <th class="px-3 py-2">${Productlist[i].ads}</th>
    <th class="px-3 py-2">${Productlist[i].discount}</th>
    <th class="px-3 py-2">${Productlist[i].totalP}</th>
    <th class="px-3 py-2">${Productlist[i].category}</th>
    <th onclick="updateProduct(${i})" class="px-3 py-2  bg-purple-900 hover:bg-purple-950 transition-all cursor-pointer rounded-2xl">Update</th>
    <th class="px-3 py-2"></th>
    <th onclick="deletOneProduct(${i})" class="px-3 py-2  bg-purple-900 hover:bg-purple-950 transition-all cursor-pointer rounded-2xl">Delete</th>
  </tr>`
}
if (Productlist.length > 0) {
    countDelete.innerHTML = Productlist.length
    deleteAll.style.display = "block"
} else {
    deleteAll.style.display = "none"
}


}

showData()


// deleteOneProduct

function deletOneProduct(i) { 
    Productlist.splice(i,1)
    localStorage.setItem("listOfProduct",JSON.stringify(Productlist))
    console.log(i)
    showData()

}

// deleteAllProduct
function deleteAllProduct() {
    Productlist.splice(0)
    localStorage.removeItem("listOfProduct")
    showData()
}

function updateProduct(i) {
    titleInput.value = Productlist[i].title
    priceInput.value = Productlist[i].price
    taxInput.value = Productlist[i].tax
    adsInput.value = Productlist[i].ads
    disscountInput.value = Productlist[i].discount
    categoryInput.value = Productlist[i].category
    window.scrollTo({
        top:0,
        behavior:"smooth",
    })
    getTotal()
    countInput.style.display = "none"
    submit.innerHTML = "Update"
    mood = "update"
    updateIndex = i

    console.log(Productlist[i].title)


}


function searchBytitle() {
    mySearch.placeholder = "Search By Title"
    mySearch.focus()
    console.log("hello")
    searchBy = "title"
}

function searchByCategory() {
    mySearch.placeholder = "Search By Category"
    mySearch.focus()
    searchBy = "category"
}

function searchProduct(value) {
    tBody.innerHTML=''
    if(searchBy === "title") {
        for(let i=0;i<Productlist.length ;i++){
            if (Productlist[i].title.toLowerCase().includes(value)) {
                tBody.innerHTML += `<tr class=" mb-5 ">
                <th class="px-3 py-2">${i+1}</th>
                <th class="px-3 py-2">${Productlist[i].title}</th>
                <th class="px-3 py-2">${Productlist[i].price}</th>
                <th class="px-3 py-2">${Productlist[i].tax}</th>
                <th class="px-3 py-2">${Productlist[i].ads}</th>
                <th class="px-3 py-2">${Productlist[i].discount}</th>
                <th class="px-3 py-2">${Productlist[i].totalP}</th>
                <th class="px-3 py-2">${Productlist[i].category}</th>
                <th onclick="updateProduct(${i})" class="px-3 py-2  bg-purple-900 hover:bg-purple-950 transition-all cursor-pointer rounded-2xl">Update</th>
                <th class="px-3 py-2"></th>
                <th onclick="deletOneProduct(${i})" class="px-3 py-2  bg-purple-900 hover:bg-purple-950 transition-all cursor-pointer rounded-2xl">Delete</th>
              </tr>`
              console.log(tBody.innerHTML)
            }
        }
    } else {
        for(let i=0;i<Productlist.length ;i++){
            if (Productlist[i].category.toLowerCase().includes(value)) {
                tBody.innerHTML += `<tr class=" mb-5 ">
                <th class="px-3 py-2">${i+1}</th>
                <th class="px-3 py-2">${Productlist[i].title}</th>
                <th class="px-3 py-2">${Productlist[i].price}</th>
                <th class="px-3 py-2">${Productlist[i].tax}</th>
                <th class="px-3 py-2">${Productlist[i].ads}</th>
                <th class="px-3 py-2">${Productlist[i].discount}</th>
                <th class="px-3 py-2">${Productlist[i].totalP}</th>
                <th class="px-3 py-2">${Productlist[i].category}</th>
                <th onclick="updateProduct(${i})" class="px-3 py-2  bg-purple-900 hover:bg-purple-950 transition-all cursor-pointer rounded-2xl">Update</th>
                <th class="px-3 py-2"></th>
                <th onclick="deletOneProduct(${i})" class="px-3 py-2  bg-purple-900 hover:bg-purple-950 transition-all cursor-pointer rounded-2xl">Delete</th>
              </tr>`
              console.log(tBody.innerHTML)
            }
        }
    }
}


// clearData
 function clearData() {
    titleInput.value =""
    priceInput.value =""
    adsInput.value =""
    taxInput.value = ""
    disscountInput.value= ""
    countInput.value =""
    categoryInput.value=""

}

















































































































// submit.addEventListener("click",(e)=>{

//     e.preventDefault()

    
    
//    if (countInput.value ===""){
//     countInput.value = 1
//     for(let i = 0;i<+countInput.value;i++) {
//         idCount++
// let myRows = document.createElement("div")
// myRows.classList.add("myrows", "flex", "items-center", "gap-5", "mb-5");
// let id = document.createElement("div")
// id.classList.add("flex-grow","flex", "items-center", "justify-center")
// id.innerHTML =  "#"+Math.trunc(Math.random() * 100000) + 1
// myRows.appendChild(id)
// let title = document.createElement("div")
// title.classList.add("flex-grow","myTitle","flex", "items-center", "justify-center")
// title.innerHTML = titleInput.value 
// myRows.appendChild(title)

// let Price = document.createElement("div")
// Price.classList.add("flex-grow","flex", "items-center", "justify-center")
// Price.innerHTML = priceInput.value 
// myRows.appendChild(Price)

// let Tax = document.createElement("div")
// Tax.classList.add("flex-grow","flex", "items-center", "justify-center")
// if (taxInput.value === "" ) {
//     Tax.innerHTML = 0
// } else {
//     Tax.innerHTML = taxInput.value 
// }
// myRows.appendChild(Tax)

// let ads = document.createElement("div")
// ads.classList.add("flex-grow","flex", "items-center", "justify-center")
// if (adsInput.value === "" ) {
//     ads.innerHTML = 0
// } else {
//     ads.innerHTML = adsInput.value 
//     }

// myRows.appendChild(ads)

// let discount = document.createElement("div")
// discount.classList.add("flex-grow","flex", "items-center", "justify-center")
// if (disscountInput.value === "" ) {
//     discount.innerHTML = 0
// } else {
//     discount.innerHTML = disscountInput.value 
//     }

// myRows.appendChild(discount)

// let Total = document.createElement("div")
// Total.classList.add("flex-grow","flex", "items-center", "justify-center")
// Total.innerHTML = eval(Price.innerHTML)+eval(Tax.innerHTML)+eval(ads.innerHTML)-eval(discount.innerHTML)

// myRows.appendChild(Total)

// let category = document.createElement("div")
// category.classList.add("flex-grow","myCategory","flex", "items-center", "justify-center")
// category.innerHTML = categoryInput.value 
// myRows.appendChild(category)

// let update = document.createElement("div")
// update.classList.add("update","flex", "items-center", "justify-center" , "flex-grow"   ,"bg-purple-900" ,"hover:bg-purple-950" ,"transition-all" ,"cursor-pointer" ,"rounded-2xl")
// update.innerHTML = "Update" 
// myRows.appendChild(update)

// let delet = document.createElement("div")
// delet.classList.add("delete" , "flex-grow"   ,"flex", "items-center", "justify-center","bg-purple-900" ,"hover:bg-purple-950" ,"transition-all" ,"cursor-pointer" ,"rounded-2xl")
// delet.innerHTML = "Delete" 
// myRows.appendChild(delet)

// countDelete.innerHTML= mydiv.children.length + 1
// mydiv.appendChild(myRows)
// localStorage.setItem("myStock",mydiv.innerHTML)

//     }

//    } else {
//     for(let i = 0;i<+countInput.value;i++) {
//         idCount++
// let myRows = document.createElement("div")
// myRows.classList.add("myrows", "flex", "items-center", "gap-5", "mb-5");
// let id = document.createElement("div")
// id.classList.add("flex-grow","flex", "items-center", "justify-center")
// id.innerHTML = "#"+Math.trunc(Math.random() * 1000) + 1
// myRows.appendChild(id)
// let title = document.createElement("div")
// title.classList.add("flex-grow","myTitle")
// title.innerHTML = titleInput.value 
// myRows.appendChild(title)

// let Price = document.createElement("div")
// Price.classList.add("flex-grow","flex", "items-center", "justify-center")
// Price.innerHTML = priceInput.value 
// myRows.appendChild(Price)

// let Tax = document.createElement("div")
// Tax.classList.add("flex-grow","flex", "items-center", "justify-center")
// if (taxInput.value === "" ) {
//     Tax.innerHTML = 0
// } else {
//     Tax.innerHTML = taxInput.value 
// }
// myRows.appendChild(Tax)

// let ads = document.createElement("div")
// ads.classList.add("flex-grow","flex", "items-center", "justify-center")
// if (adsInput.value === "" ) {
//     ads.innerHTML = 0
// } else {
//     ads.innerHTML = adsInput.value 
//     }

// myRows.appendChild(ads)

// let discount = document.createElement("div")
// discount.classList.add("flex-grow","flex", "items-center", "justify-center")
// if (disscountInput.value === "" ) {
//     discount.innerHTML = 0
// } else {
//     discount.innerHTML = disscountInput.value 
//     }

// myRows.appendChild(discount)

// let Total = document.createElement("div")
// Total.classList.add("flex-grow","flex", "items-center", "justify-center")
// Total.innerHTML = eval(Price.innerHTML)+eval(Tax.innerHTML)+eval(ads.innerHTML)-eval(discount.innerHTML)
// myRows.appendChild(Total)

// let category = document.createElement("div")
// category.classList.add("flex-grow","myCategory")
// category.innerHTML = categoryInput.value 
// myRows.appendChild(category)

// let update = document.createElement("div")
// update.classList.add("update" , "flex-grow"   ,"bg-purple-900" ,"hover:bg-purple-950" ,"transition-all" ,"cursor-pointer" ,"rounded-2xl","flex", "items-center", "justify-center")
// update.innerHTML = "Update" 
// myRows.appendChild(update)

// let delet = document.createElement("div")
// delet.classList.add("delete" , "flex-grow"   ,"bg-purple-900" ,"hover:bg-purple-950" ,"transition-all" ,"cursor-pointer" ,"rounded-2xl","flex", "items-center", "justify-center")
// delet.innerHTML = "Delete" 
// myRows.appendChild(delet)

// countDelete.innerHTML=mydiv.children.length + 1
// mydiv.appendChild(myRows)
// localStorage.setItem("myStock",mydiv.innerHTML)

//     }
       
//     }
// })

    

//     // let mydivfordelete= document.querySelector(".myrows")

//     // Délégation d'événements
//     mydiv.addEventListener("click", (event) => {
//         if (event.target.classList.contains("delete")) {
//             event.target.parentElement.remove();
//             // countDelete.textContent = parseInt(countDelete.textContent) - 1;
//             countDelete.innerHTML= mydiv.children.length 
//             localStorage.setItem("myStock",mydiv.innerHTML)
//         }
//     });

//     deleteAll.addEventListener("click", ()=>{
//         while (mydiv.firstChild) {
//             mydiv.removeChild(mydiv.firstChild);
//         }
//         countDelete.innerHTML= mydiv.children.length 
//         localStorage.setItem("myStock",mydiv.innerHTML)
//     })

//     if (localStorage.getItem("myStock")) {
//         mydiv.innerHTML = localStorage.getItem("myStock")
//         countDelete.innerHTML= mydiv.children.length 
        
//     }

//     let titleCat = document.querySelectorAll(".myTitle")
//     let myCategory = document.querySelectorAll(".myCategory") 

//     if(mydiv.children.length > 0) {
//         searchTitle.addEventListener("click",()=>{
//             titleCat.forEach((ev)=>{
//                 if (ev.innerHTML === mySearch.value ) {
//                     ev.parentElement.style.display = "flex";
//                 } else {
//                     ev.parentElement.style.display = "none";
//                 }
//             })
//         })

//         searchCategory.addEventListener("click",()=>{
//             myCategory.forEach((ev)=>{
//                 if (ev.innerHTML === mySearch.value ) {
//                     ev.parentElement.style.display = "flex";
//                 } else {
//                     ev.parentElement.style.display = "none";
//                     }
//             })
//         })
    

//     }

    

   
  

