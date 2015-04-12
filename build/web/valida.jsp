<%@page import="conexion.variable"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta charset="utf-8">
        <title>Inicio</title>      
    </head>
    <body>
        <%@page errorPage="Error.jsp" %>
        <%@ page session="true" %>
        <%@page import="java.sql.*" %>
        <%@page import="conexion.conectar" %>
        <%
            String usuario = request.getParameter("nombreUser");
            String pass = request.getParameter("passUser");
                                
            conectar conexion = new conectar("jdbc:mysql://localhost/tandapp","root","");
            String query = "SELECT * FROM usuario WHERE usuario='"+usuario+"' and pass='"+pass+"';";
            ResultSet rs = conexion.ejecutaSelect(query);
                           
            if(rs.next()){
                variable v = new variable();
            
                v.estado();
                HttpSession iniciada = request.getSession();
                iniciada.setAttribute("usuario", usuario);
                iniciada.setAttribute("pass",pass );
                response.sendRedirect("inde.jsp");
            }else {%>
        <div class="full-width-head verdefondo">
  		<div class="wrap">
			<a class="logotexto" href="index.html"></a>
		</div>
	</div>
	<div class="full-width">
  		<div class="wrap">
  			<form action="registro.jsp" class="new-list" method="POST">
				<h1 class="lighthead">Crea tu cuenta</h1>
				<p class="secondtext">Así podemos estar en contacto contigo y avisarte cuando haya quedado tu transacción. Además, así podemos hacer más fácil que te manden Bitcoins por El momento exacto</p>
				<p class="headinput">Escribe tu Nombre de Usuario</p>
				<input class="rounded" name="usuario" placeholder="usuario" type="text">
				<p class="headinput">Escribe tu Contraseña</p>
				<input type="password" class="rounded" name="pass" placeholder="contraseña">
				<p class="headinput">Escribe tu Contraseña de nuevo</p>
				<input  class="rounded" name="event[place]" placeholder="contraseña de nuevo" type="password">
                                <p class="headinput">Correo</p>
				<input type="text" class="rounded" name="email" placeholder="ejemplo@ejemplo.com">
                                <p class="headinput">Tarjeta Credito</p>
                                <input type="text" class="rounded" name="numTarjeta" placeholder="NumTarjeta">
                                <input type="submit" class="button large boton boton2 radius">        
			</form>
			</div>
		</div>
	

		


<script src="/js/vendor/jquery.js"></script>
<script src="/js/foundation.min.js"></script>
<script src="/js/calendar.js"></script>
<script>$(document).foundation();</script>
<script>$('#date-1').calendarizar({});</script>	

        <%
            
            }        
        %>
    </body>
</html>
