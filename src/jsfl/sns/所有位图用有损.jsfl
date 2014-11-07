fl.outputPanel.clear();
var desc="请输入一个数字(1-100)，设置图片的压缩比,100为无损！"
fl.trace(desc);
var params=prompt(desc);
dealNowDom(fl.getDocumentDOM());

function dealNowDom(dealDom){	
	var lib = dealDom.library;
	var arr = lib.items;
	for(var i=0;i<arr.length;i++)
	{
		if(arr[i].itemType=="bitmap")
	    {
	    	lib.selectItem(arr[i].name);		

			if(params=="100"){				
				lib.setItemProperty('allowSmoothing', false);
				lib.setItemProperty('compressionType', 'lossless');
			}else{
				lib.setItemProperty('compressionType', "photo");
				lib.setItemProperty('allowSmoothing', true);
				lib.setItemProperty('useImportedJPEGQuality', false);
				lib.setItemProperty('quality', parseInt(params));
			}
		}
	}
}


