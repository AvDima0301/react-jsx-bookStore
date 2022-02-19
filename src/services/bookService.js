const baseUrl = 'https://localhost:44323/api/Book';

export function getBook() {
    return fetch(baseUrl, { method: 'GET'})
            .then(res => res.json())
}

export function delBook(id) {
    return fetch(`${baseUrl}/DeleteBook/${id}`,
    {method: "DELETE"})
}

export function addBook(book) {
    return fetch(`${baseUrl}/AddBook`, {
        method: "POST",
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(book)
    });
}

export function getSingleBook(id) {
    return fetch(`${baseUrl}/GetSingleBook/${id}`, {
        method: "Get"
    })
    .then(res => res.json())
}

export function editBook(book) {
    return fetch(`${baseUrl}/EditBook`, {
        method: "POST",
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(book)
    });
}

export function getFilterBook(filter) {
    return fetch(`${baseUrl}/GetFilterBook/${filter}`, { method: 'GET'})
            .then(res => res.json())
}
