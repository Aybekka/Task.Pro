export async function sendHelpController(req, res) {
  const { email, comment } = req.body;
  console.info('[help request]', { email, comment });
  res.json({ status: 200, message: 'Help request received', data: { ok: true } });
}
