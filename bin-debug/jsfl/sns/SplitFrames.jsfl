fl.outputPanel.clear();

fl.trace("----------------  ��ʼ����		----------------");
fl.trace("Ϊ��ǰ�ĵ�ʱ������ÿ���ÿ֡����һ������swf");
fl.trace("��סͼ�㲻�������");
fl.trace("����Ҫ�ɸı�breakFrames�Ĳ���ָ��֡�ĵ�����Χ");

var dealDom=fl.getDocumentDOM();
var nowDom;
if(dealDom==undefined){
	fl.trace("��ǰû�д��ĵ�");
}else{
	dealNowDom(dealDom);
}
fl.trace("-----------------  ��������	----------------------");

function dealNowDom(dealDom){
	//Ҫ������ļ���
	var saveUrl = 'file:///E|/UU/AS3/game/output/assets/building'
	
	//����
	var ls=dealDom.getTimeline().layerCount;
	
	for(var p=0;p<ls;p++){
		dealDom.getTimeline().currentLayer = p;
		
		var lname=dealDom.getTimeline().layers[p].name;
		fl.trace("lname:"+lname);
		var names=lname.split('_');
		//�ļ��в�
		var type=dealDom.getTimeline().layers[p].layerType;
		//��ס������
		var b=dealDom.getTimeline().layers[p].locked;
		if(type=="folder") continue;
		if(b==true) continue;

		//֡��
		var fs=dealDom.getTimeline().layers[p].frameCount;		
		fl.trace(p+':'+names+" "+fs+" "+type);
		var from=1;
		//����
		breakFrames(dealDom,names,1,fs,saveUrl);		
	}
}

	

function breakFrames(dealDom,names,from,fs,saveUrl){
	if(names.length<2) return;
	if(nowDom==null){
		nowDom=fl.createDocument();
	}
	//Ԫ��������
	var clazzName='ICO';
	var s=from-1;
	var e=fs;
	for(var i=s;i<e;i++){		
		//nowDom.getTimeline().layers[0].frames[0].actionScript = 'Security.allowDomain("*");'; 
		nowDom.width=1;
		nowDom.height=1;
		//Ԫ����
		var nowName=names[0]+getNumString((i+1),3);
		//var cName=Number(names[1])+i;//С����� i,��i��������
		var cName=names[1]+getNumString((i),2);//С����� i,��i��������
		
		//�½�һԪ��

		var lib=fl.getDocumentDOM().library
		lib.addNewItem("movie clip",nowName);
		lib.selectItem(nowName);
		
		lib.setItemProperty('symbolType', 'movie clip');
		//������
		lib.setItemProperty('linkageExportForRS', false);
		lib.setItemProperty('linkageExportForAS', true);
		
		lib.setItemProperty('linkageExportInFirstFrame', true);
		lib.setItemProperty('linkageClassName', clazzName);
		lib.setItemProperty('scalingGrid',  false);
		lib.setItemProperty('linkageBaseClass',  'flash.display.MovieClip');

		//���Ƶ� i ֡����
		//����
		fl.setActiveWindow(dealDom);
		//dealDom.getTimeline().currentLayer = p���ָ���˵�ǰ�㣬�������ʱ����ǿ���������
		fl.getDocumentDOM().getTimeline().copyFrames(i);
		//ճ��
		fl.setActiveWindow(nowDom);
		//�༭Ԫ����ճ��֡����
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
		fl.trace("�����ĵ�: "+decodeURI(saveUrl)+"/"+cName+".swf");
		
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