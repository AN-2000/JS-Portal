let body = document.querySelector("body");
let addBtn = document.querySelector(".add-btn");
let switchBtn = document.querySelector(".web-worker-switcher");

function runCode(code, el) {
  if (Array.from(switchBtn.classList).includes("green")) {
    let worker = new Worker("worker.js");
    worker.postMessage({ code });
    worker.onmessage = function (e) {
      el.innerHTML = e.data.result;
      worker.terminate();
    };
  } else {
    let cCode = "let arr = [];\n";
    cCode += code.replaceAll("console.log", "arr.push");
    cCode += ";\nreturn arr; ";
    let f = new Function(cCode);
    el.innerHTML = f().join("<br>");
  }
}

const uid = function () {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

switchBtn.addEventListener("click", function () {
  if (Array.from(switchBtn.classList).includes("green")) {
    switchBtn.classList.remove("green");
    switchBtn.classList.add("red");
    switchBtn.innerText = "OFF";
  } else {
    switchBtn.classList.add("green");
    switchBtn.classList.remove("red");
    switchBtn.innerText = "ON";
  }
});

addBtn.addEventListener("click", function () {
  let container = document.createElement("div");
  let id = uid();
  container.classList.add("container");
  container.innerHTML = ` <div class="user-input">
        <div class="code">
          <div class="header">
            <span> Code </span>
            <span class="run ${id}"> Run </span>
          </div>
          <div class="writing-area ${id}" contenteditable="true"></div>
        </div>
        <div class="input">
          <div class="header">
            <span> Output </span>
          </div>
          <div class="output-area ${id}"></div>
        </div>
      </div>`;
  container.querySelector(`.run.${id}`).addEventListener("click", function () {
    runCode(
      document.querySelector(`.code .writing-area.${id}`).innerText,
      container.querySelector(`.output-area.${id}`)
    );
  });
  body.appendChild(container);
});

addBtn.click();
