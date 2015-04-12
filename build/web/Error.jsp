<%-- 
    Document   : ErroresVelocidad
    Created on : 10/04/2014, 02:26:34 PM
    Author     : cr76
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Error</title>
    </head>
    <body>
        <h1>Pagina de errores </h1>
        <%@page isErrorPage="true" %>
        <p>Error: </p><br>
        <p>Se ha encontrado el siguiente error</p>
        <i><%= exception %></i><br>
    <a href="menu.html">Regresar al inicio</a>
    </body>
</html>
