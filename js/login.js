;(function($){
	$(function(){
		$("#loginnav").find("li").each(function(){
			$(this).click(function(){
				$(this).addClass("loginnav_btn")
				.siblings().removeClass("loginnav_btn")
			})
		})
//-----------------验证码---------------		
	var verifyCode = new GVerify("yzm");
	$("button").click(function(){
		var res = verifyCode.validate($(".pdyzm").val())
		if(res){
			console.log("验证码成功")
		}else{
			alert("验证码错误");
			$(".pdyzm").val("")
		}
	})
//--------------------登录方式 登录方式 登录方式------------------------		
$("button").click(function(){
	$.ajax({
		type:"post",
		url:"http://47.104.244.134:8080/userlogin.do",
		async:true,
		data:{
			"name":$(".name").val(),
			"password":$(".password").val(),
		},
		success:function(data){
			console.log(data)
			if(data.msg == "OK"){
				$(location).attr("href","index.html")
				setCookie("username",$(".name").val())
				setCookie("token",data.data.token)
			}else{
				alert("请输入正确账号密码")
				$(".name").val("")
				$(".password").val("")
				$(".pdyzm").val("")
			}
		}
	});
	
	
})
		
		
		
	})
})(jQuery)
   