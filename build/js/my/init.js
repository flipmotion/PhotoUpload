//use strict mode;
'use strict';

(function(){
    $('a.smooth').click(function(){
        $('html, body').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top - 200
        }, 1000);
        return false;
    });
    
	var bgcontainer = document.querySelector('.parallax');
	var	parallax = document.createElement('div');
		parallax.setAttribute("class", "parallax-inner");
		bgcontainer.appendChild(parallax);

	function scrolleble() {
		var scrolled = document.documentElement.scrollTop || window.pageYOffset,
			parallaxInner = document.querySelector('.parallax-inner');
			parallaxInner.style.webkitTransform = 'translate3d( 0, ' + scrolled/5 + 'px, 0)';
			parallaxInner.style.MozTransform = 'translate3d( 0, ' + scrolled/5 + 'px, 0)';
			parallaxInner.style.msTransform = 'translate3d( 0, ' + scrolled/5 + 'px, 0)';
			parallaxInner.style.OTransform = 'translate3d( 0, ' + scrolled/5 + 'px, 0)';
			parallaxInner.style.transform = 'translate3d( 0, ' + scrolled/5 + 'px, 0)';
	}

	window.addEventListener('scroll', scrolleble);

	// Multiple images preview in browser
    var imagesPreview = function(input, placeToInsertImagePreview) {
        if (input.files) {
        	var filesAmount = input.files.length;
        	if(filesAmount > 1){
                //price();
                //calculate(filesAmount,10);
    			for (var i = 0; i < filesAmount; i++) {
                    var file = input.files[i];
                    setUp(placeToInsertImagePreview,file);
	            }
                $('.wrap-img').append('<div class="del"></div>');
                 $('.del').on('click',function(e){
                    $(this).parent('.wrap-img').remove();
                    var list = $('.wrap-img').length;
                    if(list <= 0) {
                        placeholdIt(placeToInsertImagePreview);
                    }
                    //price();
                    //calculate(list,10);
                });
                
        	}
            else {
            	placeholdIt(placeToInsertImagePreview);
            }
        }
    };
    /*function price(price){
         $('.calc').on('click',function(e){
            var that = $(this);
            var getPrice = that.find('input').data('price');
            console.log(getPrice);
        });
    }
    function calculate (count,price) {
        var result = count * price;
        console.log(result);
    }*/
    function setUp(place,file) {
        var img = $($.parseHTML('<img>')).attr('src', window.URL.createObjectURL(file));
        img.onload = function(e){
            window.URL.revokeObjectURL(this.src);
        }
        img.appendTo(place).wrap("<div class='wrap-img'></div>").addClass('loadedimg');
        $(place).find('.no-photo').remove();
        $(place).addClass('when-upload-photo');
        $(place).removeClass('when-no-photo');

    }
    function placeholdIt(place) {
        $(place).removeClass('when-upload-photo');
        $(place).addClass('when-no-photo');
        $(place).html('<div class="no-photo text-center"><div class="icon-inner"><div></div><div></div></div><p>Здесь появятся<br>загруженные фотографии.</p><p>Вы сможете удалить ненужные<br>снимки прямо из этого диалога.</p></div>');
    }
	

    $('button').on('click',function(e){
    	var toggle = e.currentTarget.getAttribute('data-toggle');
        var detach = e.currentTarget.getAttribute('data-detach');
        
    	if(toggle == 'file') {
    		var targetInput = e.currentTarget.getAttribute('data-target'),
    			targetfile = $('#'+targetInput);
    		targetfile.click();
    	} else if(detach == 'form') {
            var detachedForm = $('[data-target="form"]').detach();
            detachedForm.appendTo('#show');
            $('#show2').collapse('hide');
        }
         else if(detach == 'form-2') {
            var detachedForm = $('[data-target="form"]').detach();
            detachedForm.appendTo('#show2');
            $('#show').collapse('hide');
        }
    });
    $('#fileOne').on('change', function() {
    	$('div.photo-upload-container.one').html(' ');
        imagesPreview(this, 'div.photo-upload-container.one');
    });
})();

/*(function(){
    var test = {};
    //test.obj = 2;
    //test.item = 3;

    test.sum = function(x,y) {
        //x = this.obj;
        //y = this.item;
        var sum1 = x + y;
        //console.log(sum1);
        return sum1;
        console.log(sum1);
    }
    console.log(test.sum);
    //test.result = test.sum1;
    var result = test.sum(2,2);
    console.log(result);

})();*/