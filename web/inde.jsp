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
	<div class="full-width-head verdefondo">
            <div class="wrap">
                <a class="logotexto" href="index.html"></a>
            </div>
	</div>

	<div class="full-width seccion">
  		<div class="wrap">
  			<div class="sec">
			<form name="form1" action="registro.jsp" method="POST">
				<h1 class="lighthead">¡Arma tu transacción!</h1>
				<p class="secondtext">¡Decide a quien le mandas Bitcoins! Si tu amigo ya tiene una cuenta aqui, con su mail basta. De otra forma necesitamos el ID de su Bitcoin Wallet</p>


				<p class="headinput">¿A quien le quieres mandar Bitcoins?</p>
				<input class="rounded" type="text" name="identificador" placeholder="email o Dirección de Bitcoin">                
                
                <p class="secondtext">Puedes empezar con $50. Te recomendamos un plazo de 7 dias para que puedas ver un crecimiento en tu dinero.</p>
				

				<p class="headinput">¿Cuanto quieres enviar?</p>
				<select name="monto">
                    <optgroup>
                        <option>20</option>
                        <option>50</option>
                        <option>100</option>
                        <option>2,000</option>
                        <option>5,000</option>
                    </optgroup>
                </select>

		<p class="headinput">¿En cuánto tiempo?</p>
                    <select name="plazo">
                <optgroup>
                    <option>7</option>
                    <option>15</option>
                    <option>30</option>
                </optgroup>                
                </select>
            <button>Hecho</button>	
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
</html>
