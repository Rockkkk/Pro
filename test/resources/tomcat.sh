# Kill Old JIRA
kill $(ps -ef | grep '[j]ira' | awk '{print $2}')

# Setup JIRA Env, 
mkdir -p `pwd`/target/container/tomcat7x/cargo-jira-home/bin
echo 'export JAVA_OPTS="$JAVA_OPTS -Datlassian.upm.on.demand=true -Datlassian.dev.mode=true -server -Xms1536m -Xmx1536m -XX:NewSize=256m -XX:MaxNewSize=256m -XX:PermSize=256m -XX:MaxPermSize=256m -XX:+DisableExplicitGC"' > `pwd`/target/container/tomcat7x/cargo-jira-home/bin/setenv.sh
export JIRA_HOME=`pwd`/target/jira/home
echo $JIRA_HOME
echo 'jira.home = '$JIRA_HOME > `pwd`/target/container/tomcat7x/cargo-jira-home/webapps/jira/WEB-INF/classes/jira-application.properties
mv `pwd`/target/container/tomcat7x/cargo-jira-home/conf/tomcat-users.xml `pwd`/target/container/tomcat7x/cargo-jira-home/conf/_tomcat-users.xml

#Start tomcat standalone
export CATALINA_BASE=`pwd`/target/container/tomcat7x/cargo-jira-home
export CATALINA_HOME=`pwd`/target/container/tomcat7x/apache-tomcat-7.0.52
$CATALINA_HOME/bin/catalina.sh jpda start
