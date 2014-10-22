var itemArray = fl.getDocumentDOM().library.items;

for each(var n in itemArray)
{
	if (undefined!=n.linkageClassName && undefined==n.linkageImportForRS)
	{
		fl.trace(n.symbolType +" " +n.itemType+" "+n.linkageBaseClass+" "+n.linkageClassName+" "+n.linkageExportForAS+" "+n.linkageIdentifier+" "+n.linkageImportForRS);
	}
}


//alert(fl.getDocumentDOM().library);