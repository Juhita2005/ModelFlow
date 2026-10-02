import mlflow.sklearn
import pandas as pd


# --------------------------------------------------
# MLFLOW MODEL CONFIGURATION
# --------------------------------------------------

MODEL_NAME = "ModelFlow-Customer-Churn-Best-Model"
MODEL_ALIAS = "champion"

MODEL_URI = f"models:/{MODEL_NAME}@{MODEL_ALIAS}"


# --------------------------------------------------
# LOAD MODEL FROM MLFLOW
# --------------------------------------------------

print("Loading model from MLflow...")

model = mlflow.sklearn.load_model(MODEL_URI)

print("Model loaded successfully!")
print(f"Model: {MODEL_NAME}")
print(f"Alias: {MODEL_ALIAS}")


# --------------------------------------------------
# SAMPLE CUSTOMER
# --------------------------------------------------

sample_customer = pd.DataFrame([
    {
        "gender": "Male",
        "SeniorCitizen": 0,
        "Partner": "Yes",
        "Dependents": "No",
        "tenure": 12,
        "PhoneService": "Yes",
        "MultipleLines": "No",
        "InternetService": "DSL",
        "OnlineSecurity": "Yes",
        "OnlineBackup": "No",
        "DeviceProtection": "No",
        "TechSupport": "Yes",
        "StreamingTV": "No",
        "StreamingMovies": "No",
        "Contract": "One year",
        "PaperlessBilling": "Yes",
        "PaymentMethod": "Mailed check",
        "MonthlyCharges": 50.0,
        "TotalCharges": 600.0
    }
])


# --------------------------------------------------
# MAKE PREDICTION
# --------------------------------------------------

prediction = model.predict(sample_customer)


# --------------------------------------------------
# DISPLAY RESULT
# --------------------------------------------------

if prediction[0] == 1:
    print("\nPrediction: Customer is likely to CHURN.")
else:
    print("\nPrediction: Customer is likely to STAY.")
    
# from pathlib import Path
# import joblib
# import pandas as pd


# # --------------------------------------------------
# # MODEL PATH
# # --------------------------------------------------

# PROJECT_ROOT = Path(__file__).resolve().parents[2]

# MODEL_PATH = (
#     PROJECT_ROOT
#     / "ml_pipeline"
#     / "models"
#     / "best_model.pkl"
# )


# # --------------------------------------------------
# # LOAD MODEL
# # --------------------------------------------------

# model = joblib.load(MODEL_PATH)

# print("Model loaded successfully!")