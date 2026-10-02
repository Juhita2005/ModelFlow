import { useState } from "react";

const defaultForm = {
  gender: "Male",
  SeniorCitizen: 0,
  Partner: "Yes",
  Dependents: "No",
  tenure: 12,
  PhoneService: "Yes",
  MultipleLines: "No",
  InternetService: "DSL",
  OnlineSecurity: "Yes",
  OnlineBackup: "No",
  DeviceProtection: "No",
  TechSupport: "Yes",
  StreamingTV: "No",
  StreamingMovies: "No",
  Contract: "One year",
  PaperlessBilling: "Yes",
  PaymentMethod: "Mailed check",
  MonthlyCharges: 50,
  TotalCharges: 600,
};

const navigation = [
  {
    name: "Overview",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="h-full w-full"
      >
        <rect x="3" y="3" width="7" height="7" rx="1" strokeWidth="1.8" />
        <rect x="14" y="3" width="7" height="7" rx="1" strokeWidth="1.8" />
        <rect x="3" y="14" width="7" height="7" rx="1" strokeWidth="1.8" />
        <rect x="14" y="14" width="7" height="7" rx="1" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    name: "Models",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="h-full w-full"
      >
        <path
          d="M12 3 20 7.5v9L12 21l-8-4.5v-9L12 3Z"
          strokeWidth="1.8"
        />
        <path
          d="m8 9 4 2.3L16 9M12 12v5"
          strokeWidth="1.8"
        />
      </svg>
    ),
  },
  {
    name: "Predictions",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="h-full w-full"
      >
        <path d="M4 18V6M4 18h16" strokeWidth="1.8" />
        <path d="m7 14 3-3 3 2 5-6" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    name: "Monitoring",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="h-full w-full"
      >
        <path d="M4 18V6M4 18h16" strokeWidth="1.8" />
        <path d="M8 15v-4M12 15V8M16 15v-6" strokeWidth="1.8" />
      </svg>
    ),
  },
];

