var globalAudio = null;
var globalWaifu = 'honoka';
var maxNumOfCard = 960;

setTimeout(function() {
    commandSelect(0);
}, 1000)



function refreshBubble()
{
	$(document).ready(function(){
		$("#speech-bubble").hide();
		$("#speech-bubble").fadeIn();
	});
}

function isInt(value) {
  return !isNaN(value) && 
         parseInt(Number(value)) == value && 
         !isNaN(parseInt(value, 10));
}


function searchId()
{

	var id = document.getElementById("card_id").value;
	var idolized = $('input[id="radio-idol"]:checked').val();

	var e = document.getElementById("idol-select");
	var name = e.options[e.selectedIndex].value;
	

	if(!isInt(id) || id > maxNumOfCard){
		alert('Invalid id input');
		return;
	} 
	

	var strAPI = 'https://schoolido.lu/api/cards/'.concat(id);
	

	// Once we get the info, get the image
	var path;
	var realpath;
	if(idolized == 'yes')
	{
		path = "./scraped-images/" + name + "/" + id + "_id.png";
		realpath = 'https://llsif-waifu-sim.github.io/scraped-images/' + name + '/' + id + '_id.png';
	}else{
		path = "./scraped-images/" + name +  "/" + id + ".png";
		realpath = 'https://llsif-waifu-sim.github.io/scraped-images/' + name + '/' + id + '.png';
	}



	$.ajax({
	    url:path,
	    type:'HEAD',
	    error: function()
	    {
	        //file not exists
	        alert('Idol not found. Please double check the card id, idol name, and whether or not there exists an idolized or non-idolized version');
			commandSelect(0);
			return;
	    },
	    success: function()
	    {
	        //file exists
	        document.getElementById("idol_img").src=path;

			globalWaifu = name;

			if (globalAudio!=null){
				globalAudio.pause();
			}


			setTimeout(function() {
				commandSelect(0);
			}, 500)
			  }
		});

}


function changeWaifu(name){

	var path = "images/" + name +"0.png";
	document.getElementById("idol_img").src=path;

	globalWaifu = name;

	if (globalAudio!=null){
			globalAudio.pause();
	}


	setTimeout(function() {
    	commandSelect(0);
	}, 500)

}

	function commandSelect(mode)
	{
		// mode == 0 is home button
		// mode == 1 is waifu button
		// mode == 2 is story button
		// mode == 3 is member button
		if (globalAudio!=null){
			globalAudio.pause();
		}
		

		var audioPath = "audio/";
		var waifuName = globalWaifu + "/";
		var file;


		// Number between 0 and maxNum
		

		var n = 0;

		if(mode == 0){
			// Home button RNG
			var maxNum = 14;
			n = Math.floor(Math.random() * maxNum);
			file = "home/";
		} else if (mode == 1){
			// Waifu button RNG
			var maxNum = 11;
			n = Math.floor(Math.random() * maxNum);
			file = "waifu/";
		} else if (mode == 2){
			// Story button RNG
			var maxNum = 1;
			n = Math.floor(Math.random() * maxNum);
			file = "story/";
		} else if (mode == 3){
			// Member button RNG
			var maxNum = 1;
			n = Math.floor(Math.random() * maxNum);
			file = "member/";
		}



		var superString = "".concat(audioPath, waifuName, file, n, ".mp3");
		globalAudio = new Audio(superString);
		
		globalAudio.play();

		var pathString = "".concat(audioPath, waifuName, file);

		changeSpeechText(pathString, n);
		refreshBubble();

	}

	function homeClick() {
		//document.getElementById("home_but").src="images/home-button.png";


    	var x = document.getElementById("homeScreen").useMap = "#clickmap";

		var mode = 0;
		commandSelect(mode);


	}


	function waifuClick()
	{
		
		var x = document.getElementById("homeScreen").useMap = "#clickmap";

		var mode = 1;
		commandSelect(mode);
		
	}

	function storyClick()
	{

		var x = document.getElementById("homeScreen").useMap = "#clickmap";

		var mode = 2;
		commandSelect(mode);
	}

	function memberClick()
	{
		var x = document.getElementById("homeScreen").useMap = "#clickmap";

		var mode = 3;
		commandSelect(mode);
	}

	function hoverInBut(clicked_id)
	{
		if(clicked_id == 'home_but'){
			document.getElementById("home_but").src="images/home-button-hover.png";
		} else if(clicked_id == 'story_but'){
			document.getElementById("story_but").src="images/story-button-hover.png";
		} else if(clicked_id == 'member_but'){
			document.getElementById("member_but").src="images/member-button-hover.png";
		}
		
	}

	function hoverOutBut(clicked_id)
	{
		if(clicked_id == 'home_but'){
			document.getElementById("home_but").src="images/home-button.png";
		} else if(clicked_id == 'story_but'){
			document.getElementById("story_but").src="images/story-button.png";
		} else if(clicked_id == 'member_but'){
			document.getElementById("member_but").src="images/member-button.png";
		}
	}



	function changeSpeechText (path, n) {
		
		var pathString = "".concat("./", path, "speech.txt");
		var client;
        if (window.XMLHttpRequest) {
		    // code for modern browsers
		    client = new XMLHttpRequest();
		} else {
		    // code for IE6, IE5
		    client = new ActiveXObject("Microsoft.XMLHTTP");
		}

        client.onreadystatechange = function()
        {
            if( client.responseText != '' )
            {
                var txt = client.responseText.split("\n");
                document.getElementById("speech-text").innerHTML = txt[n];
            }
        }
        client.open("GET", pathString, true);
        client.send();
    }