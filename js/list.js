;(function($){
	$(function(){
		var i = 1;
		function move(i){
		$.ajax({
			type:"get",
			url:" http://47.104.244.134:8080/goodsbytid.do",
			async:true,
			data:{"tid":13,"page":i,"limit":100},
			success:function(data){
				
				var obj = data.data;
				//console.log(obj);
//--------------去掉没有图片的商品----------------------
				var newArr=[];
				
				for(var i=0;i<obj.length;i++){
					if(obj[i].picurl){
						newArr.push(obj[i])
					}
				}
				//console.log(newArr)
//----------------调用商品列表的接口-------------------			
				for(var i=0;i<newArr.length;i++){
					$("#lists").append(`
							<li>
								<a href='detail.html?id=${newArr[i].id}'><img src="${newArr[i].picurl}"/></a>
								<p>RMB:${newArr[i].price/100}</p>
								<P>${newArr[i].name}</P>
								<span id="addcarts">加入购物车</span>
							</li>
					`)
				}
//--------------分页----------------------------
				var perNum = 12;          //每页商品数量
				var total = newArr.length;//分页
				var pageNum = Math.ceil(total/perNum);//页数
				console.log(pageNum)
				$(".Nums").html(pageNum)
				
//-------------点击加入购物车商品加到购物车-----------------
			$("#lists li").each(function(){
				var index = $(this).index();
				$(this).find("span").click(function(){
						
						
						$.ajax({
							type:"get",
							url:"http://47.104.244.134:8080/cartsave.do",
							async:true,
							data:{"gid":newArr[index].id,"token":getCookie("token")},
							success:function(data){
								//console.log(data)
							}
						});
					
				})
			})
		}	

				
	})
}
		
		move(i)
		$(".list_r").find("em").eq(1).click(function(){
			i++;
			if(i>=4){
				i=4
			}
			$("#lists").children().remove()
			move(i)
		})
		$(".list_r").find("em").eq(0).click(function(){
			i--;
			if(i<=1){
				i=1
			}
			$("#lists").children().remove()
			move(i)
		})
	
		
		
	})
})(jQuery)
