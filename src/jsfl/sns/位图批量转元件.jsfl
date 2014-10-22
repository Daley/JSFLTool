
fl.outputPanel.clear();

var dom = fl.getDocumentDOM();

var lib = dom.library;
deleteAll();

var mcFolder = "LinkedMC2";
var bitmapFolder = "png";

lib.newFolder(mcFolder);

var items = lib.items;
var cName;

var bmps = new Array();
var links = new Object();



for(var id=0;id<items.length;id++)
{
	var cItem = items[id];
	var splitArr = cItem.name.split("/");
	if(splitArr.length>1 && splitArr[0]==bitmapFolder)
	{
		if(lib.getItemType(cItem.name) == "bitmap")
		{
			bmps.push(cItem.name);
			cItem.compressionType = "photo";
			cItem.quality=-1;
			cItem.allowSmoothing = true;
		}
	}
	links[cItem.linkageClassName] = 1;
}


doEveryThing();

function doEveryThing()
{

	lib.selectNone();
	
	var nameArr = new Array();	
	for(var id=0;id<bmps.length;id++)
	{
		cName = bmps[id];
		
		var tName = cName.split("/")[1];
		
		if(links[tName] == 1)
		{
			fl.trace("链接名已存在，不处理：" + cName);
			continue;
		}
		deleteAll()
		lib.selectItem(cName);
		
		fl.trace("==>转换元件:" + cName + "===>" + (id+1) + "/" + bmps.length);
		lib.addItemToDocument({x:0, y:0});
		
		if(dom.selection.length ==0)
		{
			fl.trace("=====不是位图，跳过======");
			continue;
		}

		var isBmp = dom.selection[0].instanceType;
		if(isBmp == "bitmap")
		{
			if(dom.selection.length>0)
			{
				var className = 'FACE_'+tName.replace(".png","");
				nameArr.push(tName.replace(".png",""));		
					dom.convertToSymbol('movie clip', className,"top left");
					if (lib.getItemProperty('linkageImportForRS') == true) 
					{
						lib.setItemProperty('linkageImportForRS', false);
					}
					lib.setItemProperty('linkageExportForAS', true);
					lib.setItemProperty('linkageExportForRS', false);
					lib.setItemProperty('linkageExportInFirstFrame', true);
				
					lib.setItemProperty('linkageClassName',className);
				
				lib.setItemProperty('scalingGrid',  false);
				
				lib.moveToFolder(mcFolder,  + className); 
				
						
			}
			else
			{
				fl.trace("处理出错:" + cName);
			}	
	   
			fl.trace("=====转换完毕======");
		}
		else
		{
			fl.trace("=====不是位图，跳过======");
		}
	}
	
	fl.trace(nameArr);
	
}


var selectArr;

var xoff;
var yoff;
function addSelect(_left,_top)
{
	if(selectArr == null)
	{
		selectArr = new Array();
	}
	if(selectArr.length>0)
	{
		if(selectArr[selectArr.length-1][1] == _top)
		{
			selectArr.push([_left,_top]);
		}
		else
		{
			confrmSelect();
			selectArr.push([_left,_top]);
		}
	}
	else
	{
		selectArr.push([_left,_top]);
	}
}

function confrmSelect()
{
	if(selectArr != null && selectArr.length > 0)
	{
		var obj = {left:selectArr[0][0] + xoff, top:selectArr[0][1] + yoff, right:(selectArr[selectArr.length-1][0] + 1 + xoff), bottom:(selectArr[selectArr.length-1][1]+1 + yoff)};
		dom.setSelectionRect(obj, false, true);
		
		selectArr = new Array();
	}
}


function deleteAll()
{
	dom.selectAll();
	if(dom.selection.length>0)
	{
		dom.deleteSelection();
	}
}




















