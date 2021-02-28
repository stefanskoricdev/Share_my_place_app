export class Modal {
  constructor(contentId, fallbackText) {
    this.fallbackText = fallbackText;
    this.contentTemplateEl = document.getElementById(contentId);
    this.modalTemplateEl = document.getElementById("modal-template");
  }

  show() {
    //This IF statement is used to see if the browser supports 'template' tag (IE doesnt)!
    //We try to see if we can create template tag in the browser. If we cant, it will
    //return undefined and with that "content" wont be available and will result with false inside if statement
    //and will proceed inside else block!
    if ("content" in document.createElement("template")) {
      const modalElements = document.importNode(
        this.modalTemplateEl.content,
        true
      );
      this.modalElement = modalElements.querySelector(".modal");
      this.backdropElement = modalElements.querySelector(".backdrop");
      const contentElement = document.importNode(
        this.contentTemplateEl.content,
        true
      );

      this.modalElement.appendChild(contentElement);

      document.body.insertAdjacentElement("afterbegin", this.modalElement);
      document.body.insertAdjacentElement("afterbegin", this.backdropElement);
    } else {
      alert(this.fallbackText);
    }
  }

  hide() {
    if (this.modalElement) {
      document.body.removeChild(this.modalElement);
      document.body.removeChild(this.backdropElement);
      this.modalElement = null; //We set this to null so we dont store it in memory and have memory leaks
      this.backdropElement = null; //We set this to null so we dont store it in memory and have memory leaks
    }
  }
}
