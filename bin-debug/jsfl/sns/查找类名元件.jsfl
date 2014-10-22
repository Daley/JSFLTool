
var findName="plugin_members";

dealNowDom(fl.getDocumentDOM(),findName);

function dealNowDom(dealDom,findName){	
	var lib = dealDom.library;
	var arr = lib.items;
	for(var i=0;i<arr.length;i++)
	{
		if(arr[i].linkageClassName&&arr[i].linkageClassName.indexOf(findName)>-1){
			fl.trace("找到了:"+arr[i].name);
			lib.editItem(arr[i].name);
			break;
		}
		//fl.trace(arr[i].linkageClassName);
	}
	if(i==arr.length){
		fl.trace("没找到");
	}
}

