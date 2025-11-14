# app.py
import os
import traceback
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field, validator
from fastapi.middleware.cors import CORSMiddleware
import joblib
import numpy as np
import pandas as pd

MODEL_PATH = os.environ.get("MODEL_PATH", "model4_random_forest.pkl")

# load model function with common unwraps
def load_model(path=MODEL_PATH):
    if not os.path.exists(path):
        raise FileNotFoundError(f"{path} not found in container.")
    obj = joblib.load(path)
    # direct estimator
    if hasattr(obj, "predict"):
        return obj
    # ndarray containing estimator
    if isinstance(obj, np.ndarray) and obj.dtype == object and obj.size == 1:
        cand = obj.item()
        if hasattr(cand, "predict"):
            return cand
    # dict-like
    if isinstance(obj, dict):
        for key in ("model", "estimator", "clf", "pipeline", "best_estimator_", "best_estimator"):
            if key in obj and hasattr(obj[key], "predict"):
                return obj[key]
    if hasattr(obj, "best_estimator_") and hasattr(obj.best_estimator_, "predict"):
        return obj.best_estimator_
    raise RuntimeError("Loaded object does not look like an estimator (no .predict).")

model = load_model()

# mapping
TYPE_MAP = {'PAYMENT':0, 'CASH_IN':1, 'DEBIT':2, 'CASH_OUT':3, 'TRANSFER':4}

class PredictRequest(BaseModel):
    step: int = Field(..., ge=0)
    type: str
    amount: float
    oldbalanceOrg: float
    oldbalanceDest: float

    @validator("type")
    def ensure_type_str(cls, v):
        return str(v)

class PredictResponse(BaseModel):
    prediction: int
    probabilities: list | None = None

app = FastAPI(title="Fraud API")

# CORS - safe default: allow from env var or allow all (dev)
ALLOWED_ORIGINS = os.environ.get("ALLOWED_ORIGINS", "*")
if ALLOWED_ORIGINS == "*":
    origins = ["*"]
else:
    # comma separated
    origins = [o.strip() for o in ALLOWED_ORIGINS.split(",")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET","POST","OPTIONS"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status":"ok"}

def preprocess(req: PredictRequest):
    tx_type = req.type
    try:
        if isinstance(tx_type, str) and tx_type.upper() in TYPE_MAP:
            tx_mapped = TYPE_MAP[tx_type.upper()]
        else:
            tx_mapped = int(tx_type)
    except Exception:
        raise ValueError(f"Unknown type: {req.type}. Expected one of {list(TYPE_MAP.keys())} or integer 0-4.")
    df = pd.DataFrame([{
        "step": int(req.step),
        "type": int(tx_mapped),
        "amount": float(req.amount),
        "oldbalanceOrg": float(req.oldbalanceOrg),
        "oldbalanceDest": float(req.oldbalanceDest)
    }])
    return df[["step","type","amount","oldbalanceOrg","oldbalanceDest"]].values

@app.post("/predict", response_model=PredictResponse)
def predict(req: PredictRequest):
    try:
        X = preprocess(req)
        pred = model.predict(X)
        pred0 = int(pred[0])
        probs = None
        if hasattr(model, "predict_proba"):
            probs = model.predict_proba(X)[0].tolist()
        return {"prediction": pred0, "probabilities": probs}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Internal error")
