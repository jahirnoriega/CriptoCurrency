const form = document.querySelector("#formulario");
const messageContainer = document.querySelector("#message-container");
window.addEventListener("DOMContentLoaded", () => {
  form.addEventListener("submit", formValidation);
});

function formValidation(e) {
  e.preventDefault();
  const cripto = document.querySelector("#criptomonedas").value;
  const currency = document.querySelector("#moneda").value;
  if (cripto === "" || currency === "") {
    showMessage("Please select valid currency or critpo.");
    return;
  }
  getCripto(cripto, currency);
}

async function getCripto(cripto, currency) {
  /* ----------------- Get to know the time performance of the code ---------------- */
  const start = performance.now();

  const url =
    "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" +
    cripto +
    "&tsyms=" +
    currency;
  try {
    const result = await fetch(url);
    const response = await result.json();
    data = await showResult(response.DISPLAY[cripto][currency]);
  } catch (e) {
    showMessage(e);
  }

  const end = performance.now();
}

function showMessage(message) {
  const alertExist = document.querySelector(".message-container-error");
  if (alertExist) return;
  const text = document.createElement("p");
  text.textContent = message;
  messageContainer.classList.add("message-container-error");
  messageContainer.appendChild(text);
  setTimeout(() => {
    messageContainer.classList.remove("message-container-error");
    text.remove();
  }, 3000);
}

function showResult(result) {
  const resultContainer = document.querySelector("#resultado");
  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } = result;
  while (resultContainer.firstChild) {
    resultContainer.removeChild(resultContainer.firstChild);
  }

  const priceCripto = document.createElement("p");
  priceCripto.classList.add("precio");
  priceCripto.textContent = "The PRICE is: " + PRICE;

  const higherPrice = document.createElement("p");
  higherPrice.textContent = "The HIGHER price of the day is: " + HIGHDAY;

  const lowerPrice = document.createElement("p");
  lowerPrice.textContent = "The LOWER price of the day is: " + LOWDAY;

  const changePct = document.createElement("p");
  changePct.textContent =
    "The the PERCENTAGE of change is: " + CHANGEPCT24HOUR + "%";

  const lastUpdateCurrency = document.createElement("p");
  lastUpdateCurrency.textContent = "The LAST update was: " + LASTUPDATE;

  resultContainer.appendChild(priceCripto);
  resultContainer.appendChild(higherPrice);
  resultContainer.appendChild(lowerPrice);
  resultContainer.appendChild(changePct);
  resultContainer.appendChild(lastUpdateCurrency);
}
