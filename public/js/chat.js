$(document).ready(()=>{
    const id = $('#receiverId').val();

    $('#message').click(function(){
        const message = $.trim($('#msg').val());

        if(message != ''){
            $.post('/message/'+id, {
                message: message,
                id: id
            }, function(data){
                $('#msg').val('');
            });
        }
    });

    setInterval(function(){
        $('.msg').load(location.href + ' .msg');
    }, 200);
});