const API_URL = "https://my-text-api.jasemkimiaiee9999.workers.dev/";

const textInput = document.getElementById("textInput");
const submitBtn = document.getElementById("submitBtn");
const message = document.getElementById("message");

submitBtn.addEventListener("click", async () => {
  const text = textInput.value.trim();

  if (!text) {
    message.textContent = "لطفاً متن را وارد کنید.";
    return;
  }

  submitBtn.disabled = true;
  message.textContent = "در حال ارسال...";

  try {
    const response = await fetch(API_URL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        text: text,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "خطا");
    }

    message.textContent = "متن با موفقیت ذخیره شد.";

    textInput.value = "";
  } catch (error) {
    console.error(error);

    message.textContent = error.message || "خطایی رخ داد.";
  } finally {
    submitBtn.disabled = false;
  }
});
