;(function($){
	$(function(){
//-----------------------效果样式
		$("#section_middle").find("li").each(function(){
			$(this).click(function(){
				
				$(this).children("span").show().end().siblings().children("span").hide()
			})
		})
		
		$("#section_bottom").find("input").click(function(){
			if($(this).prop("checked")){
				$("#section_bottom").find("span").hide()
			}else{
				$("#section_bottom").find("span").show()
			}
			
		})
//------------------正则判断-----------------------
//------------------账号判断-----------------------------
	$(".re_username").change(function(){
		var name = $(".re_username").val();
		var reg = /^[a-zA-Z][a-zA-Z0-9]{3,20}$/
		if(reg.test(name)){
			return
		}else{
			alert("第一位为字母，总长度3-20")
		}
		
	})
//------------------密码判断-----------------------------
	$(".re_password").change(function(){
		var password = $(".re_password").val();
		var reg = /^[a-zA-Z0-9]{3,20}$/
		if(reg.test(password)){
			return
		}else{
			alert("总长度3-20的数字或者字母")
		}
		
	})
//------------------邮箱判断-----------------------------
	$(".re_emile").change(function(){
		var emile = $(".re_emile").val();
		var reg =/^\w+@\w+(.\w+)+$/
		if(reg.test(emile)){
			return
		}else{
			alert("邮箱格式错误")
		}
		
	})
	
//-----------------性别判断-----------------------------
	$(".re_sex").change(function(){
		var sex = $(".re_sex").val()
		var reg = /^['男'|'女']$/ 
		if(reg.test(sex)){
			return
		}else{
			alert("请输入男或者女")
		}
	})
	
//---------------判断密码强度--------------------	
	
	$(".re_password").keyup(function(){
		 var txt=$(this).val(); //获取密码框内容
         var len=txt.length; //获取内容长度
         
         if(txt=='' || len<6){
            $("#section_middle_two").find("em").eq(2).addClass("tips");
        }else {
            $("#section_middle_two").find("em").eq(2).removeClass("tips");
        }
		checkpwd($(this));
	})
	
	    //全部都是灰色的
    function primary(){
        $("#section_middle_two").find("em").removeClass("tips");
    }

    //密码强度为弱的时候
    function weak(){ 		$("#section_middle_two").find("em").eq(2).addClass("tips").siblings().removeClass("tips")
    }
    //密码强度为中等的时候
    function middle(){
       		$("#section_middle_two").find("em").eq(1).addClass("tips").siblings().removeClass("tips")
    }

    //密码强度为强的时候
    function strong(){
        		$("#section_middle_two").find("em").eq(0).addClass("tips").siblings().removeClass("tips")
    }
	    //密码强弱判断函数

    function checkpwd(obj){
        var txt = $.trim(obj.val());//输入框内容 trim处理两端空格
        var len = txt.length;
        var num = /\d/.test(txt);//匹配数字
        var small = /[a-z]/.test(txt);//匹配小写字母
        var big = /[A-Z]/.test(txt);//匹配大写字母
        var corps = /\W/.test(txt);//特殊符号
        var val = num + small+big+corps; //四个组合


        if(len<1){
            primary();
        }else if(len<6){
            weak();
        }else if(len>6 && len<=8){
            if(val==1){
                weak();
            }else if(val==2){
                middle();
            }
        }else if(len>8){
            if(val==1){
                weak();
            }else if(val==2){
                middle();
            }else if(val==3){
                strong();
            }
            return false;
        }

    }
//------------点击注册事件------------
		$("button").click(function(){
				                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   $.ajax({
						type:"post",
						url:"http://47.104.244.134:8080/usersave.do",
						async:true,
						data:{
							"username":$('.re_username').val(),
							"password":$('.re_password').val(),
							"email":$('.re_emile').val(),
							"sex":$('.re_sex').val(),
						},
						success:function(data){
							console.log(data.msg)
							if(data.msg=="成功"){
								$(location).attr("href","login.html");
							}else{
								alert("你的名字有人注册，请重新注册")
							}
						}
					});
					
	
})	
	
	
	
	
	
	
	
	
	
	
	})
})(jQuery)


