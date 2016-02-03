$(document).ready(function() {
    var form = $('[data-form="send"]');
    var owlMain = function(number,target,offset) {
    	var owl = $(target);
    	owl.owlCarousel({
    		loop:true,
    		margin:0,
    		nav:true,
    		dots:false, 
    		items:number,
    		margin: offset, 
    		autoplay:true,
    		navText: [
    			"<i class='my-arrow-left'><i class='glyphicon glyphicon-menu-left'></i></i>",
    			"<i class='my-arrow-right'><i class='glyphicon glyphicon-menu-right'></i></i>"
    		],
    		dots: true,
    	});
    }
    owlMain(1,'[data-item="owl-main"]', 0);
    form.validator();
    $('[data-item="search"]').click(function(){
        $('.search-block').slideToggle();
    });
    $(window).scroll(stickyNav);
    // $(function(){
    // 	$(document).click(function(event) {
    // 		$flag = $(event.target).closest('[data-item="offcanvas"]').length;
    // 		if ($flag == true) {
    // 			//$('html').addClass('nav-active');
    // 		}
    // 		else {
    // 			//$('html').removeClass('nav-active');
    // 		}
    // 	});
    // });
    $('[data-item="offcanvas-menu"]').click(function(event){
    	$('html').toggleClass('nav-active');
    	event.preventDefault();
    });
    $('.close-nav').click(function(event){
    	$('html').toggleClass('nav-active');
    	event.preventDefault();
    });
    if( !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ) {
        $('[data-item="phone"]').mask("9 (999) 999-99-99");
    }
    $('.zoom-thumbs').find('img').on('click',function(){
        $('.zoom-thumbs').find('.active').removeClass('active');
        $(this).parents('div').addClass('active');
        var loc = $(this).attr('src');
        $('.zoom-main img').attr('src',loc);
    });
    $('.alert').fadeOut(0);
    $('.flip').click(function(){
        $('.alert').fadeIn(300);
        $(this).addClass('adding');
        setTimeout(function() {
              $('.flip').removeClass('adding');
              $('.alert').fadeOut(300);
        },1500);
        
    });
    /*loginPanel();*/
});

function stickyNav(){
	if ( $(this).scrollTop() > 10) {
		$('[data-item="header"]').addClass('fix-header');
	} else if ( $(this).scrollTop() <= 10 ) {
		$('[data-item="header"]').removeClass('fix-header');
	}
}
/*function loginPanel(){
    var panel = $('.section-login'),
        sticky = $('.sticky-page');
        padTop = sticky.outerHeight() - sticky.innerHeight();
        console.log(padTop);
    panel.slideDown();
    var btnClose = panel.children('.close');
    panelH = panel.outerHeight();
    btnClose.on('click',function(e){
        panel.slideUp();
    });
}*/
$('.btn-number').click(function(e){
    e.preventDefault();
    
    fieldName = $(this).attr('data-field');
    type      = $(this).attr('data-type');
    var input = $("input[name='"+fieldName+"']");
    var currentVal = parseInt(input.val());
    if (!isNaN(currentVal)) {
        if(type == 'minus') {
            
            if(currentVal > input.attr('min')) {
                input.val(currentVal - 1).change();
            } 
            if(parseInt(input.val()) == input.attr('min')) {
                $(this).attr('disabled', true);
            }

        } else if(type == 'plus') {

            if(currentVal < input.attr('max')) {
                input.val(currentVal + 1).change();
            }
            if(parseInt(input.val()) == input.attr('max')) {
                $(this).attr('disabled', true);
            }

        }
    } else {
        input.val(0);
    }
});
$('.input-number').focusin(function(){
   $(this).data('oldValue', $(this).val());
});
$('.input-number').change(function() {
    
    minValue =  parseInt($(this).attr('min'));
    maxValue =  parseInt($(this).attr('max'));
    valueCurrent = parseInt($(this).val());
    
    name = $(this).attr('name');
    if(valueCurrent >= minValue) {
        $(".btn-number[data-type='minus'][data-field='"+name+"']").removeAttr('disabled')
    } else {
        alert('Sorry, the minimum value was reached');
        $(this).val($(this).data('oldValue'));
    }
    if(valueCurrent <= maxValue) {
        $(".btn-number[data-type='plus'][data-field='"+name+"']").removeAttr('disabled')
    } else {
        alert('Sorry, the maximum value was reached');
        $(this).val($(this).data('oldValue'));
    }
    
    
});
$(".input-number").keydown(function (e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
         // Allow: Ctrl+A
        (e.keyCode == 65 && e.ctrlKey === true) || 
         // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
             // let it happen, don't do anything
             return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});