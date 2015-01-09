fl.trace("如果舞台上有选中对象就操作舞台上的，否则操作库里选中的！");
var d = fl.getDocumentDOM();
var lib = d.library;

var sel=d.selection;
var items=[]
if(sel.length>0){
	for(var i=0;i<sel.length;i++){
		
		items.push(sel[i].libraryItem);
	}
	
}else{
	items=lib.getSelectedItems();
}

if(items.length==0){
	fl.trace("舞台和库都没有任何选中对象！");
}

for each (var item in items)
{
	if(item.scalingGrid!=true){
		item.scalingGrid=true;
	}
	
	if (item.scalingGrid)
	{
		fl.trace("处理"+item.name);
		lib.editItem(item.name);
		d.selectAll();
		try{
			d.breakApart();
		}catch(e){
		}
		var rect = item.scalingGridRect;		
		d.setSelectionRect({left:-1000, top:-1000, right:rect.left, bottom:rect.top});
		d.group();
		d.setSelectionRect({left:rect.left, top:-1000, right:rect.right, bottom:rect.top});
		d.group();
		d.setSelectionRect({left:rect.right, top:-1000, right:1000, bottom:rect.top});
		d.group();
		d.setSelectionRect({left:-1000, top:rect.top, right:rect.left, bottom:rect.bottom});
		d.group();
		d.setSelectionRect({left:rect.left, top:rect.top, right:rect.right, bottom:rect.bottom});
		d.group();
		d.setSelectionRect({left:rect.right, top:rect.top, right:1000, bottom:rect.bottom});
		d.group();
		d.setSelectionRect({left:-1000, top:rect.bottom, right:rect.left, bottom:1000});
		d.group();
		d.setSelectionRect({left:rect.left, top:rect.bottom, right:rect.right, bottom:1000});
		d.group();
		d.setSelectionRect({left:rect.right, top:rect.bottom, right:1000, bottom:1000});
		d.group();
		d.exitEditMode();
	}
}