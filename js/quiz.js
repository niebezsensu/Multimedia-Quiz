$(document).on('ready', function() {
    
    var isFinished = false,
        waytingForApprove = false,
        waytingForTestRepeat = false;
    
    $('.item').on('click', function() {
        $(this).get(0).play();
    });
    
    $('.answers input').on('click', function() {
        $(this).parents(".answers").data('selected', true);
        $('#next').removeClass('disabled');
    });
    
    $('#next').on('click', function() {
        $('#prev').show();

        var self = $(this);
        
        if(waytingForTestRepeat) {
            
        } else if(isFinished) {
            $('.actuall').animate({
                opacity: 0.25,
                left: 700
            }, 1000, 'linear', function() {
    
                if ($(this).nextAll().length == 1) {
                    $('#next').text('Powtórz test');
                    waytingForTestRepeat = true;
                } 
                
                $(this).removeClass('actuall');
                $(this).next().addClass('actuall'); 
                
            });
        } else if(waytingForApprove) {
            isFinished = true;
            $('.actuall').removeClass('actuall');
            $('.question').each(function() {
                $(this).css('left', '0px')
                $(this).css('opacity', '1')
            })
            $('.question').first().addClass('actuall');
            
            $('#next').text('NEXT');
        } else {
            
            $('#next').addClass('disabled');
            if($('.actuall').next().find('.answers').data('selected') === true) {
                $('#next').removeClass('disabled');
            }
            
            $('.actuall').animate({
                opacity: 0.25,
                left: 700
            }, 1000, 'linear', function() {
    
                if ($(this).nextAll().length == 1) {
                    $('#next').text('Potwierdź rezultaty');
                    waytingForApprove = true;
                } 
                
                $(this).removeClass('actuall');
                $(this).next().addClass('actuall'); 
                
            });
        }
        
    })
    
    $('#prev').on('click', function() {
        $('#next').show();
        $('#next').removeClass('disabled');

        if(waytingForApprove) {
            waytingForApprove = false;
            $('#next').text('NEXT');
        }
        var self = $(this);
        $('.actuall').prev().animate({
            opacity: 1,
            left: 0
        }, 1000, 'linear', function() {

            if ($(this).prevAll('.question').length == 0) {
                $('#prev').hide();
            } else {
                
            }
            
            $('.actuall').removeClass('actuall');
            $(this).addClass('actuall');   
            
            
        })
    })
})