module.exports.handler = async (event) => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      {
        message: "Hi there, I’m Nabendu Manna, This is my Serverless API. :-)",
        // input: event,
      },
      null,
      2
    ),
  };
};
