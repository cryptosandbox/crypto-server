define(['angular'], function(angular) {
  
  let cryptoEclipse = angular.module('crypto-Eclipse', []);
  
  cryptoEclipse.config(["fw.services.contentProvider", function(contentProvider){
        const workspaceId = "trading";
        contentProvider.addPages(workspaceId, [
            {
                id: "tmp-sample",
                displayName: "CRYPTO BLOTTER",
                url: "/cryptoblotter",
                controller: function(){},
                template: `
                   <div>
                   <iframe src="https://birdie-blotter.herokuapp.com/" style="border:none;width: 100%;height: 800px;"></iframe>
                   </div>
                `,
                userWorkflows: [],
                displayIndex: 3 // 0: Summary, 1: Blotter.
            }
        ]);
  }]);
  
  return cryptoEclipse;
})