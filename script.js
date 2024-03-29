document.addEventListener("DOMContentLoaded", function () {
    const speedText = document.getElementById("speed-text");
    const loader = document.getElementById("loader");

    // Function to fetch network speed and type
    async function getNetworkInfo() {
        try {
            const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
            const speed = connection.downlink || 0;
            const type = connection.effectiveType || "unknown";
            return { speed: speed.toFixed(2), type };
        } catch (error) {
            throw new Error('Network information retrieval failed.');
        }
    }

    // Update network speed information
    async function updateNetworkInfo() {
        try {
            loader.style.display = "block";
            const { speed, type } = await getNetworkInfo();
            speedText.innerText = `Current Speed: ${speed} Mbps (${type.toUpperCase()})`;
        } catch (error) {
            speedText.innerText = "Error fetching network information";
        } finally {
            loader.style.display = "none";
        }
    }

    // Update speed and type every second (adjust as needed)
    setInterval(updateNetworkInfo, 1000);

    // Initial update
    updateNetworkInfo();
});
