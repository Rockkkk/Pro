#!/bin/bash 

#RUNNING=$(docker ps -q)
ALL=$(docker ps -a -q)
#echo $RUNNING
echo $ALL
for container in $ALL ; do
    #[[ "$RUNNING" =~ "$container" ]] && continue
    echo Removing container: $(docker rm -f $container | grep $container)
done


#cleaning logs directory
cd ~/zfjcloud/
DIR="logs"
echo "Trying to delete connect report $DIR"
# look for empty dir 
if [ "$(ls -A $DIR)" ]; then
     echo $(pwd)
     cd logs && rm -rf *
     echo "$DIR is cleaned"
else
    echo $(pwd)
    echo "$DIR is Empty"
fi

#cleaning elasticsearch logs directory
cd ~/esconfig/
DIR="logs"
echo "Trying to delete elasticsearch $DIR"
# look for empty dir 
if [ "$(ls -A $DIR)" ]; then
     echo $(pwd)
     cd logs && rm -rf *
     echo "$DIR is cleaned"
else
    echo $(pwd)
    echo "$DIR is Empty"
fi

#cleaning connect cluster directory
cd /
DIR="connect"
echo "Trying to delete connect cluster $DIR"
# look for empty dir 
if [ "$(ls -A $DIR)" ]; then
     echo $(pwd)
     cd $DIR && rm -rf *
     echo "$DIR is cleaned"
else
    echo $(pwd)
    echo "$DIR is Empty"
fi

#cleaning riak01 directory
cd /
DIR="riak01"
echo "Trying to delete riak $DIR"
# look for empty dir 
if [ "$(ls -A $DIR)" ]; then
     echo $(pwd)
     cd $DIR && rm -rf *
     echo "$DIR is cleaned"
else
    echo $(pwd)
    echo "$DIR is Empty"
fi

#installing riak
echo "Installing  Riak"
docker run -d -p 8087:8087 -p 8098:8098 -v /riak01:/var/lib/riak -v /riak01:/var/log/riak -e DOCKER_RIAK_CLUSTER_SIZE=5 -e DOCKER_RIAK_AUTOMATIC_CLUSTERING=1 -e DOCKER_RIAK_BACKEND=leveldb -e DOCKER_RIAK_CONTROL=on docker.getzephyr.com/riak:2.1.1 &
RUNNING=$(docker ps)
#echo $RUNNING
if [ "( $RUNNING | grep "docker.getzephyr.com/riak:2.1.1" )" ]; then
     echo "Riak is installed successfully."
else
    echo "Riak is not installed."
fi

#setting up Cluster
echo "setting up Riak Cluster"
cd ~/docker-riak

make start-cluster
CLUSTER=$(docker ps)
if [ "( $CLUSTER | grep "riak01" )" ]; then
     echo "Riak01 is Started successfully."
else
    echo "Riak01 is not Started."
fi
if [ "( $CLUSTER | grep "riak02" )" ]; then
     echo "Riak02 is Started successfully."
else
    echo "Riak02 is not Started."
fi
if [ "( $CLUSTER | grep "riak03" )" ]; then
     echo "Riak03 is Started successfully."
else
    echo "Riak03 is not Started."
fi
if [ "( $CLUSTER | grep "riak04" )" ]; then
     echo "Riak04 is Started successfully."
else
    echo "Riak04 is not Started."
fi
if [ "( $CLUSTER | grep "riak05" )" ]; then
     echo "Riak05 is Started successfully."
else
    echo "Riak05 is not Started."
fi
echo "Riak is Clustered Successfully"

# Installing elasticsearch 
echo "setting up Elasticsearch"
docker run -d -p 6100:9200 -p 6200:9300 -v ~/esconfig:/config  -v ~/esconfig:/data --name elasticsearch docker.getzephyr.com/elasticsearch:latest &> /dev/null
RUNNING=$(docker ps)
#echo $RUNNING
if [ "( $RUNNING | grep "elasticsearch" )" ]; then
     echo "Elasticsearch is installed successfully."
else
    echo "Elasticsearch is not installed."
fi

#!/bin/bash    
# Installing connect 
echo "setting up Connect"
docker run -d -p 80:8080 -p 5100:5100 -v ~/zfjcloud/logs:/opt/tomcat/logs/ -v ~/zfjcloud/config:/opt/conf --name="connect" docker.getzephyr.com/connect:1.7-hf-final &> /dev/null
RUNNING=$(docker ps)
#echo $RUNNING
if [ "( $RUNNING | grep "connect" )" ]; then
     echo "Connect is installed successfully."
else
    echo "Connect is not installed."
fi
  
# Wait till url is up
ip=$(/sbin/ip -o -4 addr list eth0 | awk '{print $4}' | cut -d/ -f1)
echo $ip
url="http://$ip/connect/atlassian-connect.json"
echo $url
urlstatus=$(curl -o --head --write-out '%{http_code}' $url)
while [ $urlstatus -eq 000 ]
do
	sleep 10s
        urlstatus=$(curl -o --head --write-out '%{http_code}' $url) >/dev/null 2>&1
done

echo "URL status "$urlstatus

# If URL is not up exit with error
if ([ $urlstatus -gt 400 ] || [ $urlstatus -lt 100 ]); then
         echo $url " is not up and returned status code: "$urlstatus
fi
sleep 1m
exit 0

