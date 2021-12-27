# implement monitoring UPTIME ecosystem

## requirements
- prometheus server
- blackbox node(s) => [2 nodes in this case]
- docker & docker-compose on each host(prometheus and node(s))

## deployment


> ## prometheus server
- first of all deploy prometheus server with integration of ansible and config generator application written in nodeJS

> 1. install prometheus
- pull docker images [docker.com](https://hub.docker.com/r/prom/prometheus)
```bash
$ docker pull prom/prometheus:main
```
- create __docker-compose.yml__
```yaml
version: '3'

services:
  prometheus:
    image: prom/prometheus:main
    container_name: prometheus
    ports:
      - 9000:9090
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml # will create this config file later
      - prometheus-data:/prometheus
    command: --web.enable-lifecycle  --config.file=/etc/prometheus/prometheus.yml

volumes:
  prometheus-data:
```
- finally with sample config file below getting prometheus up
```yaml
# sample config file just for getting no errors
global:
  scrape_interval:     15s # By default, scrape targets every 15 seconds.

  # Attach these labels to any time series or alerts when communicating with
  # external systems (federation, remote storage, Alertmanager).
  external_labels:
    monitor: 'codelab-monitor'

# A scrape configuration containing exactly one endpoint to scrape:
# Here it's Prometheus itself.
scrape_configs:
  # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.
  - job_name: 'prometheus'

    # Override the global default and scrape targets from this job every 5 seconds.
    scrape_interval: 5s

    static_configs:
      - targets: ['localhost:9090']
```
```bash
$ docker-compose up -d
```
> 2. installing ansible

**_NOTE: you can also install ansible directly via apt_**

- install ansible using pip but first should install pip with apt
```bash
$ sudo apt -y install python3-pip
```
- then installing __ansible__ using __pip__
```bash
$ sudo pip3 install ansible
```
- then create __hosts__ file
```
xxx.xxx.xxx.xxx # node01 IP
xxx.xxx.xxx.xxx # node02 IP
etc...
```
- copy blackbox ansible files in ansible directory
- install __sshpass__ using apt
```bash
$ sudo apt install sshpass
```
- run ansible playbook with command below to run BB nodes
```bash
$ ansible-playbook -u a -i ./hosts blackbox_install.yml -Kk
```
- if ansible playbook can not pull blackbox image you can pull it directly
```
$ docker pull prom/blackbox-exporter:master
```

> 3. run config generator app for passing nodes & hosts to get configuration of prometheus
- download app into configapp directory
```bash
$ wget https://github.com/aydinnemati/uptime/archive/refs/heads/main.zip
```
- install zip and unzip main.zip
```bash
$ sudo apt -y install zip
$ unzip main.zip
```
- navigate in app directory and build app
```bash
$ cd ~/configapp/uptime-main/app
$ docker build -t configapp .
```
- run app
```
$ docker-compose up -d
```
- it's ready to go, just post your first request and wait for it.


## *__HAVE fUN :)__*
