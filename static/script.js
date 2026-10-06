const form = document.getElementById("riskForm");
const submitBtn = document.getElementById("submitBtn");
const formError = document.getElementById("formError");

const resultContent = document.getElementById("resultContent");
const predictionContent = document.getElementById("predictionContent");

const riskBadge = document.getElementById("riskBadge");
const riskIcon = document.getElementById("riskIcon");
const riskResult = document.getElementById("riskResult");

const probability = document.getElementById("probability");
const probabilitySmall = document.getElementById("probabilitySmall");

const threshold = document.getElementById("threshold");
const thresholdSmall = document.getElementById("thresholdSmall");

const predictionSmall = document.getElementById("predictionSmall");
const progressBar = document.getElementById("progressBar");
const explanation = document.getElementById("explanation");


form.addEventListener("submit", async (event) => {
    event.preventDefault();

    formError.textContent = "";

    const formData = new FormData(form);

    // Collect form data
    const payload = {
        person_age: Number(formData.get("person_age")),

        person_income: Number(
            formData.get("person_income")
        ),

        person_home_ownership:
            formData.get("person_home_ownership"),

        person_emp_length: Number(
            formData.get("person_emp_length")
        ),

        loan_intent:
            formData.get("loan_intent"),

        loan_grade:
            formData.get("loan_grade"),

        loan_amnt: Number(
            formData.get("loan_amnt")
        ),

        loan_int_rate: Number(
            formData.get("loan_int_rate")
        ),

        loan_percent_income: Number(
            formData.get("loan_percent_income")
        ),

        cb_person_default_on_file:
            formData.get("cb_person_default_on_file"),

        cb_person_cred_hist_length: Number(
            formData.get("cb_person_cred_hist_length")
        )
    };


    // Show loading state
    setLoading(true);


    try {

        // Send data to FastAPI
        const response = await fetch("/predict", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(payload)

        });


        const data = await response.json();


        // Handle API errors
        if (!response.ok) {

            throw new Error(
                data.detail
                    ? formatApiError(data.detail)
                    : "Unable to get prediction."
            );

        }


        // Display prediction
        showResult(data);


    } catch (error) {

        console.error("Prediction error:", error);

        formError.textContent =
            error.message ||
            "Something went wrong. Please make sure the server is running.";

    } finally {

        setLoading(false);

    }

});



function showResult(data) {

    /*
        Example API response:

        {
            "default_probability": 0.126,
            "default_prediction": 0,
            "threshold": 0.50,
            "Result": "Low Risk"
        }
    */


    const probabilityValue =
        Number(data.default_probability);


    const thresholdValue =
        Number(data.threshold);


    const predictionValue =
        Number(data.default_prediction);


    const isHighRisk =
        predictionValue === 1;


    const probabilityPercent =
        (probabilityValue * 100).toFixed(1);


    const resultText =
        data.Result ||
        (isHighRisk ? "High Risk" : "Low Risk");


    // Hide placeholder
    resultContent.hidden = true;


    // Show prediction section
    predictionContent.hidden = false;


    // Risk badge
    riskBadge.classList.toggle(
        "high",
        isHighRisk
    );


    // Risk icon
    riskIcon.textContent =
        isHighRisk ? "!" : "✓";


    // Main result
    riskResult.textContent =
        resultText;


    // Probability
    probability.textContent =
        `${probabilityPercent}%`;


    probabilitySmall.textContent =
        `${probabilityPercent}%`;


    // Threshold
    threshold.textContent =
        thresholdValue.toFixed(2);


    thresholdSmall.textContent =
        thresholdValue.toFixed(2);


    // Prediction
    predictionSmall.textContent =
        resultText;


    // Probability progress bar
    const percentage =
        Math.min(
            Math.max(probabilityValue * 100, 0),
            100
        );


    progressBar.style.width =
        `${percentage}%`;


    progressBar.classList.toggle(
        "high",
        isHighRisk
    );


    // Explanation
    if (isHighRisk) {

        explanation.textContent =
            "The model estimates a higher likelihood of default based on the provided application details.";

    } else {

        explanation.textContent =
            "The model estimates a lower likelihood of default based on the provided application details.";

    }

}



/*
    Loading state
*/
function setLoading(loading) {

    submitBtn.disabled =
        loading;


    submitBtn.classList.toggle(
        "loading",
        loading
    );

}



/*
    FastAPI validation errors
*/
function formatApiError(detail) {

    if (Array.isArray(detail)) {

        return detail
            .map(item => {

                const field =
                    item.loc
                        ? item.loc.join(".")
                        : "Field";

                return `${field}: ${item.msg}`;

            })
            .join(" | ");

    }


    return String(detail);

}