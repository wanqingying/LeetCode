import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

public class ReflectObj {

    public static void main(String[] args) {
        System.out.println("obj");
        SayServiceImpl sm=new SayServiceImpl();
        SayService smp = (SayService) ProxyFactory.getSayProxy(sm);
        smp.say("ok");
    }
}

interface SayService {
    void say(String msg);
}

class SayServiceImpl implements SayService {

    @Override
    public void say(String msg) {
        System.out.println("say " + msg);
    }
}

class LogSayHandle implements InvocationHandler {

    private Object target;

    public LogSayHandle(Object target) {
        this.target = target;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        System.out.println("say before log");
        method.invoke(target, args);
        System.out.println("say after log");
        return null;
    }
}

class ProxyFactory {
    public static Object getSayProxy(Object object) {
        return Proxy.newProxyInstance(object.getClass().getClassLoader(), object.getClass().getInterfaces(), new LogSayHandle(object));
    }
}



