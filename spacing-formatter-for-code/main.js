$(document).ready(function() {
  var languagesId = "";
  languagesId += "#python-code textarea" + ",";
  languagesId += "#java-code textarea" + ",";
  languagesId += "#cpp-code textarea" + ",";
  languagesId += "#c-code textarea";

  var str,
    cStr = "",
    cppStr = "",
    javaStr = "",
    pythonStr = "";

  $(languagesId).on("focusout", function() {
    switch (this.className) {
      case "c-code":
        str = replaceSpace(this.value);
        if (str !== "") {
          str = replaceSymbols(str);
          cStr = wrapCodeHtml(str, this.className);
        } else {
          cStr = "";
        }

        break;
      case "cpp-code":
        str = replaceSpace(this.value);
        if (str !== "") {
          str = replaceSymbols(str);
          cppStr = wrapCodeHtml(str, this.className);
        } else {
          cppStr = "";
        }
        break;
      case "java-code":
        str = replaceSpace(this.value);
        if (str !== "") {
          str = replaceSymbols(str);
          javaStr = wrapCodeHtml(str, this.className);
        } else {
          javaStr = "";
        }
        break;
      case "python-code":
        str = replacePythonSpace(this.value);
        if (str !== "") {
          str = replaceSymbols(str);
          pythonStr = wrapCodeHtml(str, this.className);
        } else {
          pythonStr = "";
        }
        break;
    }

    var finalHtml = "";

    if (cStr != "" || pythonStr != "" || javaStr != "" || cppStr != "") {
      finalHtml += '<div class="dsa-examples"><ul>';
      if (pythonStr.length !== 0)
        finalHtml += '<li><a href="#python-code">Python</a></li>';
      if (javaStr.length !== 0)
        finalHtml += '<li><a href="#java-code">Java</a></li>';
      if (cStr.length !== 0) finalHtml += '<li><a href="#c-code">C</a></li>';
      if (cppStr.length !== 0)
        finalHtml += '<li><a href="#cpp-code">C+</a></li>';
      finalHtml += "</ul>";
    }
    // var finalHtml =
    //   '<div class="dsa-examples">' +
    //   "<ul>" +
    //   '<li><a href="#python-code">Python</a></li>' +
    //   '<li><a href="#java-code">Java</a></li>' +
    //   '<li><a href="#cpp-code">C++</a></li>' +
    //   '<li><a href="#c-code">C</a></li></ul>';

    if (pythonStr.length !== 0) finalHtml += pythonStr;
    if (javaStr.length !== 0) finalHtml += javaStr;
    if (cStr.length !== 0) finalHtml += cStr;
    if (cppStr.length !== 0) finalHtml += cppStr;

    finalHtml += "</div>";

    // var htmlToShow = tidy_html5(finalHtml, options);
    var htmlToShow = finalHtml;

    if ($(".output-area").length !== 0) {
      $(".output-area").remove();
    }

    $(".output").append(
      "<textarea class='output-area'>" + htmlToShow + "</textarea>"
    );

    console.log(htmlToShow);
  });

  $("#copy-code").on("click", function(e) {
    e.preventDefault();
    var temp = $(".output-area")[0];
    temp.select();
    document.execCommand("copy");
  });
});

function wrapCodeHtml(str, id) {
  str = '<pre class="exec"><code>' + str + "</code></pre>";
  str = '<div id="' + id + '">' + str + "</div>";

  return str;
}

function replaceSpace(str) {
  var tokens = str.split("    ");
  var stripped = tokens.join("  ");
  return stripped;
}

function replacePythonSpace(str) {
  var tokens = str.split("    ");
  var stripped = tokens.join("    ");
  return stripped;
}

function replaceSymbols(str) {
  var tokens = str.split("<");
  tokens = tokens.join("&lt;");
  tokens = tokens.split(">");
  tokens = tokens.join("&gt;");
  tokens = tokens.split("&");
  stripped = tokens.join("&amp;");

  return stripped;
}
