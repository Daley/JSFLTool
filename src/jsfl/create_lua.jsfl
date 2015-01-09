var dom = fl.getDocumentDOM();
var ss = dom.selection; 

fl.outputPanel.clear();
var labs=[
	"a.选中一组内容",
	"b.点击按钮生成代码"	
]

var descs=[
	"lst:UList",
	"slst:ScrollList",
	"rdo:URadio|UTextRadio",
	"btn:UButton|UTextButton",	
	"chk:UCheck",
	"sbtn:UStatusButton",
	"sv:UScrollView",
	"bg:UBg/UScale9Grid",	
	"lbl:ULabel/UBitmapLabel",
	"rich:URichText",
	"pb:UProgressBar",
	"txt:UTextField",
	"icon:IconView",
	"mc:IconWithBorderView/PropsItemView.lua"
]

var tmpNews={
	pb:"uuf.$type:create(res.$name,100,100);",
	btn:'uuf.$type:create(res.$name,function()\n\tcclog("## click $name1")\nend);',
	chk:'uuf.UCheck:create(res.$name,function (src)\n\t--src:getChecked())\n\tend,true,false)',
	btn_close:'uuf.$type:create(res.$name,function()\n\tcclog("## click $name1")\n\tappPlugin:sendNotification(Notifications.SHOW_WORLD);\nend);',
	rdo:'uuf.$type:create(res.$name,$group,radioHandler,$inc);',
	sbtn:'uuf.$type:create(res.$name,$tframe,$cframe);',
	lst:'uuf.$type:create(res.$name,ListSelectType.SINGLE,require("$render"));',
	slst:'require("common.view.ScrollList").new(res.$name,ListSelectType.SINGLE,"$render");\n$varname:setDirection(DirectionType.VERTICAL);',
	icon:'require("common.view.IconView").new(res.$name,IconType.TASK_ICON)',
	borderIcon:'require("common.view.IconWithBorderView").new(res.$name,IconType.TASK_ICON)',
	packageItem:'require("common.view.PropsItemView").new(res.$name)',
	mc:'require("common.view.type").new(res.$name)',
}

var trySons={
	borderIcon:"mcBorder,mcBg".split(","),
	packageItem:"txtName,mcIcon".split(",")
}


fl.trace(labs.join("\n"));
fl.trace("\t"+descs.join("\n\t"));

var head=[];
var body=[];
var sheet=[];
var rBtnGroup=null;
var rBtnInc=1;
var ref={};
var space="local";	//sefl
var allNames=[];

space=prompt("选择变量域(self/local):",space);
var tmpHead="---\n--@type $type"; //\nlocal $name
var tmpBody="$space$name=$news";
var tmpSheet="$name=nil";
var tmpNew="uuf.$type:create(res.$name);"



if( ss.length <= 0 ){
	fl.trace( "警告！没有选中任一项!!");
}else{

	for(var i=0;i<descs.length;i++){
		var arr=descs[i].split(":");
		ref[arr[0]]=arr[1];		
	}
	round(ss);
	ss.sort(sortFun);
	deal();
}

function deal(){
	
	//output(dom.getTimeline(),"timeline");
	var libItem=dom.getTimeline().libraryItem;
	if(libItem!=null){
		if(libItem.linkageClassName!=null){
			var names=libItem.linkageClassName.match("plugin_(.*)\.res\.(.*)");
			if(names&&names.length==3){
				body.push(rep("local res=uuu.$nm_$nc;",{nm:names[1],nc:names[2]}));
			}
		}
	}

	if(body.length==0){
		body.push("警告！当前选中对像的父级没有导出类，或在commo！")
	}
	
	for(var i=0;i<ss.length;i++){
		
		if(ss[i].name!=null&&ss[i].name!=""){
			var names=ss[i].name.split("_");
			common(ss[i],names)
			if(space=="local"){
				allNames.push(ss[i].name);
			}else{
				allNames.push("self."+ss[i].name);
			}
			//sheet.push(rep(tmpSheet,{name:ss[i].name}));
		}
	}
	//有分组
	if(rBtnGroup!=null){
		body.push("---\n--@param radio URadio\nlocal function radioHandler(radio)\n\tradio:getChecked()\nend")
	}

	body.push(rep("\nself:initUI($names);",{names:allNames.join(",")}));

	var line="\n------------------------------";
	var outArr=[line];
	outArr.push(body.join("\n"));


	var str=outArr.join("\n");
	fl.trace(str);
	fl.clipCopyString(str);

	dom.selection=ss;

}


