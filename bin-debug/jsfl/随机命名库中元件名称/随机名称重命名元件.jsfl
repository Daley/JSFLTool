var lib = fl.getDocumentDOM().library;

for(var i in lib){

    for(var j in lib[i]){

        lib[i][j].name = 'fl' + Math.random().toString().substr(2,3) + '_' + Math.random().toString()    

    }

}