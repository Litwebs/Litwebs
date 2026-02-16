const ENABLED =
  String(process.env.REACT_APP_ANALYTICS_ENABLED || "true") === "true";

const ENDPOINT = process.env.REACT_APP_ANALYTICS_ENDPOINT || "";
const WRITE_KEY = process.env.REACT_APP_ANALYTICS_WRITE_KEY || "";

function safeJsonParse(str) {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
}

function getVisitorId() {
  const key = "lw_visitor_id";
  let id = localStorage.getItem(key);
  if (!id) {
    id = `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem(key, id);
  }
  return id;
}

function getSessionId() {
  const key = "lw_session_id";
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
    sessionStorage.setItem(key, id);
  }
  return id;
}

async function post(path, body) {
  if (!ENABLED) return null;
  if (!ENDPOINT || !WRITE_KEY) return null;

  const url = `${ENDPOINT}${path.startsWith("/") ? path : `/${path}`}`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-analytics-key": WRITE_KEY,
      },
      body: JSON.stringify(body || {}),
    });

    const text = await res.text();
    return safeJsonParse(text) || null;
  } catch {
    return null;
  }
}

export const analyticsClient = {
  enabled: ENABLED && !!ENDPOINT && !!WRITE_KEY,
  getVisitorId,
  getSessionId,
  collect: (payload) => post("/collect", payload),
  endSession: (payload) => post("/session/end", payload),
};