function App() {
  const [activePage, setActivePage] = useState("Overview");

  const [form, setForm] = useState(defaultForm);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const makePrediction = async () => {
    setLoading(true);
    setPrediction(null);
    setError("");

    const customer = {
      ...form,
      SeniorCitizen: Number(form.SeniorCitizen),
      tenure: Number(form.tenure),
      MonthlyCharges: Number(form.MonthlyCharges),
      TotalCharges: Number(form.TotalCharges),
    };

    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
      });

      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }

      const data = await response.json();

      setPrediction(data);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to reach the ModelFlow API. Make sure FastAPI is running on port 8000."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleNewTrainingRun = () => {
    alert(
      "Training pipeline\n\nThe training workflow is ready to be connected here. This button will trigger the automated ML training pipeline in the next backend stage."
    );
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-[#172033]">
      <div className="flex min-h-screen">

        {/* =========================================================
            SIDEBAR
        ========================================================= */}

        <aside className="hidden w-[248px] shrink-0 flex-col border-r border-[#e4e8f0] bg-[#101828] text-white lg:flex">

          {/* Brand */}
          <div className="flex h-[72px] items-center border-b border-white/10 px-6">
            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#6366f1] shadow-lg shadow-indigo-950/30">
                <span className="text-sm font-bold">M</span>
              </div>

              <div>
                <p className="text-[15px] font-bold tracking-tight">
                  ModelFlow
                </p>

                <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-400">
                  ML Operations
                </p>
              </div>

            </div>
          </div>

          {/* Workspace */}
          <div className="px-4 pt-6">

            <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Workspace
            </p>

            <div className="mt-3 flex items-center gap-3 rounded-xl bg-white/[0.06] px-3 py-3">

              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20 text-xs font-bold text-indigo-300">
                CC
              </div>

              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-slate-200">
                  Customer Churn
                </p>

                <p className="text-[10px] text-slate-500">
                  Production project
                </p>
              </div>

            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-7 px-4">

            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Platform
            </p>

            <div className="space-y-1">

              {navigation.map((item) => {
                const active = activePage === item.name;

                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setActivePage(item.name)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                      active
                        ? "bg-indigo-500/15 font-semibold text-indigo-300"
                        : "text-slate-400 hover:bg-white/[0.05] hover:text-slate-200"
                    }`}
                  >

                    <span className="h-[17px] w-[17px]">
                      {item.icon}
                    </span>

                    {item.name}

                    {item.name === "Monitoring" && (
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    )}

                  </button>
                );
              })}

            </div>
          </nav>

          {/* System status */}
          <div className="mt-auto p-4">

            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">

              <div className="flex items-center gap-2">

                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />

                <span className="text-xs font-semibold text-slate-200">
                  All systems operational
                </span>

              </div>

              <p className="mt-2 text-[10px] leading-4 text-slate-500">
                API, model registry and prediction service are connected.
              </p>

            </div>

          </div>

        </aside>

        {/* =========================================================
            MAIN
        ========================================================= */}

        <main className="min-w-0 flex-1">

          {/* Top bar */}
          <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-[#e4e8f0] bg-white/95 px-5 backdrop-blur md:px-8">

            <div>

              <div className="flex items-center gap-2">

                <span className="text-xs font-medium text-[#8b95a7]">
                  Workspace
                </span>

                <span className="text-[#c5cad4]">
                  /
                </span>

                <span className="text-xs font-semibold text-[#566176]">
                  {activePage}
                </span>

              </div>

              <h1 className="mt-1 text-sm font-bold text-[#172033]">
                Customer Churn Platform
              </h1>

            </div>

            <div className="flex items-center gap-3">

              <div className="hidden items-center gap-2 rounded-full border border-[#e1e6ee] bg-[#f8fafc] px-3 py-1.5 sm:flex">

                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                <span className="text-[11px] font-semibold text-[#596579]">
                  API connected
                </span>

              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-600 ring-1 ring-indigo-100">
                MF
              </div>

            </div>

          </header>

          {/* Content */}
          <section className="mx-auto max-w-[1440px] px-5 py-7 md:px-8 md:py-9">

            {/* =====================================================
                MODELS
            ===================================================== */}

            {activePage === "Models" && (
              <ModelsPage
                onBack={() => setActivePage("Overview")}
              />
            )}

            {/* =====================================================
                PREDICTIONS
            ===================================================== */}

            {activePage === "Predictions" && (
              <PredictionsPage
                onBack={() => setActivePage("Overview")}
              />
            )}

            {/* =====================================================
                MONITORING
            ===================================================== */}

            {activePage === "Monitoring" && (
              <MonitoringPage
                onBack={() => setActivePage("Overview")}
              />
            )}

            {/* =====================================================
                OVERVIEW
            ===================================================== */}

            {activePage === "Overview" && (
              <>

                {/* Page heading */}
                <div className="mb-8 flex flex-col justify-between gap-5 xl:flex-row xl:items-end">

                  <div>

                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-2.5 py-1">

                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />

                      <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-indigo-600">
                        ML Operations
                      </span>

                    </div>

                    <h2 className="text-3xl font-bold tracking-[-0.03em] text-[#111827] md:text-[34px]">
                      Model overview
                    </h2>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-[#687386]">
                      Train, evaluate, deploy and monitor your machine
                      learning models from one workspace.
                    </p>

                  </div>

                  <button
                    type="button"
                    onClick={handleNewTrainingRun}
                    className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#172033] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#253149]"
                  >
                    <span className="text-lg leading-none">
                      +
                    </span>

                    New training run
                  </button>

                </div>

                {/* Metrics */}
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                  <MetricCard
                    label="Active model"
                    value="v2"
                    detail="Logistic Regression"
                    accent="indigo"
                  />

                  <MetricCard
                    label="F1 score"
                    value="60.40%"
                    detail="Validation set"
                    accent="blue"
                  />

                  <MetricCard
                    label="Accuracy"
                    value="80.55%"
                    detail="Validation set"
                    accent="violet"
                  />

                  <MetricCard
                    label="API status"
                    value="Healthy"
                    detail="localhost:8000"
                    accent="green"
                    status
                  />

                </div>

                {/* Main content */}
                <div className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_1fr]">

                  {/* Champion model */}
                  <div className="overflow-hidden rounded-xl border border-[#e1e6ee] bg-white shadow-[0_2px_8px_rgba(15,23,42,0.03)]">

                    <div className="flex items-center justify-between border-b border-[#edf0f4] px-6 py-5">

                      <div>

                        <h3 className="text-sm font-bold text-[#172033]">
                          Champion model
                        </h3>

                        <p className="mt-1 text-xs text-[#8993a5]">
                          Currently serving predictions
                        </p>

                      </div>

                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">

                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                        ACTIVE

                      </span>

                    </div>

                    <div className="p-6">

                      <div className="flex flex-col justify-between gap-5 sm:flex-row">

                        <div>

                          <p className="text-2xl font-bold tracking-tight text-[#172033]">
                            Logistic Regression
                          </p>

                          <p className="mt-1.5 text-xs text-[#7d8799]">
                            ModelFlow-Customer-Churn-Best-Model
                          </p>

                        </div>

                        <div className="rounded-lg border border-[#e8ebf1] bg-[#f8fafc] px-4 py-2.5 sm:text-right">

                          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9aa3b2]">
                            Registry version
                          </p>

                          <p className="mt-0.5 text-lg font-bold text-[#172033]">
                            v2
                          </p>

                        </div>

                      </div>

                      {/* Performance */}
                      <div className="mt-7 grid grid-cols-3 divide-x divide-[#edf0f4] rounded-lg border border-[#edf0f4] bg-[#fafbfc] py-5">

                        <Stat
                          label="Precision"
                          value="65.72%"
                        />

                        <Stat
                          label="Recall"
                          value="55.88%"
                        />

                        <Stat
                          label="F1 score"
                          value="60.40%"
                        />

                      </div>

                      {/* Tags */}
                      <div className="mt-5 flex flex-wrap gap-2">

                        <Tag>
                          champion
                        </Tag>

                        <Tag>
                          production
                        </Tag>

                        <Tag>
                          scikit-learn
                        </Tag>

                        <Tag>
                          v2
                        </Tag>

                      </div>

                      {/* Model info */}
                      <div className="mt-6 grid gap-3 sm:grid-cols-2">

                        <InfoRow
                          label="Experiment"
                          value="ModelFlow-Customer-Churn"
                        />

                        <InfoRow
                          label="Model type"
                          value="Binary classification"
                        />

                        <InfoRow
                          label="Tracking"
                          value="MLflow"
                        />

                        <InfoRow
                          label="Deployment"
                          value="FastAPI"
                        />

                      </div>

                      <button
                        type="button"
                        onClick={() => setActivePage("Models")}
                        className="mt-5 w-full rounded-lg border border-[#dfe4ec] py-2.5 text-xs font-semibold text-indigo-600 transition hover:border-indigo-200 hover:bg-indigo-50"
                      >
                        Open model registry →
                      </button>

                    </div>
                  </div>

                  {/* Prediction panel */}
                  <div className="overflow-hidden rounded-xl border border-[#dfe4ec] bg-white shadow-[0_2px_8px_rgba(15,23,42,0.04)]">

                    <div className="border-b border-[#edf0f4] bg-gradient-to-r from-[#fafbff] to-white px-6 py-5">

                      <div className="flex items-start justify-between gap-4">

                        <div>

                          <div className="flex items-center gap-2">

                            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">

                              <svg
                                className="h-4 w-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                              >
                                <path
                                  d="M12 3v18M3 12h18"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                />
                              </svg>

                            </span>

                            <h3 className="text-sm font-bold text-[#172033]">
                              Live prediction
                            </h3>

                          </div>

                          <p className="mt-2 text-xs leading-5 text-[#8993a5]">
                            Enter customer attributes and send them to
                            the deployed champion model.
                          </p>

                        </div>

                        <span className="hidden rounded-md bg-indigo-50 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-indigo-600 sm:block">
                          Real-time
                        </span>

                      </div>

                    </div>

                    <div className="max-h-[680px] overflow-y-auto p-6">

                      {/* Customer profile */}
                      <FormSection
                        title="Customer profile"
                        description="Basic customer information"
                      >

                        <Field
                          label="Gender"
                          value={form.gender}
                          onChange={(value) =>
                            updateField("gender", value)
                          }
                          options={[
                            "Male",
                            "Female",
                          ]}
                        />

                        <Field
                          label="Senior citizen"
                          value={String(form.SeniorCitizen)}
                          onChange={(value) =>
                            updateField(
                              "SeniorCitizen",
                              Number(value)
                            )
                          }
                          options={[
                            {
                              label: "No",
                              value: "0",
                            },
                            {
                              label: "Yes",
                              value: "1",
                            },
                          ]}
                        />

                        <Field
                          label="Partner"
                          value={form.Partner}
                          onChange={(value) =>
                            updateField("Partner", value)
                          }
                          options={[
                            "Yes",
                            "No",
                          ]}
                        />

                        <Field
                          label="Dependents"
                          value={form.Dependents}
                          onChange={(value) =>
                            updateField(
                              "Dependents",
                              value
                            )
                          }
                          options={[
                            "Yes",
                            "No",
                          ]}
                        />

                        <NumberField
                          label="Tenure (months)"
                          value={form.tenure}
                          onChange={(value) =>
                            updateField(
                              "tenure",
                              value
                            )
                          }
                          min="0"
                        />

                      </FormSection>

                      {/* Services */}
                      <FormSection
                        title="Services"
                        description="Subscribed customer services"
                      >

                        <Field
                          label="Phone service"
                          value={form.PhoneService}
                          onChange={(value) =>
                            updateField(
                              "PhoneService",
                              value
                            )
                          }
                          options={[
                            "Yes",
                            "No",
                          ]}
                        />

                        <Field
                          label="Multiple lines"
                          value={form.MultipleLines}
                          onChange={(value) =>
                            updateField(
                              "MultipleLines",
                              value
                            )
                          }
                          options={[
                            "Yes",
                            "No",
                            "No phone service",
                          ]}
                        />

                        <Field
                          label="Internet service"
                          value={form.InternetService}
                          onChange={(value) =>
                            updateField(
                              "InternetService",
                              value
                            )
                          }
                          options={[
                            "DSL",
                            "Fiber optic",
                            "No",
                          ]}
                        />

                        <Field
                          label="Online security"
                          value={form.OnlineSecurity}
                          onChange={(value) =>
                            updateField(
                              "OnlineSecurity",
                              value
                            )
                          }
                          options={[
                            "Yes",
                            "No",
                            "No internet service",
                          ]}
                        />

                        <Field
                          label="Online backup"
                          value={form.OnlineBackup}
                          onChange={(value) =>
                            updateField(
                              "OnlineBackup",
                              value
                            )
                          }
                          options={[
                            "Yes",
                            "No",
                            "No internet service",
                          ]}
                        />

                        <Field
                          label="Device protection"
                          value={form.DeviceProtection}
                          onChange={(value) =>
                            updateField(
                              "DeviceProtection",
                              value
                            )
                          }
                          options={[
                            "Yes",
                            "No",
                            "No internet service",
                          ]}
                        />

                        <Field
                          label="Tech support"
                          value={form.TechSupport}
                          onChange={(value) =>
                            updateField(
                              "TechSupport",
                              value
                            )
                          }
                          options={[
                            "Yes",
                            "No",
                            "No internet service",
                          ]}
                        />

                        <Field
                          label="Streaming TV"
                          value={form.StreamingTV}
                          onChange={(value) =>
                            updateField(
                              "StreamingTV",
                              value
                            )
                          }
                          options={[
                            "Yes",
                            "No",
                            "No internet service",
                          ]}
                        />

                        <Field
                          label="Streaming movies"
                          value={form.StreamingMovies}
                          onChange={(value) =>
                            updateField(
                              "StreamingMovies",
                              value
                            )
                          }
                          options={[
                            "Yes",
                            "No",
                            "No internet service",
                          ]}
                        />

                      </FormSection>

                      {/* Billing */}
                      <FormSection
                        title="Contract & billing"
                        description="Account and payment information"
                      >

                        <Field
                          label="Contract"
                          value={form.Contract}
                          onChange={(value) =>
                            updateField(
                              "Contract",
                              value
                            )
                          }
                          options={[
                            "Month-to-month",
                            "One year",
                            "Two year",
                          ]}
                        />

                        <Field
                          label="Paperless billing"
                          value={form.PaperlessBilling}
                          onChange={(value) =>
                            updateField(
                              "PaperlessBilling",
                              value
                            )
                          }
                          options={[
                            "Yes",
                            "No",
                          ]}
                        />

                        <Field
                          label="Payment method"
                          value={form.PaymentMethod}
                          onChange={(value) =>
                            updateField(
                              "PaymentMethod",
                              value
                            )
                          }
                          options={[
                            "Electronic check",
                            "Mailed check",
                            "Bank transfer (automatic)",
                            "Credit card (automatic)",
                          ]}
                        />

                        <NumberField
                          label="Monthly charges"
                          value={form.MonthlyCharges}
                          onChange={(value) =>
                            updateField(
                              "MonthlyCharges",
                              value
                            )
                          }
                          min="0"
                          step="0.01"
                        />

                        <NumberField
                          label="Total charges"
                          value={form.TotalCharges}
                          onChange={(value) =>
                            updateField(
                              "TotalCharges",
                              value
                            )
                          }
                          min="0"
                          step="0.01"
                        />

                      </FormSection>

                      {/* Prediction button */}
                      <button
                        type="button"
                        onClick={makePrediction}
                        disabled={loading}
                        className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-[#4f46e5] px-4 py-3 text-sm font-bold text-white shadow-sm shadow-indigo-200 transition hover:bg-[#4338ca] disabled:cursor-not-allowed disabled:opacity-60"
                      >

                        {loading ? (
                          <>
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                            Running model...
                          </>
                        ) : (
                          <>
                            Run prediction

                            <span className="text-base">
                              →
                            </span>
                          </>
                        )}

                      </button>

                      {/* Prediction result */}
                      {prediction && (
                        <div
                          className={`mt-4 overflow-hidden rounded-lg border ${
                            prediction.prediction === "Churn"
                              ? "border-red-200 bg-red-50"
                              : "border-emerald-200 bg-emerald-50"
                          }`}
                        >

                          <div className="flex items-start gap-3 p-4">

                            <div
                              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                                prediction.prediction === "Churn"
                                  ? "bg-red-100 text-red-600"
                                  : "bg-emerald-100 text-emerald-600"
                              }`}
                            >

                              {prediction.prediction === "Churn" ? (
                                <span className="font-bold">
                                  !
                                </span>
                              ) : (
                                <span className="font-bold">
                                  ✓
                                </span>
                              )}

                            </div>

                            <div>

                              <p className="text-[10px] font-bold uppercase tracking-wider text-[#7c8798]">
                                Prediction result
                              </p>

                              <p
                                className={`mt-0.5 text-xl font-bold ${
                                  prediction.prediction === "Churn"
                                    ? "text-red-700"
                                    : "text-emerald-700"
                                }`}
                              >
                                {prediction.prediction}
                              </p>

                              <p className="mt-2 text-[10px] text-[#7d8799]">
                                Served by {prediction.model}
                              </p>

                              <p className="text-[10px] text-[#7d8799]">
                                Registry alias: {prediction.alias}
                              </p>

                            </div>

                          </div>

                        </div>
                      )}

                      {/* Error */}
                      {error && (
                        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4">
                          <p className="text-xs font-medium text-red-700">
                            {error}
                          </p>
                        </div>
                      )}

                    </div>
                  </div>
                </div>

                {/* Training runs */}
                <div className="mt-6 overflow-hidden rounded-xl border border-[#e1e6ee] bg-white shadow-[0_2px_8px_rgba(15,23,42,0.03)]">

                  <div className="flex items-center justify-between border-b border-[#edf0f4] px-6 py-5">

                    <div>

                      <h3 className="text-sm font-bold text-[#172033]">
                        Recent training runs
                      </h3>

                      <p className="mt-1 text-xs text-[#8993a5]">
                        Model evaluation history
                      </p>

                    </div>

                    <button
                      type="button"
                      onClick={() => setActivePage("Models")}
                      className="rounded-md px-2 py-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-50"
                    >
                      View all →
                    </button>

                  </div>

                  <div className="overflow-x-auto">

                    <table className="w-full min-w-[700px] text-left">

                      <thead className="border-b border-[#edf0f4] bg-[#f8fafc] text-[10px] font-bold uppercase tracking-wider text-[#8b95a7]">

                        <tr>
                          <th className="px-6 py-3">
                            Model
                          </th>

                          <th className="px-6 py-3">
                            Accuracy
                          </th>

                          <th className="px-6 py-3">
                            Precision
                          </th>

                          <th className="px-6 py-3">
                            Recall
                          </th>

                          <th className="px-6 py-3">
                            F1
                          </th>

                          <th className="px-6 py-3">
                            Status
                          </th>
                        </tr>

                      </thead>

                      <tbody>

                        <TrainingRow
                          model="Logistic Regression"
                          type="Linear classifier"
                          accuracy="80.55%"
                          precision="65.72%"
                          recall="55.88%"
                          f1="60.40%"
                          status="Champion"
                        />

                        <TrainingRow
                          model="Random Forest"
                          type="Ensemble"
                          accuracy="77.79%"
                          precision="60.34%"
                          recall="47.59%"
                          f1="53.21%"
                          status="Evaluated"
                        />

                        <TrainingRow
                          model="Decision Tree"
                          type="Tree classifier"
                          accuracy="72.89%"
                          precision="48.96%"
                          recall="50.53%"
                          f1="49.74%"
                          status="Evaluated"
                        />

                      </tbody>

                    </table>

                  </div>

                </div>

                {/* Footer */}
                <footer className="mt-8 flex flex-col justify-between gap-2 border-t border-[#e1e6ee] pt-5 text-[11px] text-[#9aa3b2] sm:flex-row">

                  <p>
                    ModelFlow · Automated ML Training & Deployment
                  </p>

                  <div className="flex items-center gap-2">

                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                    Development environment

                  </div>

                </footer>

              </>
            )}

          </section>
        </main>
      </div>
    </div>
  );
}

