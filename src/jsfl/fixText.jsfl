
//本文件功能为复制所有选中元素中的文本元素
var dom = fl.getDocumentDOM();
var newSel = dom.selection;
fl.outputPanel.clear();
// var ps="border,length,lineType,orientation,scrollable,textRuns,useDeviceFonts,tabIndex,silent,name,matrix".split(",");
var ps="aliasText,alignment,face,fillColor".split(",");
var textSel=[];

for(var i=0;i<newSel.length;i++){
	//fl.getDocumentDOM().addNewText({left:90, top:-69.5, right:194, bottom:-36.9});
	//fl.getDocumentDOM().setElementProperty('autoExpand', false);
	var item=newSel[i];
	dom.selectNone();
	if(item.elementType=="text"){
		textSel.push(item);
		//log(item);
		// log(item.textRuns[0]);
		// fl.trace(coll(item));
		var d=0;
		var pobj={left:item.left+d, top:item.top+d, right:item.width+item.left+d, bottom:item.height+item.top+d};
		
		dom.addNewText(pobj);
		
		dom.setElementProperty("name",item.name);
		dom.setTextString(item.textRuns[0].characters);
		//newItem.textRuns[0].characters=item.textRuns[0].characters;
		//pobj.textRuns=item.textRuns;
		var att=item.textRuns[0].textAttrs;		
		for(var j=0;j<ps.length;j++){
			dom.setElementTextAttr(ps[j],att[ps[j]],0,100);
			fl.trace(item.name+att[ps[j]])		
		}
	}
}
dom.selectNone();
dom.selection=textSel;
dom.deleteSelection();

function log(obj){

	for(var key in obj){
			fl.trace(key+":"+obj[key]+":"+typeof(obj[key]));
	}

}

function coll(obj){
	var arr=[];
	for(var key in obj){
			arr.push(key);
	}
	return arr;
}

