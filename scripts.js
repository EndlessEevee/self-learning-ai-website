document.addEventListener("DOMContentLoaded", function () {
  // Fetch and display content from teamparadise1165.com
  fetch("http://your-ec2-public-dns:5000/scrape")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("content-container").innerHTML = data;
    })
    .catch((error) => {
      document.getElementById("content-container").innerHTML =
        "Failed to load content.";
      console.error("Error fetching content:", error);
    });

  // Chat functionality
  const chatInput = document.getElementById("chat-input");
  const sendButton = document.getElementById("send-button");
  const chatOutput = document.getElementById("chat-output");

  sendButton.addEventListener("click", function () {
    const message = chatInput.value;
    if (message.trim()) {
      const userMessage = document.createElement("div");
      userMessage.textContent = "You: " + message;
      chatOutput.appendChild(userMessage);
      chatInput.value = "";

      // Send message to backend server
      fetch("http://ec2-3-144-134-145.us-east-2.compute.amazonaws.com:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: message }),
      })
        .then((response) => response.json())
        .then((data) => {
          const aiMessage = document.createElement("div");
          aiMessage.textContent = "AI: " + data;
          chatOutput.appendChild(aiMessage);
        })
        .catch((error) => {
          const aiMessage = document.createElement("div");
          aiMessage.textContent = "Failed to get response from AI.";
          chatOutput.appendChild(aiMessage);
          console.error("Error:", error);
        });
    }
  });
});
