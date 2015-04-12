<%-- 
    Document   : registro
    Created on : 27/04/2014, 06:27:27 PM
    Author     : cr76
--%>
<%@page import="conexion.Var"%>
<!doctype html>
<html>
<head>
	<title>El Momento Exacto</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>

	<link href='http://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" href="css/font-awesome.min.css">


	<link rel="stylesheet" href="css/normalize.css">
	<link rel="stylesheet"  href="css/foundation.css">
	<link rel="stylesheet" href="css/custom.css">
	<link rel="stylesheet" href="css/calendar.css">

	<link href='http://fonts.googleapis.com/css?family=Fira+Sans:300,400,500,700,300italic,400italic,500italic,700italic|Fira+Mono:400,700' rel='stylesheet' type='text/css'>
	<script src="js/vendor/modernizr.js"></script>
	<script src="js/vendor/jquery.js"></script>
	<script src="js/foundation/foundation.js"></script>
	<script src="js/foundation/foundation.topbar.js"></script>
</head>
<body>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

    <%@page errorPage="Error.jsp" %>
    <%@ page session="true" %>
    <%@page import="java.sql.*" %>
    <%@page import="conexion.conectar" %>
    <%
        String usuario = request.getParameter("usuario");
        String pass = request.getParameter("pass");
        String email = request.getParameter("email");
        String numTarjeta = request.getParameter("numTarjeta");                  
        String identificador = request.getParameter("identificador");
        String monto = request.getParameter("monto");
        conectar conexion = new conectar("jdbc:mysql://localhost/tandapp","root","");
        String sql = "insert into usuario values (null,'"+usuario+"','"+pass+"','"+email+"','"+numTarjeta+"');";
        Var v = new Var();
        v.setIdentificador(identificador);
        
            
            if(conexion.ejecutaSentencia(sql) > 0 ){
                response.sendRedirect("registro.html");
                               
                v.estado();
            }else{
        %>
     
	<div class="full-width-head verdefondo">
  		<div class="wrap">
			<a class="logotexto" href="index.html"><img src="img/logo-chico-2.png" height="27px" width="286px"></a>
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
				<input  class="rounded" class="rounded" name="event[place]" placeholder="contraseña de nuevo" type="password">
                                <p class="headinput">Correo</p>
				<input type="text" class="rounded" name="email" placeholder="ejemplo@ejemplo.com">
                                <p class="headinput">Tarjeta Credito</p>
                                <input type="text" class="rounded" name="numTarjeta" placeholder="NumTarjeta">
                                <input type="submit" class="button large boton boton2 radius">        
			</form>
			</div>
		</div>
	</div>

		


<script src="/js/vendor/jquery.js"></script>
<script src="/js/foundation.min.js"></script>
<script src="/js/calendar.js"></script>
<script>$(document).foundation();</script>
<script>$('#date-1').calendarizar({});</script>	
	

</body>
<%
                }
%>
</html>
        