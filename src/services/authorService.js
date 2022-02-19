const baseUrl = 'https://localhost:44323/api/Author';

export function getAuthors() {
    return fetch(baseUrl, { method: 'GET'})
            .then(res => res.json())
}

export function delAuthor(id) {
    return fetch(`${baseUrl}/DeleteAuthor/${id}`,
    {method: "DELETE"})
}

export function addAuthor(author) {
    return fetch(`${baseUrl}/AddAuthor`, {
        method: "POST",
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(author)
    });
}

export function getSingleAuthor(id) {
    return fetch(`${baseUrl}/GetSingleAuthor/${id}`, {
        method: "Get"
    })
    .then(res => res.json())
}

export function editAuthor(author) {
    return fetch(`${baseUrl}/EditAuthor`, {
        method: "POST",
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(author)
    });
}

export function getFilterAuthor(filter) {
    return fetch(`${baseUrl}/GetFilterAuthor/${filter}`, { method: 'GET'})
            .then(res => res.json())
}