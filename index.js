const BaseURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg")

for (let select of dropdowns) {
  for (let currcode in countryList) {
    let newopt = document.createElement("option");
    newopt.innerText = currcode;
    
    if (select.name === "from" && currcode === "USD") {
        newopt.selected = "selected";
      } else if (select.name === "to" && currcode === "INR") {
        newopt.selected = "selected";
      }
    select.append(newopt);
  }
  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
}

const updateFlag = (ele) => {
  let currcode = ele.value;
  let countrycode = countryList[currcode];
  let img = ele.parentElement.querySelector("img");
  let newlink = `https://flagsapi.com/${countrycode}/flat/64.png`;
  img.src = newlink;
};

btn.addEventListener("click", async (e) => {
  let inp = document.querySelector(".amount input");
  let amt = inp.value;
  if (amt === "" || amt < 1) {
    amt = 1;
    inp.value = 1;
  }
//   console.log(fromCurr.value, toCurr.value);

  const URL = `${BaseURL}/${fromCurr.value.toLowerCase()}.json`;

  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

  let finalamt = amt * rate;
  msg.innerText =  `* ${amt} ${fromCurr.value} = ${finalamt} ${toCurr.value}`;

});
