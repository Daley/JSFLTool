dealNowDom(fl.getDocumentDOM());

function dealNowDom(dealDom){	
	var lib = dealDom.library;
	var arr = lib.items;
	for(var i=0;i<arr.length;i++)
	{
		var item=arr[i];
		if(item.itemType!="folder"&&item.itemType!="undefined"){
			lib.selectItem(item.name);			
			if (lib.getItemProperty('linkageImportForRS') == true) {
				lib.setItemProperty('linkageImportForRS', false);
			}			
			lib.setItemProperty('linkageExportForRS', false);
		}
	}

}

