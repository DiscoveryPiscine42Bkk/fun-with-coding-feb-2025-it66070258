let count = 1;
let cookie = [];

$(document).ready(function () {
    load();

    $('#bt').click(function () {
        nw();
    });
});

function load() {
    let saved = document.cookie
        .split('; ')
        .find(row => row.startsWith('todo='));
    if (saved) {
        cookie = JSON.parse(decodeURIComponent(saved.split('=')[1]));
        count = cookie.length + 1;
        cookie.forEach(item => add(item, false));
    }
}

function save() {
    document.cookie = `todo=${encodeURIComponent(JSON.stringify(cookie))}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
}

function nw() {
    let txt = prompt("Add new To Do List.");
    if (txt === "" || txt === null) {
        alert("To Do List Can't Be Empty");
        return;
    }
    cookie.unshift(txt);
    save();
    add(txt, true);
}

function add(txt, top) {
    let div = $('<div></div>')
        .text(txt)
        .attr('id', count)
        .addClass('beauti')
        .click(function () {
            dt($(this));
        });

    if (top) {
        $('#ft_list').prepend(div);
    } else {
        $('#ft_list').append(div);
    }
    count += 1;
}

function dt(element) {
    let check = confirm("Do You Want To Delete This?");
    if (check) {
        let txt = element.text();
        cookie = cookie.filter(item => item !== txt);
        save();
        element.remove();
    }
}