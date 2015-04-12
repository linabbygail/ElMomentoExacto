<%@page import="conexion.Var"%>
<%@page import="conexion.variable"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%
    
    HttpSession iniciada = request.getSession();    
    if(iniciada.getAttribute("usuario") == null){        
        Var v = new Var();
        v.estado();                
%>
<%@ page session="true" %>
<html lang="es">
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

<div class="full-width-head verdefondo">
  		<div class="wrap">
			<a class="logotexto" href="index.html"></a>
		</div>
	</div>
	<div class="full-width">
  		<div class="wrap">
  			<div class="sec">
			<form action="inde.jsp" class="new-list" method="POST">
				<h1 class="lighthead">Ingresar</h1>
				<p class="headinput">Escribe tu Nombre de Usuario</p>
				<input class="rounded" name="usuario" placeholder="usuario" type="text">
				<p class="headinput">Escribe tu Contraseña</p>
				<input type="password" class="rounded" name="pass" placeholder="contraseña">
                                <a href="valida.jsp" class="button large boton boton2 radius">Ingresar</a>
			</form>
			</div>
		</div>
	</div>

    </body>
</html>

<%
    }else{
        response.sendRedirect("index.html");
    }
%>