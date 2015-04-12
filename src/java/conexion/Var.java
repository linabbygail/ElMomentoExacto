/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package conexion;

import MexBt.MexBt;
import static java.lang.Thread.sleep;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.ListIterator;
import java.util.Random;
/**
 *
 * @author cr76
 */
public class Var {
    private String identificador;
    private int plazo;
    private int monto;
    private int bandera;
    private String usuario;
    
    public void setIdentificador(String identificador){
        this.identificador = identificador;
    }
    
    public String getIdentificador(){
        return this.identificador;
    }

    public void setPlazo(int plazo){
        this.plazo = plazo;
    }
    
    public int getPlazo(){
        return this.plazo;
    }
    
    public void setMonto(int Monto){
        this.monto = monto;
    }
    
    public int getMonto(){
        return this.monto;
    }
    
    public void setBandera(int bandera){
        this.bandera = bandera;
    }
    
    public int getBandera(){
        return bandera;
    }
    
    public void setAtrib(String usuario){
        this.usuario = usuario;
    }
    
    public String getAtrib(){
        return usuario;
    }
    
    public void estado() throws Exception{
        Date ahora = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        sdf.format(ahora);
        ArrayList l2 = estadisticas();
        
            if(0 == getPlazo()){
                conectar conexion = new conectar("jdbc:mysql://localhost/tandapp","root","");            
                String sql = "insert into transacciones values ('null','"+consulta()+"','"+getIdentificador()+"','"+getMonto()+"','"+getPlazo()+"','"+sdf.toString()+"','null','"+0+"',null);";
                if(conexion.ejecutaSentencia(sql) > 0)
                    setPlazo(0);
            }else{
                MexBt mb = new MexBt();
                
                for(int i = 0;i<l2.size();i++){
                    if(Float.parseFloat((String) l2.get(i)) > Float.parseFloat((String) l2.get(i)) && getPlazo() != 0 || Float.parseFloat((String) l2.get(i)) == mb.getVentaBitAhora() && getPlazo() == 0){
                        conectar conexion = new conectar("jdbc:mysql://localhost/tandapp","root","");            
                        String sql = "insert into transacciones values (null,'"+consulta()+"','"+getIdentificador()+"','"+getMonto()+"','"+getPlazo()+"','"+ahora.toString()+"',"+null+",'"+0+"' ,NULL);";
                        if(conexion.ejecutaSentencia(sql) > 0)
                        setPlazo(0);
                    }else{
                        System.out.println(Float.parseFloat((String) l2.get(i)));
                        sleep(10);
                    }
                    
                    
                }
        }
    }
    
      ArrayList estadisticas(){
        Random rnd = new Random(4);
        ArrayList al = new ArrayList<>();
        for(int i=0; i < 50; i++){
            al.add(rnd.nextFloat());
        }        
        return al;
    }  
    public String consulta() throws Exception{
        conectar conexion = new conectar("jdbc:mysql://localhost/tandapp","root","");    
        String consulta = "SELECT * FROM usuario;";
    ResultSet rs = conexion.ejecutaSelect(consulta);
        ResultSetMetaData rsmd1 = rs.getMetaData();
        rsmd1.getColumnName(2);
        String correo=null;
        
        ResultSetMetaData rsmd2 = rs.getMetaData();
        correo = rsmd2.getColumnLabel(4);
        
        
        return correo;
            
    } 
    
}
