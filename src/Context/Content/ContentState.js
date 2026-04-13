import { createContext, useReducer, useEffect, useRef, useState } from "react";
import ContentReducer from "./ContentReducer";
import { useLocation } from "react-router-dom";
import {
  SET_CONTENT,
  SET_PROJECTS,
  SET_BASKET,
  SET_TOTAL,
  SET_ALERTS,
  SET_PROJECT,
} from "../TYPES";
import { v4 as uuidv4 } from "uuid";

export const ContentContext = createContext();

const PROJECTS_API_URL =
  "https://admin.litwebs.co.uk/api/websites/public-content";

const stripHtml = (value = "") => {
  const html = String(value || "").trim();

  if (!html) {
    return "No description provided.";
  }

  if (typeof window !== "undefined" && window.DOMParser) {
    const parser = new window.DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const text = doc.body.textContent?.trim();

    return text || "No description provided.";
  }

  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text || "No description provided.";
};

const getStoredProject = () => {
  try {
    const storedProject = localStorage.getItem("pro");
    return storedProject ? JSON.parse(storedProject) : {};
  } catch (error) {
    localStorage.removeItem("pro");
    return {};
  }
};

const getDomainLabel = (value = "") => {
  if (!value) {
    return "No live URL";
  }

  try {
    const parsedUrl = new URL(value);
    return parsedUrl.hostname.replace(/^www\./, "");
  } catch (error) {
    return value;
  }
};

const normalizeProject = (project) => ({
  id: project.websiteId,
  websiteId: project.websiteId,
  sequence: Number(project.sequence) || 0,
  video: project.videoUrl || "",
  title: project.title || "Untitled Project",
  url: project.linkUrl || "",
  logoUrl: project.logoUrl || "",
  domain: getDomainLabel(project.linkUrl),
  description: stripHtml(project.description),
});

