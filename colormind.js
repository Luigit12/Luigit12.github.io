//let defaultColorTheme = {"result":[[236,231,203],[83,191,182],[49,115,101],[86,162,159],[39,29,50]]};

  window.onload = () => {
    localColorTheme = localStorage.getItem('colorTheme');
    if (localColorTheme) {
      changeColors(JSON.parse(localColorTheme));
    } else {
      getNiceColors();
    }
  }
  
  function getNiceColors () { 
  fetch("http://colormind.io/api/", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
    "content-type": "text/plain;charset=UTF-8",
  },
  "body": "{\"model\":\"ui\"}",
  "method": "POST"
}).then((response) => response.json())
  .then((responseJson) => {
    changeColors(responseJson);
    localStorage.setItem('colorTheme', JSON.stringify(responseJson));
  })
  }

  function changeColors (response) {
    document.body.style.backgroundColor = `rgb(${response.result[0][0]},${response.result[0][1]},${response.result[0][2]})`;
    document.body.style.color = `rgb(${response.result[2][0]},${response.result[2][1]},${response.result[2][2]})`;
    
    var h1Elements = document.getElementsByTagName("h1");
    for(var i = 0; i < h1Elements.length; i++) {
      h1Elements[i].style.backgroundColor = `rgb(${response.result[1][0]},${response.result[1][1]},${response.result[1][2]})`;
      h1Elements[i].style.color = `rgb(${response.result[4][0]},${response.result[4][1]},${response.result[4][2]})`;
    }
  }
