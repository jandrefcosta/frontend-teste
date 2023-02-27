import RequestService from './'


/*
(GET)       http://0.0.0.0:5000/cards/
(POST)      http://0.0.0.0:5000/cards/
(PUT)       http://0.0.0.0:5000/cards/{id}
(DELETE)    http://0.0.0.0:5000/cards/{id}
*/

export async function GetAllCards() {
    const { data } = await RequestService.get("/cards");
    return data;
}

export async function AddCard(request: any) {
    const { data } = await RequestService.post("/cards", request);
    return data;
}

export async function UpdateCard(request: any) {
    const { data } = await RequestService.put(`/cards/${request.id}`, request);
    return data;
}

export async function DeleteCard(request: any) {
    const { data } = await RequestService.delete(`/cards/${request.id}`);
    return data;
}

