define(['jquery','../lib/swiper','../tpl/movie','../lib/template'],function($, Swiper, tplfile, tpl){

    var req=$.ajax({
        url:'data/data.json'
    });
    var textArea=$('#mtpl').val();
    //请求数据
    req.done(function(data){
        var movielist=data.data.movie_data;
        var render=tpl.compile(tplfile);//movie js中传过来的数据string 进行编译，返回渲染函数
        var html=render({imgList:movielist});//把渲染函数以对象的形式表现出来
        $('.nav').html(html);

        var rend=tpl.compile(textArea);
        var html2=rend({list:movielist});
        $('.all-lists').html(html2);
        //让第一个table显示
        $('.info-list').each(function(index,ele){
            $(this).find('table').eq(0).addClass('hide');
        });
        //让第一个article显示
        $('.info-area').eq(0).siblings().addClass('hide');
        var slides=null;
        var wrapper=$('.info-area');
        var mySwiper = new Swiper('.nav',{
            slidesPerView: 'auto',
            spaceBetween: 10,
            freeMode: true,
            onTap:function(s,e){
                //针对影片控制电影海报区域的高亮效果
                //找到所有的li,删除类名active
                if(!slides) slides=document.querySelectorAll('.m-item');
                for(var i=0;i<slides.length;i++){
                    slides[i].className=slides[i].className.replace(' active','');
                }

                /*$('.m-item').each(function(i,ele){
                 $(this).removeClass('active');
                 //jq方法 找到所有的li,删除类名active
                 })*/

                var cls= s.clickedSlide && s.clickedSlide.className;
                //判断li里是否有active
                if(cls &&　cls.indexOf(' active')==-1){
                    s.clickedSlide.className =cls+" active";
                }

                //滑动效果 调用实例化swiper组件的slideTo方法，控制swipe组件滑动到点击的图片
                mySwiper.slideTo(s.clickedIndex,300,function(a){
                    console.log(a)
                });

                // 根据点击图片的索引控制不同article的显示和隐藏
                wrapper.eq(s.clickedIndex).removeClass('hide').siblings().addClass('hide');
                //根据点击图片的索引获取当前的日期列表dom
                var swiperTarget=wrapper.eq(s.clickedIndex).find('.movie-date');
                //获取当前显示的article下得所有table
                var tables=wrapper.find('table');
                //日期
                //为避免swiper组件未知bug，在确保日期列表display属性为block时，进行实例化组件
                var dateSwiper=new Swiper(swiperTarget[0],{
                    "slidesPerView":'auto',
                    "freeMode":true,
                    onTap:function(t){
                       //获得当前的article
                        swiperTarget.find('li').eq(t.clickedIndex).addClass('self-active').siblings().removeClass('self-active');
                    }

                })
            },
            onInit:function(s){
                //第一个图片加类名
                var slides=document.querySelectorAll('.m-item');
                slides[0].className+=' active';
                //在初始化swiper组件时，默认给第一个日期列表添加swiper功能
                var tables=wrapper.eq(s.activeIndex).find('table');
                var swiperTarget=wrapper.eq(s.activeIndex).find('.movie-date');
                //日期
                var dateSwiper=new Swiper(swiperTarget[0],{
                    "slidesPerView":'auto',
                    "freeMode":true,
                    onTap:function(t){
                        //获得当前的article
                        swiperTarget.find('li').eq(t.clickedIndex).addClass('self-active').siblings().removeClass('self-active');
                        dateSwiper.slideTo(t.clickedIndex,300,function(a){
                            console.log(a)
                        });
                    }

                });

            }
        });

    });


});