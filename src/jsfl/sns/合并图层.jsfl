var dealDom=fl.getDocumentDOM();
if(dealDom==undefined){
	fl.trace("��ǰû�д��ĵ�");
}else{
	dealNowDom(dealDom);
}


function dealNowDom(dealDom){
	//֡��
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