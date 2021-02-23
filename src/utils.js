function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i=0; i<6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function makeHTMLContent(tag, text, attr) {
    if (!tag) {return;}
    let content = document.createElement(tag);
    if (text) {content.innerHTML = text;}
    if (attr) {
        for (key of Object.keys(attr)) {
            content.setAttribute(key, attr[key]);
        }
    }
    return content;
}

function leaveTrace(_cmd) {
    let main = makeHTMLContent('span', user_name + "@main", {"id": "terminal_main"});
    let colon = makeHTMLContent('span', " : ", {"id" : "colon"});
    let dir = makeHTMLContent('span', "/sneaky_chat", {"id": "terminal_dir"});
    let dollar = makeHTMLContent('span', "$", {"id": "dollar"});
    let cmd = makeHTMLContent('span', _cmd, {"class": "trace_text"});

    let content = makeHTMLContent('div', null, {"style" : "display: flex; padding: 0.25rem; align-items: center"});

    content.append(main, colon, dir, dollar, cmd);

    DOC_message_container.appendChild(content);
    window.scrollTo(0, document.body.scrollHeight);        
}