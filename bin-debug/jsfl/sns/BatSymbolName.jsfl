

var dom = fl.getDocumentDOM();
var newSel = [];
newSel = dom.selection;

var nameStr='mc_item';
fl.outputPanel.clear();
fl.trace("1 输出所有选中项的名字\n2,name会按序号命名\n3,name,row,col多行多列\n4,name会查找所有包含name的元件名\n5,name1,name2会查找所有导出类name1子串并用name2替换");

var pos=[];
if( newSel.length <= 0 ){
	fl.trace( "警告！没有选中任一项，1-3不可用");
}

	fl.trace('start...');
	var params=prompt("请输入参数");
	
	var paramsArr=params.split(",");
	nameStr=paramsArr[1];
	switch(paramsArr[0]){
		case "1":
			outputNames(newSel);
			break ;
		case "2":
			round(newSel);
			batName(newSel);
			outputNames(newSel);
			break ;
		case "3":
			round(newSel);
			//处理这个数组为3行，5列
			batNameHasColRaw(newSel,paramsArr[2],paramsArr[3]);
			outputNames(newSel);
			break ;
		case "4":
			dealNowDom(dom,nameStr);
			break ;
		case "5":
			replaceName(dom,paramsArr[1],paramsArr[2]);
			break ;
		case "6":
			replaceName2(dom,paramsArr[1],paramsArr[2]);
			break ;
	}




//策略一，简单的按x,y排序
function batName(newSel){
	newSel.sort(sortFun2);
	for( i=0; i<newSel.length; i++ )
	{
		var item = newSel[ i ];	
		if(nameStr==''){
			item.name=''
		}else{
			item.name = nameStr+i;
		}

		pos.push((item.x)>>0);
		pos.push((item.y)>>0);
	}

	//fl.trace(pos);
}

function outputNames(newSel){
	
}

function sortFun(o1,o2){
	
	if(o1.y>o2.y) return 1;				
	if(o2.y>o1.y) return -1;				
	if(o1.x>o2.x) return 1;				
	if(o2.x>o1.x) return -1;				
	return 0;
}

function round(newSel){
	for( i=0; i<newSel.length; i++ )
	{
		newSel[i].x=Math.round(newSel[i].x);
		newSel[i].y=Math.round(newSel[i].y);	
	}
}

function sortFun2(o1,o2){
	if(o1.x!=o2.x){		
		return o1.x-o2.x
	}		
	return o1.y-o2.y;
}

//策略2，按行与列排布
function batNameHasColRaw(newSel,row,col){
	row=row>0?row:1;
	col=col>0?col:1;

	nameStr=nameStr==""?'mc_skin':nameStr;

	newSel.sort(sortFun);
	fl.trace("num:"+newSel.length);
	var i=0;
	for(var r=0;r<row;r++){
		
		for(var c=0;c<col;c++,i++){
			if(newSel[i]==null) break;

			newSel[i].name=nameStr+r+'_'+c;

			
		}
	}
	
}

//按行与列排布,放到一个数组
function getArraySel(newSel){
	newSel.sort(sortFun);
	var arr=[];
	var arrRow=[];
	arr.push(arrRow);

	for(var i=0;i<newSel.length;i++){
		//换行
		if(arrRow[0] && newSel[i].y!=arrRow[0].y){
			arrRow=[];
			arr.push(arrRow);
			fl.trace('r:'+arr.length);
		}
		arrRow.push(newSel[i]);
	}
	return arr;
}


//输出所有名字
function outputNames(newSel){
	var names=[];
	for( i=0; i<newSel.length; i++ )
	{
		var item = newSel[ i ];	
		names.push(item.name);		
	}
	fl.trace(names);
}


function dealNowDom(dealDom,findName){	
	var lib = dealDom.library;
	var arr = lib.items;
	var name=null;
	var inc=0;
	for(var i=0;i<arr.length;i++)
	{
		if(arr[i].linkageClassName&&arr[i].linkageClassName.indexOf(findName)>-1){
			fl.trace("找到了:::"+arr[i].name+":::"+arr[i].linkageClassName);
			//lib.editItem(arr[i].name);
			//break;
			name=arr[i].name;
			inc++;
		}
		//fl.trace(arr[i].linkageClassName);
	}
	if(name!=null){
		if(inc==1){
			lib.editItem(name);
		}
	}else{
		fl.trace("没找到");
	}
}

function replaceName(dealDom,findName,replaceTo){
	var lib = dealDom.library;
	var arr = lib.items;
	
	var inc=0;
	for(var i=0;i<arr.length;i++)
	{
		if(arr[i].linkageClassName&&arr[i].linkageClassName.indexOf(findName)>-1){
			var newClazz=arr[i].linkageClassName.replace(findName,replaceTo);
			fl.trace("找到了:::"+arr[i].name+":::"+arr[i].linkageClassName+":::"+newClazz);
			//lib.editItem(arr[i].name);
			//break;
			arr[i].linkageClassName=newClazz;
			inc++;
		}		
	}
}

function replaceName2(dealDom,findName,replaceTo){
	var lib = dealDom.library;
	var arr = dealDom.selection;
	
	var inc=0;
	for(var i=0;i<arr.length;i++)
	{
		if(arr[i].name&&arr[i].name.indexOf(findName)>-1){
			var newName=arr[i].name.replace(findName,replaceTo);
			fl.trace("找到了:::"+arr[i].name+"::"+newName);
			//lib.editItem(arr[i].name);
			//break;
			arr[i].name=newName;
			inc++;
		}		
	}
}