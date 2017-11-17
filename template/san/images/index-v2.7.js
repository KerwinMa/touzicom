 

$(function(){

 

  

 

/**右侧栏start******************************/

    //点击回到顶部的元素
    $("#fixed-box .gotop").click(function(e) {
        $('body,html').animate({scrollTop:0},500);
    });

    //公用弹窗公用关闭
    $('.stPublic-win .closeBtn').on('click',function () {
        $('.stPublic-win').fadeOut();
    });

    //意见反馈弹窗弹出激活
    $('#fixed-box .ideawin').on('click',function () {
        $("#feedback-win").fadeIn();
    });

 

});


//回到顶部元素的渐显与渐隐
$(window).scroll(function(e) {
    //若滚动条离顶部大于100元素
    if($(window).scrollTop()>100){
        $('#fixed-box .ideawin').css('borderBottom','none')
        $("#fixed-box .gotop").css('visibility','visible').animate({
            opacity:'1'
        },200);
    }else{
        $("#fixed-box .gotop").css('visibility','hidden').animate({
            opacity:'0'
        },200);
        $('#fixed-box .ideawin').css('borderBottom','1px solid #dedede')
    }

});

$('.send-reference').hover(function(){
    $('.dropbox-close-btn').css('background','none');
},function(){});

$('.fixed-send-vip').hover(function(){
    $(this).addClass('hover-opened');
    $(this).removeClass('normal-opened');
},function(){
    $(this).removeClass('hover-opend');
});

 
/**右侧栏end******************************/
 