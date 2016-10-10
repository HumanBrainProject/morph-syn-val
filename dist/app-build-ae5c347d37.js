"bundle";!function(){var a=System.amdDefine;a("app.html!github:systemjs/plugin-text@0.0.8.js",[],function(){return'<template><require from="nav-bar.html"></require><require from="theme.css"></require><nav-bar router.bind="router"></nav-bar><div class="page-host"><router-view></router-view></div></template>'})}(),System.register("app.js",["aurelia-auth"],function(a,b){"use strict";function c(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var d,e;return{setters:[function(a){d=a.AuthorizeStep}],execute:function(){a("App",e=function(){function a(){c(this,a)}return a.prototype.configureRouter=function(a,b){a.addPipelineStep("authorize",d),a.title="Morphology",a.map([{route:"login",name:"login",moduleId:"login",nav:!1,title:"Login"},{route:["","synthesis"],name:"synthesis",moduleId:"synthesis",nav:!0,title:"Synthesis",auth:!0},{route:"validation",redirect:"validation/undefined"},{route:"validation/:id",name:"validation",moduleId:"validation",nav:!0,title:"Validation",auth:!0,href:"validation/undefined"}]),this.router=b},a}()),a("App",e)}}}),function(){var a=System.amdDefine;a("login.html!github:systemjs/plugin-text@0.0.8.js",[],function(){return'<template><iframe element.ref="iframeRef" src="" frameborder="0" height="100%" width="100%"></iframe></template>'})}(),System.register("login.js",["aurelia-auth","aurelia-framework","./httpClients.js","aurelia-event-aggregator"],function(a,b){"use strict";function c(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var d,e,f,g,h,i,j;return{setters:[function(a){d=a.AuthService},function(a){e=a.inject},function(a){f=a.OidcHttpClient},function(a){g=a.EventAggregator}],execute:function(){a("Login",(h=e(d,f,g),j=h(i=function(){function a(b,d,e){c(this,a),this.auth=b,this.oidcHttp=d,e.subscribe("auth:logout",function(a){window!==window.top&&window.top.postMessage({eventName:"oidc.logout",data:{clientId:b.config.providers.hbp.clientId}},"*")})}return a.prototype.attached=function(){var a=this;this.oidcHttp.fetch("session").then(function(b){return b.ok||window===window.top?a.auth.authenticate("hbp",!1,null,a.iframeRef):a.auth.logout()})},a}())||i)),a("Login",j)}}}),System.register("authConfig.js",[],function(a,b){"use strict";var c;return{setters:[],execute:function(){c={providers:{hbp:{name:"hbp",url:"/auth/hbp",authorizationEndpoint:"https://services.humanbrainproject.eu/oidc/authorize",redirectUri:(window.location.origin||window.location.protocol+"//"+window.location.host)+"/morph-syn-val/",defaultUrlParams:["response_type","client_id","redirect_uri"],display:"iframe",type:"2.0",responseType:"token",popupOptions:{width:500,height:700},clientId:"365c2daa-7937-4f0b-9ee9-efca2283c6f6"}}},a("default",c)}}}),System.register("main.js",["./authConfig"],function(a,b){"use strict";function c(a){a.use.standardConfiguration().developmentLogging().plugin("aurelia-auth",function(a){a.configure(d)}),a.start().then(function(){return a.setRoot()})}var d;return a("configure",c),{setters:[function(a){d=a["default"]}],execute:function(){}}}),function(){var a=System.amdDefine;a("nav-bar.html!github:systemjs/plugin-text@0.0.8.js",[],function(){return'<template bindable="router"><nav class="navbar navbar-default navbar-fixed-top" role="navigation"><div class="navbar-header"><button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#skeleton-navigation-navbar-collapse"><span class="sr-only">Toggle Navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></button> <a class="navbar-brand" href="#"><span>${router.title}</span></a></div><div class="collapse navbar-collapse" id="skeleton-navigation-navbar-collapse"><ul class="nav navbar-nav"><li repeat.for="row of router.navigation" class=\'${row.isActive ? "active" : ""}\'><a data-toggle="collapse" data-target="#skeleton-navigation-navbar-collapse.in" href.bind="row.href">${row.title}</a></li></ul><ul class="nav navbar-nav navbar-right"><li class="loader" if.bind="router.isNavigating"><i class="fa fa-spinner fa-spin fa-2x"></i></li></ul></div></nav></template>'})}(),System.register("sort.js",[],function(a,b){"use strict";function c(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var d;return{setters:[],execute:function(){a("SortValueConverter",d=function(){function a(){c(this,a)}return a.prototype.toView=function(a){return a.slice(0).sort(function(a,b){return Date.parse(b.start_time)-Date.parse(a.start_time)})},a}()),a("SortValueConverter",d)}}}),function(){var a=System.amdDefine;a("synthesis.html!github:systemjs/plugin-text@0.0.8.js",[],function(){return'<template><require from="./sort"></require><section class="au-animate" class="container-fluid"><br><div class="row"><div class="col-sm-12"><form class="form-horizontal" role="form" submit.delegate="submit()"><fieldset disabled.bind="launchingJob"><div class="form-group"><label for="taskName" class="col-sm-2 control-label">Task name</label><div class="col-sm-7"><input type="text" value.bind="synthesisTaskName" class="form-control" id="taskName" readonly="readonly"></div><label for="synthesisTaskVersion" class="col-sm-1 control-label">Version</label><div class="col-sm-1"><select value.bind="synthesisTaskVersion" class="form-control" id="synthesisTaskVersion"><option repeat.for="version of synthesisTaskVersions">${version}</option></select></div><div><button class="btn btn-default fa fa-refresh" click.trigger="refreshSynthesisTaskVersions()"></button></div></div><div class="form-group"><label for="dsPath" class="col-sm-2 control-label">Document storage path</label><div class="col-sm-7"><input type="text" value.bind="dsPath" class="form-control" id="dsPath" placeholder="/Your Collab/folder"></div></div><div class="form-group"><label for="gpfsPath" class="col-sm-2 control-label">GPFS output path</label><div class="col-sm-7"><input type="text" value.bind="gpfsPath" class="form-control" id="gpfsPath" placeholder="/gpfs/bbp.cscs.ch/project/proj30/user"></div></div><div class="form-group"><label for="randomSeed" class="col-sm-2 control-label">Random seed</label><div class="col-sm-7"><input type="text" value.bind="randomSeed" class="form-control" id="randomSeed" placeholder="random seed"></div></div><div class="form-group"><label for="brainRegion" class="col-sm-2 control-label">Brain region</label><div class="col-sm-7"><select value.bind="brainRegion" class="form-control" id="brainRegion"><option repeat.for="region of brainRegionValues">${region}</option></select></div></div><div class="form-group"><label for="cells" class="col-sm-2 control-label">Number of cells</label><div class="col-sm-7"><input type="number" step="1" value.bind="cells" class="form-control" id="cells"></div></div><div class="form-group"><button type="submit" class="btn btn-default btn-primary col-sm-offset-7">Run synthesis task</button></div></fieldset></form></div></div><div class="row"><div class="col-sm-12"><div class="row"><h3>Synthesis jobs which have been run from this browser</h3></div><div class="row"><table class="table table-hover table-vcenter"><tbody><tr><th>UUID</th><th>Started</th><th>Status</th><th>Result</th><th class="text-center">Show details</th><th class="text-center">Refresh</th><th class="text-center">Use in validation</th><th class="text-center">Remove</th></tr><tr repeat.for="job of jobs | sort"><td class="vertical-align"><code>${job.job_id}</code></td><td class="vertical-align"><span>${printDate(job.start_time)}</span></td><td class="vertical-align">${job.state}</td><td class="vertical-align">${job.finish_reason}</td><td class="text-center"><a href="https://up.humanbrainproject.eu/#/job/${job.job_id}/?back=%2Fjob-manager" target="_blank"><button class="btn btn-default fa fa-link"></button></a></td><td class="text-center"><button click.trigger="refreshJob(job.job_id)" class="btn btn-default fa fa-refresh"></button></td><td class="text-center"><a route-href="route: validation; params.bind: {id: job.job_id}" class="btn btn-default fa fa-share"></a></td><td class="text-center"><button click.trigger="removeJob(job.job_id)" class="btn btn-default fa fa-remove"></button></td></tr></tbody></table></div></div></div></section></template>'})}(),System.register("synthesis.js",["aurelia-framework","aurelia-router","aurelia-fetch-client","./httpClients.js","./job","./config"],function(a,b){"use strict";function c(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function d(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function e(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}var f,g,h,i,j,k,l,m,n,o,p;return{setters:[function(a){f=a.inject},function(a){g=a.Router},function(a){h=a.HttpClient,i=a.json},function(a){j=a.HbpHttpClient,k=a.OidcHttpClient},function(a){l=a["default"]},function(a){m=a["default"]}],execute:function(){a("Synthesis",(n=f(h,j,k,g,m),p=n(o=function(a){function b(e,f,g,h,i){c(this,b);var j=d(this,a.call(this,"morph-syn-job-ids",f));return j.synthesisTaskName="morphology_synthesis",j.synthesisTaskVersions=[],j.brainRegion="hippocampal formation",j.brainRegionValues=["hippocampal formation","Cerebral cortex"],j.launchingJob=!1,j.http=e,j.hbpHttp=f,j.oidcHttp=g,j.router=h,j.config=i,j.refreshSynthesisTaskVersions(),j.dsPath=i.synDsPath,j.gpfsPath=i.gpfsPath,j.randomSeed=i.randomSeed,j.cells=i.cells,j}return e(b,a),b.prototype.deactivate=function(){this.config.synDsPath=this.dsPath,this.config.gpfsPath=this.gpfsPath,this.config.randomSeed=this.randomSeed,this.config.cells=this.cells},b.prototype.refreshSynthesisTaskVersions=function(){var a=this;return this.synthesisTaskVersions=[],this.hbpHttp.fetch("task/v0/api/task?task_name="+this.synthesisTaskName).then(function(a){return a.json()}).then(function(b){a.synthesisTaskVersion=0,b.tasks.filter(function(a){return a.properties.version>8}).forEach(function(b){a.synthesisTaskVersions.push(b.properties.version);var c=b.properties.version;c>a.synthesisTaskVersion&&(a.synthesisTask=b,a.synthesisTaskVersion=c)})})},b.prototype.submit=function(){var a=this;this.launchingJob=!0,this.makeNipRequest().then(function(){return a.hbpHttp.fetch("task/v0/api/job/",{method:"post",body:i({task_id:a.synthesisTask.task_id,total_physical_memory:2048,cpu_cores:1,output_location:a.dsPath,requested_queue:"cscs_viz",job_name:"morph_synth_"+(new Date).toISOString(),arguments:[{object:"URI",contents:{category:"application/zip",document:a.configUuid}},a.gpfsPath,parseInt(a.cells),a.randomSeed]})})}).then(function(a){return a.json()}).then(function(b){a.addJob(b.job_id),a.launchingJob=!1})["catch"](function(){a.launchingJob=!1})},b.prototype.makeNipRequest=function(){var a=this,b=new URL("https://nip.humanbrainproject.eu/api/ksearch/search");return b.searchParams.append("q","*"),b.searchParams.append("filters",'{"data_modalities.term.raw_term": ["Digital neuron synthesis"],"brain_regions.term.raw_term":   ["'+this.brainRegion+'"]}"protocols.title.raw_term": ["Generation of input parameters to synthesize morphologies"]'),this.http.fetch(b).then(function(a){return a.json()}).then(function(b){var c=b.hits[0].source.representations[0].access;a.configUuid=c})},b}(l))||o)),a("Synthesis",p)}}}),function(){var a=System.amdDefine;a("validation.html!github:systemjs/plugin-text@0.0.8.js",[],function(){return'<template><require from="./sort"></require><section class="au-animate" class="container-fluid"><br><div class="row"><div class="col-sm-12"><form class="form-horizontal" role="form" submit.delegate="submit()"><fieldset disabled.bind="launchingJob"><div class="form-group"><label for="taskName" class="col-sm-2 control-label">Task name</label><div class="col-sm-7"><input type="text" value.bind="validationTaskName" class="form-control" id="taskName" readonly="readonly"></div><label for="validationTaskVersion" class="col-sm-1 control-label">Version</label><div class="col-sm-1"><select value.bind="validationTaskVersion" class="form-control" id="synthesisTaskVersion"><option repeat.for="version of validationTaskVersions">${version}</option></select></div><div><button class="btn btn-default fa fa-refresh" click.trigger="refreshValidationTaskVersions()"></button></div></div><div class="form-group"><label for="dsPath" class="col-sm-2 control-label">Document storage path</label><div class="col-sm-7"><input type="text" value.bind="dsPath" class="form-control" id="dsPath" placeholder="/Your Collab/folder"></div></div><div class="form-group"><label for="bioRefUuid" class="col-sm-2 control-label">Biological reference set uuid</label><div class="col-sm-7"><input type="text" value.bind="bioRefUuid" class="form-control" id="bioRefUuid"></div></div><div class="form-group"><label for="synJobUuid" class="col-sm-2 control-label">Synthesis job uuid</label><div class="col-sm-7"><input type="text" value.bind="synJobUuid" class="form-control" id="synJobUuid" readonly="readonly"></div></div><div class="form-group"><label for="synthesisOutputUuid" class="col-sm-2 control-label">Synthesis output uuid</label><div class="col-sm-7"><input type="text" value.bind="synthesisOutputUuid" class="form-control" id="synthesisOutputUuid"></div><i show.bind="loadingSynUuid" class="fa fa-spinner fa-spin fa-2x"></i></div><div class="form-group"><button type="submit" class="btn btn-default btn-primary col-sm-offset-7">Run validation task</button></div></fieldset></form></div></div><div class="row"><div class="col-sm-12"><div class="row"><h3>Validation jobs which have been run from this browser</h3></div><div class="row"><table class="table table-hover table-vcenter"><tbody><tr><th>UUID</th><th>Started</th><th>Status</th><th>Result</th><th class="text-center">Show details</th><th class="text-center">Refresh</th><th class="text-center">Remove</th></tr><tr repeat.for="job of jobs | sort"><td class="vertical-align"><code>${job.job_id}</code></td><td class="vertical-align"><span>${printDate(job.start_time)}</span></td><td class="vertical-align">${job.state}</td><td class="vertical-align">${job.finish_reason}</td><td class="text-center"><a href="https://up.humanbrainproject.eu/#/job/${uuid}/?back=%2Fjob-manager" target="_blank"><button class="btn btn-default fa fa-link"></button></a></td><td class="text-center"><button click.trigger="refreshJob(job.job_id)" class="btn btn-default fa fa-refresh"></button></td><td class="text-center"><button click.trigger="removeJob(job.job_id)" class="btn btn-default fa fa-remove"></button></td></tr></tbody></table></div></div></div></section></template>'})}(),System.register("httpClients.js",["aurelia-fetch-client","aurelia-framework","aurelia-auth"],function(a,b){"use strict";function c(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function d(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function e(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}var f,g,h,i,j,k,l;return{setters:[function(a){f=a.HttpClient},function(a){g=a.inject},function(a){h=a.AuthService}],execute:function(){a("HbpHttpClient",(i=g(h),k=i(j=function(a){function b(e){c(this,b);var f=d(this,a.call(this));return f.configure(function(a){a.withBaseUrl("https://services.humanbrainproject.eu/").withDefaults({headers:{Accept:"application/json"}}).withInterceptor(e.tokenInterceptor).withInterceptor({response:function(a){if(!a.ok&&401===a.status&&e.isAuthenticated())throw e.logout().then(function(){window.location.reload()}),"Unauthorized";return a}})}),f}return e(b,a),b}(f))||j)),a("HbpHttpClient",k),a("OidcHttpClient",l=function(a){function b(){c(this,b);var e=d(this,a.call(this));return e.configure(function(a){a.withBaseUrl("https://services.humanbrainproject.eu/oidc/").withDefaults({credentials:"include"})}),e}return e(b,a),b}(f)),a("OidcHttpClient",l)}}}),System.register("job.js",[],function(a,b){"use strict";function c(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var d;return{setters:[],execute:function(){a("default",d=function(){function a(b,d){var e=this;c(this,a),this.jobs=new Array,this.locStoreId=b,this.hbpHttp=d,localStorage.getItem(this.locStoreId)||localStorage.setItem(this.locStoreId,JSON.stringify([])),this.getJobIds().filter(function(a){return a}).map(function(a){e.refreshJob(a)})}return a.prototype.getJobIds=function(){return JSON.parse(localStorage.getItem(this.locStoreId))},a.prototype.addJob=function(a){var b=this.getJobIds();b.push(a),localStorage.setItem(this.locStoreId,JSON.stringify(b.filter(function(a){return a}))),this.refreshJob(a)},a.prototype.removeJob=function(a){var b=this.getJobIds(),c=b.indexOf(a);c>-1&&b.splice(c,1),localStorage.setItem(this.locStoreId,JSON.stringify(b.filter(function(a){return a}))),c=this.jobs.findIndex(function(b){return b.job_id===a}),c>-1&&this.jobs.splice(c,1)},a.prototype.refreshJob=function(a){var b=this,c=this.jobs.findIndex(function(b){return b.job_id===a});this.hbpHttp.fetch("task/v0/api/job/"+a).then(function(a){return a.json()}).then(function(a){c!==-1?b.jobs[c]=a:b.jobs.push(a)})},a.prototype.printDate=function(a){return new Date(a).toLocaleString()},a}()),a("default",d)}}}),System.register("config.js",[],function(a,b){"use strict";function c(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var d;return{setters:[],execute:function(){a("default",d=function b(){c(this,b),this.randomSeed=1234,this.cells=10,this.bioRefUuid="50f86ce7-613b-40b8-83ae-6697185d5593"}),a("default",d)}}}),System.register("validation.js",["aurelia-framework","aurelia-fetch-client","./httpClients.js","./job","./config"],function(a,b){"use strict";function c(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function d(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function e(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}var f,g,h,i,j,k,l,m,n,o;return{setters:[function(a){f=a.inject},function(a){g=a.HttpClient,h=a.json},function(a){i=a.HbpHttpClient,j=a.OidcHttpClient},function(a){k=a["default"]},function(a){l=a["default"]}],execute:function(){a("Validation",(m=f(g,i,j,l),o=m(n=function(a){function b(e,f,g,h){c(this,b);var i=d(this,a.call(this,"morph-val-job-ids",f));return i.validationTaskName="morphology_validation",i.validationTaskVersions=[],i.launchingJob=!1,i.loadingSynUuid=!1,i.http=e,i.hbpHttp=f,i.oidcHttp=g,i.config=h,i.refreshValidationTaskVersions(),i.dsPath=h.valDsPath,i.bioRefUuid=h.bioRefUuid,i}return e(b,a),b.prototype.activate=function(a){var b=this;a&&a.id&&"undefined"!==a.id&&(this.synJobUuid=a.id,this.loadingSynUuid=!0),this.hbpHttp.fetch('provenance/v1/api/activity/expand?predicate="bbp:jobId"="'+this.synJobUuid+'"').then(function(a){return a.json()}).then(function(a){var c=a.entity;for(var d in c)b.hbpHttp.fetch("document/v0/api/file/"+c[d]["prov:value"]+"/").then(function(a){return a.json()}).then(function(a){"morphology_synthesis.json"===a._name&&(b.synthesisOutputUuid=a._uuid,b.loadingSynUuid=!1)})})},b.prototype.deactivate=function(){this.config.valDsPath=this.dsPath,this.config.bioRefUuid=this.bioRefUuid},b.prototype.refreshValidationTaskVersions=function(){var a=this;return this.validationTaskVersions=[],this.hbpHttp.fetch("task/v0/api/task?task_name="+this.validationTaskName).then(function(a){return a.json()}).then(function(b){a.validationTaskVersion=0,b.tasks.forEach(function(b){a.validationTaskVersions.push(b.properties.version);var c=b.properties.version;c>a.validationTaskVersion&&(a.validationTask=b,a.validationTaskVersion=c)})})},b.prototype.submit=function(){var a=this;return this.launchingJob=!0,this.hbpHttp.fetch("task/v0/api/job/",{method:"post",body:h({task_id:this.validationTask.task_id,total_physical_memory:2048,cpu_cores:1,output_location:this.dsPath,requested_queue:"cscs_viz_webruns",job_name:"morph_val_"+(new Date).toISOString(),arguments:[{object:"URI",contents:{category:"application/vnd.bbp.bundle.Morphology.Morphology",document:this.synthesisOutputUuid}},{object:"URI",contents:{category:"application/vnd.bbp.bundle.Morphology.Morphology",document:this.bioRefUuid}}]})}).then(function(a){return a.json()}).then(function(b){a.addJob(b.job_id),a.launchingJob=!1})["catch"](function(){a.launchingJob=!1})},b}(k))||n)),a("Validation",o)}}});