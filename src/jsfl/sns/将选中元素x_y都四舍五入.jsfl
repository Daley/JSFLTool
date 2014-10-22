
dealNowDom(fl.getDocumentDOM());

function dealNowDom(dealDom){
	var selects=dealDom.selection;	
	
	for(var i=0;i<selects.length;i++)
	{
		selects[i].x=Math.round(selects[i].x);
		selects[i].y=Math.round(selects[i].y);		
	}
	if(selects.length==0){
		fl.trace("没有选中任何元素");
	}else{	
		fl.trace("处理了 "+selects.length+" 个元素");
	}
}