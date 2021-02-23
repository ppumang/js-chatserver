let ls = () => {        
    let xhr = new XMLHttpRequest();
    xhr.open('get', '/command/ls', true);
    xhr.send();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            let users = JSON.parse(xhr.response);
            leaveTrace('ls');
            let content = makeHTMLContent('div', null, {'class': 'chat_content'});
            for (let i=0; i<users.length; i++) {
                let user = makeHTMLContent('p', users[i], {'class': 'cmd_result'});
                content.appendChild(user);
                DOC_message_container.appendChild(content);
                window.scrollTo(0, document.body.scrollHeight);
            }
        }
    }
}

let exit = () => {
    return location.href = '/login';
}

let clear = () => {
    return location.reload();
}

let command_list = () => {
    return {
        ls, exit, clear
    }
}