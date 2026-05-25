export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { mensaje } = req.body;
  if (!mensaje || !mensaje.trim()) {
    return res.status(400).json({ error: 'Mensaje vacío' });
  }

  const SUPABASE_URL  = process.env.SUPABASE_URL;
  const SUPABASE_KEY  = process.env.SUPABASE_ANON_KEY;

  const response = await fetch(`${SUPABASE_URL}/rest/v1/mensajes`, {
    method: 'POST',
    headers: {
      'apikey':        SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type':  'application/json',
      'Prefer':        'return=minimal',
    },
    body: JSON.stringify({
      mensaje: mensaje.trim(),
      fecha:   new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    return res.status(500).json({ error: 'Error guardando mensaje' });
  }

  return res.status(200).json({ ok: true });
}
