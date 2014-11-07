var lib = fl.getDocumentDOM().library;
var arr=lib.items;
for(var i=0;i<arr.length;i++)
{
		var item=arr[i];
		if(item.itemType=="bitmap"){		
lib.selectItem(item.name);		
lib.setItemProperty('allowSmoothing', false);
lib.setItemProperty('compressionType', 'lossless');
		}
}
