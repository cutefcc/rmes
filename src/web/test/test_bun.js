export default {
  port: 3002,
  fetch(request) {
    return new Response('welcome to bun');
  },
};
