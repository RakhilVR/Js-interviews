function generateRule(proto, sourceIps, sourcePorts, destIps, destPorts, fwMark, lanZoneIfaces) {
  return new Promise((resolve, reject) => {
    const mangleOutputChain = [];
    const manglePreroutingChain = [];

    const sourceIpList = sourceIps.split(',');
    const destIpList = destIps.split(',');


    const generateIpRules = (ipList, isIPv6) => {
      const ipAddressType = isIPv6 ? 'ip6' : 'ip';
      const ipAddress = isIPv6 ? 'ip6addr' : 'ipaddr';

      const ipRules = ipList.map((ip) => `${ipAddress} { ${ip.trim()} }`).join(' ');

      return `${ipAddressType} saddr { ${ipRules} }`;
    };

    
    const generatePortRules = (portList) => {
      const portRules = portList.split(' ').map((port) => port.trim()).join(' ');

      return portRules ? `ip dport { ${portRules} }` : '';
    };

    const generateInterfaceRules = (interfaceList) => {
      const interfaceRules = interfaceList.map((iface) => `iifname ${iface}`).join(' ');

      return interfaceRules ? `${interfaceRules} ` : '';
    };

   
    const ipv4Rule = `${generateInterfaceRules(lanZoneIfaces)}${generateIpRules(destIpList, false)} ${generatePortRules(destPorts)} counter meta mark set ${fwMark} comment "!fw4: ${fwMark}"`;
    mangleOutputChain.push(ipv4Rule);
    manglePreroutingChain.push(`iifname ${lanZoneIfaces.join(' ')} ${generateIpRules(sourceIpList, false)} ${generatePortRules(sourcePorts)} ${generateIpRules(destIpList, false)} ${generatePortRules(destPorts)} counter meta mark set ${fwMark} comment "!fw4: ${fwMark}"`);

    
    const ipv6Rule = `${generateInterfaceRules(lanZoneIfaces)}${generateIpRules(destIpList, true)} ${generatePortRules(destPorts)} counter meta mark set ${fwMark} comment "!fw4: ${fwMark}"`;
    mangleOutputChain.push(ipv6Rule);
    manglePreroutingChain.push(`iifname ${lanZoneIfaces.join(' ')} ${generateIpRules(sourceIpList, true)} ${generatePortRules(sourcePorts)} ${generateIpRules(destIpList, true)} ${generatePortRules(destPorts)} counter meta mark set ${fwMark} comment "!fw4: ${fwMark}"`);

    const mangleOutput = `chain mangle_output {\n\t${mangleOutputChain.join(' ')}\n}`;
    const manglePrerouting = `chain mangle_prerouting {\n\t${manglePreroutingChain.join(' ')}\n}`;

    const ruleString = `${mangleOutput}\n\n${manglePrerouting}`;
    resolve(ruleString);
  });
}

generateRule('all', '0.0.0.0/0,::/0', 'none', '104.31.16.9,104.31.16.120,104.21.39.145,172.67.170.206,104.17.49.74,104.17.50.74,104.31.16.11,104.31.16.118,2606:4700:3033::6815:2791,2606:4700:3033::ac43:aace', 'none', '0x000affa1', ['br-lan'])
  .then((ruleString) => {
    console.log(ruleString);
  })
  .catch((error) => {
    console.error(error);
  });
