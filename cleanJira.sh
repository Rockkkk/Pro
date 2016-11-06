#!/bin/bash

# Kill Jira if its running
echo $( netstat -lntp | grep "2990" )
if [ -n "$( netstat -lntp | grep "2990" )" ];then
	sudo kill $(sudo lsof -t -i:2990)
	echo "Deleted Jira Service."
else
	echo "No PID for Jira."
fi

#cleaning logs directory
echo $(pwd)
bambooHome=` sudo pwd`
echo "Bamboo Home Directory : $bambooHome"
cd ~/jira/
DIR="amps-standalone"
echo "Trying to delete jira $DIR"
# look for empty dir 
if [ "$(ls -A $DIR)" ]; then
     echo $(pwd)
     # cd $DIR && rm -rf *
	sudo rm -rf *
     echo "$DIR is cleaned"
else
    echo $(pwd)
    echo "$DIR is Empty"
fi

#installing Jira
echo "Installing  Jira"
sudo nohup atlas-run-standalone --container tomcat7x --product jira --version 7.0.0-OD-08-005 --data-version 7.0.0-OD-08-005 --bundled-plugins com.atlassian.bundles:json-schema-validator-atlassian-bundle:1.0.4,com.atlassian.webhooks:atlassian-webhooks-plugin:2.0.2,com.atlassian.jwt:jwt-plugin:1.2.2,com.atlassian.upm:atlassian-universal-plugin-manager-plugin:2.20.1-D20150924T170115,com.atlassian.plugins:atlassian-connect-plugin:1.1.60 --jvmargs -Datlassian.upm.on.demand=true >/dev/null 2>&1 &

sleep 30s
echo "Installed  Jira now coping tomcat.sh file to amps-standalone directory"
cd $bambooHome
echo $(pwd)
echo "Changed to Bamboo home directory"
sudo cp test/resources/tomcat.sh ~/jira/amps-standalone/
echo "Copied the tomcat.sh to amps-standalone"
cd ~/jira
echo $(pwd)
sudo chmod -R +777 *
cd amps-standalone
echo $(pwd)
echo "Given permissin to tomcat.sh"
sleep 10s
sudo nohup ./tomcat.sh &
echo "Started tomcat.sh"
#sleep 30s


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


