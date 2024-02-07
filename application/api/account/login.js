({
  access: 'public',

  parameters: {
    token: 'string',
  },

  method: ({ token }) => {
    return token;
  },

  returns: 'string',
});
