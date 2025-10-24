// FAKE API FOR PUBLIC REPOSITORY DEMO
// https://github.com/raminr77/react-sample

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'GET, POST'
};

const FAKE_DATA = [
  { id: 1, name: 'John Doe', age: 30 },
  { id: 2, name: 'Jane Smith', age: 25 },
  { id: 3, name: 'Alice Johnson', age: 28 },
  { id: 4, name: 'Bob Brown', age: 35 },
  { id: 5, name: 'Charlie Davis', age: 22 },
  { id: 6, name: 'Diana Prince', age: 27 },
  { id: 7, name: 'Ethan Hunt', age: 32 },
  { id: 8, name: 'Fiona Apple', age: 29 },
  { id: 9, name: 'George Clooney', age: 40 },
  { id: 10, name: 'Hannah Montana', age: 21 }
];

export function GET() {
  return new Response(
    JSON.stringify({
      success: true,
      message: 'Your request was successful',
      data: FAKE_DATA
    }),
    {
      status: 200,
      headers
    }
  );
}

export async function POST(request: Request) {
  const { username, password } = (await request.json()) as {
    username: string;
    password: string;
  };
  if (username !== 'admin' || password !== 'admin') {
    return new Response(JSON.stringify({ success: false, message: 'Invalid request' }), {
      status: 400,
      headers
    });
  }
  return new Response(
    JSON.stringify({
      success: true,
      message: 'Logged in successfully.',
      data: {
        repository: 'https://github.com/raminr77/react-sample',
        token: 'fake-sample-token-1234567890',
        user: {
          id: 1,
          name: 'Ramin Rezaei',
          email: 'info@raminrezaei.se'
        }
      }
    }),
    {
      status: 200,
      headers
    }
  );
}
