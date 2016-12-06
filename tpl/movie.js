define(function(){
   /* return '<ul class="swiper-wrapper item-lists">'+
            '<% for (var i=0;i<imgList.length;i++){ %>'+
        '<li class="swiper-slide m-item"><img src="<%= imgList[i].movie_img_url %>" alt=""></li>'+
        '<% } %>'+
        '</ul>';*/
    return '<ul class="swiper-wrapper item-lists">'+
        '{{each imgList}}'+
        '<li class="swiper-slide m-item"><img src="{{$value.movie_img_url}}" alt=""></li>'+
        '{{/each}}'+
        '</ul>';
})
