export const getBackgroundColor = (priority) => {
    switch (priority) {
      case "High":
        return "#d86161";
      case "Medium":
        return "#5a80c7";
      case "Low":
        return "#c9c159";
        default:
          return "#000000";
    }
  };

  export const getBorderColor = (priority) => {
    switch (priority) {
      case "High":
        return "#000000";
      case "Medium":
        return "#000000";
      case "Low":
        return "#000000";
        default:
          return "#000000";
    }
  };
  