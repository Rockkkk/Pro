#!/bin/bash
# Wait till url is up
echo "Waiting for URL to comeup."
ip=$(/sbin/ip -o -4 addr list eth0 | awk '{print $4}' | cut -d/ -f1)
echo $ip
url="http://$ip:2990/jira"
echo $url
urlstatus=$(curl -o --head --write-out '%{http_code}' $url)
while [ $urlstatus -eq 000 ]
do
	sleep 10s
        urlstatus=$(curl -o --head --write-out '%{http_code}' $url) >/dev/null 2>&1
done

echo "URL status "$urlstatus
echo "Jira Started Successfully with status "$urlstatus

# If URL is not up exit with error
                                                                    if ([ $urlstatus -gt 400 ] || [ $urlstatus -lt 100 ]); then
                                                                             echo $url " is not up and returned status code: "$urlstatus
fi
sleep 1m
exit 0
