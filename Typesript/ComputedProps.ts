const osPrefix = 'os_';
var support = {
    [osPrefix + 'Windows'] : isSupported('Windows'),
    [osPrefix + 'iOS'] : isSupported('iOS'),
    [osPrefix + 'Android'] : isSupported('Android'),
}

function isSupported(os: string): boolean{
    return Math.random() >= 0.5;
}

console.log(support['os_Windows']);