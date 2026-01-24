import { createContext, useReducer, useEffect, useRef } from "react";
import ContentReducer from "./ContentReducer";
import { useLocation } from "react-router-dom";
import {
  SET_CONTENT,
  SET_BASKET,
  SET_TOTAL,
  SET_ALERTS,
  SET_PROJECT,
} from "../TYPES";
import { v4 as uuidv4 } from "uuid";
// import LW from "../../vids/LW.mp4";
import FLEURE from "../../vids/FLEURE.mp4";
import OF from "../../vids/OF.mp4";
import vid79 from "../../vids/79.mp4";
import DS from "../../vids/DS.mp4";
import FleureAdmin from "../../vids/Fleure-admin.mp4";
import lwAdmin from "../../vids/lw-admin.mp4";

export const ContentContext = createContext();

export const ContextState = (props) => {
  const path = useLocation();
  const alertRef = useRef("");
  const initialState = {
    Projects: [
      {
        id: 1,
        video: DS,
        title: "Derma Suite",
        url: "https://dermasuiteltd.com/",
        description:
          "Professional landing page tailored for a construction and renovation business.",
      },
      {
        id: 2,
        video: FLEURE,
        title: "Fleuré",
        url: "https://fleure.co.uk",
        description:
          "Modern and minimal design for a premium skincare and wellness shop.",
      },
      {
        id: 3,
        video: FleureAdmin,
        title: "Fleure Admin",
        url: "https://fleureadmin.com",
        description:
          "Admin dashboard for managing Fleure's e-commerce platform with real-time analytics and user management.",
      },
      {
        id: 4,
        video: lwAdmin,
        title: "LW Admin",
        url: "https://lwadmin.com",
        description:
          "Admin dashboard for managing LW's e-commerce platform with real-time analytics and user management.",
      },
      // {
      //   id: 5,
      //   video: T3,
      //   title: "T333 Customs",
      //   url: "https://litwebs.co.uk",
      //   description:
      //     "Bold and custom-styled website for a car modification and detailing service.",
      // },
      // {
      //   id: 6,
      //   video: ZHR,
      //   title: "ZHR Nails",
      //   url: "https://zhrnails.com",
      //   description:
      //     "Chic and vibrant web presence for a modern nail salon and beauty studio.",
      // },
      // {
      //   id: 7,
      //   video: HIU,
      //   title: "Hair It Up",
      //   url: "https://hair-it-uo-elegance.lovable.app/",
      //   description:
      //     "Smooth user experience for a mobile hair styling and booking service.",
      // },
      // {
      //   id: 8,
      //   video: DON,
      //   title: "Driving Donny",
      //   url: "https://preview--driving-donney-online.lovable.app/",
      //   description:
      //     "A local driving school platform with booking features and a clean layout.",
      // },
      // {
      //   id: 9,
      //   video: VV,
      //   title: "Build Pro",
      //   url: "https://vape-vogue-bazaar.lovable.app/",
      //   description:
      //     "Professional landing page tailored for a construction and renovation business.",
      // },
      {
        id: 10,
        video: vid79,
        title: "79 Jewellers",
        url: "https://79jewellers.com",
        description:
          "A sleek and elegant site for a luxury jewellery brand, built to reflect premium aesthetics.",
      },
      {
        id: 11,
        video: OF,
        title: "Oak Forest of Yorkshire",
        url: "https://oakforestofyorkshire.com",
        description:
          "An informative site promoting reforestation projects in Yorkshire with an eco-conscious design.",
      },
    ],
    Basket: [],
    Alerts: [],
    Content: {},
    SelectedProject: localStorage.getItem("pro")
      ? JSON.parse(localStorage.getItem("pro"))
      : {},

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
        AddToBasket: AddToBasket,
        RemoveFromBasket: RemoveFromBasket,
      }}
    >
      {props.children}
    </ContentContext.Provider>
  );
};
