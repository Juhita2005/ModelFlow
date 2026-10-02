from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import mlflow.sklearn
import pandas as pd


# --------------------------------------------------
# FASTAPI APPLICATION
# --------------------------------------------------

app = FastAPI(
    title="ModelFlow API",
    description="Automated ML training and prediction API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------------------------------------
# MLFLOW MODEL CONFIGURATION
# --------------------------------------------------

MODEL_NAME = "ModelFlow-Customer-Churn-Best-Model"
MODEL_ALIAS = "champion"

MODEL_URI = f"models:/{MODEL_NAME}@{MODEL_ALIAS}"


# --------------------------------------------------
# LOAD MODEL
# --------------------------------------------------

print("Loading ModelFlow Champion model...")

model = mlflow.sklearn.load_model(MODEL_URI)

print("Model loaded successfully!")


# --------------------------------------------------
# INPUT DATA MODEL
# --------------------------------------------------

class CustomerData(BaseModel):

    gender: str
    SeniorCitizen: int
    Partner: str
    Dependents: str
    tenure: int
    PhoneService: str
    MultipleLines: str
    InternetService: str
    OnlineSecurity: str
    OnlineBackup: str
    DeviceProtection: str
    TechSupport: str
    StreamingTV: str
    StreamingMovies: str
    Contract: str
    PaperlessBilling: str
    PaymentMethod: str
    MonthlyCharges: float
    TotalCharges: float


# --------------------------------------------------
# ROOT ENDPOINT
# --------------------------------------------------

@app.get("/")
def home():

    return {
        "message": "ModelFlow API is running",
        "model": MODEL_NAME,
        "alias": MODEL_ALIAS
    }


# --------------------------------------------------
# HEALTH ENDPOINT
# --------------------------------------------------

@app.get("/health")
def health():

    return {
        "status": "healthy",
        "model": MODEL_NAME,
        "alias": MODEL_ALIAS
    }


# --------------------------------------------------
# PREDICTION ENDPOINT
# --------------------------------------------------

@app.post("/predict")
def predict(customer: CustomerData):

    customer_data = pd.DataFrame([
        customer.model_dump()
    ])

    prediction = model.predict(customer_data)

    if prediction[0] == 1:

        result = "Churn"

    else:

        result = "Stay"

    return {
        "prediction": result,
        "model": MODEL_NAME,
        "alias": MODEL_ALIAS
    }