
//nice theme : '{"result":[[242,242,240],[150,149,149],[116,116,115],[60,139,172],[52,46,54]]}'

window.onload = () => {
	localColorTheme = localStorage.getItem('colorTheme');
	if (localColorTheme) {
		changeColors(JSON.parse(localColorTheme));
	} else {
		getNiceColors();
	}
}

function getNiceColors() {
	const json_data = {
		"mode":"transformer",
		"num_colors":"4",
		"temperature":"2.4",
		"num_results":"1",
		"adjacency":[ "0", "10", "65", "45", 
			"0", "0", "45", "30",
			"0", "0", "0", "0",
			"0", "0", "0", "0"],
		"palette":["-", "-", "-", "-"]
	}

	fetch("https://api.huemint.com/color", {
	"headers": {
	"accept": "*/*",
	"accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
	"content-type": "application/json; charset=utf-8",
	"dataType": "json"
	},
	"body": JSON.stringify(json_data),
	"method": "POST"
	}).then((response) => response.json())
	.then((responseJson) => {
		changeColors(responseJson);
		localStorage.setItem('colorTheme', JSON.stringify(responseJson));
	})
}

function getNiceColors2 () { 
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
document.body.style.backgroundColor = response.results[0].palette[2];
document.body.style.color = response.results[0].palette[0];

var h1Elements = document.getElementsByTagName("h1");
for(var i = 0; i < h1Elements.length; i++) {
	h1Elements[i].style.backgroundColor = response.results[0].palette[3];
	h1Elements[i].style.color = response.results[0].palette[0];
}
var links = document.getElementsByTagName("a");
for(var i=0;i<links.length;i++) {
		if(links[i].href)
		{
			links[i].style.color = response.results[0].palette[0];
		}
	}
}
