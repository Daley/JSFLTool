var package=prompt("ÇëÊäÈë°üÃû");
dealNowDom(fl.getDocumentDOM());

function dealNowDom(dealDom){
	
	var lib = dealDom.library;	
	var arr = lib.items;
	
	for(var i=0;i<arr.length;i++)
	{
		var item=arr[i];
		if(item.itemType!="folder"){			
			var fs=item.name.split("/");
			fs.pop();
			fs.unshift(package);
			fl.outputPanel.trace(item.name+":"+fs.join("/"));
			moveToFolder(lib,fs.join("/"),item.name);
		}		
	}	
}

function moveToFolder(lib,folder,name){
	lib.selectItem(name)
	if(lib.itemExists(folder)==false){
		lib.newFolder(folder);
	}
	lib.moveToFolder(folder);
}