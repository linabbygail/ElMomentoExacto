package MexBt;
import java.util.ArrayList;
import java.util.Random;
/**
 *
 * @author cr76
 */
public class MexBt {
    private float precioBit;
    
    
    public MexBt(){
        
        Random rnd = new Random(4);        
        precioBit = rnd.nextFloat();
        
    }
    
    
    public float getVentaBitAhora(){
        return precioBit;
    }      
    
    
}
