# mini-screenshot-activity-tracker

Next.js and Adonis.js

## mysql command

to run the docker mysql need to stop first

sudo systemctl status mysql
sudo systemctl start mysql
sudo systemctl stop mysql

## docker command

sudo systemctl stop docker
sudo systemctl stop docker.socket
sudo systemctl start docker

sudo docker ps // all the ports are running in docker

- check any port is use some where or not
  sudo ss -lptn // check all running port
  sudo ss -lptn 'sport = :3306' // check specific port
