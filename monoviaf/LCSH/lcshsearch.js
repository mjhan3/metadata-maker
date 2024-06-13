$(document).ready(function() {
    document.getElementById('LCSHSuggest').addEventListener('click', function(){
        document.getElementById("LCSHresponse").innerHTML = "";
        var summary = document.getElementById('summary').value;
        if (summary) { // Check if summary is not empty
            var requests = "text=" + encodeURIComponent(summary); // Encode the summary text
            var url = "http://annif.info/v1/projects/upenn-omikuji-bonsai-en-gen/suggest"; // Ensure the URL is correct and accessible

            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true); // Use asynchronous request
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.setRequestHeader("Accept", "application/json");
            
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            var jsonResponse = JSON.parse(xhr.responseText);
                            console.log(jsonResponse);
                            if (jsonResponse.results && jsonResponse.results.length) {
                                for (var i = 0; i < jsonResponse.results.length; i++) {
                                    var lcshLabel = jsonResponse.results[i].label;
                                    var lcshUrl = jsonResponse.results[i].uri;
                                    console.log(lcshUrl);
                                    document.getElementById("LCSHresponse").innerHTML += 
                                        '<input type="checkbox" name="lcsh" class="lcshcheckbox" uri="' + lcshUrl + '" value="' + lcshLabel + '">' + lcshLabel + '<br>';
                                }
                            }
                        } catch (e) {
                            console.error("Failed to parse JSON response: ", e);
                        }
                    } else {
                        console.error("Error with the request: ", xhr.status, xhr.statusText);
                    }
                }
            };
            xhr.send(requests);
        } else {
            console.warn("Summary is empty");
        }
    });
});

