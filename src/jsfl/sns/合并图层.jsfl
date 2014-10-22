var dealDom=fl.getDocumentDOM();
if(dealDom==undefined){
	fl.trace("当前没有打开文档");
}else{
	dealNowDom(dealDom);
}


function dealNowDom(dealDom){
	//帧数
	var fs=dealDom.getTimeline().frameCount;
	var nowDom=fl.createDocument();
	var lib=nowDom.library
	lib.addNewItem("movie clip",'tmp');
	lib.editItem('tmp');
	
	for(var p=0;p<fs;p++){
		
		dealDom.getTimeline().currentFrame=p;
		dealDom.selectAll();
		dealDom.clipCopy();

		nowDom.getTimeline().insertBlankKeyframe();

		nowDom.getTimeline().currentFrame=p;
		nowDom.clipPaste(true);		
	}
}