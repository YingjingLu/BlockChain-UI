# Installing the Blockchain UI and backend

## Installing the backend

First, please make sure that the backend resides in the same folder as the blockchain simulator:

```
root folder
|-blockchain-simulator
|-blockchain-backend
```

First install `Node.js`
```
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs
```

```bash
cd blockchain-backend
sudo npm install
sudo npm install -g forever 
sudo npm install -g serve
npm install archiver --save  inside backend
```

Now you can run the server for local host:
```bash
num start
```

**Deployment**

To deploy in the server to run without maintain a shell, we suggest using ```forever```. Just make sure the server listen to ```localhost:4500```
```bash
forever start server.js
```

## Installing the UI
```bash
cd blockchain-ui
npm install
```

Now you can test the server from localhost using 
```bash
npm start
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
location = / {
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header Host $http_host;
    proxy_pass http://172.31.44.197:8080/; 
}
location = /chain {
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header Host $http_host;
    proxy_pass http://172.31.44.197:8080/chain; 
}
location = /msg {
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header Host $http_host;
    proxy_pass http://172.31.44.197:8080/msg; 
}
location = /file {
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
location /streamlet_config {
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header Host $http_host;
    proxy_pass http://172.31.44.197:4500/streamlet_config; 
}
```

After saving this then restart `nginx` service
```bash
sudo systemctl restart nginx
```
Then use `forever` or `serve` to start the UI server"
```
npm run build
serve -l 8080 -s build
```

Then when you visit your aws ec2 on a browser using your EC2 instance public IPv4, you should see the UI