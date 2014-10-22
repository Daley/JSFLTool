fl.outputPanel.clear()
var folderURI = fl.browseForFolderURL("选择gif文件夹");
var toFolderUrl=fl.browseForFolderURL("选择fla文件夹");
if(folderURI==null){
	folderURI="file:///E|/Projects/XWY/MobileSvn/art_ui/%e5%be%ae%e4%bf%a1%e8%a1%a8%e6%83%85";
}
if(toFolderUrl==null){
	toFolderUrl="file:///E|/Projects/XWY/MobileSvn/as3/game/Assets/ui_effect";
}
fileList = new Array();
fl.trace(folderURI);
fl.trace(toFolderUrl);

listFile(folderURI);

for(i=0;i<fileList.length;i++)
{   
    importFile(fileList[i],i)
}

function listFile(paths){
    var files=[]
    var folds=[]
    var files=FLfile.listFolder(paths,"files"); 

    for(i=0;i<files.length;i++)
    {   
        if(paths.lastIndexOf("/") != paths.length -1 )
        {
            paths+="/";         
        }
		if(files[i].indexOf(".gif")<0){
			continue;
		}
        fileList.push(paths + files[i]);
    }
    var folds = FLfile.listFolder(paths , "directories");

    for(var j=0;j<folds.length;j++)
    {           
        var subPath = paths + folds[j] + "/"        
        listFile(subPath);
        //make sure that this stops at a reasonable point.
        if (fileList.length > 1000)
        return;
    }
}


function importFile(URI,index)
{
	var indexOfFileName = URI.lastIndexOf("/");
	var fileName = URI.slice(indexOfFileName + 1,URI.length);  
	//fl.trace(URI+fileName+toFolderUrl);
	//fl.trace(getPychar(fileName.charAt(0)));
	var dom=fl.createDocument();
	var success = dom.importFile(URI);
    if(success)
    {   
		var url=toFolderUrl+"/FACE"+index+".fla";
		fl.saveDocument(dom,url ); 
		dom.exportSWF(url.replace(".fla",".swf"),true);	
    }
}

function getPychar(char){
   var tmp=24559+(char.charCodeAt(0));
   var pyChar;
   fl.trace(char+" code:"+tmp+":"+char.charCodeAt(0));
   
   if(tmp>=45217 && tmp<=45252) 
	pyChar= "A"
   else if(tmp>=45253 && tmp<=45760)
	pyChar= "B"
	else if(tmp>=45761 && tmp<=46317)
   pyChar= "C"
   else if(tmp>=46318 && tmp<=46825)
   pyChar= "D"
   else if(tmp>=46826 && tmp<=47009) 
   pyChar= "E"
   else if(tmp>=47010 && tmp<=47296) 
   pyChar= "F"
   else if(tmp>=47297 && tmp<=47613) 
   pyChar= "G"
   else if(tmp>=47614 && tmp<=48118)
   pyChar= "H"
   else if(tmp>=48119 && tmp<=49061)
   pyChar= "J"
   else if(tmp>=49062 && tmp<=49323) 
   pyChar= "K"
   else if(tmp>=49324 && tmp<=49895) 
   pyChar= "L"
   else if(tmp>=49896 && tmp<=50370) 
   pyChar= "M"
   else if(tmp>=50371 && tmp<=50613) 
   pyChar= "N"
   else if(tmp>=50614 && tmp<=50621) 
   pyChar= "O"
   else if(tmp>=50622 && tmp<=50905)
   pyChar= "P"
   else if(tmp>=50906 && tmp<=51386) 
   pyChar= "Q"
   else if(tmp>=51387 && tmp<=51445) 
   pyChar= "R"
   else if(tmp>=51446 && tmp<=52217) 
   pyChar= "S"
   else if(tmp>=52218 && tmp<=52697) 
   pyChar= "T"
   else if(tmp>=52698 && tmp<=52979) 
   pyChar= "W"
   else if(tmp>=52980 && tmp<=53640) 
   pyChar= "X"
   else if(tmp>=53689 && tmp<=54480) 
   pyChar= "Y"
   else if(tmp>=54481 && tmp<=62289)
   pyChar= "Z"
   else 
   pyChar=char;	//"拼音不处理"
	
	return pyChar;
}

