// آدرس Worker خودت را اینجا قرار بده
const API_URL = "https://my-text-api.jasemkimiaiee9999.workers.dev/";


const textInput = document.getElementById("textInput");
const submitBtn = document.getElementById("submitBtn");
const message = document.getElementById("message");
const texts = document.getElementById("texts");


// -------------------------
// ارسال متن
// -------------------------

submitBtn.addEventListener("click", async () => {

  const text = textInput.value.trim();

  if (!text) {
    message.textContent = "لطفاً متن را وارد کنید.";
    return;
  }

  submitBtn.disabled = true;

  message.textContent = "در حال ذخیره متن...";

  try {

    const response = await fetch(API_URL, {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        text: text
      })

    });


    const data = await response.json();


    if (!response.ok) {

      throw new Error(
        data.message || "خطا در ذخیره متن"
      );

    }


    message.textContent =
      "✅ متن با موفقیت ذخیره شد.";

    textInput.value = "";


    // دوباره متن‌ها را دریافت کن
    loadTexts();

  }

  catch (error) {

    console.error(error);

    message.textContent =
      "❌ " + error.message;

  }

  finally {

    submitBtn.disabled = false;

  }

});



// -------------------------
// دریافت متن‌های قبلی
// -------------------------

async function loadTexts() {

  texts.innerHTML =
    "در حال دریافت متن‌ها...";


  try {

    const response =
      await fetch(API_URL);


    const data =
      await response.json();


    if (!response.ok) {

      throw new Error(
        data.message || "خطا در دریافت متن‌ها"
      );

    }


    texts.innerHTML = "";


    if (!data.content || !data.content.trim()) {

      texts.innerHTML =
        "هنوز متنی ثبت نشده است.";

      return;

    }


    const items =
      data.content.split(
        "\n\n----------------\n\n"
      );


    items.reverse().forEach(text => {

      const div =
        document.createElement("div");

      div.className = "text-item";

      div.textContent = text;

      texts.appendChild(div);

    });

  }

  catch (error) {

    console.error(error);

    texts.innerHTML =
      "❌ خطا در دریافت متن‌ها: " +
      error.message;

  }

}


// هنگام باز شدن سایت
loadTexts();
