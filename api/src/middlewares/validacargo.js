function validaclinica(req, res, next) {
  if (req.usuario.tipo_usuario !== 'CLINICA') {
    return res.status(403).json({ erro: 'Acesso negado' });
  }
  next();
}

function validaadotante(req, res, next) {
  if (req.usuario.tipo_usuario !== 'ADOTANTE') {
    return res.status(403).json({ erro: 'Acesso negado' });
  }
  next();
}

module.exports = { validaclinica, validaadotante };