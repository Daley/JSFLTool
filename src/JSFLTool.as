package
{
	import adobe.utils.MMExecute;
	
	import flash.display.InteractiveObject;
	import flash.display.Sprite;
	import flash.events.MouseEvent;
	import flash.utils.ByteArray;
	import flash.utils.Dictionary;
	
	import ghostcat.manager.RootManager;
	import ghostcat.ui.ToolTipSprite;
	import ghostcat.ui.UIConst;
	import ghostcat.ui.containers.GBox;
	import ghostcat.ui.containers.GTileBox;
	import ghostcat.ui.controls.GButton;
	import ghostcat.ui.layout.Layout;
	import ghostcat.ui.layout.LinearLayout;
	import ghostcat.ui.layout.PaddingLayout;
	import ghostcat.util.Util;
	
	import swc.BtnRes;
	import swc.MainRes;
	
	[SWF(width="450",height="320",backgroundColor="#ffffff",frameRate="30")]
	public class JSFLTool extends Sprite
	{
		[Embed(source="jsfl/将选中的已打散并设置九宫格的位图自动切割分组使九宫格生效.jsfl",mimeType="application/octet-stream")]
		private var Clazz_9Scale:Class;		
		[Embed(source="jsfl/所有库项添加到舞台.jsfl",mimeType="application/octet-stream")]
		private var Clazz_AddAllToStage:Class;
		[Embed(source="jsfl/位图全部要有导出类.jsfl",mimeType="application/octet-stream")]
		private var Clazz_AutoImgExport:Class;
		[Embed(source="jsfl/删除所有非图片.jsfl",mimeType="application/octet-stream")]
		private var Clazz_DealNoneImg:Class;
		[Embed(source="jsfl/删除选中项的库项.jsfl",mimeType="application/octet-stream")]
		private var Clazz_DelLibraryItem:Class;
		
		[Embed(source="jsfl/create_lua.jsfl",mimeType="application/octet-stream")]
		private var Clazz_CreateLua:Class;
		
		[Embed(source="jsfl/sns/BatSymbolName.jsfl",mimeType="application/octet-stream")]
		private var Clazz_BatName:Class;
		
		[Embed(source="jsfl/所有库项移到某个文件夹.jsfl",mimeType="application/octet-stream")]
		private var Clazz_BatPublish:Class;
		
		[Embed(source="jsfl/sns/所有位图用有损.jsfl",mimeType="application/octet-stream")]
		private var Clazz_Bitmap:Class;

		private var _res:MainRes;
		private var _btns:Vector.<InteractiveObject>;
		
//		private var _cmds:Object={
//						"btn_9scale":[Clazz_9Scale,
//						"btn_addAllToStage":Clazz_AddAllToStage,
//						"btn_autoImgExport":Clazz_AutoImgExport,
//						"btn_dealNoneImg":Clazz_DealNoneImg,
//						"btn_delLibrayItem":Clazz_DelLibraryItem,
//						"btn_moveAllToFolder":Clazz_MoveAllItem,
//						"btn_test":"test"
//		}
		
		private var _cmds:Array=[
			[Clazz_9Scale,"处理九宫格","用于处理位图九宫\na.选中一个或多个舞台或库项\nb.点击执行"],
			[Clazz_AddAllToStage,"添加所有至舞台","点击执行\n删除舞台所有内容\n添加所有导出类的项至舞台"],
			[Clazz_AutoImgExport,"位图添加导出类","将自动给所有位图添加导出类\n如plugin_main.res._AutoImg\na.点击按钮\nb.输入顶级命名"],
			[Clazz_DealNoneImg,"删除所有非图片","点击按钮\n库将只留下图片资源"],
			[Clazz_DelLibraryItem,"删除选中项的库","a.选中舞台对象\nb.点击此按钮"],
			[Clazz_CreateLua,"为UI生成Lua","点按钮左边为self,右边为local\na.选择所有命名好的组件\nb.点击按钮\n(不选择可以输出命名规范)\n命名例子:lst_data,lbl_haha\n(运行完后代码在剪贴板)"],
			[Clazz_BatName,"名字处理","1 输出所有选中项的名字\n2,name会按序号命名\n3,name,row,col多行多列\n4,name会查找所有包含name的元件名\n5,name1,name2会查找所有导出类name1子串并用name2替换"],
			[Clazz_BatPublish,"发布文件夹fla","发布某文件夹所有fla\na.点击按钮\nb.选择一个包含fla的文件夹"],
			[Clazz_Bitmap,"所有位图压缩设置","请输入一个数字(1-100)\n设置图片的压缩比,100为无损！"],
			["test","测试jsfl","a.在文本框输入jsfl代码\nb.点击此按钮"]
			];
			
		
		public function JSFLTool()
		{
			_res=new MainRes();
			addChild(_res);
			RootManager.register(this);
			
			var box:GTileBox=new GTileBox();
			box.width=stage.width;
			box.height=stage.height;
			
			addChildAt(box,1);
			var layout:LinearLayout=box.linearLayout;
			layout.paddingTop=layout.paddingRight=layout.padding=layout.horizontalGap=layout.verticalGap=4;
			box.x=box.y=5;
			
			for(var i:int=0;i<_cmds.length;i++){
				var arr:Array=_cmds[i];
				
				var btn:GButton=Util.createObject(GButton,{label:arr[1]});
				btn.action=i.toString();
				box.addChild(btn);
				btn.addEventListener(MouseEvent.CLICK,onClick);
				btn.toolTip=arr[2];
			}
			
			stage.addChild(new ToolTipSprite());
//			var layout:LinearLayout=new LinearLayout(box,true);
//			layout.type=UIConst.TILE;
//			box.setLayout(layout);
			
//			_btns=Vector.<InteractiveObject>([_res.btn_9scale,_res.btn_addAllToStage,_res.btn_autoImgExport,_res.btn_dealNoneImg,_res.btn_delLibrayItem,_res.btn_moveAllToFolder,_res.btn_test]);
//			
//			for(var i:int=0;i<_btns.length;i++){
//				_btns[i].addEventListener(MouseEvent.CLICK,onClick);
//			}
			
		}
		
		private function onClick(e:MouseEvent):void{
//			var cmd:*=_cmds[(e.target as InteractiveObject).name];
			var target:GButton=e.target as GButton;
			var cmdArr:Array=_cmds[int(target.action)]  as Array;
			var cmd:*=cmdArr[0];
			if(cmd){
				if(cmd=="test"){
					try
					{
						MMExecute(_res.txt_input.text);
					}catch(error:Error) 
					{
						
					}
				}else{
					var ba:ByteArray=new cmd();
					var str:String=ba.readMultiByte(ba.bytesAvailable,"gb2312");
					try
					{
						str=fillPara(cmd,e,str);
						MMExecute(str);
					} 
					catch(error:Error) 
					{
						
					}
					str=str.replace(/\r/g,"\n");
					str=str.replace(/\n\n/g,"\n");
					str=str.replace(/\n\n/g,"\n");
					_res.txt_input.text=str;
				}
				
			}
		}
		
		private function fillPara(cmd:Class,e:MouseEvent,str:String):String{
			var obj:Object={};
			switch(cmd){
				case Clazz_CreateLua:
					if(e.localX<e.target.width/2){
						obj['var space="local"']='var space="self"';
					}
					break ;
			}
			
			for(var key:String in obj){
				str=str.replace(key,obj[key]);
			}
			
			return str;
		}
	}
}