/* ================================================================
   MODELS PAGE
================================================================ */

function ModelsPage({ onBack }) {
  const models = [
    {
      name: "Logistic Regression",
      version: "v2",
      accuracy: "80.55%",
      precision: "65.72%",
      recall: "55.88%",
      f1: "60.40%",
      status: "Champion",
    },
    {
      name: "Random Forest",
      version: "v1",
      accuracy: "77.79%",
      precision: "60.34%",
      recall: "47.59%",
      f1: "53.21%",
      status: "Evaluated",
    },
    {
      name: "Decision Tree",
      version: "v1",
      accuracy: "72.89%",
      precision: "48.96%",
      recall: "50.53%",
      f1: "49.74%",
      status: "Evaluated",
    },
  ];

  return (
    <div>

      <PageHeader
        eyebrow="MODEL REGISTRY"
        title="Models"
        description="Manage trained models, versions and deployment status."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <MetricCard
          label="Registered models"
          value="3"
          detail="Customer Churn"
          accent="indigo"
        />

        <MetricCard
          label="Champion"
          value="v2"
          detail="Logistic Regression"
          accent="green"
          status
        />

        <MetricCard
          label="Experiment"
          value="1"
          detail="MLflow experiment"
          accent="blue"
        />

        <MetricCard
          label="Deployment"
          value="Active"
          detail="FastAPI"
          accent="violet"
        />

      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

        {models.map((model) => (
          <div
            key={`${model.name}-${model.version}`}
            className="rounded-xl border border-[#e1e6ee] bg-white p-5 shadow-[0_2px_8px_rgba(15,23,42,0.03)]"
          >

            <div className="flex items-start justify-between gap-3">

              <div>

                <p className="text-base font-bold text-[#172033]">
                  {model.name}
                </p>

                <p className="mt-1 text-xs text-[#8b95a7]">
                  Customer Churn classifier
                </p>

              </div>

              {model.status === "Champion" ? (
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-bold text-emerald-700">
                  CHAMPION
                </span>
              ) : (
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-bold text-slate-500">
                  EVALUATED
                </span>
              )}

            </div>

            <div className="mt-5 rounded-lg bg-[#f8fafc] p-4">

              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#98a1b0]">
                Registry version
              </p>

              <p className="mt-1 text-xl font-bold text-[#172033]">
                {model.version}
              </p>

            </div>

            <div className="mt-5 grid grid-cols-2 gap-4">

              <ModelMetric
                label="Accuracy"
                value={model.accuracy}
              />

              <ModelMetric
                label="Precision"
                value={model.precision}
              />

              <ModelMetric
                label="Recall"
                value={model.recall}
              />

              <ModelMetric
                label="F1 score"
                value={model.f1}
              />

            </div>

            <button
              type="button"
              onClick={() =>
                alert(
                  `${model.name} ${model.version}\n\nStatus: ${model.status}\nAccuracy: ${model.accuracy}\nPrecision: ${model.precision}\nRecall: ${model.recall}\nF1 Score: ${model.f1}`
                )
              }
              className="mt-5 w-full rounded-lg border border-[#dfe4ec] bg-white py-2.5 text-xs font-semibold text-[#4d5a70] transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
            >
              View model details
            </button>

          </div>
        ))}

      </div>

      <BackButton onClick={onBack} />

    </div>
  );
}

