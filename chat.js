const url = "https://luis-ru.cognitiveservices.azure.com/language/:analyze-conversations?api-version=2022-10-01-preview";
const apiKey = "cd15c25133d04d7d9b7b4bafdbfc870c";
const reqId = "4ffcac1c-b2fc-48ba-bd6d-b69d9942995a";
const projectName = "Chinese_test";
const deploymentName = "02";

// 建立罐頭訊息回覆清單
const cannedResponses = {
  打招呼: [
    "您好，有什麼我可以幫您的呢？",
    "您好！請問有什麼我可以幫您的？",
    "哈囉！有什麼問題我可以回答您呢？"
  ],
  查詢航班時間: [
    "請問您要查詢哪一班航班的時間呢？",
    "請提供航班編號或出發時間，我將為您查詢航班時間。",
    "想查詢哪個城市的航班時間呢？"
  ],
  再見: [
    "再見，祝您有美好的一天！",
    "掰掰，期待再次為您服務！",
    "祝您旅途愉快，再見！"
  ],
  查詢機場貴賓室: [
    "請問您想查詢哪個機場的貴賓室訊息呢？",
    "想享受哪家航空公司提供的貴賓室服務呢？",
    "請問您需要查詢哪個城市的機場貴賓室呢？"
  ],
  查詢預訂確認: [
    "請提供您的預訂確認號，我將為您查詢訂單詳情。",
    "想知道訂單的最新狀態，請提供您的訂單確認號。",
    "請問您預訂時使用的電子郵件地址是？我將幫您查詢訂單。"
  ],
  查詢退改簽費用: [
    "請問您想查詢哪一筆機票的退改簽費用呢？",
    "想了解退改簽的相關費用，請提供機票資訊。",
    "請問您預訂的機票是哪一班航班呢？"
  ],
  查詢行李規定: [
    "請問您要查詢哪家航空公司的行李規定呢？",
    "想知道航空公司的行李限制嗎？請告訴我航空公司名稱。",
    "請問您預訂的是國際航班還是國內航班？"
  ],
  查詢登機手續: [
    "請問您需要查詢哪個航班的登機手續呢？",
    "想知道登機的相關規定嗎？請提供航班資訊。",
    "請問您需要協助辦理哪一班航班的登機手續？"
  ],
  選擇機票日期: [
    "請選擇您想訂購機票的日期。",
    "您打算出發的日期是？請選擇機票的出發日期。",
    "請問您計畫在哪一天出發？"
  ],
  查詢機票價格: [
    "請問您要查詢哪一班航班的價格呢？",
    "請提供航班資訊，我將為您查詢價格。",
    "想知道某個航班的價格？請告訴我出發地和目的地。"
  ],
  更改機票日期: [
    "請提供您的訂單資訊，我將協助您更改機票日期。",
    "需要協助更改航班日期嗎？請提供您的訂單號碼。",
    "請問您要將航班日期改為哪一天？"
  ],
  取消機票訂單: [
    "請提供您的訂單確認號，我將協助您取消訂單。",
    "請問您要取消哪一筆訂單？請提供訂單確認號。",
    "請問您要取消的是哪一班航班的訂單？"
  ]
};

const defaultResponse = "很抱歉，我不清楚您的意思，請再詳細跟我說明。";

document.getElementById("user-input").addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    const userInput = event.target.value;
    const payload = {
      kind: "Conversation",
      analysisInput: {
        conversationItem: {
          id: "1",
          text: userInput,
          modality: "text",
          participantId: "user1"
        }
      },
      parameters: {
        projectName: projectName,
        verbose: true,
        deploymentName: deploymentName,
        stringIndexType: "TextElement_V8"
      }
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": apiKey,
        "Apim-Request-Id": reqId,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
      const topIntent = data.result.prediction.topIntent;
      const responses = cannedResponses[topIntent] || [defaultResponse];
      const responseMessage = getRandomResponse(responses);
      addMessageToChat("user", userInput);
      addMessageToChat("bot", responseMessage);
    });
    event.target.value = "";
  }
});

function addMessageToChat(sender, message) {
  const chatContainer = document.getElementById("chat-container");
  const messageDiv = document.createElement("div");
  messageDiv.className = "chat-box " + sender;

  if (sender === "user") {
    messageDiv.textContent = message;
  } else if (sender === "bot") {
    messageDiv.textContent = message;
  }

  chatContainer.appendChild(messageDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function getRandomResponse(responses) {
  return responses[Math.floor(Math.random() * responses.length)];
}
