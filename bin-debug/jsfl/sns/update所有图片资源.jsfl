var lib = fl.getDocumentDOM().library;
var libLength = lib.items.length;  
for(var i=0; i < libLength; i++) {   
   //将位图放入数组   
   if(lib.items[i].itemType=="bitmap") {

		lib.selectItem(lib.items[i].name)
		fl.trace(lib.items[i].name+"|"+lib.updateItem());	
	}  
}   