export const ContextState = (props) => {
  const path = useLocation();
  const alertRef = useRef("");
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState("");
  const initialState = {
    Projects: [],
    Basket: [],
    Alerts: [],
    Content: {},
    SelectedProject: getStoredProject(),

    Total: 0,
  };
  const [state, dispatch] = useReducer(ContentReducer, initialState);

  useEffect(() => {
    alertRef.current = state.Alerts;
  }, [state]);

  useEffect(() => {
    if (path.pathname !== "/project") {
      setPro({});
      localStorage.removeItem("pro");
    }
  }, [path]);

  const refreshProjects = async (signal) => {
    setProjectsLoading(true);
    setProjectsError("");

    try {
      const response = await fetch(PROJECTS_API_URL, { signal });

      if (!response.ok) {
        throw new Error(`Failed to fetch website content: ${response.status}`);
      }

      const payload = await response.json();
      const projects = Array.isArray(payload?.data?.websites)
        ? payload.data.websites
            .filter((project) => project?.visibility !== false)
            .sort(
              (left, right) =>
                (Number(left?.sequence) || 0) - (Number(right?.sequence) || 0),
            )
            .map(normalizeProject)
        : [];

      dispatch({ type: SET_PROJECTS, payload: projects });

      const selectedProject = getStoredProject();
      if (selectedProject?.websiteId) {
        const refreshedProject = projects.find(
          (project) => project.websiteId === selectedProject.websiteId,
        );

        if (refreshedProject) {
          dispatch({ type: SET_PROJECT, payload: refreshedProject });
          localStorage.setItem("pro", JSON.stringify(refreshedProject));
        }
      }
    } catch (error) {
      if (error.name === "AbortError") {
        return;
      }

      console.error(error);
      setProjectsError(
        "We could not load the latest website content. Please try again in a moment.",
      );
      dispatch({ type: SET_PROJECTS, payload: [] });
    } finally {
      setProjectsLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    refreshProjects(controller.signal);

    return () => controller.abort();
  }, []);

  const setPro = (project) => {
    localStorage.setItem("pro", JSON.stringify(project));
    dispatch({ type: SET_PROJECT, payload: project });
  };

  const SetContent = (content) => {
    dispatch({ type: SET_CONTENT, payload: content });
  };

  const AddToBasket = (item) => {
    //Check if in basket
    const existingItem = state.Basket.find(
      (basketItem) => basketItem.Name === item.Name,
    );

    if (existingItem) {
      CreateAlert({
        type: "Info",
        id: uuidv4(),
        alert: "Package already in basket",
      });
      return;
    }

    // IF NOT IN BASKET
    const itemFound = state.PackageItems.find((pkg) => pkg.Name === item.Name);
    const NewItem = {
      id: uuidv4(),
      Name: itemFound.Name,
      Price: itemFound.Price,
      Quantity: 1,
    };
    const updatedBasket = [...state.Basket, NewItem];
    CreateAlert({
      type: "success",
      id: uuidv4(),
      alert: "Package added to basket",
    });
    dispatch({ type: SET_BASKET, payload: updatedBasket });
    // Calculate total price using the updated basket
    const total = updatedBasket.reduce(
      (acc, item) => acc + item.Price * item.Quantity,
      0,
    );
    // Dispatch total after updating the basket
    dispatch({ type: SET_TOTAL, payload: total });
  };

  const RemoveFromBasket = (name) => {
    dispatch({
      type: SET_BASKET,
      payload: state.Basket.filter((item) => item.Name !== name),
    });
  };

  const UpdateBasket = (item, quantity) => {
    let updatedBasket;

    // Check if the item already exists in the basket
    const existingItem = state.Basket.find(
      (basketItem) => basketItem.id === item.id,
    );

    if (existingItem) {
      // If quantity is less than 1, remove the item
      if (quantity < 1) {
        updatedBasket = state.Basket.filter(
          (basketItem) => basketItem.id !== item.id,
        );
      } else {
        // Otherwise, update the quantity
        updatedBasket = state.Basket.map((basketItem) =>
          basketItem.id === item.id
            ? { ...basketItem, Quantity: quantity }
            : basketItem,
        );
      }
    } else {
      // If item is not in the basket, find it in PackageItems and add it
      const newItem = state.PackageItems.find((pkg) => pkg.Name === item.Name);

      if (newItem) {
        updatedBasket = [
          ...state.Basket,
          {
            id: newItem.Name,
            Name: newItem.Name,
            Price: newItem.Price,
            Quantity: quantity,
          },
        ];
      } else {
        return; // If item is not found, exit function
      }
    }

    // Dispatch updated basket state
    dispatch({ type: SET_BASKET, payload: updatedBasket });

    // Calculate total price using the updated basket
    const total = updatedBasket.reduce(
      (acc, item) => acc + item.Price * item.Quantity,
      0,
    );

    // Dispatch total after updating the basket
    dispatch({ type: SET_TOTAL, payload: total });
  };

  const CreateAlert = (Alert) => {
    if (Alert.type === "success") {
      let NewAlerts = [];
      if (state.Alerts.length > 0) {
        NewAlerts = [Alert];
      } else {
        NewAlerts = [...state.Alerts, Alert];
      }
      dispatch({ type: SET_ALERTS, payload: NewAlerts });
      setTimeout(() => {
        RemoveAlert(Alert.id);
      }, 3000);
    } else {
      const index = state?.Alerts
        ? state.Alerts.findIndex(
            (item) => item.alert.trim() === Alert.alert.trim(),
          )
        : -1;

      if (index < 0) {
        const NewAlerts = [...state.Alerts, Alert];
        dispatch({ type: SET_ALERTS, payload: NewAlerts });
        setTimeout(() => {
          RemoveAlert(Alert.id);
        }, 3000);
      }
    }
  };

  const RemoveAlert = (AlertId = null) => {
    if (!AlertId) {
      const newAlerts = alertRef.current.slice(1);
      dispatch({ type: SET_ALERTS, payload: newAlerts });
      return;
    }
    const index = alertRef.current.findIndex((item) => item.id === AlertId);
    if (-1 < index) {
      const NewAlerts = alertRef.current.filter((item) => item.id !== AlertId);
      dispatch({ type: SET_ALERTS, payload: NewAlerts });
    }
  };

  return (
    <ContentContext.Provider
      value={{
        Projects: state.Projects,
        ProjectsLoading: projectsLoading,
        ProjectsError: projectsError,
        Content: state.Content,
        PackageItems: state.PackageItems,
        Basket: state.Basket,
        Total: state.Total,
        Alerts: state.Alerts,
        SelectedProject: state.SelectedProject,
        setPro: setPro,
        UpdateBasket: UpdateBasket,
        SetContent: SetContent,
        CreateAlert: CreateAlert,
        RemoveAlert: RemoveAlert,
        refreshProjects: refreshProjects,
        AddToBasket: AddToBasket,
        RemoveFromBasket: RemoveFromBasket,
      }}
    >
      {props.children}
    </ContentContext.Provider>
  );
};
