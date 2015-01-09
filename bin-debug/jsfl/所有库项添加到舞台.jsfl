
dealNowDom(fl.getDocumentDOM());

function dealNowDom(dealDom){
	dealDom.selectAll();
	if(dealDom.selection.length>0){
		dealDom.deleteSelection();
	}
	var lib = dealDom.library;	
	var arr = lib.items;
	
	for(var i=0;i<arr.length;i++)
	{
		var item=arr[i];
		if(item.linkageClassName&&item.linkageClassName.length>0){			
			lib.addItemToDocument({x:0,y:0},item.name);			
		}		
	}
	
	dealDom.selectAll();
	arr=dealDom.selection;
	var rects=[];
	sortEles(arr);	
}

function sortEles(eles){
	eles.sort(sortFun);	
	var x=0;
	var y=0;
	var gap=6;
	var maxHeight=0;
	for(var i=0;i<eles.length;i++){
		item=eles[i];
		item.x=x;
		item.y=y;
		x+=item.width+gap;		
		if(item.height>maxHeight){
			maxHeight=item.height;
		}
		if(x>1200){
			x=0;
			y+=maxHeight;
			maxHeight=0;
		}
	}
}

function sortFun(ele1,ele2){
	if(ele1.height==ele2.height){
		return ele2.width-ele1.width;
	}
	return ele2.height-ele1.height;
}