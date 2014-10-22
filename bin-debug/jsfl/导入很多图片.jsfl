fl.outputPanel.clear()
var folderURI = fl.browseForFolderURL("Select a folder.");
fileList = new Array()

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


function importFile(URI)
{
	dom=fl.getDocumentDOM();
    var success = dom.importFile(URI);
    if(success)
    {       
    var indexOfFileName = URI.lastIndexOf("/");
    var documentName = flash.documents[0].name;             
    var folderStructure = URI.slice(URI.indexOf(documentName) + documentName.length + 1,indexOfFileName);
        if(folderStructure)
            dom.library.newFolder(folderStructure); 
        var fileName = URI.slice(indexOfFileName + 1,URI.length);       
        dom.library.moveToFolder(folderStructure, fileName, true);
    }
    return;
}

listFile(folderURI);

for(i=0;i<fileList.length;i++)
{
    fl.trace("fileList["+i+"]="+ fileList[i]);
    importFile(fileList[i])
}