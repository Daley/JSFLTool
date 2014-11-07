//会将所有图标和九宫格自动加导出类,如果有不需要加的元件请放到ignoreImg文件夹中
var package=prompt("请输入包名");
var inc=0;
var allNames=findAllClass(fl.getDocumentDOM());

dealNowDom(fl.getDocumentDOM());

function findAllClass(dealDom){	
	var lib = dealDom.library;
	var arr = lib.items;
	var res=[];
	
	for(var i=0;i<arr.length;i++)
	{
		var item=arr[i];
		var clazzName=""+item.linkageClassName;
		if(clazzName.indexOf(package)>-1){
			res.push(clazzName);
		}
	}
	return res;

}

function dealNowDom(dealDom){	
	var lib = dealDom.library;
	var arr = lib.items;
	
	for(var i=0;i<arr.length;i++)
	{
		var item=arr[i];
		if(item.name.indexOf("ignoreImg")>-1){
			cancelClazzName(lib,item);
			continue;
		}
		if(item.name.indexOf("_CommonRes")>-1){
			continue;
		}
		if(item.itemType=="bitmap"){				
			fillClazzName(lib,item,true);			
		}else if(item.itemType=="movie clip" && item.scalingGrid==true){
			//fl.trace(item.scalingGrid+item.name);
			fillClazzName(lib,item,false);
		}
	}

}

function fillClazzName(lib,item,isImg){
	var clazzName=""+item.linkageClassName;
	if(clazzName=="undefined"||clazzName==""){

		lib.selectItem(item.name);
		lib.setItemProperty("linkageExportForAS", true);
		lib.setItemProperty("linkageExportInFirstFrame", true);
		if(isImg){
			lib.setItemProperty("linkageBaseClass", "flash.display.BitmapData");
			//lib.setItemProperty("linkageClassName", package+".res._AutoImg"+inc+"Res");
			clazzName=package+".res._AutoImg{inc}Res"
		}else{
			lib.setItemProperty("linkageBaseClass", "flash.display.MovieClip");
			//lib.setItemProperty("linkageClassName", package+".res._Auto9Grid"+inc+"Res");
			clazzName=package+".res._Auto9Grid{inc}Res"
		}

		while(true){
			var tmp=clazzName.replace("{inc}",inc);
			fl.trace(tmp);
			inc++;
			if(allNames.indexOf(tmp)==-1){
				clazzName=tmp;
				break;
			}
		}
		lib.setItemProperty("linkageClassName", clazzName);
		
	}
	
	
}

function cancelClazzName(lib,item){
	var clazzName=""+item.linkageClassName;
	lib.selectItem(item.name);
	if(item.linkageExportForAS==true){
			fl.trace(item.name+item.linkageClazzName);
			lib.setItemProperty("linkageBaseClass", "");
			lib.setItemProperty("linkageClassName", "");
			item.linkageExportForAS=false;
			//lib.setItemProperty("linkageExportForAS", false);
			//lib.setItemProperty("linkageExportInFirstFrame", false);	
			
	}
}