/* ================================================================
   PREDICTIONS PAGE
================================================================ */

function PredictionsPage({ onBack }) {
  const [demoPrediction, setDemoPrediction] = useState(null);

  const runDemoPrediction = async () => {
    setDemoPrediction("loading");

    try {
      const response = await fetch(
        "http://localhost:8000/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(defaultForm),
        }
      );

      if (!response.ok) {
        throw new Error("Prediction failed");
      }

      const data = await response.json();

      setDemoPrediction(data);
    } catch (error) {
      console.error(error);

      setDemoPrediction({
        prediction: "API unavailable",
      });
    }
  };

  return (
    <div>

      <PageHeader
        eyebrow="PREDICTION SERVICE"
        title="Predictions"
        description="Run inference requests against the deployed champion model."
      />

      <div className="grid gap-5 xl:grid-cols-[1.3fr_0.7fr]">

        {/* Prediction history */}
        <div className="rounded-xl border border-[#e1e6ee] bg-white shadow-[0_2px_8px_rgba(15,23,42,0.03)]">

          <div className="border-b border-[#edf0f4] px-6 py-5">

            <h3 className="text-sm font-bold text-[#172033]">
              Prediction history
            </h3>

            <p className="mt-1 text-xs text-[#8993a5]">
              Recent inference activity.
            </p>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[600px] text-left">

              <thead className="border-b border-[#edf0f4] bg-[#f8fafc] text-[10px] font-bold uppercase tracking-wider text-[#8b95a7]">

                <tr>

                  <th className="px-6 py-3">
                    Request
                  </th>

                  <th className="px-6 py-3">
                    Model
                  </th>

                  <th className="px-6 py-3">
                    Result
                  </th>

                  <th className="px-6 py-3">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                <tr className="border-b border-[#f0f2f5]">

                  <td className="px-6 py-5">

                    <p className="text-xs font-bold text-[#273348]">
                      Customer #001
                    </p>

                    <p className="mt-1 text-[10px] text-[#9aa3b2]">
                      Latest test request
                    </p>

                  </td>

                  <td className="px-6 py-5 text-xs text-[#697589]">
                    Logistic Regression
                  </td>

                  <td className="px-6 py-5">

                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-bold text-emerald-700">
                      STAY
                    </span>

                  </td>

                  <td className="px-6 py-5">

                    <span className="text-xs font-semibold text-emerald-600">
                      Success
                    </span>

                  </td>

                </tr>

                <tr>

                  <td className="px-6 py-5">

                    <p className="text-xs font-bold text-[#273348]">
                      Customer #002
                    </p>

                    <p className="mt-1 text-[10px] text-[#9aa3b2]">
                      Example request
                    </p>

                  </td>

                  <td className="px-6 py-5 text-xs text-[#697589]">
                    Logistic Regression
                  </td>

                  <td className="px-6 py-5">

                    <span className="rounded-full bg-red-50 px-2.5 py-1 text-[9px] font-bold text-red-600">
                      CHURN
                    </span>

                  </td>

                  <td className="px-6 py-5">

                    <span className="text-xs font-semibold text-emerald-600">
                      Success
                    </span>

                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>

        {/* Quick test */}
        <div className="rounded-xl border border-[#e1e6ee] bg-white p-6 shadow-[0_2px_8px_rgba(15,23,42,0.03)]">

          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-indigo-500">
            Live API
          </p>

          <h3 className="mt-2 text-lg font-bold text-[#172033]">
            Quick prediction
          </h3>

          <p className="mt-2 text-xs leading-5 text-[#8993a5]">
            Send the default customer profile to the deployed
            champion model.
          </p>

          <div className="mt-5 space-y-2">

            <InfoRow
              label="Contract"
              value="One year"
            />

            <InfoRow
              label="Tenure"
              value="12 months"
            />

            <InfoRow
              label="Monthly charges"
              value="$50.00"
            />

          </div>

          <button
            type="button"
            onClick={runDemoPrediction}
            disabled={demoPrediction === "loading"}
            className="mt-5 w-full rounded-lg bg-[#4f46e5] py-3 text-xs font-bold text-white transition hover:bg-[#4338ca] disabled:opacity-60"
          >
            {demoPrediction === "loading"
              ? "Running..."
              : "Run API prediction →"}
          </button>

          {demoPrediction &&
            demoPrediction !== "loading" && (
              <div
                className={`mt-4 rounded-lg border p-4 ${
                  demoPrediction.prediction === "Stay"
                    ? "border-emerald-200 bg-emerald-50"
                    : demoPrediction.prediction === "Churn"
                    ? "border-red-200 bg-red-50"
                    : "border-red-200 bg-red-50"
                }`}
              >

                <p className="text-[10px] font-bold uppercase tracking-wider text-[#7c8798]">
                  API response
                </p>

                <p
                  className={`mt-1 text-lg font-bold ${
                    demoPrediction.prediction === "Stay"
                      ? "text-emerald-700"
                      : "text-red-700"
                  }`}
                >
                  {demoPrediction.prediction}
                </p>

                {demoPrediction.model && (
                  <p className="mt-1 text-[10px] text-[#7d8799]">
                    {demoPrediction.model}
                  </p>
                )}

              </div>
            )}

        </div>

      </div>

      <BackButton onClick={onBack} />

    </div>
  );
}

