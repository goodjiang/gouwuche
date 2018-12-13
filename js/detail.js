;(function(){
	$(function(){
		var pid=location.search.slice(4);
		$.ajax({
			type:"get",
			url:"http://47.104.244.134:8080/goodsbyid.do",
			async:true,
			data:{"id":pid},
			success:function(data){
				console.log(data)
				$("#minsrc").append(`
					<img src="${data.picurl}"/>	
				`)
				$("#maxsrc").append(`
					<img src="${data.picurl}"/>	
				`)
				$(".detail_r").append(`
					<p>商品名称:             ${data.name}</p>
					<p>RMB:${data.price/100
}</p>
					
					<p>商品编码:${data.createtime
}</p>
					<div class="shoppingcart">加入购物车</div>
					<span><a href="cart.html">进入购物车</a></span>
				`)
				
				
				
				//------------------加购物车------------------------	
	$(".shoppingcart").click(function(){
		if(getCookie("username")){
			$.ajax({
				type:"get",
				url:"http://47.104.244.134:8080/cartsave.do",
				async:true,
				data:{"gid":data.id,"token":getCookie("token")},
				success:function(data){
					console.log(data)
				}
			});
		}
	})
		
		
		
		
	}
});
		
		
//-------------放大镜----------------------------	
	$("#minsrc").hover(function(){
		$("#box").css("display","block")
		$("#maxsrc").css("display","block")
	},function(){
		$("#box").css("display","none")
		$("#maxsrc").css("display","none")
	}).mousemove(function(e){
		var evt =  e||event;
					var x = evt.clientX - $(this).offset().left - $("#box").outerWidth()/2
					var y = evt.clientY - $(this).offset().top - $("#box").outerHeight()/2
					if(x<=0){
						x=0
					}
					if(y<=0){
						y=0
					}
					if(x>=$(this).outerWidth()-$("#box").outerWidth()){
						x=$(this).outerWidth()-$("#box").outerWidth()
					}
					if(y>=$(this).outerHeight()-$("#box").outerHeight()){
						y=$(this).outerHeight()-$("#box").outerHeight()
					}
					$("#box").css({"top":y,"left":x})
					var lw = $('#box').position().left/$("#minsrc").outerWidth()*$("#maxsrc").find("img").outerWidth()
					var lh = $("#box").position().top/$("#minsrc img").outerHeight()*$("#maxsrc").find("img").outerHeight()

					$("#maxsrc").find("img").css({"left":-lw,"top":-lh})
	})
		
		
	
		
		
		
	})
})(jQuery)
