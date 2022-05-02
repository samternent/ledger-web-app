import { onMounted, shallowRef, watchEffect, provide, inject } from "vue";

const useAppShellSymbol = Symbol("useAppShell");

export function provideAppShell() {
  const isBottomPanelExpanded = shallowRef(
    JSON.parse(localStorage.getItem("isBottomPanelExpanded"))
  );
  const isLeftPanelExpanded = shallowRef(
    JSON.parse(
      typeof localStorage.getItem("isLeftPanelExpanded") !== "object"
        ? localStorage.getItem("isLeftPanelExpanded")
        : true
    )
  );
  const isRightPanelExpanded = shallowRef(
    JSON.parse(localStorage.getItem("isRightPanelExpanded"))
  );

  function setViewHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  onMounted(() => {
    setViewHeight();
    window.addEventListener("resize", setViewHeight);
  });

  watchEffect(() => {
    localStorage.setItem("isBottomPanelExpanded", isBottomPanelExpanded.value);
    localStorage.setItem("isLeftPanelExpanded", isLeftPanelExpanded.value);
    localStorage.setItem("isRightPanelExpanded", isRightPanelExpanded.value);
  });

  const appShellInterface = {
    isBottomPanelExpanded,
    isLeftPanelExpanded,
    isRightPanelExpanded,
  };

  provide(useAppShellSymbol, appShellInterface);
  return appShellInterface;
}

export function useAppShell() {
  return inject(useAppShellSymbol);
}