/* ================================================================
   MONITORING PAGE
================================================================ */

function MonitoringPage({ onBack }) {
  const [health, setHealth] = useState(null);
  const [checking, setChecking] = useState(false);

  const checkHealth = async () => {
    setChecking(true);

    try {
      const response = await fetch(
        "http://localhost:8000/health"
      );

      if (!response.ok) {
        throw new Error("Health check failed");
      }

      const data = await response.json();

      setHealth(data);
    } catch (error) {
      console.error(error);

      setHealth({
        status: "unhealthy",
        error: "API is unreachable",
      });
    } finally {
      setChecking(false);
    }
  };

  return (
    <div>

      <PageHeader
        eyebrow="SYSTEM MONITORING"
        title="Monitoring"
        description="Monitor the health of your prediction service and deployed model."
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

        <MonitorCard
          title="Prediction API"
          description="FastAPI inference service"
          status={
            health?.status === "healthy"
              ? "Healthy"
              : "Not checked"
          }
          healthy={
            health?.status === "healthy"
          }
        />

        <MonitorCard
          title="Model registry"
          description="MLflow model registry"
          status="Connected"
          healthy
        />

        <MonitorCard
          title="Champion model"
          description="Currently serving predictions"
          status="v2 · Active"
          healthy
        />

      </div>

      <div className="mt-6 rounded-xl border border-[#e1e6ee] bg-white p-6 shadow-[0_2px_8px_rgba(15,23,42,0.03)]">

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

          <div>

            <h3 className="text-sm font-bold text-[#172033]">
              API health check
            </h3>

            <p className="mt-1 text-xs text-[#8993a5]">
              Check the live status of the ModelFlow prediction API.
            </p>

          </div>

          <button
            type="button"
            onClick={checkHealth}
            disabled={checking}
            className="rounded-lg bg-[#4f46e5] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#4338ca] disabled:opacity-60"
          >
            {checking
              ? "Checking..."
              : "Check API health"}
          </button>

        </div>

        {health && (
          <div
            className={`mt-5 rounded-lg border p-4 ${
              health.status === "healthy"
                ? "border-emerald-200 bg-emerald-50"
                : "border-red-200 bg-red-50"
            }`}
          >

            <div className="flex items-center gap-2">

              <span
                className={`h-2 w-2 rounded-full ${
                  health.status === "healthy"
                    ? "bg-emerald-500"
                    : "bg-red-500"
                }`}
              />

              <p className="text-xs font-bold">
                Status: {health.status}
              </p>

            </div>

            {health.model && (
              <p className="mt-2 text-[11px] text-[#687386]">
                Model: {health.model}
              </p>
            )}

            {health.alias && (
              <p className="text-[11px] text-[#687386]">
                Alias: {health.alias}
              </p>
            )}

            {health.error && (
              <p className="mt-1 text-[11px] text-red-600">
                {health.error}
              </p>
            )}

          </div>
        )}

      </div>

      <div className="mt-6 rounded-xl border border-[#e1e6ee] bg-white p-6 shadow-[0_2px_8px_rgba(15,23,42,0.03)]">

        <div className="flex items-center justify-between">

          <div>

            <h3 className="text-sm font-bold text-[#172033]">
              System architecture
            </h3>

            <p className="mt-1 text-xs text-[#8993a5]">
              Current ModelFlow deployment components.
            </p>

          </div>

          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-bold text-emerald-700">
            OPERATIONAL
          </span>

        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-4">

          <ArchitectureNode
            number="01"
            title="React"
            subtitle="Frontend"
          />

          <ArchitectureNode
            number="02"
            title="FastAPI"
            subtitle="Prediction API"
          />

          <ArchitectureNode
            number="03"
            title="MLflow"
            subtitle="Model Registry"
          />

          <ArchitectureNode
            number="04"
            title="Champion"
            subtitle="Logistic Regression"
          />

        </div>

      </div>

      <BackButton onClick={onBack} />

    </div>
  );
}

/* ================================================================
   SHARED COMPONENTS
================================================================ */

