
fl.outputPanel.clear();
var doms=fl.documents;
var cityDom=fl.getDocumentDOM();

fl.trace([doms.length,doms.indexOf(cityDom)]);
doms.splice(doms.indexOf(cityDom),1);
fl.trace(doms.length);
deal();
dealCity();

function deal(){
	// for(var i=0;i<doms.length;i++){
	// 	renameAll(doms[i],"a"+i+"_");
	// }	
}

function dealCity(){
	//遍历所有建筑布局
	//	遍历所有建筑（非引导层元素|非图片项）
	//		把所有图层引导掉，新建一图层放一个透明块，大小==当前建筑
	cityDom.selectAll();
	var ss=cityDom.selection; 
	var lib=cityDom.library;
	for(var i=0;i<ss.length;i++){
		
		selectAndEdit(cityDom,ss[i]);
		cityDom.selectAll();
		var eles=cityDom.selection;
		for(var j=0;j<eles.length;j++){
			var item=eles[j];
			//如果这是个建筑
			findOrCreateAreaLayer(cityDom);
			//fl.trace(item);
			if(item.libraryItem&&item.libraryItem.itemType!="bitmap"&&item.name!=undefined){
				lib.addItemToDocument({x:0,y:0},"_CommonRes/Common/Region");
				var newItem=cityDom.selection[0];
				if(newItem){
					newItem.name=item.name;
					newItem.width=item.width;
					newItem.height=item.height;
					newItem.x=item.x;
					newItem.y=item.y;
				}
				fl.trace([item.name,item.x,item.y,newItem.name,newItem.x,newItem.y]);
			}
		}
		cityDom.exitEditMode();
	}
}

function findOrCreateAreaLayer(dom){
	var layers=dom.getTimeline().layers;
	var area=null;
	for(var i=0;i<layers.length;i++){
		if(layers[i].name=="areas"){
			area=i;
		}else{
			//要引导掉			
			dom.getTimeline().currentLayer=i;
			dom.getTimeline().setLayerProperty('layerType', 'guide');

		}
	}
	if(area==null){
		dom.getTimeline().addNewLayer("areas");
	}else{
		dom.getTimeline().currentLayer=area;
	}
}

function selectAndEdit(dom,item){	
	dom.selectNone();
	dom.selection=[item];
	dom.enterEditMode('inPlace');	
}

function copyMain(){
	for(var i=0;i<doms.length;i++){
		fl.setActiveWindow(doms[i]);
	}
}

function renameAll(dealDom,namePre){
	
	var lib = dealDom.library;	
	var arr = lib.items;
	
	for(var i=0;i<arr.length;i++)
	{
		var item=arr[i];
		var fs=item.name.split("/");
		fs[fs.length-1]=namePre+fs[fs.length-1];

		item.name=fs[fs.length-1];	
	}	
}
