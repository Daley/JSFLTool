//HZ,HS,PUB,JXP,MARKET,TY,ZHP,ZBG,ZY,BS,BZ,CHM,DWF,GC,HUG,MJ,TSF,ZSF
var layer=fl.getDocumentDOM().getTimeline().layers[0];
var names=[];
for(var i=0;i<20;i++){
if(layer.frames[i])
names.push(layer.frames[i].name);
}
fl.trace(names);


//