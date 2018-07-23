## Running cloud functions locally
```
// Copy config to local json file for emulator
cd functions
firebase functions:config:get > .runtimeconfig.json
sudo firebase serve
```