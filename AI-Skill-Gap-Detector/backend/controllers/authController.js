exports.login = async (req, res) => res.json({ token: 'jwt-token-xyz', user: req.body });
exports.register = async (req, res) => res.status(201).json({ token: 'jwt-token-xyz', user: req.body });
exports.getProfile = async (req, res) => res.json({ id: '1', name: 'Software Engineer', email: 'dev@example.com' });
