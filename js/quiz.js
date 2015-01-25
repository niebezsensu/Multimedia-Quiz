$(document).on('ready', function() {
    
    var isFinished = false,
        waytingForApprove = false,
        waytingForTestRepeat = false;
    
    $('video.item').on('click', function() {
        $(this).get(0).play();
    });
    
    $('.answers input').on('click', function() {
        var selected = $(this).data('answer');
        var correct = $(this).parents(".answers").data('answer');
        if(selected === correct) {
            $(this).parents(".answers").data('correct', true);
        } else {
            $(this).parents(".answers").data('correct', false);
        }
        $(this).parents(".answers").data('selected', true);
        $('#next').removeClass('disabled');
    });
    
    $('#next').on('click', function() {
        $('#prev').show();

        var self = $(this);
        
        if(waytingForTestRepeat) {
            $('.answers').removeClass('correct');
            $('.answers').removeClass('incorrect');
            
            $('.radio').removeClass('disabled')
            $('.radio input').attr('disabled',false);
            $('.radio input').attr('checked',false);
            
            $('#next').text('NEXT');
            $('#next').addClass('disabled');
            
            isFinished = false,
            waytingForApprove = false,
            waytingForTestRepeat = false;
            
            $('.actuall').removeClass('actuall');
            $('.question').each(function() {
                $(this).css('left', '0px')
                $(this).css('opacity', '1')
            })
            $('.question').first().addClass('actuall');
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
            
            $('.radio').addClass('disabled')
            $('.radio input').attr('disabled',true);
            
            $('.answers').each(function() {
                if($(this).data('correct')) {
                    $(this).addClass('correct');
                } else {
                    $(this).addClass('incorrect');
                }
            });
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
        if(isFinished) {
            waytingForTestRepeat = false;
            $('#next').text('NEXT');
            //waytingForApprove = true;
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