({
  ...crud('user'),
  read: async () => {
    console.warn('🚨 This is a warning');
    return await await db.user.findMany();
  },
});
