const cfgNames1 = [
    [0, "cfg01dc81"], [1, "cfg02dc81"], [2, "cfg03ad58"], [3, "cfg046e2a"], [4, "cfg056e2a"], [5, "cfg0692bd"], [6, "cfg0792bd"], [7, "cfg0892bd"], [8, "cfg0992bd"], [9, "cfg0a92bd"], [10, "cfg0b92bd"], [11, "cfg0c92bd"], [12, "cfg0d92bd"], [13, "cfg0e92bd"], [14, "cfg0f92bd"], [15, "cfg1092bd"], [16, "miniupnpd"], [17, "cfg12dc81"], [18, "cfg13dc81"], [19, "cfg146e2a"], [20, "cfg1592bd"], [21, "cfg1692bd"], [22, "cfg1792bd"], [23, "cfg1892bd"], [24, "cfg1992bd"], [25, "cfg1a92bd"], [26, "cfg1b92bd"], [27, "cfg1c92bd"], [28, "cfg1d92bd"], [30, "cfg1f6e2a"], [29, "cfg1e92bd"], [32, "cfg2192bd"], [31, "cfg2092bd"]
];

const cfgNames2 = [
    [29, "cfg1e92bd"], [32, "cfg2192bd"], [31, "cfg2092bd"]
];

const cfgNames3 = cfgNames1.map(([, name]) => name); 
// console.log(cfgNames3); 
const map = new Map(cfgNames1);

cfgNames2.forEach(([index, name]) => {
    cfgNames1[index] = [index, map.get(index)];
    map.set(index, name);
});

cfgNames3.forEach((name, index) => {
    const element = map.get(index);
    if (element !== undefined) {
        cfgNames3[index] = element;
    }
});

console.log(cfgNames3);
