const os = require('os');

// Function to get the local IPv4 address
function getLocalIpAddress() {
    const networkInterfaces = os.networkInterfaces();

    for (const interfaceName of Object.keys(networkInterfaces)) {
        for (const iface of networkInterfaces[interfaceName]) {
            // Check if it's an IPv4 address and not internal (like loopback)
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }

    // Return localhost as fallback
    return '127.0.0.1';
}

module.exports = {
    getLocalIpAddress
  };