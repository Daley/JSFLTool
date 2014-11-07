var dom = fl.getDocumentDOM();
var ss = dom.selection; 

fl.outputPanel.clear();
var labs=[
	"a.选中一组文本框",
	"b.点击按钮输出所有文字"	
]

fl.trace(labs.join("\n"));

if( ss.length <= 0 ){
	fl.trace( "警告！没有选中任一项!!");
}else{
	deal();
}

function deal(){
	var chars=[];
	for(var i=0;i<ss.length;i++){
		if(ss[i].elementType=="text"){
			var str=ss[i].getTextString();
			for(var j=0;j<str.length;j++){
				var char=str.substring(j,j+1);
				fl.trace(char);
				if(chars.indexOf(char)==-1){
					chars.push(char);
				}
			}
		}
	}

	str=chars.join("");
	fl.trace(str);
	fl.clipCopyString(str);
}


function output(obj,comment){;
	fl.trace("---------"+comment);
	for(var key in obj){
		fl.trace(key+":"+obj[key]);
	}
	fl.trace("---------end"+comment);
}