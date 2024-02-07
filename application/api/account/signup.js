({
  access: 'public',

  parameters: {
    email: 'string',
  },

  method: ({ email }) => {
    return email;
  },

  returns: 'string',
});
