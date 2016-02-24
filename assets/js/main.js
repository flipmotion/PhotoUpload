//use strict mode;
'use strict';

(function () {
    $('a.smooth').click(function () {
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 200
        }, 1000);
        return false;
    });

    var bgcontainer = document.querySelector('.parallax');
    var parallax = document.createElement('div');
    parallax.setAttribute("class", "parallax-inner");
    bgcontainer.appendChild(parallax);

    function scrolleble() {
        var scrolled = document.documentElement.scrollTop || window.pageYOffset,
            parallaxInner = document.querySelector('.parallax-inner');
        parallaxInner.style.webkitTransform = 'translate3d( 0, ' + scrolled / 5 + 'px, 0)';
        parallaxInner.style.MozTransform = 'translate3d( 0, ' + scrolled / 5 + 'px, 0)';
        parallaxInner.style.msTransform = 'translate3d( 0, ' + scrolled / 5 + 'px, 0)';
        parallaxInner.style.OTransform = 'translate3d( 0, ' + scrolled / 5 + 'px, 0)';
        parallaxInner.style.transform = 'translate3d( 0, ' + scrolled / 5 + 'px, 0)';
    }

    window.addEventListener('scroll', scrolleble);

    // Multiple images preview in browser
    var imagesPreview = function imagesPreview(input, placeToInsertImagePreview) {
        if (input.files) {
            var filesAmount = input.files.length;
            if (filesAmount >= 1) {
                for (var i = 0; i < filesAmount; i++) {
                    var file = input.files[i];
                    setUp(placeToInsertImagePreview, file);
                }
                var list = $('.wrap-img').length;
                $('.wrap-img').append('<div class="del"></div>');
                var inputHidden = $($.parseHTML('<input type="hidden" class="hidden">')).attr('value', window.URL.createObjectURL(file));
                $(inputHidden).appendTo('.wrap-img');
                $('.del').on('click', function (e) {
                    $(this).parent('.wrap-img').remove();
                    var list = $('.wrap-img').length;
                    if (list <= 0) {
                        placeholdIt(placeToInsertImagePreview);
                    }
                    calc();
                });
            } else {
                placeholdIt(placeToInsertImagePreview);
            }
        }
    };
    $('.calc').on('click', function (e) {
        if ($(this).find('input').prop("checked") == true) {
            calc();
        }
    });
    function calc() {
        var price = 0;
        var count = 0;
        var miltiplaer = 1;
        count = $('.wrap-img').length;

        if ($("#radio1").prop("checked") == true) {
            var price = parseInt($("#radio1").data('price'));
        }
        if ($("#radio2").prop("checked") == true) {
            var price = parseInt($("#radio2").data('price'));
        }
        if ($("#radio3").prop("checked") == true) {
            var price = parseInt($("#radio3").data('price'));
        }
        if ($("#radio4").prop("checked") == true) {
            var miltiplaer = parseInt($("#radio4").data('miltiplaer'));
            console.log(miltiplaer);
        }
        if ($("#radio5").prop("checked") == true) {
            var miltiplaer = parseInt($("#radio5").data('miltiplaer'));
            console.log(miltiplaer);
        }
        if (count != 0) {
            var result = count * (price * miltiplaer);
            $('.def').addClass('hidden');
            $('.all-done').addClass('hidden');
            $('.all-sum').append('<p class="all-done">Итого: ' + count + ' шт. × ' + price + ' <span class="rub">&#8381;</span> = <span>' + result + '</span> <span class="rub">&#8381;</span></p>');
        } else {
            $('.def').removeClass('hidden');
            $('.all-done').addClass('hidden');
        }
    }
    //getPrice();
    function setUp(place, file) {
        var img = $($.parseHTML('<img>')).attr('src', window.URL.createObjectURL(file));
        img.onload = function (e) {
            window.URL.revokeObjectURL(this.src);
        };
        img.appendTo(place).wrap("<div class='wrap-img' data-title=" + file.name.replace(/\s/g, '&nbsp;').replace('—', '-') + "></div>").addClass('loadedimg');
        $(place).find('.no-photo').remove();
        $(place).addClass('when-upload-photo');
        $(place).removeClass('when-no-photo');
    }

    function placeholdIt(place) {
        $(place).removeClass('when-upload-photo');
        $(place).addClass('when-no-photo');
        $(place).html('<div class="no-photo text-center"><div class="icon-inner"><div></div><div></div></div><p>Здесь появятся<br>загруженные фотографии.</p><p>Вы сможете удалить ненужные<br>снимки прямо из этого диалога.</p></div>');
    }

    $('button').on('click', function (e) {
        var toggle = e.currentTarget.getAttribute('data-toggle');
        var detach = e.currentTarget.getAttribute('data-detach');

        if (toggle == 'file') {
            var targetInput = e.currentTarget.getAttribute('data-target'),
                targetfile = $('#' + targetInput);
            targetfile.click();
        } else if (detach == 'form') {
            var detachedForm = $('[data-target="form"]').detach();
            detachedForm.appendTo('#show');
            $('#show2').collapse('hide');
        } else if (detach == 'form-2') {
            var detachedForm = $('[data-target="form"]').detach();
            detachedForm.appendTo('#show2');
            $('#show').collapse('hide');
        }
    });
    $('#fileOne').on('change', function () {
        $('div.photo-upload-container.one').html(' ');
        imagesPreview(this, 'div.photo-upload-container.one');
        calc();
    });
})();