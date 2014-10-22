 fl.trace("***************flash批量改图层名称成功完成，谢谢使用  by文明******************************");
 var result = fl.getDocumentDOM().xmlPanel(fl.configURI + "Commands/changeLayerName.xml");
if (result.dismiss == "accept")
{
	var i=0;
	while(i<fl.getDocumentDOM().getTimeline().layerCount)
	{
　	　fl.getDocumentDOM().getTimeline().layers[i].name = result.prefix + i + result.suffix;
　	　++i;　
	}
}

