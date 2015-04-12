<%-- 
    Document   : succes
    Created on : 11/04/2015, 09:50:48 PM
    Author     : cr76
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!doctype html>
<%
    HttpSession iniciada = request.getSession();    
    if(iniciada.getAttribute("usuario") != null){        
        response.sendRedirect("registro.html");
    }else{
%>
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
	<div class="full-width-head blancofondo">
  		<div class="wrap">
  			<div class="sec">
			<a class="logotexto" href="index.html"></a>
			</div>
		</div>
	</div>

              


	<div class="full-width verdefondo">
  		<div class="wrap">
  			<div class="sec">
			<h1 class="lighthead">¡Transacción agendada!</h1>
			<p class="secondtext">Así podemos estar en contacto contigo y avisarte cuando haya quedado tu transacción. Además, asi podemos hacer más fácil que te manden Bitcoins.</p>


		</div>
		</div>
	</div>

	<div class="full-width verdefondo">
  		<div class="wrap">
  			<div class="sec">
			<a class="button large boton boton2 radius" href="index.html">Vuelve al inicio</a>
		</div>
		</div>
	</div>

		


<script src="/js/vendor/jquery.js"></script>
<script src="/js/foundation.min.js"></script>
<script src="/js/calendar.js"></script>
<script>$(document).foundation();</script>
<script>$('#date-1').calendarizar({});</script>	
	

</body>
</html>

<%
    }
%>