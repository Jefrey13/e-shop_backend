// Función para crear un token JWT y guardarlo en cookies
const sendToken = (user, statusCode, res) => {
  // Obtén el token JWT usando un método del modelo de usuario
  const token = user.getJwtToken();

  // Opciones para la cookie
  const options = {
    // La cookie expirará en 90 días a partir de ahora
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    // La cookie no será accesible desde el código JavaScript del navegador (mejora la seguridad)
    httpOnly: true,
    // Permite el envío de la cookie en solicitudes de origen cruzado
    sameSite: "none",
    // La cookie solo se enviará a través de conexiones HTTPS (mejora la seguridad)
    secure: true,
  };

  // Configura la respuesta HTTP
  // - Establece el código de estado HTTP
  // - Establece la cookie 'token' con el JWT y las opciones definidas
  // - Envía una respuesta JSON al cliente con los datos de éxito, usuario y token
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;