function common(item,names){
	//fl.trace("names:"+names);
	var type=ref[names[0]];	
	var tmpNewStr=tmpNews[names[0]]!=null?tmpNews[names[0]]:tmpNew;	
	tmpNewStr=tryMore(item,names,tmpNewStr);

	type=checkType(type,item,names);
	var varName=space=="local"?item.name:"self."+item.name;
	var newObj={name:item.name,name1:item.name,type:type,varname:varName};
	fillNewParams(item,names,newObj,varName);
	var newStr=rep(tmpNewStr,newObj);
	var spaceStr=space=="local"?"local ":"self.";

	var headStr=rep(tmpHead,{name:item.name,type:type})
	var bodyStr=rep(tmpBody,{space:spaceStr,name:item.name,news:newStr})
	//head.push(headStr); 不要了
	if(space=="local"){
		body.push(headStr);
	}
	body.push(bodyStr);
}

function tryMore(item,names,nowStr){
	if(item.name=="btn_close"){
		nowStr=tmpNews[item.name];
	}
	switch(names[0]){
		case "icon":
		case "mc":
			nowStr=tmpNews[names[0]];
			break ;
	}
	if(names[0]=="mc"){

		dom.selectNone();
		dom.selection=[item];
		dom.enterEditMode('inPlace');
	
		dom.selectAll()
		var items=dom.selection;
		var sons=[];
		for(var i=0;i<items.length;i++){
			sons.push(items[i].name);
		}
		for(var key in trySons){
			for(i=0;i<trySons[key].length;i++){
				if(sons.indexOf(trySons[key][i])==-1){
					break ;
				}
			}
			if(i==trySons[key].length){
				nowStr=tmpNews[key];
				break ;
			}
		}
		dom.exitEditMode();
	}

	return nowStr;
}

function checkType(type,item,names){
	switch(names[0]){
		case "bg":
		case "img":
			type=is9Grid(item)?"UScale9Grid":"UBg";
			break ;
		case "lbl":
			type=hasLink(item)?"UBitmapLabel":"ULabel";
			break ;
		case "btn":
			type=hasTxt(item)?"UTextButton":"UButton";
			break ;
		case "rdo":
			type=hasTxt(item)?"UTextRadio":"URadio"
			break ;
	}
	
	return type;
}

function fillNewParams(item,names,newObj,varName){
	switch(names[0]){
		case "sbtn":
			newObj["cframe"]=1;
			newObj["tframe"]=getFrames(item);
			break ;
		case "rdo":
			if(rBtnGroup==null){
				newObj["group"]="uuf.RadioGroup:create()";
				rBtnGroup=varName+":getGroup()";
			}else{
				newObj["group"]=rBtnGroup;
			}
			newObj["inc"]=rBtnInc;
			rBtnInc++;
			break ;
	}
}

function is9Grid(item){
	return item.libraryItem.scalingGrid
}

function hasLink(item){
	var obj=item["textRuns"][0].textAttrs;;
	var url=obj["url"];
	//随手写得3
	return url!=null&&url.length>3;
}


function hasTxt(item){
	dom.selectNone();
	dom.selection=[item];
	dom.enterEditMode('inPlace');
	var bool=false;
	dom.selectAll()
	var items=dom.selection;
	for(var i=0;i<items.length;i++){
		if(items[i].name&&items[i].name.indexOf("txt")!=-1){
			bool=true;
			break ;
		}
	}
	dom.exitEditMode();
	return bool;
}

function getFrames(item){
	dom.selectNone();
	dom.selection=[item];
	dom.enterEditMode('inPlace');
	var frames=dom.getTimeline().frameCount;	
	dom.exitEditMode();
	return frames;
}

function rep(str,obj){
	for(var key in obj){
		str=str.replace("$"+key,obj[key]);
	}
	return str;
}

function round(newSel){
	for( i=0; i<newSel.length; i++ )
	{
		newSel[i].x=Math.round(newSel[i].x);
		newSel[i].y=Math.round(newSel[i].y);	
	}
}

function sortFun(o1,o2){
	// if(o1.x!=o2.x){		
	// 	return o1.x-o2.x
	// }		
	// return o1.y-o2.y;
	return o2.name>o1.name?-1:1
}


function output(obj,comment){;
	fl.trace("---------"+comment);
	for(var key in obj){
		fl.trace(key+":"+obj[key]);
	}
	fl.trace("---------end"+comment);
}