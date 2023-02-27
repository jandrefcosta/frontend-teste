import RequestService from './'

interface LoginRequest {
    login?: string,
    senha?: string
}

export async function login(request: LoginRequest) {
    const { data } = await RequestService.post("/login", request);
    return data;
}