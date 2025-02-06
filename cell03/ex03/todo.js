let count = 1;
let cookie = [];

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
    if (txt == "" || txt == null) {
        alert("To Do List Can't Empty");
        return;
    }
    cookie.unshift(txt);
    save();
    add(txt, true);
}

function add(txt, top) {
    let div = document.createElement("div");
    let t = document.createTextNode(txt);
    div.appendChild(t);
    div.setAttribute("id", count);
    div.setAttribute("class", "beauti");
    div.setAttribute("onclick", "dt(this)");
    let ft = document.getElementById("ft_list");
    if (top) {
        ft.prepend(div);
    } else {
        ft.appendChild(div);
    }
    count += 1;
}

function dt(element) {
    let check = confirm("Do You Want To Delete This?");
    if (check) {
        let ft = document.getElementById("ft_list");
        let txt = element.childNodes[0].nodeValue;
        cookie = cookie.filter(item => item !== txt);
        save();
        ft.removeChild(element);
    }
}

load();