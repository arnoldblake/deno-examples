import { describe, test, expect } from "vitest";
import { mountSuspended, mockNuxtImport } from "@nuxt/test-utils/runtime";
import IndexPage from "../../pages/index.vue";
import DinosaurPage from "../../pages/[name].vue";

mockNuxtImport("useFetch", () => {
  return () => {
    return {
      data: [
        {
          name: "Aardonyx",
          description: "An early stage in the evolution of sauropods."
        },
        {
          name: "Abelisaurus",
          description:
            '"Abel\'s lizard" has been reconstructed from a single skull.'
        },
        {
          name: "Abrictosaurus",
          description: "An early relative of Heterodontosaurus."
        },
        {
          name: "Abrosaurus",
          description: "A close Asian relative of Camarasaurus."
        }
      ]
    };
  };
});

describe("Index Page", () => {
  test("renders welcome message and dinosaur list", async () => {
    const component = await mountSuspended(IndexPage);

    // Check if welcome message is present
    expect(component.find("h1").text()).toBe("Welcome to the Dinosaur app");
    expect(component.find("p").text()).toBe(
      "Click on a dinosaur below to learn more."
    );

    // Mock data should be rendered in the list
    const links = component.findAll("a");
    expect(links.length).toBeGreaterThan(0);

    // Check if links are formatted correctly
    const firstLink = links[0];
    expect(firstLink.attributes("href")).toMatch(/^\/[a-z-]+$/);
  });
});

describe("Dinosaur Detail Page", () => {
  test("renders dinosaur details", async () => {
    // Mock route params
    const mockRoute = {
      params: {
        name: "tyrannosaurus"
      }
    };

    const component = await mountSuspended(DinosaurPage, {
      route: mockRoute
    });

    // Check if dinosaur information is displayed
    expect(component.find("h1").exists()).toBe(true);
    expect(component.find("p").exists()).toBe(true);

    // Check if back link exists
    const backLink = component.find("a");
    expect(backLink.attributes("href")).toBe("/");
    expect(backLink.text()).toBe("Back to all dinosaurs");
  });
});
