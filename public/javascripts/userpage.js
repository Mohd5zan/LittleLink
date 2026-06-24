
function copyUrl() {
    const urlInput = document.getElementById("shortUrl");

    navigator.clipboard.writeText(urlInput.value);

    alert("URL copied!");
}
