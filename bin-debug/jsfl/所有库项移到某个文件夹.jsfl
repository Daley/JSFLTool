fl.outputPanel.clear();
fl.trace("������(folder,type)");
fl.trace("���û��folder,�����auto;���û��typeΪ���ж���");

var params=prompt("�����������(folder,type)");
var arr=params.split(",");
var toFolder=arr[0]!=""&&arr[0]!=null?arr[0]:"auto";
var type=arr[1]!=""&&arr[1]!=null?arr[1]:"auto";

dealNowDom(fl.getDocumentDOM());

function dealNowDom(dealDom){
	
	var lib = dealDom.library;	
	var arr = lib.items;
	
	for(var i=0;i<arr.length;i++)
	{
		var item=arr[i];
		if(item.itemType!="folder"){
			if(type=="auto"||type==item.itemType){
				var fs=item.name.split("/");
				fs.pop();			
				fs.unshift(toFolder);
				fl.outputPanel.trace(item.name+":"+fs.join("/"));
				moveToFolder(lib,fs.join("/"),item.name);
			}
		}		
	}	
}

function moveToFolder(lib,toFolder,name){
	lib.selectItem(name)
	if(lib.itemExists(toFolder)==false){
		lib.newFolder(toFolder);
	}
	lib.moveToFolder(toFolder);
}