"use client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
const AppProgressbarProvider = () => {
  return (
    <ProgressBar
      height="3px"
      color="#0000ff"
      options={{ showSpinner: true }}
      shallowRouting
    />
  );
};

export default AppProgressbarProvider;
