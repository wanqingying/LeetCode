


export function test() {
  const json = [
    {
      p1: "12",
      p2: "47",
      result: "564",
    },
    {
      p1: "20344443243",
      p2: "2000001232132303",
      result: "40688911553045706250378629",
    },
    {
      p1: "20",
      p2: "130",
      result: "2600",
    },
    {
      p1: "923",
      p2: "0",
      result: "0",
    },
  ];

  json.forEach((j, idx) => {
    const res = multiply(j.p1, j.p2);
    if (String(res) !== String(j.result)) {
      console.log(
        `idx:${idx}，期望结果:${JSON.stringify(
          j.result
        )}，测试结果:${JSON.stringify(res)}`
      );
    } else {
      console.log(`pass ${idx}`);
    }
  });
}
