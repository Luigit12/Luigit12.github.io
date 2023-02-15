
//nice theme : '{"result":[[242,242,240],[150,149,149],[116,116,115],[60,139,172],[52,46,54]]}'

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
var links = document.getElementsByTagName("a");
for(var i=0;i<links.length;i++) {
		if(links[i].href)
		{
			links[i].style.color = `rgb(${response.result[3][0]},${response.result[3][1]},${response.result[3][2]})`;
		}
	}
}