var isDelAllCommon=false;
var names=[];
dealNowDom(fl.getDocumentDOM());

function dealNowDom(dealDom){	
	var lib = dealDom.library;
	
	if(isDelAllCommon){
		deleteItem(lib,"_CommonRes");
	}
	var arr = lib.items;
	for(var i=0;i<arr.length;i++)
	{
		var item=arr[i];
		if(item.name.indexOf("ignoreImg")>-1){			
			deleteItem(lib,item.name);
			continue;
		}
		if(item.name.indexOf("_CommonRes")>-1){
			if(isDelAllCommon){
				deleteItem(lib,item.name);
			}else if(item.itemType=="bitmap"||item.itemType=="folder"){
			
			}else{
				deleteItem(lib,item.name);
			}
			continue;
		}
		if(item.itemType=="bitmap" ||item.itemType=="folder"){				
			
		}else{
			deleteItem(lib,item.name);
		}
	}
	fl.outputPanel.trace("É¾³ý·ÇÍ¼Æ¬:"+names.length);
}

function deleteItem(lib,name){
	names.push(name);
	lib.deleteItem(name);
}