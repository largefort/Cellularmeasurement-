document.addEventListener("DOMContentLoaded", function () {
    const speedContainer = document.getElementById("speed-container");
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

    // Redirect to loading screen after initial update
    document.getElementById("loading-link").click();

    // Update speed and type every 5 seconds (adjust as needed)
    setInterval(updateNetworkInfo, 5000);

    // Initial update
    updateNetworkInfo();
});
