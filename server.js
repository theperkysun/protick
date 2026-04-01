import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, 'public');
const port = process.env.PORT || 3000;

let tasks = [
  { id: 1, title: 'Quarterly Strategic Deck', lane: 'professional', status: 'today', priority: 'high', minutes: 120, notes: 'Align Q2 narrative with revenue goals.' },
  { id: 2, title: 'Deep Work Block', lane: 'professional', status: 'today', priority: 'medium', minutes: 90, notes: 'Finalize API schema and migrations.' },
  { id: 3, title: 'Yoga Flow Routine', lane: 'personal', status: 'today', priority: 'medium', minutes: 45, notes: 'Evening mobility and breathwork.' },
  { id: 4, title: 'Weekend Garden Layout', lane: 'personal', status: 'inbox', priority: 'low', minutes: 60, notes: 'Map shade and irrigation zones.' }
];

const contentTypes = { '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript' };

const send = (res, status, payload, headers = {}) => {
  res.writeHead(status, { ...headers, 'Access-Control-Allow-Origin': '*' });
  res.end(payload);
};

const sendJson = (res, status, obj) => send(res, status, JSON.stringify(obj), { 'Content-Type': 'application/json' });

const getSummary = () => ({
  completed: tasks.filter((t) => t.status === 'done').length,
  pending: tasks.filter((t) => t.status !== 'done').length,
  professional: tasks.filter((t) => t.lane === 'professional').length,
  personal: tasks.filter((t) => t.lane === 'personal').length,
  total: tasks.length
});

const parseBody = async (req) => {
  let body = '';
  for await (const chunk of req) body += chunk;
  return body ? JSON.parse(body) : {};
};

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === 'OPTIONS') return send(res, 204, '');

  if (url.pathname === '/api/summary' && req.method === 'GET') return sendJson(res, 200, getSummary());

  if (url.pathname === '/api/tasks' && req.method === 'GET') {
    let data = [...tasks];
    const lane = url.searchParams.get('lane');
    const status = url.searchParams.get('status');
    if (lane) data = data.filter((t) => t.lane === lane);
    if (status) data = data.filter((t) => t.status === status);
    return sendJson(res, 200, data);
  }

  if (url.pathname === '/api/tasks' && req.method === 'POST') {
    const body = await parseBody(req);
    if (!body.title) return sendJson(res, 400, { message: 'title is required' });
    const next = {
      id: tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
      title: body.title,
      lane: body.lane || 'professional',
      status: body.status || 'inbox',
      priority: body.priority || 'medium',
      minutes: body.minutes || 30,
      notes: body.notes || ''
    };
    tasks.unshift(next);
    return sendJson(res, 201, next);
  }

  if (url.pathname.startsWith('/api/tasks/') && req.method === 'PATCH') {
    const id = Number(url.pathname.split('/').pop());
    const target = tasks.find((t) => t.id === id);
    if (!target) return sendJson(res, 404, { message: 'Task not found' });
    Object.assign(target, await parseBody(req));
    return sendJson(res, 200, target);
  }

  if (url.pathname.startsWith('/api/tasks/') && req.method === 'DELETE') {
    const id = Number(url.pathname.split('/').pop());
    const before = tasks.length;
    tasks = tasks.filter((t) => t.id !== id);
    return before === tasks.length ? sendJson(res, 404, { message: 'Task not found' }) : send(res, 204, '');
  }

  const filePath = url.pathname === '/' ? path.join(publicDir, 'index.html') : path.join(publicDir, url.pathname);
  if (filePath.startsWith(publicDir) && fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    return send(res, 200, fs.readFileSync(filePath), { 'Content-Type': contentTypes[ext] || 'text/plain' });
  }

  return send(res, 404, 'Not Found', { 'Content-Type': 'text/plain' });
});

server.listen(port, () => console.log(`Protick running at http://localhost:${port}`));
