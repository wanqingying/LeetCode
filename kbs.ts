import { Resolver } from "@infra-node/kbus";

// 你的数据源配置
const resolver = new Resolver({
  bizDef: "webserver",
  productDef: "kuaishou",
  dataSourceName: "mpDeveloperPlatformKbus",
  tenant: "default",
  consumerGroup: "mpDeveloperPlatformKbus_nodev2_staging",
});
// const resolver = new Resolver({
//     bizDef: 'webserver',
//     productDef: 'kuaishou',
//     dataSourceName: 'mpDeveloperPlatformKbusProd',
//     tenant: 'default',
//     consumerGroup: 'mpDeveloperPlatformKbus_knode',
// });

resolver.registerHandler({}, (changeEvent) => {
  console.log("table change event xd", changeEvent);
});

// 1,2,3
// 1,-1
// 3,-1,1,-3

// 1,2,3,1,1
const obj = [
  //xx
  { "1": 1 },
  { "2": 1, "0": 1 },
  { "3": 1, "1": 2, "-1": 1 },
  { "4": 1, "2": 3, "0": 3, "-2": 1 },
  { "5": 1, "3": 4, "1": 6, "-1": 4, "-3": 1 },
  // { "6": 1, "4": 5, "2": 10, "0": 10, "-2": 5, "-4": 1 },
];

// 启动消费
resolver.start();
