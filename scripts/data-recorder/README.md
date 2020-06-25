## Data recorder

use

```
openssl req -new -x509 -keyout server.pem -out server.pem -days 365 -nodes
```

to generate self-signed certificate for HTTPS server.

### Usage

On POSIX compliant system, run

```
python3 serve.py
```

On Windows, run

```
py -3 serve.py
```

to start HTTPS server to serve webpage and go to `https://server.addr/index.html` to use data recorder.