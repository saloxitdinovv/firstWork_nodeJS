let host = 'http://localhost:8080/users'

fetch(host)
    .then(res => res.json())
    .then(res => reload(res))


let ul = document.querySelector('ul')
let add_button = document.querySelector('button')

add_button.onclick = () => {
    fetch(host, {
        method: 'post',
        body: JSON.stringify({ firstName: 'Doni', lastName: 'Saloxitdinov' }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(res => adding_users(res))
}


function reload(arr) {
    ul.innerHTML = ''

    for (let item of arr) {
        let li = document.createElement('li')
        let button = document.createElement('button')

        li.innerHTML = '';

        let nameSpan = document.createElement('span');
        nameSpan.innerText = item.firstName + " " + item.lastName;

        button.innerHTML = 'Delete';

        ul.append(li);
        li.append(nameSpan);
        li.append(button);



        button.onclick = () => {
            fetch('http://localhost:8080/users/' + item.id, {
                method: 'delete'
            })
                .then(res => {
                    if (res.status === 200 || res.status === 201) {
                        li.remove()
                    }
                })
        }
        li.ondblclick = () => {
            const newName = prompt('Введите новое имя пользователя:')
            if (newName) {
                fetch('http://localhost:8080/users/' + item.id, {
                    method: 'put',
                    body: JSON.stringify({ firstName: newName }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then(res => res.json())
                    .then(newName => {
                        nameSpan.innerHTML = newName.firstName
                    })
            }
        }
    }
}

function adding_users(res) {
    let li = document.createElement('li')
    let button = document.createElement('button')

    li.innerHTML = res.firstName + " " + res.lastName
    button.innerHTML = 'Delete'

    ul.append(li)
    li.append(button)


    button.onclick = () => {
        fetch('http://localhost:8080/users/' + res.id, {
            method: 'delete'
        })
            .then(res => {
                if (res.status === 200 || res.status === 201) {
                    li.remove()
                }
            })
    }
}


