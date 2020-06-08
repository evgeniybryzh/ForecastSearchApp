"use strict";
export function useBurgerMenu() {
  const $burgerBtn = document.getElementById("burger");
  const $burgerStripes = $burgerBtn.children;
  const $burgerMenu = document.getElementById("burger-menu");
  const $firstStripe = document.getElementById("first-stripe");
  const $secondStripe = document.getElementById("second-stripe");
  const $thirdStripe = document.getElementById("third-stripe");
  const $burgerMenuListItems = document.getElementById("menu-list");
  let topCounter = -40;
  let rightCounter = 40;
  let count = 90;

  function changeVisibilityTohidden() {
    $burgerMenu.style.display = "none";
  }
  function changeVisibilityToVisible() {
    $burgerMenu.style.display = "flex";
  }
  function returnDirection() {
    topCounter = -40;
    rightCounter = 40;
    $burgerMenu.style.top = `${topCounter}px`;
    $burgerMenu.style.right = `${rightCounter}px`;
  }

  function moveTop() {
    if (count == -40) {
      return (count = 90);
    } else {
      $burgerMenu.style.top = `${(count -= 5)}px`;
    }
    setTimeout(moveTop, 1);
  }

  function animateMenuBack() {
    moveTop();
    setTimeout(changeVisibilityTohidden, 50);
    setTimeout(returnDirection, 500);
  }

  function animateMenuForward() {
    changeVisibilityToVisible();
    if (rightCounter == 360) return true;
    if (topCounter < 90 && rightCounter == 40) {
      $burgerMenu.style.top = `${(topCounter += 10)}px`;
    }
    if (topCounter == 90 && rightCounter < 360) {
      $burgerMenu.style.right = `${(rightCounter += 10)}px`;
    }
    setTimeout(animateMenuForward, 5);
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
        if ($firstStripe.classList[1] == "pushed") {
          removeStripesChanges();
          animateMenuBack();
        } else {
          addStripeChanges();
          animateMenuForward();
        }
      }

      if (
        event.target === $burgerMenuListItems.children[0] ||
        event.target === $burgerMenuListItems.children[1] ||
        event.target === $burgerMenuListItems.children[2] ||
        event.target === $burgerMenuListItems.children[3]
      ) {
        animateMenuBack();
        removeStripesChanges();
      }
    });
  };
  useBurger();
}
