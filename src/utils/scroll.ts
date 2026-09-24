import router from "@/router";
import { nextTick } from "vue";

/** Waits (max ~1s) until an element with the given id exists in the DOM. */
async function waitForElement(id: string): Promise<HTMLElement | null> {
  for (let i = 0; i < 20; i++) {
    const el = document.getElementById(id);
    if (el) return el;
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  return null;
}

/** Smooth-scrolls to a section of the home page, navigating there first when needed. */
export async function scrollToId(id: string): Promise<void> {
  if (router.currentRoute.value.name !== "home") {
    await router.push({ name: "home" });
    await nextTick();
  }
  const el = await waitForElement(id);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}
