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
          "A dedicated skin care website showcasing treatments, products, and online booking.",
      },
      {
        id: 2,
        video: FLEURE,
        title: "Fleuré",
        url: "https://fleure.co.uk",
        description:
          "An elegant florist storefront for bouquets, arrangements, and local delivery.",
      },
      {
        id: 3,
        video: FleureAdmin,
        title: "Fleure Admin",
        // url: "https://fleureadmin.com",
        description:
          "An admin dashboard for the florist to manage orders, inventory, and customers.",
      },
      {
        id: 4,
        video: lwAdmin,
        title: "LW Admin",
        // url: "https://lwadmin.com",
        description:
          "An internal Litwebs dashboard for managing projects, content, and analytics.",
      },

      {
        id: 10,
        video: vid79,
        title: "79 Jewellers",
        url: "https://79jewellers.com",
        description:
          "An online jewellers shop for showcasing and selling fine jewellery collections.",
      },
      {
        id: 11,
        video: OF,
        title: "Oak Forest of Yorkshire",
        url: "https://oakforestofyorkshire.com",
        description:
          "A furniture shop website presenting collections, materials, and options for custom orders.",
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
