document.addEventListener("DOMContentLoaded", function () {
  // Fetch and display content from teamparadise1165.com
  fetch("https://teamparadise1165.com")
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

      // Simulate AI response
      setTimeout(() => {
        const aiMessage = document.createElement("div");
        aiMessage.textContent = "AI: This is a simulated response.";
        chatOutput.appendChild(aiMessage);
      }, 1000);
    }
  });
});
