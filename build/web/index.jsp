<%-- 
    Document   : index
    Created on : 11/04/2015, 05:20:38 PM
    Author     : cr76
--%>

<%@page import="conexion.variable"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <%@page errorPage="Error.jsp" %>
        <%@ page session="true" %>
        <%@page import="java.sql.*" %>
        <%@page import="conexion.conectar" %>
        <%
            variable v = new variable();
            v.setIdentificador(request.getParameter("identificador"));
            v.setMonto(Integer.parseInt(request.getParameter("monto")));
            v.setPlazo(Integer.parseInt(request.getParameter("plazo")));
            v.setBandera(1);
            response.sendRedirect("inicio.jsp");
        %>
            
        ola                        
            
    </body>
</html>
