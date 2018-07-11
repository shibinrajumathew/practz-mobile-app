# practz
Install npm for the first time <br/>
 ```npm install``` <br/>
1.First install react-native cli <br/>
```npm install -g react-native-cli``` <br/>
2.Set up Android development environment <br/>
	i.install android sdk (install via android studio) <br/>
	ii.install avd <br/>
	iii.Configure the ANDROID_HOME environment variable <br/>
     <br/>
3.Install adb (optional for run in real devices) <br/>
4.Create a local.properties file inside the android folder. <br/>
eg:```sdk.dir =C:\\Users\\username\\AppData\\Local\\Android\\Sdk``` <br/>
5.To run <br/>
 ```cd project_folder``` <br/>
 ```react-native run-android``` <br/>
 <h2>Optional steps</h2> <br/>
 For some reason, in linux some more steps may needed<br/>
 (if you getting "Unable to load script from assets index.android.bundle")<br/>
<br/>
6.(in project directory) mkdir android/app/src/main/assets<br/>
7.react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
<br/>
You can automate the above steps by placing them in scripts part of package.json like this:<br/>

 ``` "android-linux": "react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res && react-native run-android" ```
