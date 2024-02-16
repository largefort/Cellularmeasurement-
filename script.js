document.addEventListener("DOMContentLoaded", function () {
    const speedContainer = document.getElementById("speed-container");
    const speedText = document.getElementById("speed-text");
    const loader = document.getElementById("loader");

    // Function to fetch network speed using navigator.connection API
    async function getNetworkSpeed() {
        try {
            const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
            const speed = connection.downlink || 0;
            return speed.toFixed(2);
        } catch (error) {
            throw new Error('Network speed measurement failed.');
        }
    }

    // Update network speed information
    async function updateNetworkSpeed() {
        try {
            loader.style.display = "block";
            const speed = await getNetworkSpeed();
            speedText.innerText = `Current Speed: ${speed} Mbps`;
        } catch (error) {
            speedText.innerText = "Error fetching speed";
        } finally {
            loader.style.display = "none";
        }
    }

    // Update speed every 5 seconds (adjust as needed)
    setInterval(updateNetworkSpeed, 5000);

    // Initial update
    updateNetworkSpeed();
});
