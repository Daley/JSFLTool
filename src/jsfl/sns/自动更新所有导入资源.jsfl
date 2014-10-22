var lib = fl.getDocumentDOM().library;
var libLength = lib.items.length;  

for each (var item in lib.getSelectedItems())
{
	lib.selectItem(item.name)	
	if(item.linkageImportForRS==true){	
		lib.setItemProperty('sourceFilePath','file:///E|/Projects/XWY/MobileSvn/as3/game/Library/CommonResRef.fla');
		lib.setItemProperty('sourceLibraryName',item.name);
		lib.setItemProperty('sourceAutoUpdate',true);
	}
	
}   

