package conexion;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class conectar {
  private Connection con;
    private ResultSet rs;
    private Statement stmt;
    
    public conectar(String urlBD,String usuarioBD,String passwordBD) throws Exception {
        Class.forName("com.mysql.jdbc.Driver");
        con = DriverManager.getConnection(urlBD,usuarioBD,passwordBD);
        stmt = con.createStatement();
    }
    
    public ResultSet ejecutaSelect(String query) throws SQLException {
        rs = stmt.executeQuery(query);
        return rs;
    }
    
    public int ejecutaSentencia(String sql) throws SQLException {
        int cambios = stmt.executeUpdate(sql);
        return cambios;
    }   
    
    
}

