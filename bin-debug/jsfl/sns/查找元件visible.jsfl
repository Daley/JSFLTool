
dealNowDom(fl.getDocumentDOM());

function dealNowDom(dealDom){	
	//dealDom.getTimeline().currentFrame=0;
	
	//²ãÊý
	for(var f=0;f<dealDom.getTimeline().layerCount;f++){
		dealDom.getTimeline().layers[f].visible=true;	
		dealDom.getTimeline().layers[f].locked=false;
	}

	dealDom.selectAll();
	var selectArr=dealDom.selection;

	for(f=0;f<selectArr.length;f++){		
		//fl.trace(selectArr[f].alpha);
		//fl.trace(dealDom.selection.length+selectArr[f].visible);

		if(selectArr[f].visible==false){
			fl.trace("¸Ä¹ý:"+selectArr[f].accName);
			dealDom.selectNone();
			dealDom.selection=[selectArr[f]];
			selectArr[f].visible=true;			
			dealDom.setInstanceAlpha(0);

		}

	}
	dealDom.selectNone();	
}