# CURL examples

```bash
curl -X POST -H  "content-type: application/json" --data '{"nodes" : [{"name":"node01","ip":"10.0.10.125","port":"9115"}], "hosts" : [{"http":{"endpoint":"google.com/robots.txt"},"tcp":{"tcp_ip":"8.8.8.8","tcp_port":"80"},"dns":{"domain":"google.com"},"icmp":{"icmp_ip":"8.8.8.8"}}]}'  localhost:3000
```
```bash
curl -X POST -H  "content-type: application/json" --data '{"nodes" : [{"name":"node011111111111","ip":"10.0.23.231","port":"9115"},{"name":"node022222222222","ip":"10.0.23.232","port":"9115"}], "hosts" : [{"http":{"endpoint":"google.com/robots.txt"},"tcp":{"tcp_ip":"8.8.8.8","tcp_port":"80"},"dns":{"domain":"google.com"},"icmp":{"icmp_ip":"8.8.8.8"}}]}'  localhost:3000
```