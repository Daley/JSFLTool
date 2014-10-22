// -------- by 文明 --------
var  ui = fl.getDocumentDOM().xmlPanel(fl.configURI + "Commands/rename.xml");

if(ui.dismiss == "accept")
{
	var lib = fl.getDocumentDOM().library.items;
	var arr = ["movie clip","graphic","button","folder","font","sound","bitmap"]
	var type =arr[ui.changeType-0];
    for(var i = 0; i< lib.length; i++)
   {
	   if(type == lib[i].itemType)
	   		lib[i].name = ui.prefix + lib[i].name;
			
   }
}
