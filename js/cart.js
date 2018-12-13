;(function($){
	$(function(){
		$.ajax({
			type:"get",
			url:"http://47.104.244.134:8080/cartlist.do",
			async:true,
			data:{"token":getCookie("token")},
			success:function(data){
				var str = ""
				for(var i=0;i<data.length;i++){
					str+=`
						<li>
						<input type="checkbox">
							<img src="${data[i].goods.picurl}">
							
									<span id='pname'>${data[i].goods.name}</span>
									<span id='pprice'>${data[i].goods.price/100}</span>
									<span id="jian">-</span>
									<span id="pnum">${data[i].count}</span>
									<span id="add">+</span>
									<span id="he">${data[i].count*data[i].goods.price/100}</span>
									<button id="removes">删除<buttom>
						</li>
					`
				}
				$("#cartList").append(str)
				
				
//---------------点击增加按钮++--------------
		$("#cartList li").each(function(){
				$(this).find("#add").click(function(){
					var index = $(this).parent().index()
					console.log(index)
					$.ajax({
						type:"get",
						url:"http://47.104.244.134:8080/cartlist.do",
						async:true,
						data:{"token":getCookie("token")},
						success:function(data){
							var id=data[index].id;
							var gid=data[index].gid;
							var count=data[index].count;
							var price=data[index].goods.price/100;
							++count;
							$.ajax({
								type:"get",
								url:"http://47.104.244.134:8080/cartupdate.do",
								async:true,
								data:{"id":id,"gid":id,"num":1,"token":getCookie("token")},
								success:function(data){
						
									if(data.code==0){
										$("#cartList li").eq(index).find("#pnum").html(count);
										$("#cartList li").eq(index).find("#he").html((count*price).toFixed(1))
										}
								}	
							});	
						}
					});
				})
			
})				
//---------------点击减小按钮----------------
		$("#cartList li").each(function(){
				$(this).find("#jian").click(function(){
					var index = $(this).parent().index()
					$.ajax({
						type:"get",
						url:"http://47.104.244.134:8080/cartlist.do",
						async:true,
						data:{"token":getCookie("token")},
						success:function(data){
							var id=data[index].id;
							var gid=data[index].gid;
							var count=data[index].count;
							var price=data[index].goods.price/100;
							--count;
							$.ajax({
								type:"get",
								url:"http://47.104.244.134:8080/cartupdate.do",
								async:true,
								data:{"id":id,"gid":id,"num":-1,"token":getCookie("token")},
								success:function(data){
						
									if(data.code==0){
										$("#cartList li").eq(index).find("#pnum").html(count);
										$("#cartList li").eq(index).find("#he").html((count*price).toFixed(1))
										}
								}	
							});	
							if(count<=0){
								$.ajax({
									type:"get",
									url:"http://47.104.244.134:8080/cartupdate.do",
									async:true,
									data:{
										"id":id,"gid":id,"num":0,"token":getCookie("token")
									},
									success:function(data){
										if(data.code==0){
										$("#cartList li").eq(index).find("#pnum").html(count);
										$("#cartList li").eq(index).find("#he").html((count*price).toFixed(1))
										}
										$("#cartList li").eq(index).remove()
									}
								});
							}
						}
					});
				})
			
})				
					
//----------------点击删除按钮------------------------				
	$("#cartList li").each(function(){
		$(this).find("#removes").click(function(){
			var index = $(this).parent().index()
			$.ajax({
						type:"get",
						url:"http://47.104.244.134:8080/cartlist.do",
						async:true,
						data:{"token":getCookie("token")},
						success:function(data){
							var id = data[index].id;
							var gid = data[index].gid;
							var count = data[index].count;
							var price = data[index].goods.price/100;
							
						$.ajax({
								type:"get",
								url:"http://47.104.244.134:8080/cartupdate.do",
								async:true,
								data:{"id":id,"gid":gid,"num":0,"token":getCookie("token")},
								success:function(data){
									$("#cartList li").eq(index).find("#pnum").html(count);
										$("#cartList li").eq(index).find("#he").html((count*price).toFixed(1))
										
										$("#cartList li").eq(index).remove()
								}
							})
						}
					});
		})
	})			
	
//---------------全选-------------------		
	
	$("#quanxuan").click(function(){
		$("#cartList li").find("input").prop("checked",$("#quanxuan").prop("checked"))
			if($("#quanxuan").prop("checked")){
				
			
			var arr=[];
			$("#cartList li").each(function(){
				var index = $(this).index();
				var money = Number($(this).find("#he").html())
			//	console.log(money)
			arr.push(money)
			})
			//console.log(arr);
			var sum=0
			for(var i=0;i<arr.length;i++){	
				sum=sum+arr[i]
			}
			$("#he1").html(sum.toFixed(1))
			}else{
				$("#he1").html("0")	
				
	
			}
	})
	//--------------------单选-------------------------
				$("#cartList li").each(function(){
					$(this).find("input").click(function(){		
						var newArr=[];
						$("#cartList li").each(function(){
							if($(this).find("input").prop("checked")){
								var money1 = Number($(this).find("#he").html())
								newArr.push(money1)
							}
						})
						var sum1 = 0;
						for (var j=0;j<newArr.length;j++) {
							sum1 = sum1 + newArr[j]
						}
						$("#he1").html(sum1.toFixed(1))	
					})
				})

	
		$("#cartList li").find("input").click(function(){
			$("#cartList li input").each(function(){
			if($("#cartList li input:checked").length==$("#cartList li input").length){
				$("#quanxuan").prop("checked",true)
			}else{
				$("#quanxuan").prop("checked",false)
			}
		})
		
	})	

	
	
	
	
	
	
	
//---------------清空购物车-----------------------	

	
	
			$("#cartList li").each(function(){		
				var index = $(this).index();
				$.ajax({
						type:"get",
						url:"http://47.104.244.134:8080/cartlist.do",
						async:true,
						data:{"token":getCookie("token")},
						success:function(data){
							//console.log(data);
							var id = data[index].id;
							var gid = data[index].gid;	
					$("#removecart").click(function(){
						$.ajax({
								type:"get",
								url:"http://47.104.244.134:8080/cartupdate.do",
								async:true,
								data:{"id":id,"gid":gid,"num":0,"token":getCookie("token")},
								success:function(data){
										$("#cartList li").remove()
								}
							})
						})
					}
		        })
			})
	
	$("#listcart").click(function(){
		$(location).attr("href","list.html")
	})
			
			
			
			
			
			
			
			
}			
});
	
	})
})(jQuery)
