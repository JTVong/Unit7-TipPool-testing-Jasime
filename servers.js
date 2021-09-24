const serverName = document.querySelector("#server-name");
const serverForm = document.querySelector("#server-form");
const serverTable = document.querySelector("#server-earning-summary");
const allServerName = [];

const checkDecimal2 = (number) => {
  if (Math.round(number) === number) {
    return number;
  } else {
    return number.toFixed(2);
  }
};

serverForm.addEventListener("submit", (e) => {
  e.preventDefault();
  allServerName.push(serverName.value.trim().toLowerCase());
  if (
    allServerName.length === [...new Set(allServerName)].length &&
    serverName.value.trim().length
  ) {
    appendData();
    const allServer = document.querySelectorAll(
      "#server-earning-summary tr td:last-Child"
    );
    let totalTip = document
      .querySelector("#shift-summary tr td:nth-child(2)")
      .innerText.split("$")[1];
    totalTip = Number(totalTip);
    if (totalTip) {
      allServer.forEach((el) => {
        el.innerText = `$${checkDecimal2(totalTip / allServer.length)}`;
      });
    }
  } else {
    allServerName.pop();
    serverName.value = "";
  }
});

const appendData = () => {
  const dataRow = document.createElement("tr");
  const name = document.createElement("td");
  name.innerText = serverName.value;
  serverName.value = "";
  const earning = document.createElement("td");
  earning.innerText = "$0";
  dataRow.append(name, earning);
  serverTable.append(dataRow);
}

