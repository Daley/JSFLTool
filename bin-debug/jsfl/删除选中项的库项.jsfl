dealNowDom(fl.getDocumentDOM());

function dealNowDom(dealDom){
	var names=[];
	var lib = dealDom.library;
	
	var theSelectionArray = dealDom.selection;
	for(var i=0;i<theSelectionArray.length;i++){
			var name=theSelectionArray[i].libraryItem.name;
			names.push(name);
			lib.deleteItem(name);			
	} 
	fl.outputPanel.trace("Йѕіэ"+names.length+"По:"+names);
}