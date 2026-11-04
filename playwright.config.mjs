import {defineConfig, devices} from '@playwright/test';
export default defineConfig({
  testDir:'./tests',
  testMatch:'**/*.spec.mjs',
  timeout:45000,
  retries:1,
  reporter:[['line'],['html',{open:'never'}]],
  use:{baseURL:'http://127.0.0.1:4173',trace:'retain-on-failure',screenshot:'only-on-failure',channel:process.env.CHROME_CHANNEL||undefined},
  projects:[
    {name:'desktop',use:{...devices['Desktop Chrome'],viewport:{width:1440,height:900}}},
    {name:'tablet',use:{...devices['Desktop Chrome'],viewport:{width:834,height:1112}}},
    {name:'mobile',use:{...devices['Desktop Chrome'],viewport:{width:390,height:844}}}
  ],
  webServer:{command:'python3 -m http.server 4173 --bind 127.0.0.1',url:'http://127.0.0.1:4173/',reuseExistingServer:false,timeout:120000}
});
