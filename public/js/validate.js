/**
 * Created by tehetenamasresha on 24/04/2017.
 */
$(document).ready(function(){
    $('#register').on('submit', (e)=>{
        e.preventDefault()
        const title = $.trim($('#title').val());
        const author = $.trim($('#author').val());
        const genre = $.trim($('#genre').val());
        const description = $.trim($('#description').val());
        const img = $.trim($('#upload-input').val());

        let isValid = true;

        if(title == ''){
            isValid = false;
            $('#errorMsg1').html('<div class="alert alert-danger">Title field is empty</div>');
        }else{
            $('#errorMsg1').html('');
        }

        if(author == ''){
            isValid = false;
            $('#errorMsg2').html('<div class="alert alert-danger">Author field is empty</div>');
        }else{
            $('#errorMsg2').html('');
        }

        if(genre == ''){
            isValid = false;
            $('#errorMsg3').html('<div class="alert alert-danger">Genre field is empty</div>');
        }else{
            $('#errorMsg3').html('');
        }

        if(isValid == true){

            const bookData = {
                name: title,
                author: author,
                genre: genre,
                description: description,
                img: img
            };

            $.ajax({
                url: '/book/create',
                type: 'POST',
                data: bookData,
                success: (data)=>{
                    $('#title').val('');
                    $('#author').val('');
                    $('#genre').val('');
                    $('#description').val('');

                }
            });

        }else{
            return false;
        }

    });
})
