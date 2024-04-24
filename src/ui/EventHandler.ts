export default class EventHandler {
  private reflectKeyValueToDisplay() {
    const keysToReflect = document.querySelectorAll(".reflect-key");
    const display = document.querySelector("#top") as HTMLElement;
    keysToReflect.forEach((v) => {
      v.addEventListener("click", (e) => {
        const textToDisplay = (e.target as HTMLElement).textContent ?? "";
        display.textContent = display.textContent + textToDisplay;
        // console.log(e);
      });
    });
  }

  private pressKeyValueToDisplay() {
    window.addEventListener("keydown", (e) => {
      console.log(e);
      //2 parang na click din ung element na yon
      // if (e.key typeof KeysToReflect) {

      // }
    });
  }

  public run() {
    this.reflectKeyValueToDisplay();
    this.pressKeyValueToDisplay();
  }
}
