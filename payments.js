const billAmount = document.querySelector("#bill-amount");
const tipAmount = document.querySelector("#tip-amount");
const paymentForm = document.querySelector("#payment-form");
const billTable = document.querySelector("#bill-summary");
const shiftSummary = document.querySelector("#shift-summary");
let billTotal = 0;
let tipTotal = 0;
let percentAvg = 0;
let tipPercenTotal = 0;
let tipPercent;

paymentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (billAmount.value !== "0") {
    tipPercent = Math.round((tipAmount.value / billAmount.value) * 100);
    let billAmountFormat = Number(billAmount.value).toLocaleString("en-US");
    let tipAmountFormat = Number(tipAmount.value).toLocaleString("en-US");
    generateDataRow(
      generateDataColumn(
        `$${billAmountFormat}`,
        `$${tipAmountFormat}`,
        `${tipPercent}%`
      ),
      billTable
    );
    summaryBill();
    updateServerTip();

    tipAmount.value = "";
    billAmount.value = "";
  } else {
    billAmount.value = "";
  }
});

function generateDataColumn() {
  // using function instead of arrow function because using arguements
  let inputArray = [];
  for (let el of arguments) {
    const dataColumn = document.createElement("td");
    dataColumn.innerText = el;
    inputArray.push(dataColumn);
  }
  return inputArray;
}

const generateDataRow = (dataArray, table) => {
  const dataRow = document.createElement("tr");
  dataArray.forEach((el) => {
    dataRow.append(el);
  });
  table.append(dataRow);
};

const updateServerTip = () => {
  const allServer = document.querySelectorAll(
    "#server-earning-summary tr td:nth-child(2)"
  );
  let numberServer = allServer.length;
  let eachTip = checkDecimal(tipTotal / numberServer);
  allServer.forEach((el) => (el.innerText = `$${eachTip}`));
};

const summaryBill = () => {
  billTotal += Number(billAmount.value);
  tipTotal += Number(tipAmount.value);
  tipPercenTotal += tipPercent;
  percentAvg = checkDecimal(tipPercenTotal / (billTable.children.length - 1));
  shiftSummary.lastChild.children[1].children[0].innerText = `$${billTotal}`;
  shiftSummary.lastChild.children[1].children[1].innerText = `$${tipTotal}`;
  shiftSummary.lastChild.children[1].children[2].innerText = `${percentAvg}%`;
};

const checkDecimal = (number) => {
  if (Math.round(number) === number) {
    return number;
  } else {
    return number.toFixed(2);
  }
};
