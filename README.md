# ihme-agent-assistant

# Connection to server via SSH

## From outside INSA
  
* First create a tunnel :
    
```ssh -L2200:asi-17-ihme.insa-rouen.fr:22 LOGIN@ssh.insa-rouen.fr```

* Then connect via ssh :

```ssh -X -p2200 -o 'HostKeyAlias asi-17-ihme.insa-rouen.fr' pao@localhost```

## From inside INSA

* Connect directly via ssh

```ssh pao@asi-17-ihme.insa-rouen.fr```

# Connection to server via HTTP

[Click me to get super-powers. No fake.](http://asi-17-ihme.insa-rouen.fr)
