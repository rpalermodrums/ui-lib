import { HttpResponse, http } from 'msw';

export const handlers = [
  http.post('/submit', async ({ request }) => {
    const requestBody = await request.json();
    console.log(requestBody);
    return new HttpResponse('Hello world!');
  }),
];
