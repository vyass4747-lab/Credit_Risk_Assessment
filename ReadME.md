# Credit Risk Assessment

A Machine Learning-based Credit Risk Assessment system that predicts whether a loan applicant is likely to be a **high-risk or low-risk borrower** based on historical applicant and financial information.

The project focuses not only on model training, but also on **model evaluation, probability-based decision making, threshold optimization, and model persistence**.

---

## 📌 Project Overview

Credit risk assessment is a binary classification problem where the objective is to estimate the likelihood that a borrower may default on a loan.

This project follows a complete machine learning workflow:

**Data → Preprocessing → Model Training → Evaluation → Threshold Optimization → Model Serialization**

The final trained model and optimized decision threshold are saved so that they can be reused for future predictions without retraining the model.

---

## 🎯 Objectives

* Perform data preprocessing and exploratory analysis
* Identify important patterns in credit-risk data
* Build a binary classification model
* Handle class imbalance during model training
* Evaluate the model using multiple classification metrics
* Optimize the classification threshold based on model performance
* Analyze False Positives and False Negatives
* Save the trained model for future inference

---

## 🛠️ Technologies Used

* **Python**
* **Pandas** — Data manipulation
* **NumPy** — Numerical computation
* **Matplotlib / Seaborn** — Data visualization
* **Scikit-learn** — Preprocessing, model evaluation and optimization
* **XGBoost** — Gradient boosting classification
* **Joblib / Pickle** — Model serialization
* **Jupyter Notebook** — Experimentation and analysis

---

## 📂 Project Structure

```text
Credit_Risk_Assessment/
│
├── credit_risk_dataset.csv
├── Untitled.ipynb
├── credit_risk_model.pkl
├── best_threshold.pkl
│
├── anaconda_projects/
├── .ipynb_checkpoints/
└── .virtual_documents/
```

### Important Files

| File                      | Description                                                             |
| ------------------------- | ----------------------------------------------------------------------- |
| `credit_risk_dataset.csv` | Dataset used for model development                                      |
| `Untitled.ipynb`          | Complete data analysis, preprocessing, training and evaluation workflow |
| `credit_risk_model.pkl`   | Serialized trained ML model                                             |
| `best_threshold.pkl`      | Saved optimized classification threshold                                |

---

## 🔄 Machine Learning Workflow

### 1. Data Preparation

The dataset is loaded and analyzed to understand:

* Feature distributions
* Missing values
* Data types
* Target distribution
* Potential outliers
* Relationships between features and credit risk

### 2. Data Preprocessing

The required preprocessing steps are applied before model training.

This ensures that the input data is transformed into a format suitable for machine learning.

### 3. Model Training

A supervised binary classification model is trained to distinguish between:

```text
0 → Lower Risk
1 → Higher Risk
```

XGBoost is used as the primary classification algorithm because of its strong performance on structured/tabular data.

### 4. Model Evaluation

The model is evaluated using multiple metrics rather than relying only on accuracy:

* Accuracy
* Precision
* Recall
* F1 Score
* ROC-AUC
* Confusion Matrix

This provides a more complete understanding of model performance.

---

## 🎚️ Threshold Optimization

Machine learning classifiers generally produce a probability before converting it into a class prediction.

For example:

```text
Predicted probability = 0.73
```

Using a default threshold of `0.50` would produce:

```text
0.73 > 0.50 → Class 1
```

However, the default threshold is not always optimal.

This project therefore evaluates different probability thresholds to identify a more suitable decision boundary based on the chosen evaluation objective.

The selected threshold is stored in:

```text
best_threshold.pkl
```

---

## 🔍 Error Analysis

The project also analyzes classification errors by separating them into:

### False Positive

The model predicts a borrower as high-risk when the actual class is low-risk.

```text
Actual: 0
Predicted: 1
```

### False Negative

The model predicts a borrower as low-risk when the actual class is high-risk.

```text
Actual: 1
Predicted: 0
```

This analysis helps understand **what types of mistakes the model is making**, rather than looking only at aggregate metrics.

---

## 💾 Model Persistence

The trained model is serialized and stored as:

```text
credit_risk_model.pkl
```

The optimized decision threshold is stored separately as:

```text
best_threshold.pkl
```

This allows the trained system to be loaded later for inference without retraining the model.

---

## 🚀 Future Improvements

The current project can be extended into a more production-oriented credit risk system by adding:

* FastAPI inference API
* Input validation
* Docker containerization
* Model monitoring
* Data drift detection
* Probability calibration
* SHAP-based explainability
* Automated retraining pipeline
* Experiment tracking
* CI/CD
* Cloud deployment
* A frontend dashboard for risk assessment

---

## 📚 Key Learnings

Through this project, I explored:

* End-to-end ML workflow
* Binary classification
* Imbalanced classification
* XGBoost
* Cross-validation
* Model evaluation
* Precision vs Recall trade-offs
* Threshold optimization
* Confusion matrix analysis
* False Positive / False Negative analysis
* Model serialization

---

## 👩‍💻 Author

**Suhani Vyas**

B.Tech Computer Science Engineering

GitHub: [@vyass4747-lab](https://github.com/vyass4747-lab)

---

## ⭐ Project Status

**Completed — with scope for further production-oriented improvements.**
