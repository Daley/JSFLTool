
function createCleanDocsAll(){
	var doc=fl.getDocumentDOM();
	doc.selectAll();
	doc.clipCopy();
	doc.selectNone();
	
	var path=doc.pathURI;
	fl.closeDocument(doc);

	var doc2 = fl.createDocument();
	doc2.clipPaste(true);
	fl.saveDocument(doc2,path);
	//fl.closeDocument(doc2);
}
createCleanDocsAll();

