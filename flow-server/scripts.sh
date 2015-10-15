#!/bin/bash
# Command line tools scripts for source code management

DEVROOT=/www/flow.dev/
DEVDIR=/www/flow.dev/flow-server/
LIVEDIR=/www/flow.io/flow-server/
EXECFN=flowserver.js

case "$1" in
	deploy)
		echo "doing full deploy"
		cd $DEVDIR
		git add .
		git commit -m "Deployment"
		cd $LIVEDIR
		git pull $DEVROOT
		cd $DEVDIR
		echo "done"
		;;
	rollback)
		cd $LIVEDIR
		git reset --hard $1
		;;
	status)
		PAGER=cat git log
		;;
	log)
		cd $DEVDIR
		forever logs $EXECFN -f
		;;
	logs)
		cd $DEVDIR
		forever logs $EXECFN -f
		;;
	start)
		forever start --sourceDir=$DEVDIR --watch --spinSleepTime 1000 --minUptime 3000 -v $EXECFN --host 127.200.0.10 --port 1337
		forever start --sourceDir=$LIVEDIR --watch --spinSleepTime 1000 --minUptime 3000 -v $EXECFN --host 127.200.0.8 --port 1337
		;;
	stop)
		forever stopall
		;;
	*)
		echo "Usage: $NAME {deploy|rollback|status|log|start|stop}"
		exit 1
		;;
esac

exit 0
