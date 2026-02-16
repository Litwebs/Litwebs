// src/Components/util/useWebsiteAnalytics.js
import { useEffect, useMemo, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";

/**
 * Persists:
 *  - visitorId: localStorage (long-lived)
 *  - sessionId: sessionStorage (tab-session)
 *
 * Live users:
 *  - heartbeat event every 15s keeps lastSeenAt fresh
 *
 * Session end:
 *  - send session_end ONLY on pagehide
 *  - skip ending session on refresh/reload/back_forward
 *  - no sendBeacon (can't set x-analytics-key)
 */

const stripTrailingSlash = (s) => String(s || "").replace(/\/$/, "");
const getEnvBool = (v) => String(v).toLowerCase() === "true";

const safeJsonParse = async (res) => {
  const text = await res.text().catch(() => "");
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return text || null;
  }
};

const getPath = () => window.location.pathname || "/";

const buildPageObject = () => ({
  path: getPath(),
  title: document.title || "",
});

const randomId = (prefix) => {
  const a = Math.random().toString(16).slice(2);
  const b = Date.now().toString(16);
  return `${prefix}_${b}_${a}`;
};

const VISITOR_KEY = "lw_wa_visitor_id";
const SESSION_KEY = "lw_wa_session_id";
const SESSION_STARTED_KEY = "lw_wa_session_started";

const getOrCreateVisitorId = () => {
  try {
    const existing = localStorage.getItem(VISITOR_KEY);
    if (existing) return existing;
    const id = randomId("v");
    localStorage.setItem(VISITOR_KEY, id);
    return id;
  } catch {
    return randomId("v");
  }
};

const getOrCreateSessionId = () => {
  try {
    const existing = sessionStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const id = randomId("s");
    sessionStorage.setItem(SESSION_KEY, id);
    return id;
  } catch {
    return randomId("s");
  }
};

const markSessionStarted = () => {
  try {
    sessionStorage.setItem(SESSION_STARTED_KEY, "true");
  } catch {}
};

const hasSessionStarted = () => {
  try {
    return sessionStorage.getItem(SESSION_STARTED_KEY) === "true";
  } catch {
    return false;
  }
};

const buildBasePayload = ({ visitorId, sessionId }) => ({
  ts: new Date().toISOString(),
  type: "page_view",
  visitorId,
  sessionId,
  page: buildPageObject(),
  route: getPath(),
  meta: {
    url: window.location.href,
    referrer: document.referrer || "",
    tz: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
    vp: { w: window.innerWidth || 0, h: window.innerHeight || 0 },
  },
});

const getNavType = () => {
  // "reload" | "navigate" | "back_forward" | "prerender" (if supported)
  try {
    const navEntry = performance.getEntriesByType?.("navigation")?.[0];
    if (navEntry && navEntry.type) return navEntry.type;
  } catch {}

  // older fallback
  try {
    if (performance.navigation) {
      // 1 = reload, 2 = back_forward
      if (performance.navigation.type === 1) return "reload";
      if (performance.navigation.type === 2) return "back_forward";
    }
  } catch {}

  return "navigate";
};

