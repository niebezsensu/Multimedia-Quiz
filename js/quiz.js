$(document).on('ready', function() {
    $('#next').on('click', function() {
        var self = $(this);
        $('.actuall').animate({
            opacity: 0.25,
            left: 700
        }, 3000, 'linear', function() {
            console.log(self.nextAll('.question'));
            console.log(self.nextAll());
            // Animation complete.
            $(this).removeClass('actuall');
            $(this).next().addClass('actuall');
        })
    })
})