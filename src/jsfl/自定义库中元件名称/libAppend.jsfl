var selItems = removePath();
var libItems = fl.getDocumentDOM().library.getSelectedItems();
var result = fl.getDocumentDOM().xmlPanel(fl.configURI + "Commands/libAppend.xml");

if (result.dismiss == "accept")
{
	for (i = 0; i<selItems.length; i++)
	{
		libItems[i].name = result.prefix + selItems[i] + result.suffix;
	}
}

function removePath()
{
	libSelPath=fl.getDocumentDOM().library.getSelectedItems();
	itemNames = new Array();
	for (a = 0; a < libSelPath.length; a++)
	{
		charStart = libSelPath[a].name.lastIndexOf("/") + 1;
		itemNames[a] = libSelPath[a].name.substring(charStart);
	}
	return itemNames;
}