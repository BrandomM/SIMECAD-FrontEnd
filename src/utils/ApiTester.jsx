import { LoginService } from "../services/LoginService";

export function ApiTester() {
  const credenciales = { correo: "admin@gmail.com", contrasena: "admin123" };
  const usuario = {correo: "correodeprueba@asda.com", nombre: "Alguien", contrasena: "algoblabla", celular: "465465"};

  const testLogin = (credenciales) => {
    LoginService.login(credenciales);
  };

  const testRegistro = (usuario) => {
    LoginService.registro(usuario);
  };

  const testLogout = () => {
    LoginService.logout();
  };

  const testGetUsuario = () => {
    LoginService.getUsuario();
  }

  

  return <button onClick={() => testGetUsuario()}>Test API</button>;
}
