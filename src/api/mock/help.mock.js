function delay(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

export async function mockSendHelpRequest({ email, comment }) {
  await delay(150);
  // eslint-disable-next-line no-console
  console.info('[help request]', { email, comment });
  return { ok: true };
}
