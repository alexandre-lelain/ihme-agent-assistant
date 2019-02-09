# ihme-agent-assistant

At INSA Rouen, we created a mobile application to propose a virtual agent with whom we can discuss.
It is possible to ask it to set up an alarm. It asks the questions oriented to have all the necessary information.

The buzzer associated with the alarm will match the weather of the user's location when it rings.

See `demo/demo.mp4` to see the result of the project.

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
