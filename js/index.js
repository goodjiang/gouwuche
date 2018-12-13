;(function($){
	$(function(){
//----------划过郑州出现城市--------------------		
		$(".box_left_d1").hover(function(){
			$(this).css("background","#fff")
			.find(".box_left_d2").css("background","url(../img/header.png) no-repeat -169px -2px")
			$("#box_top1").show()
		},function(){
			$(this).css("background","#f7f7f7")
			.find(".box_left_d2").css("background"," url(../img/header.png) no-repeat -86px -130px")
			$("#box_top1").hide()
		})
//--------------划过我的优选下来菜单----------------------------------------
		$(".box_right_b3").hover(function(){
			
			$("#box_right_b3_a").show()
			$("#box_right_b3_a a").each(function(){
				$(this).mouseover(function(){
					$(this).css("color","red")
					.siblings().css("color","#969696")
				})
			})
		},function(){
			
			$("#box_right_b3_a").hide()	
		})
	
//----------轮播图-----------------------		
		var num=0;
		var timer = null;
		
		function move(){
			num++;
			if(num == $(".banner_pic li").length){
				$(".banner_pic").stop().css({"left":0});
				num=1;
			}
			if(num == $(".banner_pic li").length-1){
				$(".banner_yuan li").eq(0).addClass("cur").siblings().removeClass("cur")
			}else{
				$(".banner_yuan li").eq(num).addClass("cur").siblings().removeClass("cur")
			}
			$(".banner_pic ").stop().animate({"left":-num*1030},1000)}
		$(".banner_yuan li").click(function(){				
			num = $(this).index()-1;
			move();		
		})	
		timer = setInterval(function () {			
			move();
			
		},3000);			
		$(".banner_img").mouseenter(function(){
			clearInterval(timer);
		}).mouseleave(function(){			
				timer = setInterval(function(){	
					//console.log('aa')
					//console.log();
					move()
				},3000)		
		});
		
//----------------蒙版----------------------------		
		$("#rside").find("a").hover(function(){
			$(this).find("div").removeClass("rmask").parent().siblings().find("div").addClass("rmask")
		},function(){
			$("#rside").find("div").removeClass("rmask")
		})
//---------------------口碑精选-----------------------------		
		$(".bbig").find("li").mouseover(function(){
			$(this).find("span").stop().slideDown()
		}).mouseout(function(){
			$(this).find("span").stop().slideUp()
		})
//------------------------抢购-倒计时---------------------		
		function miaosha(date1,date2){
				var ss = (date2-date1)/1000;
				
				var hour = Math.floor(ss/3600);
				var minute = Math.floor(ss/60%60);
				var second = Math.floor(ss%60);	
			
				$("#nowHour1").html(Math.floor(hour/10));
				$("#nowHour2").html(hour%10);
				$("#nowHour3").html(Math.floor(minute/10));
				$("#nowHour4").html(minute%10);
				$("#nowHour5").html(Math.floor(second/10));
				$("#nowHour6").html(second%10);		
		}
		var date1 = new Date();
		var date2 = new Date("2018-12-21 19:55:50");
		
		setInterval(function(){
				miaosha(new Date(),date2);
		},1000)
//---------------小轮播图---------------------------		
		
		var i = 0;
		function startMove(){
			i++;		
			if(i == $(".slide_lunbo").find("li").length){
				$(".slide_lunbo").css({"left":0})
				i=1
			}
			if(i == -1){
				$(".slide_lunbo").css({"left":"-340px"})
				i= 1;
			}
			if(i==1){
				$(".slideControls").find("span").eq(1).addClass("curs").siblings().removeClass("curs")
			}else{
				$(".slideControls").find("span").eq(0).addClass("curs").siblings().removeClass("curs")
			}
		}
		$(".rows_left").click(function(){
			i-=2;
			startMove()
			$(".slide_lunbo").stop().animate({"left":-i*170},500)
		})
		$(".rows_right").click(function(){
			
			startMove()
			$(".slide_lunbo").stop().animate({"left":-i*170},500)
		})
//----------------竖向轮播滚动--------------------		
		var j = 0;
		setInterval(function(){
			j++;
			move1s()
		},2000)
		function move1s(){
			if(j==5){
				$("#toplist").css("top",0);
				j=1;
			}
			$("#toplist").animate({"top":-130*j},1000);
			
		}
//-----------------回到顶部------------------------------	
	$(window).scroll(function(){
		if($(window).scrollTop()>200){
			$("#dtop").fadeIn(1500)
		}else{
			$("#dtop").fadeOut(1500)
		}
		
		$("#dtop").click(function(){
			$("body,html").stop().animate({"scrollTop":0},1000)
			return false;
			//$("body").scroll().top = 0
		})
	})
	
	})
})(jQuery)