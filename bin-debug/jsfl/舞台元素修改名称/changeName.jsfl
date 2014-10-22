fl.trace("***************flash批量改舞台元件名称成功完成，谢谢使用  by文明******************************");
var result = fl.getDocumentDOM().xmlPanel(fl.configURI + "Commands/changeName.xml");
var theSelectionArray = fl.getDocumentDOM().selection; 
if (result.dismiss == "accept")
{
	for(var i=0;i<theSelectionArray.length;i++){ 
		var elt = theSelectionArray[i];
		if(elt.elementType == "text")
		{
			elt.textType = 'dynamic';
		}else if(elt.elementType == "instance"){
			elt.symbolType = 'movie clip';
		} 
		elt.name = result.prefix + i + result.suffix;
	}
}