function PageHeader({
  eyebrow,
  title,
  description,
}) {
  return (
    <div className="mb-8">

      <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-indigo-500">
        {eyebrow}
      </p>

      <h2 className="text-3xl font-bold tracking-[-0.03em] text-[#111827]">
        {title}
      </h2>

      <p className="mt-2 max-w-2xl text-sm leading-6 text-[#687386]">
        {description}
      </p>

    </div>
  );
}

function MetricCard({
  label,
  value,
  detail,
  accent,
  status,
}) {
  const accents = {
    indigo: "bg-indigo-50 text-indigo-600",
    blue: "bg-blue-50 text-blue-600",
    violet: "bg-violet-50 text-violet-600",
    green: "bg-emerald-50 text-emerald-600",
  };

  return (
    <div className="rounded-xl border border-[#e1e6ee] bg-white p-5 shadow-[0_2px_8px_rgba(15,23,42,0.025)]">

      <div className="flex items-start justify-between">

        <p className="text-xs font-semibold text-[#788397]">
          {label}
        </p>

        <span
          className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs ${
            accents[accent]
          }`}
        >
          {status ? (
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
          ) : (
            "↗"
          )}
        </span>

      </div>

      <p className="mt-4 text-2xl font-bold tracking-tight text-[#172033]">
        {value}
      </p>

      <p className="mt-1 text-[11px] text-[#9aa3b2]">
        {detail}
      </p>

    </div>
  );
}

function Stat({
  label,
  value,
}) {
  return (
    <div className="px-4 first:pl-5 last:pr-5">

      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#98a1b0]">
        {label}
      </p>

      <p className="mt-1.5 text-sm font-bold text-[#172033]">
        {value}
      </p>

    </div>
  );
}

function Tag({ children }) {
  return (
    <span className="rounded-md border border-[#e1e6ee] bg-[#f8fafc] px-2.5 py-1 text-[10px] font-semibold text-[#687386]">
      {children}
    </span>
  );
}

function InfoRow({
  label,
  value,
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-[#edf0f4] px-3.5 py-2.5">

      <span className="text-[10px] font-medium text-[#929baa]">
        {label}
      </span>

      <span className="text-[10px] font-semibold text-[#4e5a6f]">
        {value}
      </span>

    </div>
  );
}

function FormSection({
  title,
  description,
  children,
}) {
  return (
    <div className="mb-7">

      <div className="mb-4">

        <h4 className="text-xs font-bold uppercase tracking-[0.08em] text-[#4d5a70]">
          {title}
        </h4>

        <p className="mt-1 text-[10px] text-[#9aa3b2]">
          {description}
        </p>

      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {children}
      </div>

    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <label className="block">

      <span className="mb-1.5 block text-[10px] font-semibold text-[#657187]">
        {label}
      </span>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-lg border border-[#dfe4ec] bg-white px-3 py-2.5 text-xs font-medium text-[#273348] outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
      >

        {options.map((option) => {

          const item =
            typeof option === "string"
              ? {
                  label: option,
                  value: option,
                }
              : option;

          return (
            <option
              key={item.value}
              value={item.value}
            >
              {item.label}
            </option>
          );
        })}

      </select>

    </label>
  );
}

function NumberField({
  label,
  value,
  onChange,
  min,
  step = "1",
}) {
  return (
    <label className="block">

      <span className="mb-1.5 block text-[10px] font-semibold text-[#657187]">
        {label}
      </span>

      <input
        type="number"
        value={value}
        min={min}
        step={step}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-lg border border-[#dfe4ec] bg-white px-3 py-2.5 text-xs font-medium text-[#273348] outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
      />

    </label>
  );
}

function TrainingRow({
  model,
  type,
  accuracy,
  precision,
  recall,
  f1,
  status,
}) {
  return (
    <tr className="border-b border-[#f0f2f5] last:border-0 hover:bg-[#fafbfc]">

      <td className="px-6 py-4">

        <p className="text-xs font-bold text-[#273348]">
          {model}
        </p>

        <p className="mt-0.5 text-[10px] text-[#9aa3b2]">
          {type}
        </p>

      </td>

      <td className="px-6 py-4 text-xs font-medium text-[#697589]">
        {accuracy}
      </td>

      <td className="px-6 py-4 text-xs font-medium text-[#697589]">
        {precision}
      </td>

      <td className="px-6 py-4 text-xs font-medium text-[#697589]">
        {recall}
      </td>

      <td className="px-6 py-4 text-xs font-bold text-[#273348]">
        {f1}
      </td>

      <td className="px-6 py-4">

        {status === "Champion" ? (
          <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-bold text-emerald-700">
            CHAMPION
          </span>
        ) : (
          <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-bold text-slate-500">
            EVALUATED
          </span>
        )}

      </td>

    </tr>
  );
}

function ModelMetric({
  label,
  value,
}) {
  return (
    <div>

      <p className="text-[10px] font-semibold text-[#98a1b0]">
        {label}
      </p>

      <p className="mt-1 text-sm font-bold text-[#273348]">
        {value}
      </p>

    </div>
  );
}

function MonitorCard({
  title,
  description,
  status,
  healthy,
}) {
  return (
    <div className="rounded-xl border border-[#e1e6ee] bg-white p-5 shadow-[0_2px_8px_rgba(15,23,42,0.03)]">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-bold text-[#273348]">
            {title}
          </p>

          <p className="mt-1 text-[10px] text-[#8993a5]">
            {description}
          </p>

        </div>

        <span
          className={`h-2.5 w-2.5 rounded-full ${
            healthy === false
              ? "bg-red-500"
              : "bg-emerald-500"
          }`}
        />

      </div>

      <p
        className={`mt-6 text-lg font-bold ${
          healthy === false
            ? "text-red-600"
            : "text-emerald-600"
        }`}
      >
        {status}
      </p>

      <p className="mt-1 text-[10px] text-[#9aa3b2]">
        ModelFlow service
      </p>

    </div>
  );
}

function ArchitectureNode({
  number,
  title,
  subtitle,
}) {
  return (
    <div className="relative rounded-lg border border-[#e5e9f0] bg-[#fafbfc] p-4">

      <div className="flex items-center justify-between">

        <span className="text-[10px] font-bold text-indigo-500">
          {number}
        </span>

        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

      </div>

      <p className="mt-4 text-sm font-bold text-[#273348]">
        {title}
      </p>

      <p className="mt-1 text-[10px] text-[#8993a5]">
        {subtitle}
      </p>

    </div>
  );
}

function BackButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-6 text-xs font-semibold text-indigo-600 transition hover:text-indigo-700"
    >
      ← Back to overview
    </button>
  );
}

export default App;
// import { useState } from "react";

// function App() {
//   const [activePage, setActivePage] = useState("Overview");
//   const [prediction, setPrediction] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const navigation = ["Overview", "Models", "Predictions", "Monitoring"];

//     const makePrediction = async () => {
//     setLoading(true);
//     setPrediction(null);
//     setError("");

//     const customer = {
//       gender: "Male",
//       SeniorCitizen: 0,
//       Partner: "Yes",
//       Dependents: "No",
//       tenure: 12,
//       PhoneService: "Yes",
//       MultipleLines: "No",
//       InternetService: "DSL",
//       OnlineSecurity: "Yes",
//       OnlineBackup: "No",
//       DeviceProtection: "No",
//       TechSupport: "Yes",
//       StreamingTV: "No",
//       StreamingMovies: "No",
//       Contract: "One year",
//       PaperlessBilling: "Yes",
//       PaymentMethod: "Mailed check",
//       MonthlyCharges: 50.0,
//       TotalCharges: 600.0,
//     };

//     try {
//       console.log("Sending prediction request...");

//       const response = await fetch("http://localhost:8000/predict", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(customer),
//       });

//       if (!response.ok) {
//         throw new Error(`API returned ${response.status}`);
//       }

//       const data = await response.json();

//       console.log("Prediction response:", data);

//       setPrediction(data);
//     } catch (err) {
//       console.error("Prediction error:", err);

//       setError(
//         "Could not connect to the ModelFlow API. Make sure FastAPI is running."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#f7f8fa] text-[#17181a]">
//       <div className="flex min-h-screen">

//         {/* Sidebar */}
//         <aside className="hidden w-64 flex-col border-r border-[#e5e7eb] bg-white px-5 py-6 md:flex">

//           {/* Logo */}
//           <div className="mb-10 flex items-center gap-3 px-2">
//             <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#17181a] text-sm font-semibold text-white">
//               M
//             </div>

//             <div>
//               <p className="text-[15px] font-semibold tracking-tight">
//                 ModelFlow
//               </p>
//               <p className="text-[11px] text-[#8a8f98]">
//                 ML Operations
//               </p>
//             </div>
//           </div>

//           {/* Navigation */}
//           <nav className="space-y-1">
//             {navigation.map((item) => (
//               <button
//                 key={item}
//                 onClick={() => setActivePage(item)}
//                 className={`w-full rounded-md px-3 py-2.5 text-left text-sm transition ${
//                   activePage === item
//                     ? "bg-[#f0f1f3] font-medium text-[#17181a]"
//                     : "text-[#6b7078] hover:bg-[#f7f7f8] hover:text-[#17181a]"
//                 }`}
//               >
//                 {item}
//               </button>
//             ))}
//           </nav>

//           {/* Bottom */}
//           <div className="mt-auto border-t border-[#eeeeef] pt-5">
//             <div className="px-3">
//               <p className="text-xs font-medium text-[#555a62]">
//                 Environment
//               </p>

//               <div className="mt-2 flex items-center gap-2 text-xs text-[#7b8088]">
//                 <span className="h-2 w-2 rounded-full bg-[#39a96b]" />
//                 Production
//               </div>
//             </div>
//           </div>
//         </aside>

//         {/* Main */}
//         <main className="flex-1">

//           {/* Top bar */}
//           <header className="flex h-16 items-center justify-between border-b border-[#e5e7eb] bg-white px-6 md:px-10">
//             <div>
//               <p className="text-sm text-[#8a8f98]">Workspace</p>
//               <h1 className="text-base font-semibold">
//                 {activePage}
//               </h1>
//             </div>

//             <div className="flex items-center gap-4">
//               <div className="hidden text-right sm:block">
//                 <p className="text-xs font-medium">Local Environment</p>
//                 <p className="text-[11px] text-[#8a8f98]">
//                   API connected
//                 </p>
//               </div>

//               <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e9eaec] text-xs font-semibold">
//                 MF
//               </div>
//             </div>
//           </header>

//           {/* Content */}
//           <section className="mx-auto max-w-7xl px-6 py-8 md:px-10">

//             {/* Heading */}
//             <div className="mb-8">
//               <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-[#8a8f98]">
//                 Machine Learning Operations
//               </p>

//               <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
//                 <div>
//                   <h2 className="text-2xl font-semibold tracking-tight">
//                     Model overview
//                   </h2>

//                   <p className="mt-1 text-sm text-[#737780]">
//                     Monitor your training pipeline and deployed models.
//                   </p>
//                 </div>

//                 <button className="w-fit rounded-md bg-[#17181a] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#303236]">
//                   + New training run
//                 </button>
//               </div>
//             </div>

//             {/* Metrics */}
//             <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

//               <MetricCard
//                 label="Active model"
//                 value="v2"
//                 detail="Logistic Regression"
//               />

//               <MetricCard
//                 label="F1 score"
//                 value="60.40%"
//                 detail="Validation set"
//               />

//               <MetricCard
//                 label="Accuracy"
//                 value="80.55%"
//                 detail="Validation set"
//               />

//               <MetricCard
//                 label="API status"
//                 value="Healthy"
//                 detail="localhost:8000"
//                 status
//               />

//             </div>

//             {/* Main grid */}
//             <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">

//               {/* Champion model */}
//               <div className="border border-[#e2e4e8] bg-white">

//                 <div className="flex items-center justify-between border-b border-[#eeeeef] px-5 py-4">
//                   <div>
//                     <h3 className="text-sm font-semibold">
//                       Champion model
//                     </h3>
//                     <p className="mt-0.5 text-xs text-[#8a8f98]">
//                       Currently serving predictions
//                     </p>
//                   </div>

//                   <span className="flex items-center gap-1.5 text-xs font-medium text-[#278653]">
//                     <span className="h-1.5 w-1.5 rounded-full bg-[#39a96b]" />
//                     Active
//                   </span>
//                 </div>

//                 <div className="p-5">

//                   <div className="flex flex-col justify-between gap-6 sm:flex-row">

//                     <div>
//                       <p className="text-2xl font-semibold tracking-tight">
//                         Logistic Regression
//                       </p>

//                       <p className="mt-1 text-sm text-[#7b8088]">
//                         ModelFlow-Customer-Churn-Best-Model
//                       </p>
//                     </div>

//                     <div className="text-left sm:text-right">
//                       <p className="text-xs text-[#8a8f98]">
//                         Registry version
//                       </p>

//                       <p className="mt-1 text-lg font-semibold">
//                         v2
//                       </p>
//                     </div>

//                   </div>

//                   {/* Model details */}
//                   <div className="mt-7 grid grid-cols-3 border-y border-[#eeeeef] py-5">

//                     <Stat
//                       label="Precision"
//                       value="65.72%"
//                     />

//                     <Stat
//                       label="Recall"
//                       value="55.88%"
//                     />

//                     <Stat
//                       label="F1 score"
//                       value="60.40%"
//                     />

//                   </div>

//                   <div className="mt-5 flex flex-wrap gap-2">
//                     <span className="border border-[#e1e3e6] px-2.5 py-1 text-[11px] text-[#656a72]">
//                       champion
//                     </span>

//                     <span className="border border-[#e1e3e6] px-2.5 py-1 text-[11px] text-[#656a72]">
//                       production
//                     </span>

//                     <span className="border border-[#e1e3e6] px-2.5 py-1 text-[11px] text-[#656a72]">
//                       sklearn
//                     </span>
//                   </div>

//                 </div>
//               </div>

//               {/* Quick prediction */}
//               <div className="border border-[#e2e4e8] bg-white">

//                 <div className="border-b border-[#eeeeef] px-5 py-4">
//                   <h3 className="text-sm font-semibold">
//                     Quick prediction
//                   </h3>

//                   <p className="mt-0.5 text-xs text-[#8a8f98]">
//                     Test the deployed champion model.
//                   </p>
//                 </div>

//                 <div className="p-5">

//                   <div className="mb-6">
//                     <p className="text-sm font-medium">
//                       Customer churn
//                     </p>

//                     <p className="mt-1 text-xs leading-5 text-[#858a92]">
//                       Send customer information to the ModelFlow API
//                       and receive a prediction.
//                     </p>
//                   </div>

//                   <div className="space-y-3">
//                     <InputPreview
//                       label="Contract"
//                       value="One year"
//                     />

//                     <InputPreview
//                       label="Tenure"
//                       value="12 months"
//                     />

//                     <InputPreview
//                       label="Monthly charges"
//                       value="$50.00"
//                     />
//                   </div>

//                   <button
//                     type="button"
//                     onClick={makePrediction}
//                     disabled={loading}
//                     className="mt-5 w-full rounded-md bg-[#17181a] py-2.5 text-sm font-medium text-white transition hover:bg-[#303236] disabled:cursor-not-allowed disabled:opacity-50"
//                   >
//                     {loading ? "Running prediction..." : "Make prediction"}
//                   </button>

//                   {prediction && (
//                     <div
//                       className={`mt-4 border p-4 ${
//                         prediction.prediction === "Churn"
//                           ? "border-[#e8caca] bg-[#fff8f8]"
//                           : "border-[#cfe5d8] bg-[#f7fcf9]"
//                       }`}
//                     >
//                       <p className="text-xs text-[#737780]">
//                         Prediction result
//                       </p>

//                       <p className="mt-1 text-lg font-semibold">
//                         {prediction.prediction}
//                       </p>

//                       <p className="mt-1 text-xs text-[#8a8f98]">
//                         Model: {prediction.model}
//                       </p>

//                       <p className="text-xs text-[#8a8f98]">
//                         Alias: {prediction.alias}
//                       </p>
//                     </div>
//                   )}

//                   {error && (
//                     <div className="mt-4 border border-[#e8caca] bg-[#fff8f8] p-4">
//                       <p className="text-xs text-[#9a4b4b]">
//                         {error}
//                       </p>
//                     </div>
//                   )}

//                 </div>
//               </div>

//             </div>

//             {/* Training runs */}
//             <div className="mt-6 border border-[#e2e4e8] bg-white">

//               <div className="flex items-center justify-between border-b border-[#eeeeef] px-5 py-4">
//                 <div>
//                   <h3 className="text-sm font-semibold">
//                     Recent training runs
//                   </h3>

//                   <p className="mt-0.5 text-xs text-[#8a8f98]">
//                     Model evaluation history
//                   </p>
//                 </div>

//                 <button className="text-xs font-medium text-[#555a62] hover:text-black">
//                   View all
//                 </button>
//               </div>

//               <div className="overflow-x-auto">
//                 <table className="w-full text-left text-sm">

//                   <thead className="border-b border-[#eeeeef] bg-[#fafafa] text-xs text-[#858a92]">
//                     <tr>
//                       <th className="px-5 py-3 font-medium">
//                         Model
//                       </th>

//                       <th className="px-5 py-3 font-medium">
//                         Accuracy
//                       </th>

//                       <th className="px-5 py-3 font-medium">
//                         Precision
//                       </th>

//                       <th className="px-5 py-3 font-medium">
//                         Recall
//                       </th>

//                       <th className="px-5 py-3 font-medium">
//                         F1
//                       </th>

//                       <th className="px-5 py-3 font-medium">
//                         Status
//                       </th>
//                     </tr>
//                   </thead>

//                   <tbody>

//                     <TrainingRow
//                       model="Logistic Regression"
//                       accuracy="80.55%"
//                       precision="65.72%"
//                       recall="55.88%"
//                       f1="60.40%"
//                       status="Champion"
//                     />

//                     <TrainingRow
//                       model="Random Forest"
//                       accuracy="77.79%"
//                       precision="60.34%"
//                       recall="47.59%"
//                       f1="53.21%"
//                       status="Evaluated"
//                     />

//                     <TrainingRow
//                       model="Decision Tree"
//                       accuracy="72.89%"
//                       precision="48.96%"
//                       recall="50.53%"
//                       f1="49.74%"
//                       status="Evaluated"
//                     />

//                   </tbody>

//                 </table>
//               </div>
//             </div>

//             {/* Footer */}
//             <footer className="mt-8 flex flex-col justify-between gap-2 border-t border-[#e5e7eb] pt-5 text-xs text-[#92969d] sm:flex-row">
//               <p>ModelFlow · Automated ML Training & Deployment</p>
//               <p>Development environment</p>
//             </footer>

//           </section>
//         </main>
//       </div>
//     </div>
//   );
// }

// function MetricCard({ label, value, detail, status }) {
//   return (
//     <div className="border border-[#e2e4e8] bg-white p-5">
//       <p className="text-xs text-[#858a92]">
//         {label}
//       </p>

//       <div className="mt-3 flex items-center gap-2">
//         {status && (
//           <span className="h-2 w-2 rounded-full bg-[#39a96b]" />
//         )}

//         <p className="text-xl font-semibold tracking-tight">
//           {value}
//         </p>
//       </div>

//       <p className="mt-1 text-xs text-[#92969d]">
//         {detail}
//       </p>
//     </div>
//   );
// }

// function Stat({ label, value }) {
//   return (
//     <div>
//       <p className="text-xs text-[#8a8f98]">
//         {label}
//       </p>

//       <p className="mt-1 text-sm font-semibold">
//         {value}
//       </p>
//     </div>
//   );
// }

// function InputPreview({ label, value }) {
//   return (
//     <div className="flex items-center justify-between border border-[#e5e7eb] px-3 py-2.5">
//       <span className="text-xs text-[#858a92]">
//         {label}
//       </span>

//       <span className="text-xs font-medium">
//         {value}
//       </span>
//     </div>
//   );
// }

// function TrainingRow({
//   model,
//   accuracy,
//   precision,
//   recall,
//   f1,
//   status,
// }) {
//   return (
//     <tr className="border-b border-[#f0f0f1] last:border-0">
//       <td className="px-5 py-4 font-medium">
//         {model}
//       </td>

//       <td className="px-5 py-4 text-[#656a72]">
//         {accuracy}
//       </td>

//       <td className="px-5 py-4 text-[#656a72]">
//         {precision}
//       </td>

//       <td className="px-5 py-4 text-[#656a72]">
//         {recall}
//       </td>

//       <td className="px-5 py-4 font-medium">
//         {f1}
//       </td>

//       <td className="px-5 py-4">
//         {status === "Champion" ? (
//           <span className="text-xs font-medium text-[#278653]">
//             Champion
//           </span>
//         ) : (
//           <span className="text-xs text-[#858a92]">
//             Evaluated
//           </span>
//         )}
//       </td>
//     </tr>
//   );
// }

// export default App;