
##Example of Hana  Cloud   / Node App  
# built with https://yeoman.io/generators/
# and sap-partner-eng  generator


Steps in BAS:
cd projects
yo sap-partner-eng
// use hccap1 app in this example and follow defaults

//fix temporary issue with generator
mkdir ../TEMP
cd TEMP
git clone https://github.com/andrewlunde/generator-sap-a-team-mta.git

cp -r /home/user/TEMP/generator-sap-a-team-mta/generators/db-cap/templates /home/user/.node_modules_global/lib/node_modules/generator-sap-partner-eng/generators/db-cap

cd ../projects/hccap1
yo sap-partner-eng



# hccap1 Application  is created

Build Command:
```
cd hccap1 ; mkdir -p mta_archives ; mbt build -p=cf -t=mta_archives --mtar=hccap1.mtar
```

Deploy Command:
```
cf deploy mta_archives/hccap1.mtar -f
```

Undeploy Command:
```
cf undeploy hccap1 -f --delete-services
```

cf api https://api.cf.sap.hana.ondemand.com
cf login -u <email> -p '<password>' -o <Org> -s <space>




---- Other common used

git config --global user.email "you@example.com"
git config --global user.name "Your Name"

git commit -am "wip"

git remote
git checkout -b uaacheck
git push -u origin uaacheck/new-feature-check_uaa

git branch
git push