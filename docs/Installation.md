# Installing the Blockchain UI and backend

## Installing the backend

First, please make sure that the backend resides in the same folder as the blockchain simulator:

```
root folder
|-blockchain-simulator
|-Blockchain-Backend
|-BlockChain-UI
```

First install `Node.js`
```
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs
```

```bash
cd Blockchain-Backend
sudo npm install
sudo npm install -g forever 
sudo npm install -g serve
```
inside backend
```bash
npm install archiver --save
```

Now you can run the server for local host:
```bash
num start
```

Or using `forever`:
```bash
forever start server.js
```

**Deployment**

To deploy in the server to run without maintain a shell, we suggest using ```forever```. Just make sure the server listen to ```localhost:4500```
```bash
forever start server.js
```

## Installing the UI
```bash
cd BlockChain-UI
npm install
```

Change the line in `Global.js` from top to the bottom one:
```
const SERVER = 'http://54.144.41.15/';
const SERVER = 'http://localhost:3000/';
```

Now you can test the server from localhost using 
```bash
PORT=3000 npm start
```

**Deployment**

To make it deploy on a server to allot it to listen publicly, we suggest using ```nginx``` to forward request to the running UI

```bash
sudo apt install nginx
```

Find the ```nginx``` installation config folder with site configuration folder named `sites-available`. In the amazon AWS ubuntu EC2 instance it is in `/etc/nginx/sites-available`

change the `default` configuration content into the following:
```
server {
    listen 80;
    server_name _;
}
location / {
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header Host $http_host;
    proxy_pass http://172.31.44.197:8080/; 
}
location /chain {
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header Host $http_host;
    proxy_pass http://172.31.44.197:8080/chain; 
}
location /msg {
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header Host $http_host;
    proxy_pass http://172.31.44.197:8080/msg; 
}
location /dolev_strong {
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header Host $http_host;
    proxy_pass http://172.31.44.197:8080/dolev_strong; 
}
location /file {
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header Host $http_host;
    proxy_pass http://172.31.44.197:8080/file; 
}
location /upload {
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header Host $http_host;
    proxy_pass http://172.31.44.197:4500/upload; 
}
location /exec {
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header Host $http_host;
    proxy_pass http://172.31.44.197:4500/exec; 
}
location /get_run {
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header Host $http_host;
    proxy_pass http://172.31.44.197:4500/get_run; 
}
location /player_state {
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header Host $http_host;
    proxy_pass http://172.31.44.197:4500/player_state; 
}
location /message {
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header Host $http_host;
    proxy_pass http://172.31.44.197:4500/message; 
}
location /list_run {
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header Host $http_host;
    proxy_pass http://172.31.44.197:4500/list_run; 
}
location /config {
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header Host $http_host;
    proxy_pass http://172.31.44.197:4500/config; 
}
```

Note that `172.31.44.197` is the private IP address that we deploy our server in. You should change it into the private IP that you deploy your server in

After saving this then restart `nginx` service
```bash
sudo systemctl restart nginx
```

Change the line in `Global.js` from top to the bottom one, you should replace `54.144.41.15` with the public IP that your server deploys in, or public domain name:
```bash
const SERVER = 'http://localhost:3000/';
const SERVER = 'http://54.144.41.15/';
```

Start the UI server
```bash
PORT=8080 npm start
```

Then when you visit your aws ec2 on a browser using your EC2 instance public IPv4, you should see the UI
