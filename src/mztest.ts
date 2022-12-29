import { MozartManager } from "./mozart";
//An example of how to use the Mozart javascript SDK to login and load the store
let mozartTest:MozartManager = new MozartManager("B98Fkb6bk7o", "JFwZnxoEceu");
(async () => {
let url:any = await mozartTest.LoginOAuthAndGetLoginURL();
mozartTest.StartLoginStatusMonitor(30,2, async (result:boolean)=>{
    console.log("Login status monitor result: " + result);
    if(result)
    {
        let result = await mozartTest.RequestUserData();
        
        result = await mozartTest.LoadStore();
    }
});
console.log(url);
})();