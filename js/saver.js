Saver = {}

Saver.slots = 12;

Saver.SavePrompt = function(backFunc) {
	Text.Clear();
	
	Text.Add("Save game:");
	Text.NL();
	
	var options = new Array();
	for(var i=0; i<Saver.slots; i++) {
		Text.Add("Game " + i + ": ");
		var name = localStorage["save" + i];
		if(name) {
			Text.Add(name);
			options.push({ nameStr : "Game " + i,
				func : function(obj) {
					var prmpt = prompt("This will overwrite save slot " + obj + ", continue? \n\n Comment:");
					if(prmpt != null) Saver.SaveGame(obj, prmpt);
				}, enabled : true, obj : i
			});
		}
		else {
			Text.Add("EMPTY");
			options.push({ nameStr : "Game " + i,
				func : function(obj) {
					var prmpt = prompt("This will save to slot " + obj + ", continue? \n\n Comment:");
					if(prmpt != null) Saver.SaveGame(obj, prmpt);
				}, enabled : true, obj : i
			});
		}
		Text.NL();
	}
	Gui.SetButtonsFromList(options, true, backFunc);
	
    Text.NL();
    if(Saver.HasSaves())
    	Text.Add("DEBUG: localStorage usage: " + JSON.stringify(localStorage).length / 2636625);
    Text.Flush();
}

Saver.SaveGame = function(nr, cmt) {
	GameToCache();
	var seen = [];
	localStorage["savedata" + nr] = JSON.stringify(gameCache, function(key, val) {
	   if (typeof val == "object") {
	        if (seen.indexOf(val) >= 0)
	            return;
	        seen.push(val);
	    }
	    return val;
	});
	var saveName = gameCache.name;
	if(cmt)
		saveName += " ::: Comment: " + cmt;
	// TODO: Name, level, time
	localStorage["save" + nr] = saveName;
	Saver.SavePrompt();
}

Saver.SaveToFile = function() {
	var filename;
	if(GenerateFile.canSaveOffline) {
		filename = prompt("SAVE TO FILE MIGHT NOT WORK IN OFFLINE MODE!\n\n Enter name of save file.");
	}
	else {
		filename = prompt("SAVE TO FILE WILL NOT WORK IN OFFLINE MODE!\n\n Enter name of save file.");
	}
	if(filename && filename != "") {
		GameToCache();
		var seen = [];
		GenerateFile({filename: filename, content: JSON.stringify(gameCache,
			function(key, val) {
			   if (typeof val == "object") {
			        if (seen.indexOf(val) >= 0)
			            return;
			        seen.push(val);
			    }
			    return val;
			})
		});
	}
	else {
		Text.NL();
		Text.Add("No file saved: Enter a filename!", null, 'bold');
		Text.Flush();
	}
}

// Returns true if there are any saves
Saver.HasSaves = function() {
	if(!online) return false;
	for(var i=0; i<Saver.slots; i++)
		if(Saver.SaveHeader(i)) return true;
	return false;
}

Saver.LoadPrompt = function(backFunc) {
	Text.Clear();
	
	Text.Add("Load game:");
	Text.NL();
	
	var options = new Array();
	for(var i=0; i<Saver.slots; i++) {
		Text.Add("Game " + i + ": ");
		var name = localStorage["save" + i];
		if(name)
			Text.Add(name);
		else
			Text.Add("EMPTY");
		Text.NL();
		options.push({ nameStr : "Game " + i,
			func : Saver.LoadGame, enabled : Saver.SaveHeader(i), obj : i
		});
	}
	Gui.SetButtonsFromList(options, true, backFunc);
	
    Text.NL();
    if(Saver.HasSaves())
    	Text.Add("DEBUG: localStorage usage: " + JSON.stringify(localStorage).length / 2636625);
    Text.Flush();
}

Saver.LoadGame = function(nr) {
	gameCache = JSON.parse(localStorage["savedata" + nr]);
	CacheToGame();
	PrintDefaultOptions();
}

Saver.SaveHeader = function(nr) {
	return localStorage["save" + nr];
}

Saver.DeleteSave = function(nr) {
	delete localStorage["save" + nr];
	delete localStorage["savedata" + nr];
}

Saver.Clear = function() {
	//localStorage.clear();
	var conf = confirm("This will remove all local saves and settings, do you really want to continue?");
	if(conf == true) {
		for(var i=0; i<Saver.slots; i++) {
			delete localStorage["save" + i];
			delete localStorage["savedata" + i];
		}
	}
}

function loadfileOverlay() {
	var el = document.getElementById("overlay_load");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
}

Saver.OnLoadFromFileClick = function() {
	
	var files = document.getElementById('loadFileFiles').files;
    if (!files.length) {
		alert('Please select a file!');
		return;
    }
    
	loadfileOverlay();

    var file = files[0];
    
    Saver.LoadFromFile(file);
}

// Takes a File as argument
Saver.LoadFromFile = function(file) {
	if(!file) return;
	
	var reader = new FileReader();
	
	reader.onload = function(e) {
		gameCache = JSON.parse(e.target.result);
		CacheToGame();
		PrintDefaultOptions();
		Render();
	}
	
	reader.readAsText(file);
}
