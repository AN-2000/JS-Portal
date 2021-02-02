this.onmessage = function (e) {

    let code = "let arr = [];\n"
    code += e.data.code.replaceAll("console.log", "arr.push")
    code+=";\nreturn arr; "
    let f = new Function(code);
  this.postMessage({ result: f().join("<br>") });
};
