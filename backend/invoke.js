const handler = require('C:/Users/victor/Documents/GitHub/lumen/backend/dist/main.js').default;
const req = { method: 'GET', url: '/', headers: {} };
const res = {
  status(code){ this._status=code; return this; },
  json(body){ console.log('RESPONSE STATUS', this._status, JSON.stringify(body)); return this; },
  setHeader(){},
};
handler(req, res).then(()=>console.log('HANDLER DONE')).catch(e=>console.error('HANDLER REJECT', e));
