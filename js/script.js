let nextbtn = document.querySelectorAll("button[class = 'next']");
let backtbtn = document.querySelectorAll("button[type = 'back']");
let cont = document.querySelectorAll(".container");
let li = document.querySelectorAll(".parent aside ul li span");
let total = 0; // total price
li[0].style.backgroundColor = "rgb(90 204 255)";
let flag = false;
const input = document.querySelectorAll(".container .f-child .special");
let regE = "\+\d\s\d{3}\s\d{3}\s\d{3}";

input.forEach(e => {
 e.onblur = function(){
  if (e.value === ""){
   flag = false;
   e.style.border = '1px solid red';
   e.parentElement.firstElementChild.firstElementChild.style.opacity = "1"
  }else{
   e.style.border = '1px solid #9E9E9E';
   e.parentElement.firstElementChild.firstElementChild.style.opacity = "0"
   flag = true;
  }
 }
})

nextbtn.forEach(e=>{
 e.onclick = function(){
  event.preventDefault();
  if (flag){
   for(let i=0;i<nextbtn.length;i++){
    nextbtn[i].parentElement.parentElement.style.zIndex = "-1";
    li[i].style.backgroundColor = "transparent";
   }
   cont[e.id].style.zIndex = "2";
   li[e.id].style.backgroundColor = "rgb(90 204 255)";
  }
  else{
   input.forEach(inp => {
    if (e.value === ""){
     inp.style.border = '1px solid red';
     inp.parentElement.firstElementChild.firstElementChild.style.opacity = "1"
    }
   })
  }
 }
})

backtbtn.forEach((element,index)=>{
 element.onclick = function(){
  event.preventDefault();
  for(let i=0;i<cont.length;i++){
   cont[i].style.zIndex = "-1";
   li[i].style.backgroundColor = "transparent";
   li[i].style.color = "white";

  }
  cont[index].style.zIndex = "2";
  li[index].style.backgroundColor = "rgb(90 204 255)";
  li[index].style.color = "#3044af";

 }
})

const check = document.querySelector(".switch-d input[type = 'checkbox']");
let month = document.querySelectorAll(".month");
let year = document.querySelectorAll(".year");
let checked = document.querySelectorAll(".check input[type='radio']")
let monthly = true;
const addcheck = document.querySelectorAll(".third-s .f-child input[type='checkbox']")
let billLi = document.querySelectorAll(".forth-s .info ul li");



check.onchange = function (){
 if(!check.checked){  // month plane
  month.forEach((e) => {
   e.style.display = "block";
   let elements = document.querySelectorAll(".f-child .check label");
   elements.forEach(element=>{
    element.setAttribute("type","mo");
    element.setAttribute("value",element.parentElement.firstElementChild.value)
   })
  })
  monthly = true;
  document.querySelector(".info header").setAttribute('type',"mo")
  checked.forEach((e)=>{
  if(e.checked){
   document.querySelector(".info header").setAttribute('value',e.getAttribute("price"))
   total =  parseInt(document.querySelector(".info header").getAttribute("value"));
   document.querySelector("footer").setAttribute("value",total.toString());
  } 
  })
  reset()
  year.forEach((e) => {
   e.style.display = "none";
  })
 }else{ // year plane
  year.forEach((e) => {
   e.style.display = "block";
   let elements = document.querySelectorAll(".f-child .check label");
   elements.forEach(element=>{
    element.setAttribute("type","yr");
    element.setAttribute("value",element.parentElement.firstElementChild.value+"0")
   })
  })
  monthly = false;
  document.querySelector(".info header").setAttribute('type',"yr")
  checked.forEach((e)=>{
  if(e.checked){
   document.querySelector(".info header").setAttribute('value',e.getAttribute("price")+"0")
   total =  parseInt(document.querySelector(".info header").getAttribute("value"));
   document.querySelector("footer").setAttribute("value",total.toString());
  }
  })
  month.forEach((e) => {
   e.style.display = "none";
  })
  reset()
 }
 finalTotal()
}

checked.forEach((e)=>{
 e.onclick = ()=>{
  document.querySelector("h3[class='month']").innerHTML = e.value + "(Monthly)";
  document.querySelector("h3[class='year']").innerHTML = e.value + "(Yearly)";
  if (monthly){
   document.querySelector(".info header").setAttribute('type',"mo")
   document.querySelector(".info header").setAttribute('value',e.getAttribute("price"))
   total =  parseInt(document.querySelector(".info header").getAttribute("value"));
   document.querySelector("footer").setAttribute("value",total.toString());
  }else{
   document.querySelector(".info header").setAttribute('value',e.getAttribute("price")+"0")
   document.querySelector(".info header").setAttribute('type',"yr")
   total =  parseInt(document.querySelector(".info header").getAttribute("value"));
   document.querySelector("footer").setAttribute("value",total.toString());
  }
  reset()
 }
 console.log(total)
})

function reset (){
 addcheck.forEach((e,index) => {
  e.checked = false;
  changeTotal(e,index);
 })
 for(let i=0;i<billLi.length;i++){
  billLi[i].style.display = "none";
 }
}

// acces the ads-on and modifying the total price
function changeTotal(element,index){
 element.onclick= function(){
  if(monthly){
   billLi[index].style.display = "block";
   if(element.checked){
    total+= parseInt(billLi[index].getAttribute("value"));
    billLi[index].style.display = "block";
   }
   else{
    total-= parseInt(billLi[index].getAttribute("value"));
    billLi[index].style.display = "none";
   } 
  }else{
   if(element.checked){
    total+= parseInt(billLi[3 + index].getAttribute("value"));
    billLi[3+index].style.display = "block";
   }
   else {
    total-= parseInt(billLi[3 + index].getAttribute("value"));
    billLi[3+index].style.display = "none";
   } 
  }
  document.querySelector("footer").setAttribute("value",total.toString());
 }
}

addcheck.forEach((element,index) => {
 changeTotal(element,index)
})

function finalTotal(){
 if(monthly){
  document.querySelector("footer").innerText = "Total(Per month)";
  document.querySelector("footer").setAttribute("type","mo");
 }else{
  document.querySelector("footer").innerHTML = "Total(Per year)";
  document.querySelector("footer").setAttribute("type","yr");
  total*=10;
 }
}
