
require('./bootstrap');


const message_el = document.getElementById('messages');
const username_input = document.getElementById('username');
const message_input = document.getElementById('message_input');
const message_form = document.getElementById('message_form');


message_form.addEventListener('submit', function(e){
    e.preventDefault();

    var has_error = false;
    if(username_input.value.trim() == ''){
        alert('Please enter a username');
        has_error = true;
        return;
    }
    if(message_input.value.trim() == ''){
        alert('Please enter a message');
        has_error = true;
    }
    if(has_error){
        return;
    }

    const options = {
        method: 'post',
        url: '/send-message',
        data: {
            username: username_input.value,
            message: message_input.value
        }
    };
    axios(options);
    message_input.value = '';
});

window.Echo.channel('chat')
    .listen('.message', (e) => {
        message_el.innerHTML += 
            '<div class="message_row"><strong>' 
            + e.username + '</strong>: ' 
            + e.message + ' </div>';

    });