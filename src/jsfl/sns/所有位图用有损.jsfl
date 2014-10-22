
dealNowDom(fl.getDocumentDOM());

function dealNowDom(dealDom){	
	var lib = dealDom.library;
	var arr = lib.items;
	for(var i=0;i<arr.length;i++)
	{
		if(arr[i].itemType="bitmap")
	    {
	        arr[i].compressionType = "photo";
			arr[i].allowSmoothing=true;
		}
	}
}