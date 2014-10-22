fl.outputPanel.clear();

fl.trace("----------------  开始处理		----------------");
fl.trace("为当前文档时间轴上每层的每帧导出一个单独swf");
fl.trace("锁住图层不参与操作");
fl.trace("有需要可改变breakFrames的参数指定帧的导出范围");

var dealDom=fl.getDocumentDOM();
var nowDom;
if(dealDom==undefined){
	fl.trace("当前没有打开文档");
}else{
	dealNowDom(dealDom);
}
fl.trace("-----------------  结束处理	----------------------");

function dealNowDom(dealDom){
	//要保存的文件夹
	var saveUrl = 'file:///E|/UU/AS3/game/output/assets/building'
	
	//层数
	var ls=dealDom.getTimeline().layerCount;
	
	for(var p=0;p<ls;p++){
		dealDom.getTimeline().currentLayer = p;
		
		var lname=dealDom.getTimeline().layers[p].name;
		fl.trace("lname:"+lname);
		var names=lname.split('_');
		//文件夹层
		var type=dealDom.getTimeline().layers[p].layerType;
		//锁住不操作
		var b=dealDom.getTimeline().layers[p].locked;
		if(type=="folder") continue;
		if(b==true) continue;

		//帧数
		var fs=dealDom.getTimeline().layers[p].frameCount;		
		fl.trace(p+':'+names+" "+fs+" "+type);
		var from=1;
		//处理
		breakFrames(dealDom,names,1,fs,saveUrl);		
	}
}

	

function breakFrames(dealDom,names,from,fs,saveUrl){
	if(names.length<2) return;
	if(nowDom==null){
		nowDom=fl.createDocument();
	}
	//元件导出名
	var clazzName='ICO';
	var s=from-1;
	var e=fs;
	for(var i=s;i<e;i++){		
		//nowDom.getTimeline().layers[0].frames[0].actionScript = 'Security.allowDomain("*");'; 
		nowDom.width=1;
		nowDom.height=1;
		//元件名
		var nowName=names[0]+getNumString((i+1),3);
		//var cName=Number(names[1])+i;//小分类加 i,第i个武器的
		var cName=names[1]+getNumString((i),2);//小分类加 i,第i个武器的
		
		//新建一元件

		var lib=fl.getDocumentDOM().library
		lib.addNewItem("movie clip",nowName);
		lib.selectItem(nowName);
		
		lib.setItemProperty('symbolType', 'movie clip');
		//导出类
		lib.setItemProperty('linkageExportForRS', false);
		lib.setItemProperty('linkageExportForAS', true);
		
		lib.setItemProperty('linkageExportInFirstFrame', true);
		lib.setItemProperty('linkageClassName', clazzName);
		lib.setItemProperty('scalingGrid',  false);
		lib.setItemProperty('linkageBaseClass',  'flash.display.MovieClip');

		//复制第 i 帧内容
		//复制
		fl.setActiveWindow(dealDom);
		//dealDom.getTimeline().currentLayer = p语句指定了当前层，拷贝桢的时候就是拷贝的这桢
		fl.getDocumentDOM().getTimeline().copyFrames(i);
		//粘贴
		fl.setActiveWindow(nowDom);
		//编辑元件并粘贴帧内容
		fl.getDocumentDOM().library.editItem(nowName);
		
		nowDom.getTimeline().pasteFrames(0);
		//dealEles(nowDom);

		nowDom.exportSWF(saveUrl+"/"+cName+".swf");
		//fl.saveDocument(nowDom ,saveUrl+"/"+cName+".fla");
		
		lib.selectAll();
		lib.deleteItem();
		//nowDom.revert();
		//nowDom.close();
		//fl.closeDocument(nowDom);
		fl.trace("生成文档: "+decodeURI(saveUrl)+"/"+cName+".swf");
		
	}
}

function getNumString(n,num){
	var str=""+n;
	var len=str.length;
	
	for(var i=0;i<num-len;i++){
		str="0"+str;
	}
	
	if(str=="0"){
		str="";
	}	
	return str;
}

function dealEles(dom){
	dom.selectAll();
	var eles=dom.selection;
	for(var i=0;i<eles.length;i++){
		eles[i].x=0;
		eles[i].y=0;
		if(eles[i].instanceType==undefined){
			eles[i].x=eles[i].width/2;
			eles[i].y=eles[i].height/2;
		}
	}
}