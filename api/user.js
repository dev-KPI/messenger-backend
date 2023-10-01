({
  ...crud('user'),
  read: async () => {
    console.warn('🚨 This is a warning');
    return await db.user.findMany();
  },
});