export function useWebsiteAnalytics() {
  const location = useLocation();

  const enabled = useMemo(
    () => getEnvBool(process.env.REACT_APP_ANALYTICS_ENABLED),
    [],
  );

  const endpoint = useMemo(
    () => stripTrailingSlash(process.env.REACT_APP_ANALYTICS_ENDPOINT || ""),
    [],
  );

  const writeKey = useMemo(
    () => String(process.env.REACT_APP_ANALYTICS_WRITE_KEY || "").trim(),
    [],
  );

  const mountedRef = useRef(false);
  const lastPathRef = useRef("");
  const endedSentRef = useRef(false);

  const visitorIdRef = useRef("");
  const sessionIdRef = useRef("");

  useEffect(() => {
    visitorIdRef.current = getOrCreateVisitorId();
    sessionIdRef.current = getOrCreateSessionId();
  }, []);

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    console.log("[web-analytics] hook mounted");
    console.log("[web-analytics] enabled", enabled);
    console.log("[web-analytics] endpoint", endpoint || "(missing)");
    console.log("[web-analytics] key", writeKey ? "set" : "(missing)");
    console.log("[web-analytics] visitorId", visitorIdRef.current || "(none)");
    console.log("[web-analytics] sessionId", sessionIdRef.current || "(none)");

    if (!enabled) return;
    if (!endpoint) {
      console.warn(
        "[web-analytics] disabled: missing REACT_APP_ANALYTICS_ENDPOINT",
      );
    }
    if (!writeKey) {
      console.warn(
        "[web-analytics] disabled: missing REACT_APP_ANALYTICS_WRITE_KEY",
      );
    }
  }, [enabled, endpoint, writeKey]);

  const canSend = enabled && !!endpoint && !!writeKey;

  const sendEvent = useCallback(
    async (payload) => {
      if (!canSend) return;

      try {
        const res = await fetch(`${endpoint}/collect`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-analytics-key": writeKey,
          },
          body: JSON.stringify(payload),
          keepalive: true,
        });

        if (!res.ok) {
          const data = await safeJsonParse(res);
          console.error("[web-analytics] collect failed", res.status, data);
        }
      } catch (err) {
        console.error("[web-analytics] collect error", err);
      }
    },
    [canSend, endpoint, writeKey],
  );

  const base = useCallback(() => {
    const visitorId = visitorIdRef.current || getOrCreateVisitorId();
    const sessionId = sessionIdRef.current || getOrCreateSessionId();
    visitorIdRef.current = visitorId;
    sessionIdRef.current = sessionId;
    return buildBasePayload({ visitorId, sessionId });
  }, []);

  // 1) page_view on route changes (refresh will also trigger a page_view — that's normal)
  useEffect(() => {
    if (!canSend) return;

    const path = location.pathname || "/";
    if (lastPathRef.current === path) return;
    lastPathRef.current = path;

    sendEvent({
      ...base(),
      type: "page_view",
      page: { path, title: document.title || "" },
      route: path,
    });
  }, [location.pathname, canSend, sendEvent, base]);

  // 2) session_start once per tab session
  useEffect(() => {
    if (!canSend) return;
    if (hasSessionStarted()) return;

    sendEvent({
      ...base(),
      type: "session_start",
      page: buildPageObject(),
      route: getPath(),
    });

    markSessionStarted();
  }, [canSend, sendEvent, base]);

  // 3) heartbeat keeps the session "live"
  useEffect(() => {
    if (!canSend) return;

    const beat = () => {
      sendEvent({
        ...base(),
        type: "heartbeat",
        page: buildPageObject(),
        route: getPath(),
      });
    };

    beat();
    const t = window.setInterval(beat, 15000); // 15s

    return () => window.clearInterval(t);
  }, [canSend, sendEvent, base]);

  // 4) session_end ONLY on real tab close (pagehide), skip reload/back_forward
  useEffect(() => {
    if (!canSend) return;

    const onPageHide = (e) => {
      // If placed into BFCache, don't end session.
      if (e && e.persisted) return;

      const navType = getNavType();
      // refresh/reload should NOT end session
      if (navType === "reload") return;
      if (navType === "back_forward") return;

      if (endedSentRef.current) return;
      endedSentRef.current = true;

      fetch(`${endpoint}/collect`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-analytics-key": writeKey,
        },
        body: JSON.stringify({
          ...base(),
          type: "session_end",
          page: buildPageObject(),
          route: getPath(),
        }),
        keepalive: true,
      }).catch(() => {});
    };

    window.addEventListener("pagehide", onPageHide);
    return () => window.removeEventListener("pagehide", onPageHide);
  }, [canSend, endpoint, writeKey, base]);

  // 5) click tracking
  useEffect(() => {
    if (!canSend) return;

    const clickHandler = (e) => {
      const el = e.target?.closest?.("a,button");
      if (!el) return;

      const tag = el.tagName?.toLowerCase?.() || "";
      const text = (el.innerText || el.getAttribute?.("aria-label") || "")
        .trim()
        .slice(0, 80);

      const href = el.getAttribute?.("href") || "";
      const path = getPath();

      sendEvent({
        ...base(),
        type: "button_click",
        page: { path, title: document.title || "" },
        route: path,
        label: text || (href ? href : tag),
        meta: { element: tag, href: href || undefined },
      });
    };

    document.addEventListener("click", clickHandler, true);
    return () => document.removeEventListener("click", clickHandler, true);
  }, [canSend, sendEvent, base]);

  // 6) scroll depth
  useEffect(() => {
    if (!canSend) return;

    const sent = new Set();
    const thresholds = [25, 50, 75, 100];

    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop || 0;
      const height = (doc.scrollHeight || 0) - (window.innerHeight || 0);
      const pct =
        height > 0
          ? Math.min(100, Math.round((scrollTop / height) * 100))
          : 100;

      thresholds.forEach((t) => {
        if (pct >= t && !sent.has(t)) {
          sent.add(t);
          const path = getPath();

          sendEvent({
            ...base(),
            type: "scroll_depth",
            page: { path, title: document.title || "" },
            route: path,
            label: `${t}%`,
            meta: { depth: t },
          });
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [canSend, sendEvent, base]);
}
