"use strict";
export function useBurgerMenu() {
  const $burgerBtn = document.getElementById("burger");
  const $burgerStripes = $burgerBtn.children;
  const $burgerMenu = document.getElementById("burger-menu");
  const $firstStripe = document.getElementById("first-stripe");
  const $secondStripe = document.getElementById("second-stripe");
  const $thirdStripe = document.getElementById("third-stripe");
  const $burgerMenuListItems = document.getElementById("menu-list");

  function menuToggle() {
    $burgerMenu.classList.toggle("burger__menu--moved");
  }

  function removeStripesChanges() {
    $firstStripe.classList.remove("pushed");
    $secondStripe.classList.remove("pushed");
    $thirdStripe.classList.remove("pushed");
  }

  function addStripeChanges() {
    $firstStripe.classList.add("pushed");
    $secondStripe.classList.add("pushed");
    $thirdStripe.classList.add("pushed");
  }

  const useBurger = () => {
    document.addEventListener("click", (event) => {
      if (
        event.target === $burgerBtn ||
        event.target === $burgerStripes[0] ||
        event.target === $burgerStripes[1] ||
        event.target === $burgerStripes[2]
      ) {
        menuToggle();
        if ($firstStripe.classList[1] == "pushed") {
          removeStripesChanges();
        } else {
          addStripeChanges();
        }
      }

      if (
        event.target === $burgerMenuListItems.children[0] ||
        event.target === $burgerMenuListItems.children[1] ||
        event.target === $burgerMenuListItems.children[2] ||
        event.target === $burgerMenuListItems.children[3]
      ) {
        removeStripesChanges();
      }
    });
  };
  useBurger();
}
