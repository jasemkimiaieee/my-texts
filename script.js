// آدرس Worker خودت
const API_URL =
  "https://my-text-api.jasemkimiaiee9999.workers.dev/";


const textInput =
  document.getElementById("textInput");

const submitBtn =
  document.getElementById("submitBtn");

const message =
  document.getElementById("message");

const texts =
  document.getElementById("texts");

const loadingScreen =
  document.getElementById("loadingScreen");

const mainContent =
  document.getElementById("mainContent");



// =================================================
// نمایش صفحه بعد از دریافت متن‌ها
// =================================================

function showPage() {

  loadingScreen.classList.add("hidden");

  mainContent.classList.remove("hidden");

}



// =================================================
// ارسال با Enter
//
// Enter       = ارسال
// Shift+Enter = خط جدید
// =================================================

textInput.addEventListener("keydown", function (event) {

  if (event.key === "Enter" && !event.shiftKey) {

    event.preventDefault();

    submitText();

  }

});



// =================================================
// ارسال متن
// =================================================

async function submitText() {

  const text =
    textInput.value.trim();


  if (!text) {

    message.textContent =
      "لطفاً متن را وارد کنید.";

    return;

  }


  submitBtn.disabled = true;

  message.textContent =
    "در حال ارسال...";


  try {

    const response =
      await fetch(API_URL, {

        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          text: text
        })

      });


    const data =
      await response.json();


    if (!response.ok) {

      throw new Error(
        data.message ||
        "خطا در ارسال متن"
      );

    }


    message.textContent =
      "✅ متن با موفقیت ذخیره شد.";


    textInput.value = "";


    // دریافت دوباره متن‌ها
    await loadTexts();

  }


  catch (error) {

    console.error(error);

    message.textContent =
      "❌ " + error.message;

  }


  finally {

    submitBtn.disabled = false;

    textInput.focus();

  }

}



// =================================================
// دریافت متن‌های ثبت شده
// =================================================

async function loadTexts() {

  try {

    const response =
      await fetch(API_URL);


    const data =
      await response.json();


    if (!response.ok) {

      throw new Error(
        data.message ||
        "خطا در دریافت متن‌ها"
      );

    }


    texts.innerHTML = "";


    if (
      !data.content ||
      !data.content.trim()
    ) {

      texts.innerHTML =
        "هنوز متنی ثبت نشده است.";

      showPage();

      return;

    }


    const items =
      data.content.split(
        "\n\n----------------\n\n"
      );


    // جدیدترین متن اول نمایش داده شود
    items.reverse();


    items.forEach(function (text) {

      const div =
        document.createElement("div");

      div.className =
        "text-item";

      div.textContent =
        text;

      texts.appendChild(div);

    });


    // فقط بعد از دریافت موفق صفحه را نشان بده
    showPage();

  }


  catch (error) {

    console.error(error);


    // صفحه اصلی را باز می‌کنیم
    // تا کاربر خطا را ببیند

    texts.innerHTML =
      "❌ خطا در دریافت متن‌ها: " +
      error.message;

    showPage();

  }

}



// =================================================
// شروع برنامه
// =================================================

loadTexts();
