const jwt = require('jsonwebtoken')
const { promisify } = require('util')
// middleware que gera o token
module.exports = async(req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Token não informado.' });
    }
    const [, token] = authHeader.split(' ');
    try {
        const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET);
        req.userId = decoded.id;
        req.userName = decoded.usuario;
        req.userEmail = decoded.email;
        return next();
    } catch (err) {
        return res.status(401).json({ error: 'Token inválido.' });
    }
}
