$(function () {
    var url = "https://dc.3.cn/category/get?callback=?";
    $.ajax({
		url:url,
		dataType:"jsonp",
		scriptCharset:"gb2312"
	}).then(function(res){
        var $ul = $('.lists');
        for(var i=0;i<res.data.length;i++){
            var menu = res.data[i];

            var $li = $('<li class="list"></li>');
            $ul.append($li);


            //创建二级目录

            var $secondMenuDiv = $('<div class="box"></div>')
            $li.append($secondMenuDiv)

            //二级目录 顶部
            var $topP = $('<p></p>')
            $secondMenuDiv.append($topP);
            for(let n=0;n<menu.t.length;n++){
                let tmpArray = menu.t[n].split('|');//jiadian.jd.com/|家电馆||0
                let $span = $('<span class="tips"></span>');
                $span.html(tmpArray[1]);
                $topP.append($span);
                let $TmpA = $('<a>&gt;</a>');
                $span.append($TmpA);
            }

            //一级目录  家用电器  jiadian.jd.com|家用电器||0
            for(var j=0;j<menu.s.length;j++){
                if(j >=1){
                    $tmp = $('<a class="fgx">/</a>')
                    $li.append($tmp)
                }
                var str =  menu.s[j].n;
                var firstMenuName = str.split('|')[1];
                var $firstMenuSpan = $('<span class="menu"></span>');
                $firstMenuSpan.html(firstMenuName);
                $li.append($firstMenuSpan);

                //二级目录的第 2,3,4,5,6行

                for(let m=0;m< menu.s[j].s.length;m++){
                    let $secondP =$('<p></p>')
                    $secondMenuDiv.append($secondP);

                    //每行的标题
                    let obj =  menu.s[j].s[m];
                    let title = obj.n.split('|')[1];
                    $span = $('<span class="title"></span>');
                    $span.html(title);
                    $secondP.append($span);

                    let $tmpA = $('<a>&gt;</a>');
                    $span.append($tmpA)


                    //二级目录 每行的内容
                    let $tagsDiv = $('<div class="tags"></div>');
                    $secondP.append($tagsDiv);
                    for(let k=0;k<obj.s.length;k++){
                        let secondContentObj = obj.s[k];
                        let title = secondContentObj.n.split('|')[1];
                        let $span = $('<span class="tag"></span>');
                        $span.html(title);
                        $tagsDiv.append($span);
                    }

                }

                //二级目录 后面的图片
                let $imgBoxDiv =$('<div class="imgBox"></div>');
                $secondMenuDiv.append($imgBoxDiv);
                for(let h=0;h<menu.b.length;h++){
                    let src =  '//img10.360buyimg.com/'+ menu.b[h].split('|')[2]
                    let $img = $('<img/>');
                    $img.attr('src',src);
                    $imgBoxDiv.append($img);
                }

            }








        }

    })


})